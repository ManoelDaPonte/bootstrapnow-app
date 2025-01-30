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
			id: "value-proposition-validation",
			title: "Validation de la Proposition de Valeur",
			question:
				"Comment avez-vous validé que votre proposition de valeur répond réellement aux besoins de vos segments de clientèle ?",
			examples: [
				"Études de marché et enquêtes auprès des clients potentiels",
				"Tests utilisateurs et prototypes validés",
				"Retours des premiers clients sur la solution proposée",
			],
		},
		{
			id: "revenue-model",
			title: "Modèle de Revenus",
			question:
				"Comment votre modèle de revenus s'aligne-t-il avec la valeur fournie à vos clients ?",
			examples: [
				"Structure de prix basée sur la valeur perçue par le client",
				"Différents flux de revenus complémentaires",
				"Modèle d'abonnement avec différents niveaux de service",
			],
		},
		{
			id: "key-resources-optimization",
			title: "Optimisation des Ressources Clés",
			question:
				"Comment optimisez-vous l'utilisation de vos ressources clés pour maximiser leur efficacité ?",
			examples: [
				"Système de gestion des ressources intégré",
				"Formation continue des équipes",
				"Investissements stratégiques dans les technologies clés",
			],
		},
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
