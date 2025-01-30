//lib/business-plan/config/ansoff.tsx
import { AnsoffCategory } from "@/types/ansoff";
import { QAData } from "@/types/shared/qa-section";

export const ANSOFF_SECTION_ORDER: AnsoffCategory[] = [
	"penetration",
	"development_product",
	"development_market",
	"diversification",
];

export const ANSOFF_DESCRIPTIONS = {
	penetration: "Vendre plus de produits existants aux marchés existants.",
	development_market: "Vendre des produits existants à de nouveaux marchés.",
	development_product: "Vendre de nouveaux produits aux marchés existants.",
	diversification: "Vendre de nouveaux produits à de nouveaux marchés.",
} as const;

export const ANSOFF_HEADERS = {
	penetration: { title: "Pénétration du marché", color: "text-blue-700" },
	development_market: {
		title: "Développement du marché",
		color: "text-emerald-700",
	},
	development_product: {
		title: "Développement produit",
		color: "text-orange-700",
	},
	diversification: { title: "Diversification", color: "text-purple-700" },
} as const;

export const ANSOFF_COLORS = {
	penetration: "bg-blue-50 border-blue-200 hover:bg-blue-100",
	development_market: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
	development_product: "bg-orange-50 border-orange-200 hover:bg-orange-100",
	diversification: "bg-purple-50 border-purple-200 hover:bg-purple-100",
};

export const ANSOFF_QA_DATA: QAData = {
	sectionTitle: "Questions pour Approfondir Votre Matrice Ansoff",
	categories: [
		{
			id: "market-penetration",
			title: "Pénétration du Marché",
			question:
				"Quelles sont vos stratégies actuelles pour augmenter votre part de marché avec les produits existants ?",
			examples: [
				"Mise en place d'une campagne promotionnelle agressive pour stimuler les ventes",
				"Développement de programmes de fidélisation pour augmenter la fréquence d'achat",
				"Optimisation de la distribution pour améliorer la disponibilité des produits",
			],
		},
		{
			id: "product-development",
			title: "Développement Produit",
			question:
				"Comment planifiez-vous d'innover et de développer de nouveaux produits pour votre marché actuel ?",
			examples: [
				"Investissement en R&D pour créer des versions améliorées des produits existants",
				"Développement de produits complémentaires pour répondre aux besoins adjacents",
				"Intégration de nouvelles technologies pour moderniser l'offre",
			],
		},
		{
			id: "market-development",
			title: "Développement du Marché",
			question:
				"Quels nouveaux marchés ou segments de clientèle envisagez-vous pour vos produits actuels ?",
			examples: [
				"Expansion géographique vers de nouvelles régions ou pays",
				"Adaptation des produits existants pour de nouveaux segments de marché",
				"Développement de nouveaux canaux de distribution",
			],
		},
	],
};

export const ANSOFF_MODAL_DETAILED_DESCRIPTIONS = {
	penetration: {
		title: "Pénétration du Marché",
		content:
			"La stratégie de pénétration du marché vise à augmenter les ventes des produits existants sur les marchés existants. C'est généralement la stratégie la moins risquée car elle s'appuie sur des produits et marchés que l'entreprise connaît déjà.",
		examples: [
			"**Promotions commerciales:** Mise en place d'offres spéciales, réductions de prix ou programmes de fidélité pour stimuler les ventes.",
			"**Optimisation de la distribution:** Amélioration de la disponibilité des produits et de la visibilité en magasin.",
			"**Marketing intensif:** Augmentation des dépenses publicitaires et amélioration de la communication marketing.",
		],
	},
	development_product: {
		title: "Développement Produit",
		content:
			"Cette stratégie consiste à introduire de nouveaux produits sur les marchés existants. Elle nécessite une bonne compréhension des besoins des clients actuels et des capacités d'innovation.",
		examples: [
			"**Innovation produit:** Développement de nouvelles caractéristiques ou fonctionnalités pour les produits existants.",
			"**Élargissement de la gamme:** Introduction de produits complémentaires ou de nouvelles variantes.",
			"**Modernisation technologique:** Intégration de nouvelles technologies dans les produits existants.",
		],
	},
	development_market: {
		title: "Développement du Marché",
		content:
			"Cette approche vise à trouver de nouveaux marchés pour les produits existants. Elle peut impliquer une expansion géographique ou la recherche de nouveaux segments de clientèle.",
		examples: [
			"**Expansion géographique:** Entrée sur de nouveaux marchés régionaux ou internationaux.",
			"**Nouveaux segments:** Adaptation des produits existants pour de nouveaux groupes de clients.",
			"**Nouveaux canaux:** Développement de nouveaux canaux de distribution ou de vente.",
		],
	},
	diversification: {
		title: "Diversification",
		content:
			"La stratégie de diversification est la plus risquée car elle implique de nouveaux produits et de nouveaux marchés. Elle peut être nécessaire pour la croissance à long terme ou la réduction des risques.",
		examples: [
			"**Diversification liée:** Développement de nouveaux produits liés aux activités existantes pour de nouveaux marchés.",
			"**Diversification non liée:** Entrée dans des activités totalement nouvelles.",
			"**Acquisition stratégique:** Rachat d'entreprises dans de nouveaux secteurs d'activité.",
		],
	},
};
