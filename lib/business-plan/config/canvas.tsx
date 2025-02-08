//lib/business-plan/config/canvas.tsx
import { CanvasCategory } from "@/types/canvas";
import { QAData } from "@/types/shared/qa-section";
import { DetailedDescription } from "@/types/shared/card-modal";

export const CANVAS_COLORS = {
	keyPartners: "bg-purple-50 border-purple-200 hover:bg-purple-100",
	keyActivities: "bg-blue-50 border-blue-200 hover:bg-blue-100",
	keyResources: "bg-green-50 border-green-200 hover:bg-green-100",
	valueProposition: "bg-red-50 border-red-200 hover:bg-red-100",
	customerRelationships: "bg-orange-50 border-orange-200 hover:bg-orange-100",
	channels: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
	customerSegments: "bg-pink-50 border-pink-200 hover:bg-pink-100",
	costStructure: "bg-gray-50 border-gray-200 hover:bg-gray-100",
	revenueStreams: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
} as const;

export const CANVAS_HEADERS = {
	keyPartners: { title: "Partenaires clés", color: "text-purple-700" },
	keyActivities: { title: "Activités clés", color: "text-blue-700" },
	keyResources: { title: "Ressources clés", color: "text-green-700" },
	valueProposition: { title: "Proposition de valeur", color: "text-red-700" },
	customerRelationships: {
		title: "Relations clients",
		color: "text-orange-700",
	},
	channels: { title: "Canaux", color: "text-yellow-700" },
	customerSegments: { title: "Segments clients", color: "text-pink-700" },
	costStructure: { title: "Structure de coûts", color: "text-gray-700" },
	revenueStreams: { title: "Flux de revenus", color: "text-emerald-700" },
} as const;

export const CANVAS_DESCRIPTIONS = {
	keyPartners:
		"Les partenaires et fournisseurs clés sans lesquels le modèle d'affaires ne peut pas fonctionner.",
	keyActivities:
		"Les activités les plus importantes qu'une entreprise doit réaliser pour que son modèle d'affaires fonctionne.",
	keyResources:
		"Les actifs les plus importants requis pour que le modèle d'affaires fonctionne.",
	valueProposition:
		"L'ensemble des produits et services qui créent de la valeur pour un segment de clientèle spécifique.",
	customerRelationships:
		"Les types de relations qu'une entreprise établit avec ses segments de clientèle spécifiques.",
	channels:
		"Comment une entreprise communique avec ses segments de clientèle et les atteint pour leur apporter une proposition de valeur.",
	customerSegments:
		"Les différents groupes de personnes ou d'organisations qu'une entreprise vise à atteindre et à servir.",
	costStructure:
		"Tous les coûts encourus pour mettre en œuvre le modèle d'affaires.",
	revenueStreams:
		"L'argent qu'une entreprise génère auprès de chaque segment de clientèle.",
} as const;

export const CANVAS_QA_DATA: QAData = {
	sectionTitle: "Questions pour Approfondir Votre Business Model Canvas",
	categories: [
		{
			id: "PRODUITouSERVICE",
			title: "Ce que vous offrez concrètement",
			question:
				"Quel est le nom de votre {{PRODUITouSERVICE}} et comment ce nom reflète-t-il sa mission ou son objectif ?",
			examples: [
				"Le produit s'appelle EcoSmart. Ce nom reflète notre mission de proposer des solutions écologiques et intelligentes pour la maison, combinant technologie avancée et respect de l’environnement.",
				"Notre produit s'appelle FlexiFit. Ce nom est conçu pour transmettre l’idée de flexibilité et d’adaptabilité, en offrant des vêtements sportifs qui s'ajustent à tous les types de corps et besoins.",
				"Le produit s'appelle PureGlow. Il représente notre engagement à fournir des soins de la peau totalement naturels, mettant en avant l'idée de pureté et de beauté éclatante.",
			],
		},
		{
			id: "idée_globale",
			title: "Idée globale",
			question:
				"Quelle est l'idée globale de votre entreprise et quelle est sa mission principale ?",
			examples: [
				"L’idée globale de l'entreprise est de révolutionner l’industrie du nettoyage en offrant des produits 100% biodégradables. Nous souhaitons aider les consommateurs à rendre leur maison propre tout en respectant la planète.",
				"Notre mission est de rendre la mobilité urbaine plus accessible et plus durable en proposant des scooters électriques à prix abordable, pour les citadins soucieux de l'environnement.",
				"Nous sommes une entreprise dédiée à la création de vêtements de sport adaptés aux femmes, avec un focus sur la durabilité et l’ergonomie. Notre mission est d’offrir des produits de qualité qui soutiennent la performance tout en réduisant l’empreinte environnementale.",
			],
		},
		{
			id: "BMC_CompetitorAnalysis",
			title: "Positionnement des compétiteurs",
			question:
				"Comment vos concurrents se positionnent-ils sur le marché, et quelles sont leurs forces et leurs faiblesses en termes de modèle commercial et d'approche ?",
			examples: [
				"Un concurrent se distingue par sa stratégie de prix bas et sa distribution en masse, ce qui lui permet d’attirer une large clientèle. Cependant, cette approche compromet la qualité du service client. Nous devons nous différencier en offrant une expérience plus personnalisée et en créant des partenariats stratégiques avec des revendeurs premium.",
				"Un autre concurrent mise sur des produits de haute technologie et des innovations constantes, mais a des coûts de production élevés. Nous pourrions capitaliser sur une offre de produits moins coûteux tout en intégrant des technologies accessibles pour atteindre un marché plus large sans sacrifier la qualité.",
				"Un de nos concurrents a une forte présence en ligne avec une plateforme de commerce électronique bien optimisée. Cependant, il manque de services physiques. Nous pourrions combiner un site de vente en ligne performant avec une offre en magasin afin de répondre aux besoins des clients qui privilégient l’expérience physique.",
			],
		},
		{
			id: "BMC_MarketPositioning",
			title: "Positionnement au marché",
			question:
				"Comment positionnez-vous votre entreprise par rapport à vos concurrents sur le marché, et quelle est votre proposition de valeur unique pour attirer les clients ?",
			examples: [
				"Nous nous positionnons comme un fournisseur de produits écologiques et durables, une valeur ajoutée qui attire une clientèle soucieuse de l’environnement. Notre proposition de valeur unique réside dans le fait que tous nos produits sont certifiés 100% biodégradables, ce qui nous distingue de la concurrence axée sur des produits chimiques.",
				"Nous nous différencions en offrant une qualité supérieure à des prix compétitifs dans un segment de marché haut de gamme. Notre positionnement repose sur la personnalisation des produits et un service client exceptionnel, une approche que nos concurrents ne privilégient pas suffisamment.",
				"Nous avons choisi de nous positionner comme une marque premium en nous concentrant sur un marché de niche, avec des produits de luxe exclusifs et une expérience client ultra personnalisée. En comparaison, nos concurrents ciblent des segments plus larges, ce qui nous permet de capter une clientèle plus sélective.",
			],
		},		
		{
			id: "BMC_IdentificationFournisseurs",
			title: "Identification des fournisseurs clés",
			question:
				"Quels sont les critères qui vous ont poussé à choisir vos fournisseurs clés?(Prix, fiabilité, proximité, qualité, etc.)",
			examples: [
				"",
			],
		},
		{
			id: "BMC_ProduitCritiquestock",
			title: "Produits critiques dans les stocks",
			question:
				"Y a-t-il des produits critiques nécessitant une attention particulière en termes de stockage ou de livraison ?",
			examples: [
				"",
			],
		},
		{
			id: "BMC_PolitiquedeCredit",
			title: "Politique de crédit et de livraison des fournisseurs",
			question:
				"Quels sont les délais de paiement que vos fournisseurs vous accordent ? (30 jours, 60 jours, paiement à la commande, etc.). Offrent-ils des escomptes pour paiements anticipés ? Si oui, quels sont les pourcentages de réduction ? Comment sont gérés les frais de transport et les délais de livraison ? (Qui prend en charge les coûts ? Quel est le délai moyen de livraison ?). En cas de retard de paiement, quelles sont les pénalités appliquées par vos fournisseurs ?",
			examples: [
				"",
			],
		},
		{
			id: "BMC_AntécédentsetFiabilité",
			title: "Antécédents et fiabilité des fournisseurs",
			question:
				"Depuis combien de temps travaillez-vous avec ces fournisseurs ? Quelle est leur réputation dans l’industrie ? Ont-ils déjà eu des problèmes de fiabilité ou de qualité ? Avez-vous déjà rencontré des difficultés avec un fournisseur ? (Retards, problèmes de conformité, etc.)",
			examples: [
				"",
			],
		},
		{
			id: "BMC_RuptureApprovisionnement",
			title: "Gestion des risques liés aux ruptures d’approvisionnement",
			question:
				"Y a-t-il un risque de pénurie ou de rupture de stock pour certains produits ? Comment gérez-vous ces risques ? (Stock de sécurité, fournisseurs alternatifs, etc.) En cas de retard de livraison, quelles solutions avez-vous mises en place pour minimiser l’impact sur votre activité ?",
			examples: [
				"",
			],
		},
		{
			id: "BMC_VariationCoutsFournitures",
			title: "Gestion des variations de coût des fournitures",
			question:
				"Le coût des matières premières ou produits que vous achetez est-il sujet à des fluctuations ? Comment anticipez-vous ces variations de prix ? (Contrats à long terme, fournisseurs multiples, stock tampon, etc.) Prévoyez-vous d’indexer vos prix de vente en fonction des variations du coût d’approvisionnement ?",
			examples: [
				"",
			],
		},
		{
			id: "OP_Control_POS",
			title: "Procédures opérationnelles standard",
			question: "Quelles sont vos procédures opérationnelles standard (POS) pour assurer la qualité ?",
			examples: [
			"Nous avons mis en place un manuel de procédures détaillant chaque étape de production et les contrôles qualité à respecter.",
			"Nos équipes suivent des formations régulières pour garantir l'application des meilleures pratiques et la conformité aux normes en vigueur.",
			"Des audits internes sont réalisés périodiquement pour identifier et corriger toute déviation des standards établis."
			]
		},
		{
			id: "OP_Control_inspection",
			title: "Inspections et essais",
			question: "Comment allez-vous procéder pour l'inspection et les essais ?",
			examples: [
			"Nous effectuons des inspections systématiques à chaque étape de production afin d’identifier les défauts avant la mise sur le marché.",
			"Nous utilisons des protocoles de tests standardisés pour évaluer la performance et la conformité de nos produits.",
			"Des échantillons aléatoires sont soumis à des contrôles approfondis en laboratoire pour garantir leur qualité."
			]
		},
		{
			id: "OP_Control_retourInformation",
			title: "Retour d’informations et amélioration continue",
			question: "Comment allez-vous recueillir le retour d'information des clients et améliorer continuellement la qualité ?",
			examples: [
			"Nous mettons en place des enquêtes de satisfaction et recueillons les avis clients via nos canaux digitaux.",
			"Un service client dédié analyse les réclamations et suggestions afin d'identifier les points d'amélioration.",
			"Des réunions d’équipe régulières sont organisées pour adapter nos processus en fonction des retours clients et des tendances du marché."
			]
		},
		{
			id: "OP_localisation_restrictions",
			title: "Restrictions de localisation",
			question: "Existe-t-il des restrictions de zonage ou des règlements concernant votre emplacement ?",
			examples: [
			"Nous avons consulté les réglementations locales pour nous assurer de la conformité de notre activité avec les règles d’urbanisme.",
			"Des échanges avec les autorités compétentes et la municipalité ont été menés pour anticiper toute restriction potentielle.",
			"Une veille réglementaire est effectuée pour nous adapter rapidement à toute évolution des lois et règlements."
			]
		}
	],
};

export const CANVAS_MODAL_DETAILED_DESCRIPTIONS: Record<
	CanvasCategory,
	DetailedDescription
> = {
	keyPartners: {
		title: "Partenaires Clés",
		content:
			"Cette section est dédiée à l'identification des partenaires indispensables à la réussite de votre entreprise ou projet. Ces partenaires peuvent inclure des fournisseurs de matières premières, des partenaires stratégiques pour la distribution, ou encore des entreprises avec lesquelles vous collaborez pour mutualiser les ressources. Il est crucial de comprendre leur rôle et la valeur qu'ils apportent à vos opérations. Définissez également les types de partenariats (alliance stratégique, joint-venture, relation client-fournisseur) et les raisons pour lesquelles ces relations sont nécessaires pour atteindre vos objectifs. Sans ces partenaires, certaines parties de votre modèle commercial pourraient ne pas fonctionner.",
		examples: [
			"**Partenariat Local:** Une startup alimentaire qui s'associe avec des fermes locales pour garantir un approvisionnement constant en produits biologiques de saison, tout en réduisant les coûts logistiques",
			"**Partenariat Technologique:** Un fabricant de smartphones qui travaille avec une entreprise spécialisée dans les semi-conducteurs pour s'assurer un accès privilégié aux dernières technologies",
			"**Partenariat Éducatif:** Une plateforme de e-learning collaborant avec des universités réputées pour obtenir des certifications accréditées pour ses cours",
			"**Partenariat Marketing:** Un distributeur de vêtements de sport qui s'associe à une chaîne de salles de sport pour offrir des promotions croisées et des événements exclusifs",
			"**Partenariat Stratégique:** Un service de covoiturage qui s'allie avec des compagnies pétrolières pour proposer des réductions sur le carburant aux conducteurs partenaires",
		],
	},
	keyActivities: {
		title: "Activités Clés",
		content:
			"Les activités clés englobent les tâches essentielles qui doivent être réalisées pour assurer le fonctionnement de votre modèle d'affaires. Ces activités soutiennent directement la livraison de valeur à vos clients, la maintenance des relations avec vos partenaires et le maintien de vos flux de revenus. Elles peuvent inclure la production, la résolution de problèmes techniques complexes, la gestion des ressources humaines ou encore l'amélioration continue de vos produits et services.",
		examples: [
			"**Sécurité Données:** Une entreprise SaaS consacrant des ressources importantes à l'amélioration de la sécurité des données pour ses clients professionnels",
			"**Optimisation Logistique:** Une société de logistique qui optimise ses itinéraires de livraison pour réduire les coûts de carburant et améliorer les délais",
			"**R&D:** Un fabricant de voitures électriques investissant dans la recherche et le développement pour augmenter l'autonomie de ses batteries",
			"**Marketing Performance:** Une agence marketing qui organise des tests A/B sur ses campagnes publicitaires pour maximiser leur impact",
			"**Formation Excellence:** Une chaîne hôtelière développant un programme de formation interne pour standardiser l'excellence de son service à travers le monde",
		],
	},
	valueProposition: {
		title: "Proposition de Valeur",
		content:
			"Votre proposition de valeur est au cœur de votre modèle d'affaires. Elle décrit ce qui rend votre entreprise ou vos produits uniques, irrésistibles et particulièrement attrayants pour vos segments de clients. Cela peut inclure des bénéfices spécifiques, tels qu'une solution innovante à un problème majeur, une offre à un excellent rapport qualité-prix ou une expérience utilisateur exceptionnelle.",
		examples: [
			"**IA Financière:** Une application de gestion de finances personnelles qui utilise l'intelligence artificielle pour fournir des recommandations personnalisées, adaptées aux objectifs financiers individuels",
			"**Cosmétiques Durables:** Une gamme de produits cosmétiques 100 % naturels, respectueux de l'environnement et conçus pour les peaux sensibles, livrés dans des emballages rechargeables",
			"**Streaming Premium:** Un service de streaming qui permet de télécharger du contenu pour une visualisation hors ligne sans perte de qualité, idéal pour les voyageurs fréquents",
			"**Garantie Longue Durée:** Une entreprise d'électroménager qui offre une garantie de réparation gratuite pendant 10 ans, soulignant sa durabilité et son engagement écologique",
			"**Énergie Accessible:** Un fournisseur d'énergie renouvelable qui propose des solutions d'installation de panneaux solaires avec financement à taux zéro pour les ménages à revenus moyens",
		],
	},
	customerRelationships: {
		title: "Relations avec les Clients",
		content:
			"Les relations avec les clients définissent comment vous interagissez avec vos segments de clientèle, de l'acquisition initiale à la fidélisation à long terme. Une stratégie claire dans cette section permet de renforcer la satisfaction, d'augmenter la rétention et d'encourager le bouche-à-oreille.",
		examples: [
			"**Suivi Temps Réel:** Un service de livraison rapide qui envoie des notifications en temps réel sur l'état de la commande et suit la satisfaction après chaque livraison",
			"**Formation Gratuite:** Une entreprise de logiciel proposant un webinaire gratuit d'introduction pour aider les nouveaux utilisateurs à se familiariser avec ses fonctionnalités",
			"**Personnalisation:** Un détaillant de mode qui inclut une carte de remerciement manuscrite et un code de réduction personnalisé dans chaque commande en ligne",
			"**Programme Fidélité:** Un opérateur de télécommunications qui organise un programme de fidélité offrant des points échangeables contre des abonnements gratuits ou des cadeaux",
			"**Service Premium:** Une marque de voitures haut de gamme qui offre un accès à un concierge personnel pour planifier l'entretien du véhicule et d'autres services VIP",
		],
	},
	customerSegments: {
		title: "Segments de Clients",
		content:
			"Les segments de clients regroupent les différents groupes de personnes ou entreprises que votre entreprise cible et sert. Chacun de ces segments a des besoins spécifiques, des attentes particulières et des comportements uniques.",
		examples: [
			"**Professionnels Urbains:** Les jeunes professionnels urbains recherchant des services de coworking flexibles avec des espaces de networking et des conférences inspirantes",
			"**Familles Actives:** Les familles avec enfants intéressées par des activités de loisirs éducatives et abordables pendant les vacances scolaires",
			"**Entreprises Tech:** Les entreprises technologiques en pleine croissance ayant besoin de services cloud évolutifs et sécurisés pour gérer leurs données",
			"**Seniors Connectés:** Les seniors actifs qui privilégient des produits ergonomiques et simples d'utilisation, comme des téléphones avec des interfaces simplifiées",
			"**Étudiants:** Les étudiants universitaires cherchant des abonnements abordables à des services de streaming avec des avantages supplémentaires",
		],
	},
	keyResources: {
		title: "Ressources Clés",
		content:
			"Les ressources clés représentent les éléments fondamentaux nécessaires pour que votre entreprise fonctionne efficacement. Ces ressources peuvent être de nature physique, intellectuelle, humaine ou financière.",
		examples: [
			"**Équipement Spécialisé:** Un laboratoire doté d'équipements avancés pour une startup de biotechnologie",
			"**Propriété Intellectuelle:** Un brevet protégeant une technologie unique pour une entreprise d'électronique",
			"**Réseau Professionnel:** Un réseau de contacts influents pour une société de conseil en stratégie",
			"**Expertise Technique:** Des data scientists expérimentés pour une entreprise spécialisée dans l'intelligence artificielle",
			"**Base de Données:** Une base de données client enrichie pour des campagnes marketing ciblées et pertinentes",
		],
	},
	channels: {
		title: "Canaux",
		content:
			"Les canaux décrivent comment votre entreprise communique et interagit avec vos clients pour fournir vos propositions de valeur.",
		examples: [
			"**Support Mobile:** Un service client accessible via une application mobile et répondant aux requêtes en moins de 30 minutes",
			"**Marketing Digital:** Une stratégie de contenu sur les réseaux sociaux avec des vidéos éducatives et inspirantes, générant un fort engagement",
			"**Points de Vente:** Des kiosques interactifs dans des centres commerciaux pour présenter les produits et offrir des démonstrations en direct",
			"**Plateforme Web:** Une plateforme en ligne avec des recommandations de produits basées sur les préférences des utilisateurs",
			"**Service Terrain:** Un service d'assistance à domicile pour les produits nécessitant une installation technique",
		],
	},
	costStructure: {
		title: "Structure des Coûts",
		content:
			"La structure des coûts détaille toutes les dépenses nécessaires pour faire fonctionner votre entreprise.",
		examples: [
			"**Infrastructure IT:** Le développement d'une infrastructure cloud sécurisée pour une plateforme de streaming",
			"**Formation:** La formation continue des employés dans une entreprise axée sur l'innovation",
			"**Certifications:** Les investissements dans des certifications de qualité pour une marque alimentaire",
			"**Locaux:** La location de bureaux dans des zones urbaines stratégiques pour une agence de design",
			"**Marketing:** Les coûts publicitaires pour des campagnes multicanaux ciblées",
		],
	},
	revenueStreams: {
		title: "Flux de Revenus",
		content:
			"Les flux de revenus expliquent comment votre entreprise génère des revenus à partir de vos segments de clients.",
		examples: [
			"**Abonnements:** Une plateforme de musique qui propose des abonnements mensuels avec des options premium sans publicités",
			"**Collaborations:** Une marque de vêtements générant des revenus grâce à des collaborations exclusives avec des influenceurs",
			"**Micro-transactions:** Une entreprise de jeux vidéo qui tire profit des achats intégrés et des pass saisonniers",
			"**Certifications:** Un service de formation en ligne proposant des certifications payantes après la réussite des cours",
			"**Publicité:** Un site de e-commerce monétisant ses pages via des placements publicitaires pour des marques partenaires",
		],
	},
} as const;
