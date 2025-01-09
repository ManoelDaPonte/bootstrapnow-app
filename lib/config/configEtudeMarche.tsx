// lib/config/configEtudeMarche.tsx

import { iconMapping } from "./iconMapping";
import { SectionConfig, DescriptionContent } from "./types";

/**
 * Configuration des sections Étude de Marché (icônes, titres, etc.)
 */
export const etudeMarcheSections: SectionConfig[] = [
	{
		id: "key-partnerships",
		title: "Partenaires Clés",
		icon: iconMapping.handshake,
	},
	{ id: "key-activities", title: "Activités Clés", icon: iconMapping.tasks },
	{
		id: "value-propositions",
		title: "Proposition de Valeur",
		icon: iconMapping.gift,
	},
	{
		id: "customer-relationships",
		title: "Relations Clients",
		icon: iconMapping.users,
	},
	{
		id: "customer-segments",
		title: "Segments de Clients",
		icon: iconMapping.userFriends,
	},
	{ id: "key-resources", title: "Ressources Clés", icon: iconMapping.cogs },
	{ id: "channels", title: "Canaux", icon: iconMapping.shippingFast },
	{
		id: "cost-structure",
		title: "Structure des Coûts",
		icon: iconMapping.moneyBill,
	},
	{
		id: "revenue-streams",
		title: "Flux de Revenus",
		icon: iconMapping.chartLine,
	},
];

/**
 * Description courte pour l'infobulle (tooltip) au survol
 */
export const etudeMarcheShortDescriptions: Record<string, string> = {
	"key-partnerships":
		"Les partenariats clés nécessaires pour le bon fonctionnement de l'entreprise.",
	"key-activities":
		"Les activités principales que l'entreprise doit accomplir pour livrer de la valeur.",
	"value-propositions":
		"Les propositions de valeur pour les clients, ce qui rend l'entreprise attractive.",
	"customer-relationships":
		"Les stratégies pour gérer les relations avec les clients.",
	"customer-segments": "Les segments de clients que l'entreprise cible.",
	"key-resources":
		"Les ressources clés nécessaires pour faire fonctionner l'entreprise.",
	channels: "Les canaux de distribution utilisés pour atteindre les clients.",
	"cost-structure":
		"La structure des coûts associés aux opérations de l'entreprise.",
	"revenue-streams": "Les flux de revenus générés par l'entreprise.",
};

/**
 * Description détaillée pour chaque section (affichée dans la modale)
 */
export const etudeMarcheDetailedDescriptions: Record<
	string,
	DescriptionContent
> = {
	"key-partnerships": {
		title: "Partenaires Clés",
		sections: [
			{
				header: "À propos des Partenaires Clés",
				content:
					"Cette section est dédiée à l'identification des partenaires indispensables à la réussite de votre entreprise ou projet. Ces partenaires peuvent inclure des fournisseurs de matières premières, des partenaires stratégiques pour la distribution, ou encore des entreprises avec lesquelles vous collaborez pour mutualiser les ressources. Il est crucial de comprendre leur rôle et la valeur qu'ils apportent à vos opérations. Définissez également les types de partenariats (alliance stratégique, joint-venture, relation client-fournisseur) et les raisons pour lesquelles ces relations sont nécessaires pour atteindre vos objectifs. Sans ces partenaires, certaines parties de votre modèle commercial pourraient ne pas fonctionner.",
			},
			{
				header: "Exemples",
				list: [
					"Une startup alimentaire qui s'associe avec des fermes locales pour garantir un approvisionnement constant en produits biologiques de saison, tout en réduisant les coûts logistiques.",
					"Un fabricant de smartphones qui travaille avec une entreprise spécialisée dans les semi-conducteurs pour s'assurer un accès privilégié aux dernières technologies.",
					"Une plateforme de e-learning collaborant avec des universités réputées pour obtenir des certifications accréditées pour ses cours.",
					"Un distributeur de vêtements de sport qui s'associe à une chaîne de salles de sport pour offrir des promotions croisées et des événements exclusifs.",
					"Un service de covoiturage qui s'allie avec des compagnies pétrolières pour proposer des réductions sur le carburant aux conducteurs partenaires.",
				],
			},
		],
	},
	"key-activities": {
		title: "Activités Clés",
		sections: [
			{
				header: "À propos des Activités Clés",
				content:
					"Les activités clés englobent les tâches essentielles qui doivent être réalisées pour assurer le fonctionnement de votre modèle d'affaires. Ces activités soutiennent directement la livraison de valeur à vos clients, la maintenance des relations avec vos partenaires et le maintien de vos flux de revenus. Elles peuvent inclure la production, la résolution de problèmes techniques complexes, la gestion des ressources humaines ou encore l'amélioration continue de vos produits et services.",
			},
			{
				header: "Exemples",
				list: [
					"Une entreprise SaaS consacrant des ressources importantes à l'amélioration de la sécurité des données pour ses clients professionnels.",
					"Une société de logistique qui optimise ses itinéraires de livraison pour réduire les coûts de carburant et améliorer les délais.",
					"Un fabricant de voitures électriques investissant dans la recherche et le développement pour augmenter l'autonomie de ses batteries.",
					"Une agence marketing qui organise des tests A/B sur ses campagnes publicitaires pour maximiser leur impact.",
					"Une chaîne hôtelière développant un programme de formation interne pour standardiser l'excellence de son service à travers le monde.",
				],
			},
		],
	},
	"value-propositions": {
		title: "Proposition de Valeur",
		sections: [
			{
				header: "À propos de la Proposition de Valeur",
				content:
					"Votre proposition de valeur est au cœur de votre modèle d'affaires. Elle décrit ce qui rend votre entreprise ou vos produits uniques, irrésistibles et particulièrement attrayants pour vos segments de clients. Cela peut inclure des bénéfices spécifiques, tels qu'une solution innovante à un problème majeur, une offre à un excellent rapport qualité-prix ou une expérience utilisateur exceptionnelle.",
			},
			{
				header: "Exemples",
				list: [
					"Une application de gestion de finances personnelles qui utilise l'intelligence artificielle pour fournir des recommandations personnalisées, adaptées aux objectifs financiers individuels.",
					"Une gamme de produits cosmétiques 100 % naturels, respectueux de l'environnement et conçus pour les peaux sensibles, livrés dans des emballages rechargeables.",
					"Un service de streaming qui permet de télécharger du contenu pour une visualisation hors ligne sans perte de qualité, idéal pour les voyageurs fréquents.",
					"Une entreprise d'électroménager qui offre une garantie de réparation gratuite pendant 10 ans, soulignant sa durabilité et son engagement écologique.",
					"Un fournisseur d'énergie renouvelable qui propose des solutions d'installation de panneaux solaires avec financement à taux zéro pour les ménages à revenus moyens.",
				],
			},
		],
	},
	"customer-relationships": {
		title: "Relations avec les Clients",
		sections: [
			{
				header: "À propos des Relations avec les Clients",
				content:
					"Les relations avec les clients définissent comment vous interagissez avec vos segments de clientèle, de l'acquisition initiale à la fidélisation à long terme. Une stratégie claire dans cette section permet de renforcer la satisfaction, d'augmenter la rétention et d'encourager le bouche-à-oreille.",
			},
			{
				header: "Exemples",
				list: [
					"Un service de livraison rapide qui envoie des notifications en temps réel sur l'état de la commande et suit la satisfaction après chaque livraison.",
					"Une entreprise de logiciel proposant un webinaire gratuit d'introduction pour aider les nouveaux utilisateurs à se familiariser avec ses fonctionnalités.",
					"Un détaillant de mode qui inclut une carte de remerciement manuscrite et un code de réduction personnalisé dans chaque commande en ligne.",
					"Un opérateur de télécommunications qui organise un programme de fidélité offrant des points échangeables contre des abonnements gratuits ou des cadeaux.",
					"Une marque de voitures haut de gamme qui offre un accès à un concierge personnel pour planifier l'entretien du véhicule et d'autres services VIP.",
				],
			},
		],
	},
	"customer-segments": {
		title: "Segments de Clients",
		sections: [
			{
				header: "À propos des Segments de Clients",
				content:
					"Les segments de clients regroupent les différents groupes de personnes ou entreprises que votre entreprise cible et sert. Chacun de ces segments a des besoins spécifiques, des attentes particulières et des comportements uniques.",
			},
			{
				header: "Exemples",
				list: [
					"Les jeunes professionnels urbains recherchant des services de coworking flexibles avec des espaces de networking et des conférences inspirantes.",
					"Les familles avec enfants intéressées par des activités de loisirs éducatives et abordables pendant les vacances scolaires.",
					"Les entreprises technologiques en pleine croissance ayant besoin de services cloud évolutifs et sécurisés pour gérer leurs données.",
					"Les seniors actifs qui privilégient des produits ergonomiques et simples d'utilisation, comme des téléphones avec des interfaces simplifiées.",
					"Les étudiants universitaires cherchant des abonnements abordables à des services de streaming avec des avantages supplémentaires, comme des réductions sur les livres électroniques.",
				],
			},
		],
	},
	"key-resources": {
		title: "Ressources Clés",
		sections: [
			{
				header: "À propos des Ressources Clés",
				content:
					"Les ressources clés représentent les éléments fondamentaux nécessaires pour que votre entreprise fonctionne efficacement. Ces ressources peuvent être de nature physique, intellectuelle, humaine ou financière.",
			},
			{
				header: "Exemples",
				list: [
					"Un laboratoire doté d'équipements avancés pour une startup de biotechnologie.",
					"Un brevet protégeant une technologie unique pour une entreprise d'électronique.",
					"Un réseau de contacts influents pour une société de conseil en stratégie.",
					"Des data scientists expérimentés pour une entreprise spécialisée dans l'intelligence artificielle.",
					"Une base de données client enrichie pour des campagnes marketing ciblées et pertinentes.",
				],
			},
		],
	},
	channels: {
		title: "Canaux",
		sections: [
			{
				header: "À propos des Canaux",
				content:
					"Les canaux décrivent comment votre entreprise communique et interagit avec vos clients pour fournir vos propositions de valeur.",
			},
			{
				header: "Exemples",
				list: [
					"Un service client accessible via une application mobile et répondant aux requêtes en moins de 30 minutes.",
					"Une stratégie de contenu sur les réseaux sociaux avec des vidéos éducatives et inspirantes, générant un fort engagement.",
					"Des kiosques interactifs dans des centres commerciaux pour présenter les produits et offrir des démonstrations en direct.",
					"Une plateforme en ligne avec des recommandations de produits basées sur les préférences des utilisateurs.",
					"Un service d'assistance à domicile pour les produits nécessitant une installation technique, comme des panneaux solaires ou des systèmes de sécurité.",
				],
			},
		],
	},
	"cost-structure": {
		title: "Structure des Coûts",
		sections: [
			{
				header: "À propos de la Structure des Coûts",
				content:
					"La structure des coûts détaille toutes les dépenses nécessaires pour faire fonctionner votre entreprise.",
			},
			{
				header: "Exemples",
				list: [
					"Le développement d'une infrastructure cloud sécurisée pour une plateforme de streaming.",
					"La formation continue des employés dans une entreprise axée sur l'innovation.",
					"Les investissements dans des certifications de qualité pour une marque alimentaire.",
					"La location de bureaux dans des zones urbaines stratégiques pour une agence de design.",
					"Les coûts publicitaires pour des campagnes multicanaux ciblées.",
				],
			},
		],
	},
	"revenue-streams": {
		title: "Flux de Revenus",
		sections: [
			{
				header: "À propos des Flux de Revenus",
				content:
					"Les flux de revenus expliquent comment votre entreprise génère des revenus à partir de vos segments de clients.",
			},
			{
				header: "Exemples",
				list: [
					"Une plateforme de musique qui propose des abonnements mensuels avec des options premium sans publicités.",
					"Une marque de vêtements générant des revenus grâce à des collaborations exclusives avec des influenceurs.",
					"Une entreprise de jeux vidéo qui tire profit des achats intégrés et des pass saisonniers.",
					"Un service de formation en ligne proposant des certifications payantes après la réussite des cours.",
					"Un site de e-commerce monétisant ses pages via des placements publicitaires pour des marques partenaires.",
				],
			},
		],
	},
};
