//lib/business-plan/config/pestel.tsx
import { PestelCategory } from "@/types/pestel";
import { QAData } from "@/types/shared/qa-section";
import { DetailedDescription } from "@/types/shared/card-modal";

export const PESTEL_SECTION_ORDER: PestelCategory[] = [
	"political",
	"economic",
	"social",
	"technological",
	"environmental",
	"legal",
];

export const PESTEL_DESCRIPTIONS = {
	political:
		"Facteurs liés aux politiques gouvernementales et à la réglementation.",
	economic: "Variables économiques qui peuvent influencer votre marché.",
	social: "Tendances sociales et démographiques affectant votre activité.",
	technological:
		"Innovations et changements technologiques impactant votre secteur.",
	environmental: "Considérations environnementales et écologiques.",
	legal: "Cadre juridique et conformité réglementaire.",
};

export const PESTEL_HEADERS = {
	political: { title: "Politique", color: "text-purple-700" },
	economic: { title: "Économique", color: "text-emerald-700" },
	social: { title: "Social", color: "text-blue-700" },
	technological: { title: "Technologique", color: "text-orange-700" },
	environmental: { title: "Environnemental", color: "text-green-700" },
	legal: { title: "Légal", color: "text-red-700" },
};

export const PESTEL_COLORS = {
	political: "bg-purple-50 border-purple-200 hover:bg-purple-100",
	economic: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
	social: "bg-blue-50 border-blue-200 hover:bg-blue-100",
	technological: "bg-orange-50 border-orange-200 hover:bg-orange-100",
	environmental: "bg-green-50 border-green-200 hover:bg-green-100",
	legal: "bg-red-50 border-red-200 hover:bg-red-100",
};

export const PESTEL_QA_DATA: QAData = {
	sectionTitle: "Questions pour Approfondir Votre Analyse PESTEL",
	categories: [
		{
			id: "PESTEL_Opportunities",
			title: "Opportunités et diversification",
			question:
				"Quelles sont les opportunités d'expansion ou de diversification que vous pouvez exploiter dans votre secteur, et comment peuvent-elles influencer la croissance de votre entreprise ?",
			examples: [
				"Nous avons identifié une forte demande pour des produits écologiques dans notre secteur. Cette tendance nous offre une opportunité de diversifier notre offre et de capter un nouveau segment de clients soucieux de l'environnement.",
				"La digitalisation de notre industrie offre des opportunités d'expansion à l’international. Nous envisageons de développer une plateforme e-commerce pour atteindre des clients à l'échelle mondiale, ce qui pourrait tripler notre volume de ventes dans les 5 prochaines années.",
				"Une opportunité intéressante réside dans la réglementation accrue favorisant les entreprises locales. En développant des partenariats avec des acteurs régionaux, nous pourrions obtenir des avantages fiscaux et des subventions qui réduiraient nos coûts d'exploitation.",
			],
		},
		{
			id: "PESTEL_Threats",
			title: "Risques externes",
			question:
				"Quels sont les risques externes, notamment en termes de régulations ou de concurrents émergents, qui pourraient impacter négativement la croissance de votre entreprise ?",
			examples: [
				"Une nouvelle réglementation environnementale qui impose des normes strictes pourrait augmenter considérablement nos coûts de production, réduisant ainsi nos marges bénéficiaires.",
				"L'entrée de nouveaux concurrents disposant de ressources technologiques avancées pourrait nous contraindre à ajuster nos prix de manière agressive, ce qui affecterait notre rentabilité.",
				"Les tensions commerciales internationales peuvent entraîner des hausses de coûts sur les matériaux importés. Une augmentation des droits de douane pourrait rendre nos produits moins compétitifs sur le marché international.",
			],
		},
		{
			id: "PESTEL_SocialTrends",
			title: "Tendances sociétales",
			question:
				"Comment les changements dans les comportements sociaux et les attentes des consommateurs influencent-ils votre stratégie marketing et vos produits ?",
			examples: [
				"Les consommateurs sont de plus en plus préoccupés par les questions de santé, ce qui a poussé notre entreprise à développer des produits alimentaires plus sains et écoresponsables, en ligne avec cette tendance sociale.",
				"La montée en puissance du télétravail a modifié les attentes en matière de services de gestion à distance. Cela a conduit notre entreprise à offrir des solutions de productivité adaptées à ce nouveau mode de travail.",
				"Les jeunes générations privilégient la transparence des entreprises en matière de pratiques commerciales éthiques. Nous avons adapté notre communication pour mettre en avant nos actions en matière de responsabilité sociale des entreprises (RSE).",
			],
		},
		{
			id: "PESTEL_IndustryTrends",
			title: "Tendances du secteur",
			question:
				"Comment les évolutions récentes dans votre secteur influencent-elles la demande pour vos produits/services et quelles sont les principales tendances à surveiller ?",
			examples: [
				"L'industrie de la mode connaît un virage vers la mode durable, avec une demande croissante pour des produits écoresponsables. Nous avons lancé une nouvelle ligne de vêtements fabriqués à partir de matériaux recyclés afin de répondre à cette tendance.",
				"L'essor du commerce en ligne et des ventes sur mobile a radicalement transformé notre secteur. Nous avons mis en place une stratégie omnicanal pour capter cette évolution des comportements d'achat.",
				"Dans notre secteur de la technologie, l'intelligence artificielle devient un élément clé. Nous surveillons cette tendance et avons commencé à intégrer des solutions basées sur l'IA dans notre offre pour répondre aux attentes futures du marché.",
			],
		},
		{
			id: "PESTEL_Competitive",
			title: "Se différencer de la concurrence",
			question:
				"Comment l'intensité de la concurrence dans votre secteur évolue-t-elle et comment envisagez-vous de vous différencier ?",
			examples: [
				"La concurrence dans notre secteur est de plus en plus féroce, notamment avec les nouvelles marques en ligne. Nous avons décidé de nous différencier par la qualité supérieure de notre service après-vente, en offrant un support client disponible 24/7.",
				"La consolidation des acteurs majeurs du marché crée des barrières à l'entrée pour les petites entreprises. Pour faire face, nous misons sur l'innovation continue et la personnalisation de nos produits pour capter une niche spécifique.",
				"La concurrence se concentre sur des prix très bas, ce qui pourrait réduire nos parts de marché. Pour contrer cela, nous proposons des fonctionnalités exclusives que nos concurrents ne possèdent pas, et offrons une garantie étendue sur nos produits.",
			],
		},
		{
			id: "PESTEL_GeographicalTrends",
			title: "Tendances géographiques",
			question:
				"Quelles sont les tendances géographiques qui influencent actuellement votre marché et comment en tirer parti ?",
			examples: [
				"Une forte urbanisation dans certaines régions crée une demande accrue pour des produits technologiques portables. Nous avons lancé une gamme de produits spécialement conçus pour les citadins en déplacement.",
				"Les marchés émergents en Asie offrent des perspectives de croissance intéressantes pour notre entreprise. Nous envisageons de renforcer notre présence en Asie avec des partenariats locaux pour maximiser notre influence régionale.",
				"La montée du tourisme dans certaines régions côtières a créé une demande pour des produits spécifiques adaptés aux touristes. Nous avons ouvert de nouveaux points de vente dans ces zones géographiques pour capter cette clientèle.",
			],
		},
		{
			id: "PESTEL_Infrastructures",
			title: "Infrastructures locales",
			question:
				"Comment les développements dans les infrastructures locales et globales peuvent-ils influencer votre stratégie d'expansion ?",
			examples: [
				"Les améliorations dans les infrastructures de transport en Europe facilitent la distribution de nos produits. Nous prévoyons d'ouvrir de nouveaux centres de distribution pour réduire les délais de livraison dans ces régions.",
				"L'augmentation des investissements dans les infrastructures numériques dans les pays en développement nous ouvre de nouvelles opportunités pour vendre nos solutions de logiciels dans ces régions.",
				"Le développement d'infrastructures de recharge pour véhicules électriques dans les grandes villes offre une opportunité pour notre entreprise, car nous fabriquons des bornes de recharge. Nous visons à accroître notre présence sur ces marchés à forte demande.",
			],
		},
		{
			id: "OP_Legal_licenses",
			title: "Licences et permis",
			question: "Précisez si vous avez déjà obtenu des licences ou permis, ou si des démarches sont en cours.",
			examples: [
			"Nous avons déjà obtenu toutes les licences et permis nécessaires pour exercer notre activité en conformité avec la législation locale.",
			"Nous sommes en cours de demande de plusieurs licences essentielles pour notre exploitation, et nous suivons attentivement leur avancement.",
			"Nous avons consulté des experts juridiques afin d’identifier toutes les autorisations nécessaires et nous finalisons actuellement les démarches administratives."
			]
		},
		{
			id: "OP_Legal_officialbrand",
			title: "Marques, brevets et droits d’auteur",
			question: "Avez-vous des marques déposées, des droits d'auteur ou des brevets, ou êtes-vous en train de les demander ?",
			examples: [
			"Notre marque est déposée auprès de l’INPI afin de protéger notre identité et nos produits.",
			"Nous avons entamé les démarches pour déposer plusieurs brevets relatifs à nos innovations technologiques.",
			"Nous disposons de droits d’auteur sur nos contenus et nous envisageons de renforcer notre protection juridique avec de nouveaux dépôts."
			]
		},
		{
			id: "OP_Legal_warranty",
			title: "Assurances et garanties",
			question: "Quelle couverture d'assurance votre entreprise nécessite-t-elle et quel en est le coût ?",
			examples: [
			"Nous avons souscrit une assurance responsabilité civile professionnelle pour couvrir d’éventuels dommages causés à des tiers.",
			"Notre entreprise nécessite une assurance multirisque professionnelle, dont le coût est estimé à 2 500 € par an.",
			"Nous avons évalué nos risques et avons souscrit à une couverture spécifique pour protéger nos actifs et nos employés."
			]
		},
		{
			id: "OP_Legal_environmentalregulations",
			title: "Régulations environnementales et sanitaires",
			question: "Quelles régulations environnementales, sanitaires ou relatives aux conditions de travail affectent votre entreprise ?",
			examples: [
			"Notre activité est soumise à des normes strictes de recyclage et de gestion des déchets afin de minimiser notre impact environnemental.",
			"Nous respectons les réglementations sanitaires en vigueur, notamment en ce qui concerne l’hygiène et la sécurité alimentaire.",
			"Nous avons mis en place un programme de conformité aux normes de santé et sécurité au travail pour garantir un environnement sûr pour nos employés."
			]
		},
		{
			id: "OP_Legal_particularregulations",
			title: "Régulations spécifiques au secteur",
			question: "Quelles sont les régulations particulières affectant le secteur d'activité ?",
			examples: [
			"Notre secteur étant réglementé, nous devons nous conformer aux normes ISO pour garantir la qualité et la sécurité de nos produits.",
			"Nous suivons les directives européennes sur la fabrication et la distribution de nos produits pour assurer notre conformité.",
			"Nous avons intégré toutes les obligations légales spécifiques à notre secteur dans notre processus de gestion et de production."
			]
		},
		{
			id: "OP_Legal_cautions",
			title: "Exigences de cautionnement",
			question: "L'entreprise doit-elle remplir des exigences de cautionnement ? Si oui, explique-les.",
			examples: [
			"Nous avons dû fournir une caution bancaire pour garantir le respect de nos engagements contractuels avec nos fournisseurs.",
			"Notre activité exige un cautionnement obligatoire pour opérer légalement, ce qui représente un coût initial de 10 000 €.",
			"Nous avons étudié les exigences de cautionnement et avons souscrit à une garantie financière afin d’assurer la pérennité de notre entreprise."
			]
		},
	],
};

export const PESTEL_MODAL_DETAILED_DESCRIPTIONS: Record<
	PestelCategory,
	DetailedDescription
> = {
	political: {
		title: "Facteurs Politiques",
		content:
			"Analysez l'impact des décisions politiques, des changements gouvernementaux et des politiques publiques sur votre activité.",
		examples: [
			"**Stabilité politique:** Impact des changements de gouvernement",
			"**Politique fiscale:** Évolution des taxes et impôts",
			"**Réglementation sectorielle:** Nouvelles normes sectorielles",
			"**Commerce international:** Accords commerciaux et barrières",
			"**Aides publiques:** Subventions et programmes de soutien",
		],
	},
	economic: {
		title: "Facteurs Économiques",
		content:
			"Évaluez les variables économiques qui influencent votre marché et votre activité.",
		examples: [
			"**Croissance économique:** PIB et indicateurs macro-économiques",
			"**Taux d'intérêt:** Impact sur les investissements",
			"**Inflation:** Effet sur les prix et les coûts",
			"**Emploi:** Marché du travail et main d'œuvre",
			"**Taux de change:** Impact sur import/export",
		],
	},
	social: {
		title: "Facteurs Sociaux",
		content:
			"Examinez les tendances sociales et démographiques qui peuvent influencer votre activité.",
		examples: [
			"**Démographie:** Évolution de la population",
			"**Culture:** Changement des valeurs et des normes",
			"**Mode de vie:** Tendances de consommation",
			"**Éducation:** Niveau d'éducation et compétences",
			"**Santé publique:** Politiques de santé et bien-être",
		],
	},
	technological: {
		title: "Facteurs Technologiques",
		content:
			"Analysez les innovations et les changements technologiques qui impactent votre secteur.",
		examples: [
			"**R&D:** Investissements en recherche et développement",
			"**Automatisation:** Impact des nouvelles technologies",
			"**Internet:** Évolution des technologies de l'information",
			"**Brevet:** Nouveaux brevets et innovations",
			"**Technologies émergentes:** IA, blockchain, etc.",
		],
	},
	environmental: {
		title: "Facteurs Environnementaux",
		content:
			"Considérez les aspects environnementaux et écologiques qui peuvent affecter votre activité.",
		examples: [
			"**Changement climatique:** Impact sur les ressources",
			"**Réglementation environnementale:** Normes et lois",
			"**Développement durable:** Initiatives écologiques",
			"**Gestion des déchets:** Politiques de recyclage",
			"**Énergie:** Utilisation et sources d'énergie",
		],
	},
	legal: {
		title: "Facteurs Légaux",
		content:
			"Évaluez le cadre juridique et la conformité réglementaire qui influencent votre secteur.",
		examples: [
			"**Législation du travail:** Lois sur l'emploi et les conditions de travail",
			"**Réglementation sectorielle:** Normes spécifiques à votre secteur",
			"**Propriété intellectuelle:** Droits d'auteur et brevets",
			"**Conformité:** Normes de conformité et audits",
			"**Responsabilité:** Lois sur la responsabilité et les litiges",
		],
	},
};

export type PestelConfig = {
	descriptions: typeof PESTEL_DESCRIPTIONS;
	headers: typeof PESTEL_HEADERS;
	colors: typeof PESTEL_COLORS;
};
