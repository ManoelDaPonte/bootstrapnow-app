import { BaseCard } from "@/types/shared/card-modal";

export interface ValuePropositionCard extends BaseCard {
	id: number;
	title: string;
	description: string;
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
	lastAnalysis?: string;
	lastUpdated?: string;
}

export interface ModalState {
	open: boolean;
	category: string;
	card: ValuePropositionCard;
}

export interface ValuePropositionSections {
	[key: string]: {
		title: string;
		color: string;
	};
}

export type TooltipMessages = {
	[key in ValuePropositionCategory]: string;
};
