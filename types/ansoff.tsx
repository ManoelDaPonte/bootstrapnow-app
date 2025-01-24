// types/ansoff.ts
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
