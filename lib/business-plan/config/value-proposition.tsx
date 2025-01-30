import { ValuePropositionCategory } from "@/types/value-proposition";
import { QAData } from "@/types/shared/qa-section";

export const VALUE_PROPOSITION_TOOLTIPS = {
	customerJobs:
		"Décrivez les tâches que vos clients essaient d'accomplir dans leur travail ou leur vie.",
	pains: "Listez les mauvaises expériences, émotions et risques que vos clients expérimentent.",
	gains: "Identifiez les bénéfices que vos clients attendent et les résultats positifs qu'ils désirent.",
	products:
		"Énumérez tous les produits et services que votre proposition de valeur constitue.",
	painRelievers:
		"Décrivez comment vos produits et services soulagent les problèmes spécifiques des clients.",
	gainCreators:
		"Expliquez comment vos produits et services créent des bénéfices pour vos clients.",
};

export const VALUE_PROPOSITION_SECTIONS = {
	customerJobs: { title: "Tâches du Client", color: "border-blue-200" },
	pains: { title: "Problèmes", color: "border-blue-200" },
	gains: { title: "Gains Attendus", color: "border-blue-200" },
	products: { title: "Produits & Services", color: "border-green-200" },
	painRelievers: {
		title: "Solutions aux Problèmes",
		color: "border-green-200",
	},
	gainCreators: { title: "Créateurs de Gains", color: "border-green-200" },
};

export const CUSTOMER_SEGMENT_SECTIONS: ValuePropositionCategory[] = [
	"customerJobs",
	"pains",
	"gains",
];

export const VALUE_PROPOSITION_SECTIONS_ORDER: ValuePropositionCategory[] = [
	"products",
	"painRelievers",
	"gainCreators",
];

export const VALUE_PROPOSITION_QA_DATA: QAData = {
	sectionTitle: "Questions pour Approfondir Votre Proposition de Valeur",
	categories: [
		{
			id: "customer-needs",
			title: "Besoins Clients",
			question:
				"Comment avez-vous identifié et validé les besoins principaux de vos clients ?",
			examples: [
				"Études de marché ciblées",
				"Entretiens avec des clients potentiels",
				"Analyse des retours clients existants",
			],
		},
		{
			id: "value-differentiation",
			title: "Différenciation",
			question:
				"En quoi votre proposition de valeur se différencie-t-elle de la concurrence ?",
			examples: [
				"Innovation produit unique",
				"Meilleur rapport qualité-prix",
				"Service client supérieur",
			],
		},
		{
			id: "solution-fit",
			title: "Adéquation Solution",
			question:
				"Comment votre solution répond-elle spécifiquement aux problèmes identifiés ?",
			examples: [
				"Fonctionnalités développées sur mesure",
				"Solutions basées sur des retours clients",
				"Innovations technologiques ciblées",
			],
		},
	],
};

export const VALUE_PROPOSITION_MODAL_DETAILED_DESCRIPTIONS = {
	customerJobs: {
		title: "Tâches du Client",
		content:
			"Identifiez les tâches importantes que vos clients essaient de réaliser dans leur travail ou leur vie quotidienne. Ces jobs peuvent être des tâches fonctionnelles, sociales ou émotionnelles.",
		examples: [
			"**Tâches fonctionnelles:** Accomplir une tâche spécifique ou résoudre un problème concret",
			"**Besoins sociaux:** Gagner en prestige, en pouvoir ou en statut",
			"**Besoins émotionnels:** Rechercher la sécurité ou le bien-être",
			"**Tâches basiques:** Répondre à des besoins fondamentaux quotidiens",
			"**Désirs personnels:** Atteindre des objectifs d'amélioration personnelle",
		],
	},
	pains: {
		title: "Problèmes",
		content:
			"Décrivez les mauvaises expériences, risques et obstacles que vos clients rencontrent avant, pendant et après l'accomplissement de leurs tâches.",
		examples: [
			"**Obstacles:** Difficultés qui empêchent de commencer ou ralentissent une tâche",
			"**Risques:** Résultats négatifs potentiels qui inquiètent les clients",
			"**Frustrations:** Points de friction dans l'expérience actuelle",
			"**Coûts cachés:** Dépenses inattendues ou temps perdu",
			"**Problèmes récurrents:** Difficultés qui surviennent régulièrement",
		],
	},
	gains: {
		title: "Gains Attendus",
		content:
			"Identifiez les bénéfices que vos clients espèrent obtenir, qu'ils soient nécessaires, attendus, désirés ou inattendus.",
		examples: [
			"**Gains fonctionnels:** Améliorations pratiques et mesurables",
			"**Économies:** Gains de temps, d'argent ou d'efforts",
			"**Avantages sociaux:** Amélioration de l'image ou du statut",
			"**Émotions positives:** Satisfaction, confiance ou bien-être",
			"**Aspirations:** Réalisation d'objectifs personnels ou professionnels",
		],
	},
	products: {
		title: "Produits & Services",
		content:
			"Listez tous les produits et services que votre proposition de valeur met à disposition des clients. Ce sont les offres tangibles qui aident vos clients à accomplir leurs tâches.",
		examples: [
			"**Produits physiques:** Biens tangibles que les clients peuvent utiliser",
			"**Services digitaux:** Solutions numériques et applications",
			"**Services support:** Accompagnement, formation et assistance",
			"**Fonctionnalités clés:** Caractéristiques principales de vos offres",
			"**Packages complets:** Combinaisons de produits et services",
		],
	},
	painRelievers: {
		title: "Solutions aux Problèmes",
		content:
			"Décrivez précisément comment vos produits et services soulagent les problèmes spécifiques de vos clients. Montrez comment vous éliminez ou réduisez les émotions négatives, les situations indésirables ou les risques.",
		examples: [
			"**Économies réalisées:** Réduction des coûts ou du temps investi",
			"**Réduction des risques:** Solutions pour minimiser les problèmes potentiels",
			"**Simplifications:** Amélioration de l'expérience utilisateur",
			"**Solutions pratiques:** Résolution directe des problèmes concrets",
			"**Support proactif:** Anticipation et prévention des difficultés",
		],
	},
	gainCreators: {
		title: "Créateurs de Gains",
		content:
			"Expliquez comment vos produits et services créent des bénéfices pour vos clients. Décrivez comment vous générez des résultats positifs et des avantages que vos clients attendent, désirent ou pourraient être surpris d'obtenir.",
		examples: [
			"**Avantages uniques:** Bénéfices distinctifs de votre solution",
			"**Performance optimisée:** Améliorations mesurables des résultats",
			"**Expérience améliorée:** Satisfaction accrue des utilisateurs",
			"**Innovation:** Nouvelles façons de répondre aux besoins",
			"**Valeur ajoutée:** Bénéfices supplémentaires inattendus",
		],
	},
};
