import { OpenAI } from "openai";
import { SectionConfig, GenerationResult } from "@/types/openai/section";
import { BUSINESS_PLAN_SECTIONS } from "@/lib/openai/config/sections";
import { SECTION_SYSTEM_PROMPTS } from "@/lib/openai/config/prompts";
import { DataMapper } from "./DataMapper";
import { format_all_analyses } from "../formatters";
import { create_section_prompt } from "../formatters/sectionFormatter";
import { SectionContextService } from "../services/SectionContextService";
import { SECTION_ORDER } from "../config/section-order";
import { BusinessPlanSection } from "@/types/business-plan-document/business-plan";
import { logger } from "@/lib/logger";
import { FormattedAnalyses } from "@/types/openai/analyzers";

export class SectionGenerator {
	private static analysesCache: Map<
		string,
		{
			data: FormattedAnalyses;
			timestamp: Date;
		}
	> = new Map();

	private contextService: SectionContextService;
	private mapper: DataMapper;
	private openai: OpenAI;
	private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

	constructor(databaseUrl: string, openaiApiKey: string) {
		this.contextService = new SectionContextService();
		this.mapper = new DataMapper(databaseUrl);
		this.openai = new OpenAI({ apiKey: openaiApiKey });
	}

	private async getOrUpdateCache(
		auth0Id: string
	): Promise<FormattedAnalyses> {
		const cachedData = SectionGenerator.analysesCache.get(auth0Id);
		const now = new Date();

		if (
			cachedData &&
			now.getTime() - cachedData.timestamp.getTime() < this.CACHE_DURATION
		) {
			logger.info(
				`Utilisation du cache existant (âge: ${
					now.getTime() - cachedData.timestamp.getTime()
				}ms)`
			);
			return cachedData.data;
		}

		logger.info(
			"Cache non trouvé ou expiré - Chargement des analyses depuis la base de données"
		);
		const startTime = Date.now();
		const analyses = await this.mapper.getUserAnalyses(auth0Id);
		const formattedAnalyses = format_all_analyses(analyses);

		SectionGenerator.analysesCache.set(auth0Id, {
			data: formattedAnalyses,
			timestamp: now,
		});

		logger.info(`Analyses mises en cache (${Date.now() - startTime}ms)`);
		logger.debug(
			`Types d'analyses en cache: ${
				Object.keys(formattedAnalyses).length
			}`
		);

		return formattedAnalyses;
	}

	async loadUserAnalyses(auth0Id: string) {
		return await this.mapper.getUserAnalyses(auth0Id);
	}

	private loadSectionConfig(sectionName: BusinessPlanSection): SectionConfig {
		const sectionData = BUSINESS_PLAN_SECTIONS[sectionName];
		if (!sectionData) {
			throw new Error(`Section '${sectionName}' non trouvée`);
		}

		const systemPrompt = SECTION_SYSTEM_PROMPTS[sectionName];
		if (!systemPrompt) {
			throw new Error(
				`System prompt non trouvé pour la section '${sectionName}'`
			);
		}

		return {
			title: sectionData.title,
			paths: sectionData.paths as [string, string, string][],
			systemPrompt,
		};
	}

	private verifyPaths(
		analysesFormatted: any,
		paths: [string, string, string][]
	): [string, string, string][] {
		return paths.filter(([analysisType, sectionType, fieldName]) => {
			if (!analysesFormatted[analysisType]) {
				return false;
			}

			const data = this.getDataFromPath(
				analysesFormatted[analysisType],
				sectionType,
				fieldName
			);

			if (data === null || data === "") {
				return false;
			}

			return true;
		});
	}

	private getDataFromPath(
		analysis: any,
		sectionType: string,
		fieldName: string
	): string | null {
		switch (sectionType) {
			case "formatted_text":
				return analysis.formatted_text || null;
			case "formatted_qa":
				return analysis?.formatted_qa?.[fieldName] || null;
			case "formatted_sections":
				return analysis?.formatted_sections?.[fieldName] || null;
			default:
				return null;
		}
	}
	async generateSection(
		auth0Id: string,
		sectionName: string
	): Promise<GenerationResult> {
		logger.setSection(sectionName).startGeneration(sectionName);
		try {
			// 1. Récupération des analyses (avec cache)
			const analysesCache = await this.getOrUpdateCache(auth0Id);

			// 2. Chargement config et contexte
			logger.debug("Chargement configuration et contexte");
			const startLoadTime = Date.now();
			const [config, previousSections] = await Promise.all([
				this.loadSectionConfig(sectionName as BusinessPlanSection),
				this.contextService.getPreviousSectionsContext(
					auth0Id,
					sectionName
				),
			]);
			logger.debug(
				`Configuration et contexte chargés (${
					Date.now() - startLoadTime
				}ms)`
			);

			// 3. Vérification des chemins
			const pathStartTime = Date.now();
			// Correction de la syntaxe
			const validPaths = this.verifyPaths(
				analysesCache, // ajout de la virgule
				config.paths
			);
			logger.pathValidation(validPaths.length, config.paths.length);
			logger.debug(
				`Validation des chemins terminée (${
					Date.now() - pathStartTime
				}ms)`
			);

			if (!validPaths.length) {
				logger.error("Aucun chemin valide trouvé");
				throw new Error(
					`Aucun chemin valide trouvé pour la section '${sectionName}'`
				);
			}

			// 4. Création du prompt
			logger.promptCreation();
			const promptStartTime = Date.now();
			const basePrompt = create_section_prompt(
				analysesCache, // ajout de la virgule
				sectionName
			);
			logger.debug(
				`Prompt de base créé (${Date.now() - promptStartTime}ms)`
			);

			// 5. Ajout du contexte
			logger.contextFetch();
			const contextStartTime = Date.now();
			const contextPrompt =
				this.contextService.formatContextForPrompt(previousSections);
			const currentSectionOrder = SECTION_ORDER.getIndex(sectionName) + 1;
			logger.debug(
				`Sections précédentes trouvées: ${previousSections.length}`
			);
			logger.debug(
				`Contexte formaté (${Date.now() - contextStartTime}ms)`
			);

			const fullPrompt = `${basePrompt}
	Important: Cette section est la ${currentSectionOrder}ème section du business plan sur ${SECTION_ORDER.sections.length}. 
	Assure-toi que le contenu s'intègre naturellement avec les sections précédentes tout en évitant les répétitions.
	${contextPrompt}`;

			// 6. Génération OpenAI
			logger.generating();
			const aiStartTime = Date.now();
			const completion = await this.openai.chat.completions.create({
				model: "gpt-4o-mini",
				messages: [
					{ role: "system", content: config.systemPrompt },
					...previousSections.map((section) => ({
						role: "assistant" as const,
						content: section.content,
					})),
					{ role: "user", content: fullPrompt },
				],
				temperature: 0.7,
			});
			logger.info(
				`Génération OpenAI terminée (${Date.now() - aiStartTime}ms)`
			);

			const generatedContent = completion.choices[0].message.content;

			return {
				metadata: {
					section_name: sectionName,
					section_title: config.title,
					generated_at: new Date().toISOString(),
					auth0_id: auth0Id,
					valid_paths_count: validPaths.length,
					total_paths_count: config.paths.length,
				},
				prompts: {
					system: config.systemPrompt,
					user: fullPrompt,
				},
				generated_content: generatedContent || "",
			};
		} catch (error) {
			logger.error("Erreur de génération", error);
			SectionGenerator.analysesCache.delete(auth0Id); // Utiliser la méthode delete sur la Map
			throw error;
		}
	}

	// Méthode pour gérer manuellement le cache
	public resetCache(auth0Id?: string) {
		if (auth0Id) {
			logger.info(`Reset du cache pour l'utilisateur: ${auth0Id}`);
			SectionGenerator.analysesCache.delete(auth0Id);
		} else {
			logger.info("Reset complet du cache");
			SectionGenerator.analysesCache.clear();
		}
	}
}
