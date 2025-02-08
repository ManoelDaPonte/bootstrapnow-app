export interface TrendEntry {
	id: string;
	annee: number;
	tauxCroissance: number;
	variationDemande: number;
}

export interface MarketNumber {
	id: string;
	value: string;
	title: string;
	description: string;
	referenceLink: string;
}
