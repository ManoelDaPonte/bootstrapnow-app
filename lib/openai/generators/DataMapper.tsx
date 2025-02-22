import { prisma } from "@/lib/db/prisma";
import { FIELD_MAPPINGS } from "../config/mappings";
import { AnalysisData, MappingResult } from "@/types/openai/mapping";
import { logger } from "@/lib/logger";

// Configuration des modèles et leurs mappings avec la bonne casse pour Prisma
const MODEL_CONFIG = {
	generalInfo: {
		type: "general_info",
		hasQA: false,
	},
	swotAnalysis: {
		type: "swot",
		hasQA: true,
	},
	pestelAnalysis: {
		type: "pestel",
		hasQA: true,
	},
	canvasAnalysis: {
		type: "canvas",
		hasQA: true,
	},
	ansoffAnalysis: {
		type: "ansoff",
		hasQA: true,
	},
	marketingMixAnalysis: {
		type: "marketing_mix",
		hasQA: true,
	},
	valuePropositionAnalysis: {
		type: "value_proposition",
		hasQA: true,
	},
	skillMatrix: {
		type: "skills_matrix",
		hasQA: true,
	},
	funnelChartAnalysis: {
		type: "funnel_chart",
		hasQA: true,
	},
	monthlyProjectionAnalysis: {
		type: "monthly_projection",
		hasQA: true,
	},
	yearlyProjectionAnalysis: {
		type: "yearly_projection",
		hasQA: false,
	},
	marketTrendsAnalysis: {
		type: "market_trends",
		hasQA: false,
	},
	startupExpensesAnalysis: {
		type: "startup_expenses",
		hasQA: true,
	},
	competitorsAnalysis: {
		type: "competitors",
		hasQA: false,
	},
} as const;

export class DataMapper {
	constructor(private databaseUrl: string) {}

	private mapFieldNames(
		data: any,
		analysisType: string,
		dataType: string
	): any {
		if (!data || typeof data !== "object") {
			return data;
		}

		const mapping = FIELD_MAPPINGS[analysisType]?.[dataType];
		if (!mapping) {
			logger.debug(
				`Pas de mapping trouvé pour ${analysisType}.${dataType}`
			);
			return data;
		}

		if (Array.isArray(data)) {
			return data.map((item) =>
				this.mapFieldNames(item, analysisType, dataType)
			);
		}

		const mappedData: Record<string, any> = {};
		for (const [key, value] of Object.entries(data)) {
			const mappedKey = mapping[key] || key;
			mappedData[mappedKey] = value;
		}

		return mappedData;
	}

	private async processAnalysis(
		userId: string,
		tableName: keyof typeof MODEL_CONFIG,
		analysisType: string
	): Promise<AnalysisData | null> {
		logger.debug(`Traitement de l'analyse: ${tableName}`);
		try {
			const modelConfig = MODEL_CONFIG[tableName];
			const select = {
				data: true,
				...(modelConfig.hasQA ? { qaResponses: true } : {}),
			};

			const analysis = await (prisma[tableName] as any).findUnique({
				where: { userId },
				select,
			});

			if (!analysis || !analysis.data) {
				logger.debug(`Aucune donnée trouvée pour ${tableName}`);
				return {
					data: {},
					qa_responses: {},
				};
			}

			let data = analysis.data;
			// Cas spécial pour les competitors
			if (analysisType === "competitors" && "competitors" in data) {
				data = data.competitors;
				logger.debug("Traitement spécial des données competitors");
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

			logger.debug(`Analyse ${tableName} traitée avec succès`);
			return {
				data: mappedData,
				qa_responses: mappedQA,
			};
		} catch (error) {
			logger.error(`Erreur traitement ${tableName}`, error);
			return {
				data: {},
				qa_responses: {},
			};
		}
	}

	async getUserAnalyses(auth0Id: string): Promise<MappingResult> {
		logger
			.setSection("DataMapper")
			.info(`Début récupération analyses utilisateur: ${auth0Id}`);

		try {
			const user = await prisma.user.findUnique({
				where: { auth0Id },
				select: { id: true },
			});

			if (!user) {
				logger.error("Utilisateur non trouvé");
				throw new Error(`User not found with auth0Id: ${auth0Id}`);
			}

			const analyses: MappingResult = {};
			const modelEntries = Object.entries(MODEL_CONFIG) as [
				keyof typeof MODEL_CONFIG,
				(typeof MODEL_CONFIG)[keyof typeof MODEL_CONFIG]
			][];

			logger.info(
				`Traitement de ${modelEntries.length} types d'analyses`
			);

			for (const [tableName, config] of modelEntries) {
				const result = await this.processAnalysis(
					user.id,
					tableName,
					config.type
				);
				if (result) {
					analyses[config.type] = result;
				}
			}

			const analysesCount = Object.keys(analyses).length;
			logger.info(
				`Analyses complétées: ${analysesCount} sections récupérées`
			);

			return analyses;
		} catch (error) {
			logger.error("Erreur récupération analyses utilisateur", error);
			throw error;
		}
	}
}
