// types/marketing-mix.ts

export interface MarketingMixCard {
	id: number;
	title: string;
	description: string;
}

export interface MarketingMixData {
	product: MarketingMixCard[];
	price: MarketingMixCard[];
	place: MarketingMixCard[];
	promotion: MarketingMixCard[];
	people: MarketingMixCard[];
	process: MarketingMixCard[];
	physical_evidence: MarketingMixCard[];
	lastUpdated?: string;
}

export interface ModalState {
	open: boolean;
	category: string;
	card: MarketingMixCard;
}

// Structure par défaut pour initialiser les données
export const DEFAULT_MARKETING_MIX_DATA: MarketingMixData = {
	product: [],
	price: [],
	place: [],
	promotion: [],
	people: [],
	process: [],
	physical_evidence: [],
	lastUpdated: new Date().toISOString(),
};

// Exemples de données pour chaque catégorie
export const EXAMPLE_MARKETING_MIX_DATA: MarketingMixData = {
	product: [
		{
			id: 1,
			title: "Caractéristiques principales",
			description:
				"Description détaillée des fonctionnalités et avantages du produit",
		},
	],
	price: [
		{
			id: 1,
			title: "Stratégie de prix",
			description: "Positionnement tarifaire et politique de prix",
		},
	],
	place: [
		{
			id: 1,
			title: "Canaux de distribution",
			description: "Points de vente et méthodes de distribution",
		},
	],
	promotion: [
		{
			id: 1,
			title: "Plan marketing",
			description: "Stratégies promotionnelles et campagnes marketing",
		},
	],
	people: [
		{
			id: 1,
			title: "Équipe commerciale",
			description: "Formation et gestion de l'équipe de vente",
		},
	],
	process: [
		{
			id: 1,
			title: "Processus de vente",
			description: "Étapes du processus de vente et service client",
		},
	],
	physical_evidence: [
		{
			id: 1,
			title: "Environnement physique",
			description: "Aspects tangibles du service et expérience client",
		},
	],
	lastUpdated: new Date().toISOString(),
};

// Types pour les fonctions de gestion des données
export type MarketingMixCategory = keyof Omit<MarketingMixData, "lastUpdated">;

export interface StorageOperations {
	saveMarketingMix: (data: MarketingMixData) => Promise<void>;
	loadMarketingMix: () => Promise<MarketingMixData>;
	clearMarketingMix: () => Promise<void>;
}
