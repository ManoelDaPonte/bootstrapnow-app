//type/swot.tsx

export interface SwotCard {
	id: number;
	title: string;
	description: string;
}

export interface SwotData {
	strengths: SwotCard[];
	weaknesses: SwotCard[];
	opportunities: SwotCard[];
	threats: SwotCard[];
	lastAnalysis?: string;
	lastUpdated?: string;
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
