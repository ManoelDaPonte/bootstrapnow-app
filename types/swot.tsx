// types/swot.ts  (changé en .ts car pas de JSX)
export type SwotCategory =
	| "strengths"
	| "weaknesses"
	| "opportunities"
	| "threats";

export interface SwotCard {
	id: number;
	title: string;
	description: string;
}

// Interface pour les QA responses
export interface QAResponses {
	[key: string]: string;
}

export interface SwotData {
	strengths: SwotCard[];
	weaknesses: SwotCard[];
	opportunities: SwotCard[];
	threats: SwotCard[];
	lastAnalysis?: string;
	lastUpdated?: string;
}

export interface CompleteSwotData {
	data: SwotData;
	qaResponses: QAResponses;
}

export interface ModalState {
	open: boolean;
	category: string;
	card: SwotCard;
}

export interface SwotAnalysis {
	analysis: string;
	loading: boolean;
	error: string | null;
}

// Nouveaux types pour la configuration
export interface SwotHeader {
	title: string;
	color: string;
}

export type SwotHeaders = Record<SwotCategory, SwotHeader>;
export type SwotDescriptions = Record<SwotCategory, string>;
