// types/openai/analyzers.ts
export interface BaseFormattedData {
	formatted_sections: Record<string, string>;
	formatted_text: string;
	formatted_qa?: Record<string, string>;
	data?: any;
}

// Types spécifiques pour chaque analyseur
export interface SwotAnalysisData extends BaseFormattedData {
	data: {
		strengths: Array<{ title: string; description: string }>;
		weaknesses: Array<{ title: string; description: string }>;
		opportunities: Array<{ title: string; description: string }>;
		threats: Array<{ title: string; description: string }>;
	};
}

export interface MarketTrendsData extends BaseFormattedData {
	data: {
		trends: Array<{
			annee: number;
			tauxCroissance: number;
			variationDemande: number;
		}>;
		market_numbers: Array<{
			id: string;
			title: string;
			value: string;
			description: string;
		}>;
		average_growth: number;
		average_demand: number;
	};
}

export interface CompetitorData {
	id: string;
	nom: string;
	prix: number;
	valeurPercue: number;
	solution: string;
	strategie: string;
	zoneGeographique: string;
	ciblageClient: string;
	forces: string;
	faiblesses: string;
	impactDirect: string;
	impactIndirect: string;
	isMyCompany?: boolean;
}

export interface CompetitorsAnalysisData extends BaseFormattedData {
	data: {
		competitors: CompetitorData[];
		average_price: number;
		average_value: number;
		market_zones: string[];
		market_segments: string[];
		market_strategies: string[];
	};
}

export interface ProjectionBaseData {
	revenue_totals: Record<string, number>;
	expenses_totals: Record<string, number>;
	margins: Record<string, number>;
	margin_percentages: Record<string, number>;
	revenue_growth: number[];
}

export interface MonthlyProjectionData extends BaseFormattedData {
	data: ProjectionBaseData & {
		details: Record<
			string,
			{
				month: string;
				revenue: number;
				expenses: number;
				margin: number;
				margin_percentage: number;
			}
		>;
	};
}

export interface YearlyProjectionData extends BaseFormattedData {
	data: ProjectionBaseData & {
		details: Record<
			string,
			{
				year: string;
				revenue: number;
				expenses: number;
				margin: number;
				margin_percentage: number;
			}
		>;
	};
}

export interface FormattedAnalysis extends BaseFormattedData {
	formatted_sections: Record<string, string>;
	formatted_text: string;
	formatted_qa?: Record<string, string>;
	data?: any;
}

// Interface pour tous les résultats formatés
export interface FormattedAnalyses {
	[key: string]: FormattedAnalysis;
}
export type AnalyzerResult =
	| SwotAnalysisData
	| MarketTrendsData
	| CompetitorsAnalysisData
	| MonthlyProjectionData
	| YearlyProjectionData
	| FormattedAnalysis;
