export interface ValuePropositionCard {
	id: number;
	content: string;
}

export type ValuePropositionCategory =
	| "customerJobs"
	| "pains"
	| "gains"
	| "products"
	| "painRelievers"
	| "gainCreators";

export interface ValuePropositionData {
	customerJobs: ValuePropositionCard[];
	pains: ValuePropositionCard[];
	gains: ValuePropositionCard[];
	products: ValuePropositionCard[];
	painRelievers: ValuePropositionCard[];
	gainCreators: ValuePropositionCard[];
	lastUpdated?: string;
}

// Pour les tooltips
export type TooltipMessages = {
	[key in ValuePropositionCategory]: string;
};
