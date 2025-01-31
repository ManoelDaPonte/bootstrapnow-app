// types/ansoff.ts
import { QAResponses } from "@/types/shared/qa-section";

export interface AnsoffCard {
	id: number;
	title: string;
	description: string;
}

export interface AnsoffData {
	penetration: AnsoffCard[];
	development_market: AnsoffCard[];
	development_product: AnsoffCard[];
	diversification: AnsoffCard[];
	lastAnalysis?: string;
	lastUpdated?: string;
}

export interface ModalState {
	open: boolean;
	category: string;
	card: AnsoffCard;
}

export interface AnsoffHeaders {
	[key: string]: {
		title: string;
		color: string;
	};
}

export interface AnsoffDescriptions {
	[key: string]: string;
}

export interface AnsoffColors {
	[key: string]: string;
}

export type AnsoffCategory = keyof Omit<
	AnsoffData,
	"lastAnalysis" | "lastUpdated"
>;

export interface StoredData {
	data: AnsoffData;
	qaResponses: QAResponses;
}
