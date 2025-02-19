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
	sectionTitle: "Les questions Premium pour votre proposition de valeur",
	categories: [
		{
			id: "VP_CustomerProfiles",
			title: "Profil des clients cibles",
			question:
				"Qui sont vos clients idéaux en termes de profils psychographiques et quels sont leurs principaux besoins ?",
			examples: [
				"Profil psychographique : Les clients idéaux sont des jeunes professionnels de 25 à 35 ans, soucieux de leur santé et de leur bien-être, qui cherchent à adopter un mode de vie plus actif. Besoins : Ils ont besoin de solutions pratiques et accessibles pour intégrer l’exercice physique dans leur quotidien chargé, comme des programmes d'entraînement à domicile ou des applications de fitness personnalisées.",
				"Profil psychographique : Les clients idéaux sont des familles avec enfants, qui recherchent des produits écologiques et durables pour réduire leur impact environnemental. Besoins : Ils ont besoin de produits ménagers non toxiques, de solutions zéro déchet et d’alternatives écologiques à leurs achats quotidiens.",
				"Profil psychographique : Les clients idéaux sont des retraités actifs de plus de 60 ans, qui souhaitent rester indépendants tout en améliorant leur confort à domicile. Besoins : Ils ont besoin de technologies simples à utiliser pour améliorer leur sécurité (comme des systèmes de surveillance intelligents) et des produits adaptés pour faciliter les tâches ménagères sans trop d’effort.",
			],
		},
		{
			id: "VP_DifferentiationFactors",
			title: "Différenciation de la concurrence",
			question:
				"Comment votre entreprise se différencie-t-elle de la concurrence et quels sont les facteurs clés qui la rendent unique ?",
			examples: [
				"Différenciation : Nous proposons un produit bio et équitable, tandis que la plupart de nos concurrents utilisent des ingrédients industriels ou non durables. Facteurs clés : Nous garantissons la traçabilité totale de nos produits et mettons un point d'honneur à soutenir des projets locaux en Afrique. Cela attire les consommateurs soucieux de l'impact environnemental et social de leurs achats.",
				"Différenciation : Notre application de gestion de finances personnelles se distingue par son interface ultra-simplifiée et son approche ludique, qui la rend accessible même aux utilisateurs non experts. Facteurs clés : Nous offrons des fonctionnalités personnalisées adaptées aux jeunes adultes qui commencent tout juste à gérer leurs finances, ce que peu de nos concurrents proposent. De plus, notre application est gratuite et sans publicité intrusive.",
				"Différenciation : Nous sommes les seuls à proposer un service de livraison de repas entièrement préparés à base de plantes, tout en offrant des recettes innovantes chaque semaine. Facteurs clés : Contrairement aux concurrents qui se limitent à des options végétariennes classiques, nous nous concentrons sur des plats végétaliens gourmets, avec des options créatives adaptées aux régimes spécifiques (gluten-free, keto, etc.).",
			],
		},
		{
			id: "VP_CustomerInsights",
			title: "Préférences des consommateurs",
			question:
				"Comment l'évolution des préférences des consommateurs impacte-t-elle votre secteur et quelles sont les principales tendances actuelles ?",
			examples: [
				"Impact des préférences : Les consommateurs recherchent de plus en plus des produits respectueux de l'environnement et des marques engagées socialement. Cela influence directement notre secteur, car nous constatons une demande croissante pour des produits biologiques et durables. Tendances : La tendance vers des produits écologiques et zéro déchet est en forte croissance, et cela pousse notre entreprise à développer des emballages compostables et à privilégier des sources d'approvisionnement durables.",
				"Impact des préférences : Les consommateurs privilégient désormais les solutions numériques et la commodité, avec un intérêt croissant pour les services en ligne. Cela transforme notre industrie des services financiers, car une part importante des transactions se fait maintenant via des applications mobiles. Tendances : L'usage des applications mobiles et des services financiers dématérialisés (comme le paiement sans contact et les portefeuilles électroniques) continue d'augmenter, avec un accent mis sur la rapidité, la sécurité et la personnalisation.",
				"Impact des préférences : Les clients dans le secteur de la mode se tournent de plus en plus vers des achats en ligne, réduisant la fréquentation des magasins physiques. Cela change la dynamique du marché, nous incitant à investir dans notre plateforme e-commerce et à renforcer notre présence en ligne. Tendances : La tendance du shopping virtuel et l'émergence de la réalité augmentée dans le commerce en ligne permettent aux consommateurs d’essayer les produits de manière interactive avant de les acheter. Cette évolution nous pousse à adopter des technologies plus immersives et interactives pour mieux répondre à leurs attentes.",
			],
		},
		{
			id: "VP_RiskReducers",
			title: "Garantie et confiance",
			question:
				"Quelle est la garantie que vous proposez pour votre produit/service, en détaillant la durée et la couverture (réparations, remplacements, etc.), ainsi que votre politique de remboursement (conditions, période, procédures, exclusions) ?",
			examples: [
				"Garantie du produit/service : Nous proposons une garantie de 2 ans sur nos produits, couvrant les défauts de fabrication et les problèmes techniques. Si un produit tombe en panne, nous nous engageons à le réparer ou à le remplacer sans frais supplémentaires pour le client. Politique de remboursement : En cas de non-satisfaction dans les 30 jours suivant l'achat, le client peut demander un remboursement complet. Les produits doivent être retournés dans leur état d'origine, et les frais de retour sont à la charge du client, sauf en cas de défaut de fabrication.",
				"Garantie du produit/service : Nos services bénéficient d'une garantie de satisfaction de 60 jours. Si le client n’est pas satisfait de la prestation fournie, il peut demander un remboursement complet ou un service de remplacement à sa convenance. Politique de remboursement : Les remboursements sont traités dans un délai de 14 jours après réception de la demande. Cependant, cette politique de remboursement ne s'applique pas aux services déjà fournis ou aux achats effectués lors de promotions spéciales.",
				"Garantie du produit/service : Tous nos appareils électroniques sont garantis pour une période de 1 an à compter de la date d'achat. Cette garantie couvre les réparations en cas de panne matérielle et permet un remplacement en cas de défectuosité irréparable. Politique de remboursement : Nous offrons un remboursement complet pour les produits retournés dans les 30 jours suivant l'achat, à condition que les produits soient en parfait état, dans leur emballage d'origine et accompagnés de la preuve d'achat. Les produits ouverts ou utilisés ne sont pas remboursables, sauf si un défaut est constaté.",
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
			"Tâches fonctionnelles:** Accomplir une tâche spécifique ou résoudre un problème concret",
			"Besoins sociaux:** Gagner en prestige, en pouvoir ou en statut",
			"Besoins émotionnels:** Rechercher la sécurité ou le bien-être",
			"Tâches basiques:** Répondre à des besoins fondamentaux quotidiens",
			"Désirs personnels:** Atteindre des objectifs d'amélioration personnelle",
		],
	},
	pains: {
		title: "Problèmes",
		content:
			"Décrivez les mauvaises expériences, risques et obstacles que vos clients rencontrent avant, pendant et après l'accomplissement de leurs tâches.",
		examples: [
			"Obstacles:** Difficultés qui empêchent de commencer ou ralentissent une tâche",
			"Risques:** Résultats négatifs potentiels qui inquiètent les clients",
			"Frustrations:** Points de friction dans l'expérience actuelle",
			"Coûts cachés:** Dépenses inattendues ou temps perdu",
			"Problèmes récurrents:** Difficultés qui surviennent régulièrement",
		],
	},
	gains: {
		title: "Gains Attendus",
		content:
			"Identifiez les bénéfices que vos clients espèrent obtenir, qu'ils soient nécessaires, attendus, désirés ou inattendus.",
		examples: [
			"Gains fonctionnels:** Améliorations pratiques et mesurables",
			"Économies:** Gains de temps, d'argent ou d'efforts",
			"Avantages sociaux:** Amélioration de l'image ou du statut",
			"Émotions positives:** Satisfaction, confiance ou bien-être",
			"Aspirations:** Réalisation d'objectifs personnels ou professionnels",
		],
	},
	products: {
		title: "Produits & Services",
		content:
			"Listez tous les produits et services que votre proposition de valeur met à disposition des clients. Ce sont les offres tangibles qui aident vos clients à accomplir leurs tâches.",
		examples: [
			"Produits physiques:** Biens tangibles que les clients peuvent utiliser",
			"Services digitaux:** Solutions numériques et applications",
			"Services support:** Accompagnement, formation et assistance",
			"Fonctionnalités clés:** Caractéristiques principales de vos offres",
			"Packages complets:** Combinaisons de produits et services",
		],
	},
	painRelievers: {
		title: "Solutions aux Problèmes",
		content:
			"Décrivez précisément comment vos produits et services soulagent les problèmes spécifiques de vos clients. Montrez comment vous éliminez ou réduisez les émotions négatives, les situations indésirables ou les risques.",
		examples: [
			"Économies réalisées:** Réduction des coûts ou du temps investi",
			"Réduction des risques:** Solutions pour minimiser les problèmes potentiels",
			"Simplifications:** Amélioration de l'expérience utilisateur",
			"Solutions pratiques:** Résolution directe des problèmes concrets",
			"Support proactif:** Anticipation et prévention des difficultés",
		],
	},
	gainCreators: {
		title: "Créateurs de Gains",
		content:
			"Expliquez comment vos produits et services créent des bénéfices pour vos clients. Décrivez comment vous générez des résultats positifs et des avantages que vos clients attendent, désirent ou pourraient être surpris d'obtenir.",
		examples: [
			"Avantages uniques:** Bénéfices distinctifs de votre solution",
			"Performance optimisée:** Améliorations mesurables des résultats",
			"Expérience améliorée:** Satisfaction accrue des utilisateurs",
			"Innovation:** Nouvelles façons de répondre aux besoins",
			"Valeur ajoutée:** Bénéfices supplémentaires inattendus",
		],
	},
};
