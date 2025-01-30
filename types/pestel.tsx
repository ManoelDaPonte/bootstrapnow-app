import { BaseCard } from "@/types/shared/card-modal";

export interface PestelCard extends BaseCard {
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

export type PestelCategory = keyof Omit<
	PestelData,
	"lastAnalysis" | "lastUpdated"
>;

export interface PestelHeaders {
	[key: string]: {
		title: string;
		color: string;
	};
}

export interface PestelDescriptions {
	[key: string]: string;
}

export interface PestelColors {
	[key: string]: string;
}

// Structure par défaut pour initialiser les données
export const DEFAULT_PESTEL_DATA: PestelData = {
	political: [],
	economic: [],
	social: [],
	technological: [],
	environmental: [],
	legal: [],
	lastAnalysis: new Date().toISOString(),
	lastUpdated: new Date().toISOString(),
};
