// types/openai/analyzers.ts

// Interface de base
export interface BaseFormattedData {
	formatted_sections: Record<string, string>;
	formatted_text: string;
	formatted_qa?: Record<string, string>;
	qa?: Record<string, string>;
	data: any;
}

export interface GeneralInfoData extends BaseFormattedData {
	data: {
		city: string;
		state: string;
		authors: string;
		zipcode: string;
		website_url: string;
		company_name: string;
		business_type: string;
		email_address: string;
		business_phone: string;
		street_address: string;
	};
}

// Competitor Data
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

// Competitors Analysis
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

// Ansoff Analysis
export interface AnsoffAnalysisData extends BaseFormattedData {
	data: {
		market_penetration: any[];
		product_development: any[];
		market_development: any[];
		diversification: any[];
	};
}

// Canvas Analysis
export interface CanvasAnalysisData extends BaseFormattedData {
	data: {
		key_partners: any[];
		key_activities: any[];
		key_resources: any[];
		value_proposition: any[];
		customer_relationships: any[];
		channels: any[];
		customer_segments: any[];
		cost_structure: any[];
		revenue_streams: any[];
	};
}

// Funnel Analysis
export interface FunnelAnalysisData extends BaseFormattedData {
	data: Array<{
		id: number;
		size: number;
		cards: Array<{
			id: number;
			title: string;
			description: string;
		}>;
		color: string;
		title: string;
	}>;
}

// Marketing Mix Analysis
export interface MarketingMixAnalysisData extends BaseFormattedData {
	data: {
		product: any[];
		price: any[];
		place: any[];
		promotion: any[];
		people: any[];
		process: any[];
		physical_evidence: any[];
	};
}

// PESTEL Analysis
export interface PestelAnalysisData extends BaseFormattedData {
	data: {
		political: any[];
		economic: any[];
		social: any[];
		technological: any[];
		environmental: any[];
		legal: any[];
	};
}

// Skills Matrix Analysis
export interface SkillsMatrixAnalysisData extends BaseFormattedData {
	data: Array<{
		name: string;
		[domain: string]: string | number;
	}>;
}

// Startup Expenses Analysis
export interface StartupExpensesAnalysisData extends BaseFormattedData {
	data: {
		risks: Array<{
			impact: number;
			category: string;
			mitigation: string;
			probability: number;
		}>;
		capital: {
			loans: any[];
			investors: any[];
		};
		revenue: number;
		expenses: {
			categories: any[];
		};
		projections: {
			year1: number;
			year2: number;
			year3: number;
		};
		categoryDefinitions: {
			loans: any[];
			expenses: any[];
			investors: any[];
		};
	};
}

// Value Proposition Analysis
export interface ValuePropositionAnalysisData extends BaseFormattedData {
	data: {
		gains: any[];
		pains: any[];
		products: any[];
		customer_jobs: any[];
		gain_creators: any[];
		pain_relievers: any[];
	};
}

// Garder les interfaces existantes avec ajout du qa optionnel
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

// Mise à jour du type union pour inclure tous les analyseurs
export type AnalyzerResult =
	| GeneralInfoData
	| SwotAnalysisData
	| MarketTrendsData
	| CompetitorsAnalysisData
	| MonthlyProjectionData
	| YearlyProjectionData
	| AnsoffAnalysisData
	| CanvasAnalysisData
	| FunnelAnalysisData
	| MarketingMixAnalysisData
	| PestelAnalysisData
	| SkillsMatrixAnalysisData
	| StartupExpensesAnalysisData
	| ValuePropositionAnalysisData;

// Interface pour tous les résultats formatés
export interface FormattedAnalyses {
	[key: string]: AnalyzerResult;
}
