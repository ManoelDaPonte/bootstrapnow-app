// lib/openai/generators/SectionGenerator.ts
import { OpenAI } from "openai";
import { SectionConfig, GenerationResult } from "@/types/openai/section";
import { BUSINESS_PLAN_SECTIONS } from "@/lib/openai/config/sections";
import { SECTION_SYSTEM_PROMPTS } from "@/lib/openai/config/prompts";
import { DataMapper } from "./DataMapper";
import { format_all_analyses } from "../formatters";
import { create_section_prompt } from "../formatters/sectionFormatter";

export class SectionGenerator {
	private mapper: DataMapper;
	private openai: OpenAI;

	constructor(databaseUrl: string, openaiApiKey: string) {
		this.mapper = new DataMapper(databaseUrl);
		this.openai = new OpenAI({ apiKey: openaiApiKey });
	}

	// Ajout de la nouvelle méthode pour la compatibilité
	async loadUserAnalyses(auth0Id: string) {
		return await this.mapper.getUserAnalyses(auth0Id);
	}

	private loadSectionConfig(sectionName: string): SectionConfig {
		if (
			!BUSINESS_PLAN_SECTIONS[
				sectionName as keyof typeof BUSINESS_PLAN_SECTIONS
			]
		) {
			throw new Error(`Section '${sectionName}' non trouvée`);
		}

		const sectionData =
			BUSINESS_PLAN_SECTIONS[
				sectionName as keyof typeof BUSINESS_PLAN_SECTIONS
			];
		const systemPrompt =
			SECTION_SYSTEM_PROMPTS[
				sectionName as keyof typeof SECTION_SYSTEM_PROMPTS
			];

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
		// console.log("Vérification des chemins:", {
		// 	totalPaths: paths.length,
		// 	availableAnalyses: Object.keys(analysesFormatted),
		// });
		const validPaths: [string, string, string][] = [];

		for (const [analysisType, sectionType, fieldName] of paths) {
			if (!analysesFormatted[analysisType]) {
				continue;
			}

			let data: any = null;

			if (sectionType === "formatted_text") {
				data = analysesFormatted[analysisType].formatted_text;
			} else if (sectionType === "formatted_qa") {
				data =
					analysesFormatted[analysisType]?.formatted_qa?.[fieldName];
			} else if (sectionType === "formatted_sections") {
				data =
					analysesFormatted[analysisType]?.formatted_sections?.[
						fieldName
					];
			}

			if (data === null || data === "") {
				continue;
			}

			validPaths.push([analysisType, sectionType, fieldName]);
		}

		return validPaths;
	}

	async generateSection(
		auth0Id: string,
		sectionName: string
	): Promise<GenerationResult> {
		console.log("1. Début generateSection pour:", sectionName);
		// console.log(`Début de génération pour la section ${sectionName}`, {
		// 	auth0Id,
		// 	timestamp: new Date().toISOString(),
		// });
		try {
			const config = this.loadSectionConfig(sectionName);
			// console.log("Configuration chargée:", {
			// 	title: config.title,
			// 	pathsCount: config.paths.length,
			// });

			const analyses = await this.mapper.getUserAnalyses(auth0Id);
			// console.log("Analyses récupérées:", {
			// 	analysesTypes: Object.keys(analyses),
			// });

			const analysesFormatted = format_all_analyses(analyses);
			// console.log("Analyses formatées:", {
			// 	formattedTypes: Object.keys(analysesFormatted),
			// });

			// 4. Vérifier et filtrer les chemins valides
			const validPaths = this.verifyPaths(
				analysesFormatted,
				config.paths
			);

			if (!validPaths.length) {
				throw new Error(
					`Aucun chemin valide trouvé pour la section '${sectionName}'`
				);
			}

			// 5. Créer le prompt utilisateur
			const userPrompt = create_section_prompt(
				analysesFormatted,
				sectionName
			);

			// Après la création du prompt utilisateur
			console.log("=== GÉNÉRATION DE SECTION ===");
			console.log("Section:", sectionName);
			console.log("\n=== PROMPT SYSTÈME ===\n", config.systemPrompt);
			console.log("\n=== PROMPT UTILISATEUR ===\n", userPrompt);

			// 6. Générer la réponse via OpenAI
			const completion = await this.openai.chat.completions.create({
				model: "gpt-4-turbo-preview",
				messages: [
					{ role: "system", content: config.systemPrompt },
					{ role: "user", content: userPrompt },
				],
				temperature: 0.7,
			});

			const generatedContent = completion.choices[0].message.content;
			// const generatedContent = "Generated content";
			console.log("\n=== CONTENU GÉNÉRÉ ===\n", generatedContent);
			console.log("========================\n");

			// 7. Préparer le résultat
			const result: GenerationResult = {
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
					user: userPrompt,
				},
				generated_content: generatedContent || "",
			};

			return result;
		} catch (error) {
			console.error("Erreur dans generateSection:", {
				sectionName,
				auth0Id,
				error,
			});
			throw error;
		}
	}
}
