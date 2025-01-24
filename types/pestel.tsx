//types/pestel.tsx

export interface PestelCard {
	id: number;
	title: string;
	description: string;
}

export interface PestelData {
	political: PestelCard[];
	economic: PestelCard[];
	social: PestelCard[];
	technological: PestelCard[];
	environmental: PestelCard[];
	legal: PestelCard[];
	lastAnalysis?: string;
	lastUpdated?: string;
}

export interface ModalState {
	open: boolean;
	category: string;
	card: PestelCard;
}

export interface PestelAnalysis {
	analysis: string;
	loading: boolean;
	error: string | null;
}
