//lib/business-plan/config/funnel-chart.tsx
import { QAData } from "@/types/shared/qa-section";
import {
	FunnelModalDetailedDescriptions,
	FunnelSection,
} from "@/types/funnel-chart";

export const FUNNEL_SECTION_INFO = {
	1: "Phase de visibilité : Listez les moyens par lesquels vos clients potentiels découvrent votre existence",
	2: "Phase d'intérêt : Décrivez comment vous captez l'attention et générez de l'intérêt",
	3: "Phase de considération : Détaillez comment vous amenez les prospects à considérer sérieusement votre offre",
	4: "Phase d'intention : Expliquez comment vous amenez les prospects à avoir l'intention d'acheter",
	5: "Phase d'achat : Décrivez comment vous convertissez l'intention en achat effectif",
} as const;

export const DEFAULT_FUNNEL_SECTIONS: FunnelSection[] = [
	{
		id: 1,
		title: "Visibilité",
		size: 100,
		cards: [],
		color: "from-blue-50 to-blue-100",
	},
	{
		id: 2,
		title: "Intérêt",
		size: 80,
		cards: [],
		color: "from-green-50 to-green-100",
	},
	{
		id: 3,
		title: "Considération",
		size: 60,
		cards: [],
		color: "from-yellow-50 to-yellow-100",
	},
	{
		id: 4,
		title: "Intention",
		size: 40,
		cards: [],
		color: "from-orange-50 to-orange-100",
	},
	{
		id: 5,
		title: "Achat",
		size: 30,
		cards: [],
		color: "from-red-50 to-red-100",
	},
];

export const FUNNEL_QA_DATA: QAData = {
	sectionTitle: "Questions pour Optimiser Votre Entonnoir de Conversion",
	categories: [
		{
			id: "visibility-optimization",
			title: "Optimisation de la Visibilité",
			question:
				"Comment pouvez-vous augmenter la visibilité de votre offre auprès de votre cible ?",
			examples: [
				"Stratégie SEO optimisée pour les mots-clés pertinents",
				"Présence active sur les réseaux sociaux appropriés",
				"Campagnes publicitaires ciblées par audience",
			],
		},
		{
			id: "conversion-optimization",
			title: "Optimisation des Conversions",
			question:
				"Quelles actions spécifiques mettez-vous en place pour améliorer vos taux de conversion à chaque étape ?",
			examples: [
				"Tests A/B sur les pages clés du parcours client",
				"Personnalisation du contenu selon le comportement utilisateur",
				"Simplification du processus d'achat",
			],
		},
	],
};

export const FUNNEL_MODAL_DETAILED_DESCRIPTIONS: FunnelModalDetailedDescriptions =
	{
		1: {
			title: "Phase de Visibilité",
			content:
				"Cette phase concerne tous les points de contact initiaux où vos clients potentiels découvrent votre existence. Il est crucial d'identifier et d'optimiser ces premiers touchpoints.",
			examples: [
				"**SEO:** Optimisation pour les moteurs de recherche avec des mots-clés ciblés",
				"**Publicité:** Campagnes publicitaires sur les canaux pertinents",
				"**Présence sociale:** Activité sur les réseaux sociaux appropriés",
				"**Contenu:** Publication de contenu attirant votre cible",
				"**Partenariats:** Collaborations pour augmenter la visibilité",
			],
		},
		2: {
			title: "Phase d'Intérêt",
			content:
				"Cette étape se concentre sur la transformation de la simple visibilité en un intérêt actif pour votre offre. Il s'agit de capter et maintenir l'attention.",
			examples: [
				"**Contenu engageant:** Articles, vidéos ou posts qui captent l'attention",
				"**Proposition de valeur:** Communication claire des bénéfices",
				"**Storytelling:** Histoires qui résonnent avec votre audience",
				"**Démos:** Démonstrations de produits ou services",
				"**Social proof:** Témoignages et avis clients",
			],
		},
		3: {
			title: "Phase de Considération",
			content:
				"À ce stade, les prospects évaluent activement votre offre par rapport à leurs besoins et aux alternatives disponibles. Il est essentiel de fournir des informations détaillées et convaincantes.",
			examples: [
				"**Comparaisons:** Analyses détaillées des avantages par rapport à la concurrence",
				"**Études de cas:** Exemples concrets de réussites avec des clients",
				"**Documentation:** Ressources techniques et informatives détaillées",
				"**FAQ:** Réponses aux questions fréquentes et objections courantes",
				"**Webinaires:** Sessions d'information et démonstrations approfondies",
			],
		},
		4: {
			title: "Phase d'Intention",
			content:
				"Cette phase correspond au moment où les prospects sont prêts à passer à l'action mais peuvent avoir besoin d'un dernier coup de pouce. L'objectif est de faciliter la décision d'achat.",
			examples: [
				"**Offres spéciales:** Promotions limitées dans le temps",
				"**Garanties:** Politiques de remboursement et garanties de satisfaction",
				"**Essais gratuits:** Versions d'essai ou échantillons",
				"**Consultation:** Sessions de conseil personnalisées",
				"**Accompagnement:** Support dans la prise de décision",
			],
		},
		5: {
			title: "Phase d'Achat",
			content:
				"La phase finale où le prospect devient client. L'accent est mis sur la simplification du processus d'achat et la confirmation de la bonne décision du client.",
			examples: [
				"**Processus d'achat:** Simplification des étapes de commande",
				"**Méthodes de paiement:** Options de paiement variées et sécurisées",
				"**Confirmation:** Messages de confirmation et prochaines étapes",
				"**Onboarding:** Programme d'intégration des nouveaux clients",
				"**Support immédiat:** Assistance disponible pendant le processus",
			],
		},
	};
