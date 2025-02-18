import { prisma } from "@/lib/db/prisma";
import { FIELD_MAPPINGS } from "../config/mappings";
import { AnalysisData, MappingResult } from "@/types/openai/mapping";

// Configuration des modèles et leurs mappings avec la bonne casse pour Prisma
const MODEL_CONFIG = {
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
		console.log(`Processing ${tableName}...`);
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

			console.log(`${tableName} query result:`, {
				exists: !!analysis,
				hasData: !!analysis?.data,
			});

			if (!analysis || !analysis.data) {
				console.log(`-> No data found for ${tableName}`);
				return {
					data: {},
					qa_responses: {},
				};
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
			console.error(`Error in processAnalysis for ${tableName}:`, error);
			return {
				data: {},
				qa_responses: {},
			};
		}
	}

	async getUserAnalyses(auth0Id: string): Promise<MappingResult> {
		try {
			const user = await prisma.user.findUnique({
				where: { auth0Id },
				select: { id: true },
			});

			if (!user) {
				throw new Error(`User not found with auth0Id: ${auth0Id}`);
			}

			const analyses: MappingResult = {};
			const modelEntries = Object.entries(MODEL_CONFIG) as [
				keyof typeof MODEL_CONFIG,
				(typeof MODEL_CONFIG)[keyof typeof MODEL_CONFIG]
			][];

			for (const [tableName, config] of modelEntries) {
				console.log(`Processing ${tableName} (${config.type})`);
				const result = await this.processAnalysis(
					user.id,
					tableName,
					config.type
				);
				console.log(`Result for ${tableName}:`, !!result);
				if (result) {
					analyses[config.type] = result;
				}
			}

			console.log("Final analyses:", Object.keys(analyses));
			return analyses;
		} catch (error) {
			console.error("Error in getUserAnalyses:", error);
			throw error;
		}
	}
}
