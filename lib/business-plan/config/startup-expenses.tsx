import { FinancialData } from "@/types/startup-expenses";

export const QA_DATA = {
	sectionTitle: "Questions pour Approfondir Votre Analyse Financière",
	categories: [
		{
			id: "initial-investment",
			title: "Investissement Initial",
			question:
				"Quels sont les investissements prioritaires pour le démarrage de votre entreprise et pourquoi ces choix ?",
			examples: [
				"Nous prévoyons d'investir principalement dans le développement technologique car c'est notre coeur de métier",
				"L'acquisition de matériel spécialisé est prioritaire pour notre production",
				"Le budget marketing représente notre investissement principal pour acquérir rapidement des parts de marché",
			],
		},
		{
			id: "risk-management",
			title: "Gestion des Risques",
			question:
				"Comment planifiez-vous de gérer les risques financiers identifiés dans votre analyse ?",
			examples: [
				"Diversification des sources de financement pour réduire la dépendance",
				"Constitution d'une réserve de trésorerie pour les imprévus",
				"Souscription à des assurances spécifiques pour couvrir les risques majeurs",
			],
		},
		{
			id: "break-even",
			title: "Point Mort",
			question:
				"Quel est votre plan pour atteindre le point d'équilibre et dans quel délai ?",
			examples: [
				"Optimisation des coûts opérationnels dès le démarrage",
				"Stratégie de pricing adaptée pour maximiser les marges",
				"Focus sur les produits/services à forte rentabilité",
			],
		},
	],
};

export const INITIAL_FINANCIAL_DATA: FinancialData = {
	capital: {
		investors: [
			{
				id: "inv1",
				name: "Investisseur Initial",
				amount: 100000,
				type: "seed",
				category: "tech",
			},
			{
				id: "inv2",
				name: "Business Angel",
				amount: 250000,
				type: "series-a",
				category: "venture",
			},
		],
		loans: [
			{
				id: "loan1",
				name: "Prêt Bancaire",
				amount: 200000,
				type: "secured",
				category: "working-capital",
			},
			{
				id: "loan2",
				name: "Prêt d'Honneur",
				amount: 50000,
				type: "unsecured",
				category: "equipment",
			},
		],
	},
	expenses: {
		categories: [
			{
				id: "exp1",
				name: "Développement Tech",
				amount: 150000,
				type: "operational",
				category: "tech",
			},
			{
				id: "exp2",
				name: "Marketing Digital",
				amount: 75000,
				type: "marketing",
				category: "growth",
			},
			{
				id: "exp3",
				name: "Ressources Humaines",
				amount: 200000,
				type: "administrative",
				category: "overhead",
			},
		],
	},
	revenue: 500000,
	projections: {
		year1: 750000,
		year2: 1500000,
		year3: 3000000,
	},
	risks: [
		{
			category: "Risque Marché",
			probability: 0.3,
			impact: 7,
			mitigation: "Diversification des segments de marché",
		},
		{
			category: "Risque Technique",
			probability: 0.2,
			impact: 5,
			mitigation: "Audits techniques réguliers",
		},
		{
			category: "Risque Financier",
			probability: 0.4,
			impact: 8,
			mitigation: "Réserve de trésorerie et lignes de crédit",
		},
	],
	categoryDefinitions: {
		investors: [
			{ id: "tech", name: "Investisseurs Tech", color: "#3B82F6" },
			{ id: "venture", name: "Capital Risque", color: "#10B981" },
			{ id: "angel", name: "Business Angels", color: "#6366F1" },
		],
		loans: [
			{
				id: "working-capital",
				name: "Fonds de Roulement",
				color: "#F43F5E",
			},
			{ id: "equipment", name: "Équipement", color: "#8B5CF6" },
			{ id: "innovation", name: "Innovation", color: "#EC4899" },
		],
		expenses: [
			{ id: "tech", name: "Technologie", color: "#6366F1" },
			{ id: "growth", name: "Croissance", color: "#8B5CF6" },
			{ id: "overhead", name: "Frais Généraux", color: "#EF4444" },
			{ id: "marketing", name: "Marketing", color: "#14B8A6" },
		],
	},
};
