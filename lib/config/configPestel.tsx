// lib/config/configPestel.tsx

import { iconMapping } from "./iconMapping";
import { SectionConfig, DescriptionContent } from "./types";

/**
 * Configuration des sections pour PESTEL
 */
export const pestelSections: SectionConfig[] = [
	{
		id: "politique",
		title: "POLITIQUE",
		icon: iconMapping.bullhorn,
		gridRow: "1 / 6",
		gridColumn: "1 / 2",
		className: "section-politique",
		titleClass: "title-politique",
	},
	{
		id: "economique",
		title: "ÉCONOMIQUE",
		icon: iconMapping.moneyBill,
		gridRow: "1 / 6",
		gridColumn: "2 / 3",
		className: "section-economique",
		titleClass: "title-economique",
	},
	{
		id: "sociologique",
		title: "SOCIOLOGIQUE",
		icon: iconMapping.users,
		gridRow: "1 / 6",
		gridColumn: "3 / 4",
		className: "section-sociologique",
		titleClass: "title-sociologique",
	},
	{
		id: "technologique",
		title: "TECHNOLOGIQUE",
		icon: iconMapping.cogs,
		gridRow: "1 / 6",
		gridColumn: "4 / 5",
		className: "section-technologique",
		titleClass: "title-technologique",
	},
	{
		id: "ecologique",
		title: "ÉCOLOGIQUE",
		icon: iconMapping.leaf,
		gridRow: "1 / 6",
		gridColumn: "5 / 6",
		className: "section-ecologique",
		titleClass: "title-ecologique",
	},
	{
		id: "legal",
		title: "LÉGAL",
		icon: iconMapping.gavel,
		gridRow: "1 / 6",
		gridColumn: "6 / 7",
		className: "section-legal",
		titleClass: "title-legal",
	},
];

/**
 * Description détaillée pour chaque section PESTEL
 */
export const pestelDetailedDescriptions: Record<string, DescriptionContent> = {
	politique: {
		title: "Politique",
		sections: [
			{
				header: "À propos de la politique",
				content:
					"Les facteurs politiques englobent la stabilité gouvernementale, les politiques fiscales, ainsi que les changements législatifs et régulatoires. Ils influencent les décisions stratégiques d'une entreprise.",
			},
			{
				header: "Exemples",
				list: [
					"**Stabilité gouvernementale:** Les coups d'État fréquents dans un pays peuvent créer un climat d'instabilité qui décourage les investissements étrangers. Par exemple, les entreprises multinationales ont longtemps évité de s'implanter en Argentine en raison des crises politiques récurrentes.",
					"**Politiques fiscales:** La mise en place de taxes sur les produits importés peut rendre les produits nationaux plus compétitifs sur le marché intérieur, mais elle peut également déclencher des guerres commerciales avec les pays partenaires. C'est ce qui s'est produit lors de la guerre commerciale entre les États-Unis et la Chine.",
					"**Réglementation environnementale:** Le renforcement des normes environnementales peut obliger les entreprises à investir dans des technologies plus propres et à modifier leurs processus de production. Par exemple, les industries automobiles ont dû s'adapter aux normes Euro pour réduire les émissions polluantes de leurs véhicules.",
					"**Protectionnisme:** Les politiques protectionnistes, comme les quotas d'importation ou les droits de douane, peuvent limiter l'accès des entreprises étrangères à un marché. Cela a été le cas pour les entreprises technologiques américaines en Chine, qui ont vu leurs activités restreintes par le gouvernement chinois.",
				],
			},
			// Ajoutez d'autres sections si nécessaire
		],
	},
	économique: {
		title: "Économique",
		sections: [
			{
				header: "À propos de l'économique",
				content:
					"Les facteurs économiques incluent le taux de croissance, l'inflation, les taux d'intérêt et d'autres variables qui influencent la santé globale de l'économie et des entreprises.",
			},
			{
				header: "Exemples",
				list: [
					"**Taux de change:** La dépréciation d'une monnaie peut rendre les exportations d'un pays plus compétitives, mais elle peut également augmenter le coût des importations. Par exemple, la faiblesse de l'euro a favorisé les exportations de l'industrie automobile allemande.",
					"**Croissance économique:** Une forte croissance économique peut stimuler la demande pour les produits et services d'une entreprise. En revanche, une récession peut entraîner une baisse des ventes et des profits. La crise financière de 2008 a eu un impact dévastateur sur de nombreuses entreprises à travers le monde.",
					"**Inflation:** Une inflation élevée peut éroder le pouvoir d'achat des consommateurs, tandis qu'une inflation maîtrisée est bénéfique pour la croissance économique. Par exemple, dans les années 1970, de nombreuses économies ont souffert de la stagflation.",
					"**Chômage:** Un taux de chômage élevé peut réduire la demande pour certains produits, mais il peut également permettre aux entreprises de réduire leurs coûts de main-d'œuvre. La crise COVID-19 a entraîné une hausse spectaculaire du chômage dans de nombreux pays.",
				],
			},
			// Ajoutez d'autres sections si nécessaire
		],
	},
	sociologique: {
		title: "Sociologique",
		sections: [
			{
				header: "À propos du sociologique",
				content:
					"Les facteurs sociologiques concernent les changements dans les comportements, les attitudes et les attentes des consommateurs, influencés par des tendances sociales et démographiques.",
			},
			{
				header: "Exemples",
				list: [
					"**Changements démographiques:** Le vieillissement de la population dans les pays développés crée de nouvelles opportunités pour les entreprises du secteur de la santé et des services aux personnes âgées. En revanche, le déclin de la natalité peut réduire la demande pour certains produits, comme les jouets pour enfants.",
					"**Tendances de consommation:** L'augmentation de la demande pour des produits biologiques et éthiques reflète une tendance sociétale vers une consommation plus responsable. Par exemple, de nombreuses marques alimentaires se concentrent désormais sur le bio.",
					"**Diversité culturelle:** La prise en compte de la diversité culturelle dans les campagnes de marketing permet aux entreprises de s'adresser efficacement à des publics variés. Par exemple, McDonald's adapte ses menus selon les goûts locaux.",
					"**Urbanisation:** L'urbanisation croissante a favorisé le développement des services de livraison à domicile et des logements intelligents. Par exemple, des entreprises comme Amazon et Uber Eats ont tiré profit de cette tendance.",
				],
			},
			// Ajoutez d'autres sections si nécessaire
		],
	},
	technologique: {
		title: "Technologique",
		sections: [
			{
				header: "À propos du technologique",
				content:
					"Les facteurs technologiques comprennent l'innovation, l'automatisation et l'adoption de nouvelles technologies, qui transforment les secteurs d'activité.",
			},
			{
				header: "Exemples",
				list: [
					"**Intelligence artificielle:** L'IA transforme de nombreux secteurs d'activité, en automatisant les tâches et en créant de nouveaux produits et services. Par exemple, les chatbots sont de plus en plus utilisés pour le service client.",
					"**Internet des objets (IoT):** L'IoT permet la connexion de millions d'appareils, facilitant la collecte de données en temps réel. Par exemple, les maisons connectées utilisent des dispositifs IoT pour optimiser la consommation d'énergie.",
					"**Blockchain:** Cette technologie est utilisée pour sécuriser les transactions et améliorer la traçabilité. Par exemple, les entreprises de la chaîne d'approvisionnement utilisent la blockchain pour suivre les produits de la source au consommateur.",
					"**Technologies vertes:** L'essor des technologies propres, comme les panneaux solaires et les véhicules électriques, reflète l'évolution vers des solutions plus durables. Tesla a été un pionnier dans ce domaine.",
				],
			},
			// Ajoutez d'autres sections si nécessaire
		],
	},
	ecologique: {
		title: "Écologique",
		sections: [
			{
				header: "À propos de l'écologique",
				content:
					"Les facteurs écologiques incluent les préoccupations environnementales telles que le changement climatique, la réglementation écologique et la durabilité.",
			},
			{
				header: "Exemples",
				list: [
					"**Changement climatique:** Les événements climatiques extrêmes, comme les sécheresses et les inondations, peuvent perturber les chaînes d'approvisionnement et entraîner des pertes financières importantes pour les entreprises. Par exemple, l'industrie agricole est particulièrement vulnérable aux changements climatiques.",
					"**Réglementation environnementale:** Les réglementations strictes, comme celles concernant les émissions de carbone, incitent les entreprises à réduire leur empreinte écologique. Par exemple, les fabricants automobiles adoptent des moteurs électriques pour respecter les normes environnementales.",
					"**Économie circulaire:** L'approche visant à réduire les déchets et à réutiliser les ressources gagne en popularité. Par exemple, IKEA s'engage à utiliser des matériaux recyclés dans ses produits.",
					"**Responsabilité environnementale:** Les entreprises sont de plus en plus tenues responsables de leur impact sur l'environnement. Par exemple, BP a investi massivement dans les énergies renouvelables après des scandales environnementaux.",
				],
			},
			// Ajoutez d'autres sections si nécessaire
		],
	},
	legal: {
		title: "Légal",
		sections: [
			{
				header: "À propos du légal",
				content:
					"Les facteurs légaux concernent les lois et régulations qui encadrent les activités des entreprises, influençant leurs opérations et leur conformité.",
			},
			{
				header: "Exemples",
				list: [
					"**Protection des données personnelles:** Le Règlement Général sur la Protection des Données (RGPD) a imposé de nouvelles obligations aux entreprises en matière de collecte et de traitement des données personnelles. Les entreprises qui ne respectent pas ces obligations s'exposent à des sanctions financières importantes.",
					"**Droit de la concurrence:** Les lois antitrust empêchent les entreprises de former des monopoles ou des cartels. Par exemple, l'Union européenne a infligé de lourdes amendes à Google pour abus de position dominante.",
					"**Propriété intellectuelle:** Les entreprises doivent protéger leurs innovations à travers des brevets. Par exemple, Apple et Samsung se livrent régulièrement des batailles juridiques sur les brevets.",
					"**Normes du travail:** Les lois sur le salaire minimum et la sécurité des employés influencent les pratiques des entreprises. Par exemple, Amazon a été critiqué pour les conditions de travail dans ses entrepôts.",
				],
			},
			// Ajoutez d'autres sections si nécessaire
		],
	},
};
