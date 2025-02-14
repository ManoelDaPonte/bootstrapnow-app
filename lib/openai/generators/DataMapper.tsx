// lib/openai/generators/DataMapper.ts
import { prisma } from "@/lib/db/prisma";
import { FIELD_MAPPINGS } from "../config/mappings";
import {
	AnalysisData,
	MappingResult,
	FieldMapping,
} from "@/types/openai/mapping";

// Fonction helper
function hasQAResponses(tableName: string): boolean {
	const modelsWithQA = [
		"SwotAnalysis",
		"PestelAnalysis",
		"CanvasAnalysis" /* etc */,
		"AnsoffAnalysis",
		"MarketingMixAnalysis",
		"ValuePropositionAnalysis",
		"SkillMatrix",
		"FunnelChartAnalysis",
		"MonthlyProjectionAnalysis",
		// "YearlyProjectionAnalysis",
		// "MarketTrendsAnalysis",
		"StartupExpensesAnalysis",
		// "CompetitorsAnalysis",
	];
	return modelsWithQA.includes(tableName);
}

export class DataMapper {
	constructor(private databaseUrl: string) {}

	private mapFieldNames(
		data: any,
		analysisType: string,
		dataType: string
	): any {
		console.log(
			`Mapping des champs pour ${analysisType}, type: ${dataType}`,
			{
				inputData: data,
				mapping: FIELD_MAPPINGS[analysisType]?.[dataType],
			}
		);
		if (!data || typeof data !== "object") {
			return data;
		}

		const mapping = FIELD_MAPPINGS[analysisType]?.[dataType];
		if (!mapping) {
			// Si pas de mapping, retourner les données telles quelles
			return data;
		}

		// Si c'est un tableau, traiter chaque élément
		if (Array.isArray(data)) {
			return data.map((item) =>
				this.mapFieldNames(item, analysisType, dataType)
			);
		}

		const mappedData: Record<string, any> = {};

		for (const [key, value] of Object.entries(data)) {
			// Si la clé est dans le mapping, utiliser la nouvelle clé
			if (key in mapping) {
				mappedData[mapping[key]] = value;
			} else {
				// Sinon garder la clé originale, mais sans log d'erreur
				mappedData[key] = value;
			}
		}

		return mappedData;
	}

	private async processAnalysis(
		userId: string,
		tableName: string,
		analysisType: string
	): Promise<AnalysisData | null> {
		console.log(
			`Début du traitement de l'analyse ${analysisType} pour l'utilisateur ${userId}`
		);

		try {
			const analysis = await (
				prisma[tableName as keyof typeof prisma] as any
			).findUnique({
				where: { userId },
				select: {
					data: true,
					...(hasQAResponses(tableName) ? { qaResponses: true } : {}),
				},
			});

			console.log(`Résultat de la requête pour ${tableName}:`, {
				hasAnalysis: !!analysis,
				hasData: !!analysis?.data,
				dataType: analysis?.data ? typeof analysis.data : "undefined",
			});

			// Si pas d'analyse, retourner null proprement
			if (!analysis || !analysis.data) {
				console.log(`Pas de données trouvées pour ${analysisType}`);
				return null;
			}

			// Vérification explicite du type des données
			if (typeof analysis.data !== "object") {
				console.error(
					`Données invalides pour ${analysisType}:`,
					analysis.data
				);
				return null;
			}

			let data = analysis.data;
			// Cas spécial pour les competitors
			if (analysisType === "competitors" && "competitors" in data) {
				data = data.competitors;
			}

			const mappedData =
				this.mapFieldNames(data, analysisType, "data") || {};
			const mappedQA = analysis.qaResponses
				? this.mapFieldNames(
						analysis.qaResponses,
						analysisType,
						"qa_responses"
				  )
				: {};

			return {
				data: mappedData,
				qa_responses: mappedQA,
			};
		} catch (error) {
			console.error(`Erreur dans processAnalysis pour ${tableName}:`, {
				error: error instanceof Error ? error.message : "Unknown error",
				analysisType,
				tableName,
			});
			return null; // Retourner null au lieu de throw
		}
	}

	async getUserAnalyses(auth0Id: string): Promise<MappingResult> {
		try {
			// Récupération de l'ID utilisateur
			const user = await prisma.user.findUnique({
				where: { auth0Id },
				select: { id: true },
			});

			if (!user) {
				throw new Error(
					`Utilisateur non trouvé avec auth0Id: ${auth0Id}`
				);
			}

			// Configuration des analyses à récupérer
			const analysesConfig = [
				["SwotAnalysis", "swot"],
				["PestelAnalysis", "pestel"],
				["CanvasAnalysis", "canvas"],
				["AnsoffAnalysis", "ansoff"],
				["MarketingMixAnalysis", "marketing_mix"],
				["ValuePropositionAnalysis", "value_proposition"],
				["SkillMatrix", "skills_matrix"],
				["FunnelChartAnalysis", "funnel_chart"],
				["MonthlyProjectionAnalysis", "monthly_projection"],
				["YearlyProjectionAnalysis", "yearly_projection"],
				["MarketTrendsAnalysis", "market_trends"],
				["StartupExpensesAnalysis", "startup_expenses"],
				["CompetitorsAnalysis", "competitors"],
			] as const;

			const analyses: MappingResult = {};

			// Traitement de chaque analyse
			for (const [tableName, analysisType] of analysesConfig) {
				const result = await this.processAnalysis(
					user.id,
					tableName,
					analysisType
				);
				if (result) {
					analyses[analysisType] = result;
				}
			}

			return analyses;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
