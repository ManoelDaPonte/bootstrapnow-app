// lib/business-plan/config/market-trends.tsx

export const FIELD_LABELS = {
	annee: "Année",
	tauxCroissance: "Taux de Croissance (%)",
	variationDemande: "Variation de Demande (%)",
};

export const MARKET_NUMBERS_HELP = {
	title: "Comprendre les grands nombres du marché",
	content:
		"Les grands nombres du marché sont des indicateurs clés qui permettent de quantifier et de comprendre la dynamique de votre marché. Ils doivent être basés sur des sources fiables et vérifiables.",
	examples: [
		"Taille du marché :** Représente la valeur totale des ventes sur votre marché",
		"Taux de croissance :** Indique l'évolution annuelle du marché",
		"Part des leaders :** Montre la concentration du marché",
		"Taille du segment :** Précise la valeur d'un segment spécifique",
	],
};

export const TRENDS_HELP = {
	title: "Analyse des tendances",
	content:
		"L'analyse des tendances permet de comprendre l'évolution historique et future de votre marché. Elle prend en compte le taux de croissance et les variations de la demande.",
	examples: [
		"Croissance stable :** Une croissance régulière de 5-7% par an indique un marché mature",
		"Forte croissance :** Une croissance supérieure à 20% suggère un marché en expansion",
		"Variation de la demande :** Les fluctuations indiquent la stabilité du marché",
		"Tendance baissière :** Une diminution progressive peut signaler un marché en déclin",
	],
};

export const MARKET_TRENDS_QA_DATA = {
	sectionTitle: "Questions supplémentaires",
	categories: [
		{
			id: "MARKET_DATA",
			title: "Données de marché",
			question:
				"Quelles sont les principales données de marché qui influencent votre activité ?",
			examples: [
				"Une demande croissante pour les produits éco-responsables",
				"Un ralentissement économique impactant le pouvoir d’achat des consommateurs",
				"L’émergence de nouvelles technologies disruptives.",
			],
		},
		{
			id: "LEGAL_DATA_Anticipate",
			title: "Anticipation des enjeux",
			question:
				"Quels sont les enjeux juridiques et réglementaires à anticiper ?",
			examples: [
				"Respect du RGPD et protection des données personnelles.",
				"Réglementation spécifique pour les produits alimentaires",
				"Obligations fiscales et déclarations légales pour une entreprise internationale.",
			],
		},
	],
};
