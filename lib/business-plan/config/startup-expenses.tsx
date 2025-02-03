import { FinancialData } from "@/types/startup-expenses";

export const QA_DATA = {
	sectionTitle: "Questions pour Approfondir Votre Analyse Financière",
	categories: [
		{
			id: "FP_TaxLegalConsiderations",
			title: "Aspects fiscaux et juridiques",
			question:
				"Quels sont les principaux aspects fiscaux et juridiques à prendre en compte pour la création et la gestion de votre entreprise ? Ces éléments ont-ils une influence sur votre stratégie ?",
			examples: [
				"Nous devons tenir compte des régulations fiscales locales concernant la TVA et des impôts sur les sociétés, car elles affectent directement notre rentabilité. Nous avons aussi consulté un avocat pour être conformes à la législation sur la protection des données personnelles (RGPD).",
				"Nous prévoyons d'opter pour un statut juridique qui nous permet de bénéficier de certaines exonérations fiscales, ce qui nous aidera à optimiser notre rentabilité. De plus, nous avons besoin de nous assurer que tous nos contrats commerciaux respectent les normes légales pour éviter des litiges.",
			],
		},
		{
			id: "FP_Funding",
			title: "Modes de financement",
			question:
				"Quels sont les modes de financement envisagés pour lancer et développer votre entreprise ? Avez-vous prévu des sources de financement spécifiques ?",
			examples: [
				"Diversification des sources de financement pour réduire la dépendance",
				"Constitution d'une réserve de trésorerie pour les imprévus",
				"Souscription à des assurances spécifiques pour couvrir les risques majeurs",
			],
		},
		{
			id: "FP_CapitelNeeds",
			title: "Besoins en capitaux",
			question:
				"Quel montant de capital est nécessaire pour couvrir les besoins de votre entreprise à court et moyen terme ? En quoi ce capital est-il essentiel pour votre activité ?",
			examples: [
				"Nous estimons que nous avons besoin de 500 000 € pour couvrir les coûts de production, le marketing initial, ainsi que pour renforcer notre équipe. Ce capital est crucial pour assurer notre lancement sur le marché avec un produit de qualité.",
				"Un capital de 200 000 € est nécessaire pour couvrir les dépenses liées à l'achat d'équipement et à la mise en place d'une infrastructure solide pour le lancement de notre service.",
			],
		},
		{
			id: "FP_Budget",
			title: "Budget",
			question:
				"Quel est le budget prévisionnel pour les premières années de votre entreprise ? Comment ce budget est-il réparti entre les différents postes de dépenses ?",
			examples: [
				"Nous avons prévu un budget de 300 000 € pour les deux premières années, réparti entre la R&D (40 %), le marketing (30 %), et les frais généraux (30 %).",
				"Le budget de lancement est estimé à 100 000 €, dont 50 000 € sont alloués à l’achat de matériel, et les 50 000 € restants sont dédiés aux campagnes de publicité et à la rémunération des employés.",
			],
		},
		{
			id: "FP_ExternalCost",
			title: "Coûts externes",
			question:
				"Quels coûts externes (partenaires, fournisseurs, services externes) avez-vous anticipés pour faire fonctionner votre entreprise ? Comment ces coûts influencent-ils votre plan financier ?",
			examples: [
				"Nous avons estimé un coût de 50 000 € pour les services externes tels que la logistique et le marketing digital. Ces dépenses sont nécessaires pour assurer une gestion fluide de la production et augmenter notre visibilité en ligne.",
				"Les coûts externes, incluant les frais de consultants et les services cloud pour héberger nos données, sont évalués à 30 000 €. Ces dépenses sont cruciales pour maintenir la qualité de notre service tout en contrôlant les coûts fixes.",
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
