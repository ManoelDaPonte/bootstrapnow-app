//lib/business-plan/config/marketing-mix.tsx
import { MarketingMixCategory } from "@/types/marketing-mix";
import { QAData } from "@/types/shared/qa-section";
import { DetailedDescription } from "@/types/shared/card-modal";

export const MARKETING_MIX_SECTION_ORDER: MarketingMixCategory[] = [
	"product",
	"price",
	"place",
	"promotion",
	"people",
	"process",
	"physicalEvidence", // Changé de "physical_evidence" à "physicalEvidence"
];

export const MARKETING_MIX_DESCRIPTIONS = {
	product: "Caractéristiques et avantages du produit ou service proposé.",
	price: "Stratégie de tarification et positionnement sur le marché.",
	place: "Canaux de distribution et accessibilité pour les clients.",
	promotion: "Stratégies de communication et actions marketing.",
	people: "Personnel, formation et service client.",
	process: "Processus de livraison et expérience client.",
	physicalEvidence: "Environnement physique et preuves tangibles du service.",
} as const;

export const MARKETING_MIX_HEADERS = {
	product: { title: "Produit" },
	price: { title: "Prix" },
	place: { title: "Distribution" },
	promotion: { title: "Promotion" },
	people: { title: "Personnel" },
	process: { title: "Processus" },
	physicalEvidence: { title: "Preuve Physique" }, // Assurez-vous que la clé correspond
} as const;

export const MARKETING_MIX_COLORS = {
	product: "bg-blue-50 border-blue-200 hover:bg-blue-100",
	price: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
	place: "bg-purple-50 border-purple-200 hover:bg-purple-100",
	promotion: "bg-orange-50 border-orange-200 hover:bg-orange-100",
	people: "bg-red-50 border-red-200 hover:bg-red-100",
	process: "bg-cyan-50 border-cyan-200 hover:bg-cyan-100",
	physicalEvidence: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
} as const;

export const MARKETING_MIX_QA_DATA: QAData = {
	sectionTitle: "Questions supplémentaires de votre Mix Marketing",
	categories: [
		{
			id: "MarketingPlan_Sensibility",
			title: "Sensibilité au prix",
			question:
				"Quelles recherches avez-vous faites pour évaluer la sensibilité au prix de votre marché cible ?",
			examples: [
				"Analyse des concurrents : Nous avons étudié les prix pratiqués par nos concurrents directs et indirects pour évaluer les fourchettes tarifaires acceptées par notre marché cible.",
				"Enquêtes et sondages : Nous avons mené des enquêtes auprès de notre clientèle potentielle pour comprendre leur perception du prix et leur disposition à payer pour notre produit/service.",
				"Tests A/B et études de marché : Nous avons réalisé des tests de tarification en proposant différentes options à des segments de clients afin d'observer leur comportement d'achat et d'identifier le prix optimal.",
			],
		},
	],
};

export const MARKETING_MIX_MODAL_DETAILED_DESCRIPTIONS: Record<
	MarketingMixCategory,
	DetailedDescription
> = {
	product: {
		title: "Produit",
		content:
			"Définissez les caractéristiques, avantages et bénéfices de votre produit ou service. Cette section doit mettre en avant ce qui rend votre offre unique et attractive pour vos clients.",
		examples: [
			"Caractéristiques clés:** Description des fonctionnalités principales qui répondent aux besoins des clients",
			"Avantages concurrentiels:** Ce qui différencie votre produit de la concurrence",
			"Qualité et design:** Standards de qualité et aspects esthétiques",
			"Marque et packaging:** Identité visuelle et présentation du produit",
			"Services associés:** Support, garantie et services après-vente",
		],
	},
	price: {
		title: "Prix",
		content:
			"Déterminez votre stratégie de tarification en tenant compte des coûts, de la concurrence et de la valeur perçue par les clients.",
		examples: [
			"Structure tarifaire:** Grille de prix et options de tarification",
			"Positionnement prix:** Comparaison avec la concurrence",
			"Politique de remise:** Conditions et critères d'application",
			"Marge et rentabilité:** Analyse des marges par produit/service",
			"Méthodes de paiement:** Options et facilités de paiement",
		],
	},
	place: {
		title: "Distribution",
		content:
			"Définissez vos canaux de distribution et optimisez la disponibilité de vos produits ou services pour vos clients cibles.",
		examples: [
			"Canaux de vente:** Points de vente physiques, en ligne, partenaires",
			"Couverture géographique:** Zones desservies et expansion prévue",
			"Logistique:** Organisation de la chaîne d'approvisionnement",
			"Stock et inventaire:** Gestion des stocks et disponibilité",
			"Partenariats:** Collaborations avec des distributeurs clés",
		],
	},
	promotion: {
		title: "Promotion",
		content:
			"Élaborez votre stratégie de communication et vos actions marketing pour atteindre et convaincre votre cible.",
		examples: [
			"Publicité:** Campagnes publicitaires et médias utilisés",
			"Marketing digital:** Stratégie web et réseaux sociaux",
			"Relations publiques:** Communication institutionnelle et événements",
			"Promotion des ventes:** Offres spéciales et programmes de fidélité",
			"Marketing direct:** Campagnes email et communication personnalisée",
		],
	},
	people: {
		title: "Personnel",
		content:
			"Gérez votre capital humain et assurez une expérience client optimale grâce à votre équipe.",
		examples: [
			"Formation:** Programmes de formation et développement des compétences",
			"Service client:** Standards de service et gestion de la relation client",
			"Culture d'entreprise:** Valeurs et engagement des équipes",
			"Recrutement:** Profils recherchés et processus de sélection",
			"Performance:** Évaluation et motivation des équipes",
		],
	},
	process: {
		title: "Processus",
		content:
			"Optimisez vos processus opérationnels pour garantir une prestation de qualité constante.",
		examples: [
			"Automatisation:** Outils et systèmes pour améliorer l'efficacité",
			"Qualité:** Contrôle qualité et amélioration continue",
			"Service delivery:** Étapes de livraison du service",
			"Support client:** Processus de gestion des demandes clients",
			"Innovation:** Méthodes d'amélioration des processus",
		],
	},
	physicalEvidence: {
		title: "Preuve Physique",
		content:
			"Développez les aspects tangibles qui rendent votre service visible et crédible aux yeux des clients.",
		examples: [
			"Environnement:** Aménagement des espaces et ambiance",
			"Documentation:** Supports de communication et documents commerciaux",
			"Équipement:** Matériel visible et outils utilisés",
			"Apparence:** Tenue du personnel et identité visuelle",
			"Certification:** Preuves de qualité et accréditations",
		],
	},
} as const;
