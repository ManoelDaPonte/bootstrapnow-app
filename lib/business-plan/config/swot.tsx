//lib/business-plan/config/swot.tsx
import { SwotCategory, SwotHeaders, SwotDescriptions } from "@/types/swot";
import { QAData } from "@/types/shared/qa-section";

export const SWOT_SECTION_ORDER: SwotCategory[] = [
	"strengths",
	"weaknesses",
	"threats",
	"opportunities",
];

export const SWOT_DESCRIPTIONS: SwotDescriptions = {
	strengths:
		"Attributs et ressources internes qui soutiennent la réussite d'une stratégie.",
	weaknesses:
		"Facteurs internes qui pourraient entraver la réussite d'une stratégie.",
	opportunities:
		"Facteurs externes que l'organisation peut exploiter à son avantage.",
	threats:
		"Facteurs externes qui pourraient poser des défis ou des risques pour l'organisation.",
};

export const SWOT_HEADERS: SwotHeaders = {
	strengths: { title: "Forces", color: "text-emerald-700" },
	weaknesses: { title: "Faiblesses", color: "text-red-700" },
	opportunities: { title: "Opportunités", color: "text-blue-700" },
	threats: { title: "Menaces", color: "text-orange-700" },
};

export const SWOT_QA_DATA: QAData = {
	sectionTitle: "Questions pour Approfondir Votre Analyse SWOT",
	categories: [
		{
			id: "SWOT_CompetitorStrengths",
			title: "Forces des Concurrents",
			question:
				"Quelles sont les forces distinctives de vos concurrents qui pourraient constituer une menace pour votre positionnement sur le marché, et comment pouvez-vous vous différencier de manière stratégique ?",
			examples: [
				"Un concurrent majeur bénéficie de solides relations avec de grands distributeurs, ce qui lui permet d'avoir une grande visibilité et d'accéder à des canaux de distribution exclusifs.",
				"Un autre concurrent se distingue par une expertise technologique avancée et des produits innovants.",
				"Un concurrent a une réputation établie pour son excellent service client, ce qui lui permet de fidéliser sa clientèle.",
			],
		},
		{
			id: "SWOT_CompetitorWeaknesses",
			title: "Faiblesses des Concurrents",
			question:
				"Quelles sont les faiblesses notables de vos concurrents qui représentent des opportunités pour vous sur le marché ?",
			examples: [
				"Un concurrent a une capacité limitée à s'adapter rapidement aux changements du marché.",
				"Certains concurrents ont une stratégie de prix agressive, mais leur qualité est souvent compromise.",
				"Un de nos concurrents souffre d'une image de marque vieillissante.",
			],
		},
		{
			id: "SWOT_EconomiesOfScale",
			title: "Économies d'Échelle",
			question:
				"Comment les économies d'échelle de vos concurrents influencent-elles leur avantage concurrentiel, et quels sont les moyens par lesquels vous pouvez atteindre une échelle comparable ?",
			examples: [
				"Certains grands concurrents bénéficient de coûts de production réduits grâce à des volumes d'achats importants.",
				"Un concurrent majeur a optimisé ses processus logistiques.",
				"L'un de nos concurrents bénéficie d'un réseau de distribution bien établi.",
			],
		},
		{
			id: "SWOT_OperationalEfficiency",
			title: "Efficacité Opérationnelle",
			question:
				"En quoi les processus opérationnels de vos concurrents vous paraissent-ils plus efficaces et comment pouvez-vous améliorer votre propre efficacité opérationnelle ?",
			examples: [
				"Un concurrent a mis en place une gestion de la chaîne d'approvisionnement totalement optimisée.",
				"Certains concurrents utilisent des outils d'automatisation dans leur production.",
				"Un concurrent majeur a une gestion efficace de son service client grâce à l'utilisation d'IA.",
			],
		},
	],
};

export const SWOT_MODAL_DETAILED_DESCRIPTIONS = {
	strengths: {
		title: "Forces",
		content:
			"Les forces sont des attributs ou des ressources internes qui aident une organisation à atteindre ses objectifs. Ce sont des domaines où l'organisation excelle et possède un avantage sur ses concurrents.",
		examples: [
			"**Réputation de marque solide :** L'entreprise bénéficie d'une réputation bien établie pour la qualité de ses produits, ce qui crée une fidélité et une confiance des clients. (ex. : Apple, Nike)",
			"**Personnel qualifié :** L'entreprise dispose d'une main-d'œuvre hautement qualifiée et expérimentée, ce qui lui permet de produire des produits ou services de haute qualité.",
			"**Stabilité financière :** L'entreprise a une situation financière solide, ce qui lui permet d'investir dans de nouveaux projets, des expansions et des acquisitions.",
			"**Technologie innovante :** L'entreprise est en avance en matière d'innovation technologique, ce qui l'aide à rester compétitive et à offrir des solutions uniques à ses clients.",
		],
	},
	weaknesses: {
		title: "Faiblesses",
		content:
			"Les faiblesses sont des facteurs internes qui peuvent nuire à la capacité de l'organisation à atteindre ses objectifs. Ce sont des domaines où l'organisation manque de ressources ou est moins performante par rapport à ses concurrents.",
		examples: [
			"**Coûts élevés :** L'entreprise a des coûts opérationnels élevés, ce qui peut nuire à sa rentabilité et limiter ses investissements dans d'autres domaines.",
			"**Dépendance à un produit unique :** L'entreprise dépend fortement d'un seul produit ou service, ce qui peut la rendre vulnérable en cas de baisse de la demande.",
			"**Service client médiocre :** L'entreprise souffre d'une mauvaise réputation en matière de service client, ce qui peut entraîner une insatisfaction et une image de marque négative.",
			"**Technologie obsolète :** L'entreprise utilise une technologie dépassée, ce qui entraîne des inefficacités et la rend moins compétitive sur un marché en constante évolution.",
		],
	},
	opportunities: {
		title: "Opportunités",
		content:
			"Les opportunités sont des facteurs ou des tendances externes que l'organisation peut exploiter pour obtenir un avantage ou atteindre ses objectifs. Cela inclut les tendances du marché, les avancées technologiques et les changements sociétaux.",
		examples: [
			"**Marchés émergents :** S'étendre sur de nouveaux marchés en développement où la demande pour les produits ou services de l'entreprise est croissante.",
			"**Avancées technologiques :** Tirer parti des nouvelles technologies pour améliorer l'efficacité, créer de nouveaux produits ou toucher une clientèle plus large.",
			"**Évolution des préférences des consommateurs :** Profiter des changements dans le comportement ou les préférences des consommateurs, comme l'augmentation de la demande pour des produits écologiques ou durables.",
			"**Partenariats stratégiques :** Former des alliances avec d'autres entreprises pour accéder à de nouvelles ressources, marchés ou technologies.",
		],
	},
	threats: {
		title: "Menaces",
		content:
			"Les menaces sont des facteurs externes qui pourraient avoir un impact négatif sur l'organisation ou sa capacité à atteindre ses objectifs. Cela inclut la concurrence, les crises économiques et les changements réglementaires.",
		examples: [
			"**Concurrence accrue :** L'arrivée de nouveaux concurrents ou le renforcement de concurrents existants proposant des produits ou services similaires à des prix plus bas.",
			"**Récession économique :** Un ralentissement économique qui réduit les dépenses des consommateurs et affecte la demande globale des produits de l'entreprise.",
			"**Changements réglementaires :** De nouvelles lois ou réglementations qui pourraient augmenter les coûts opérationnels ou limiter les activités de l'entreprise.",
			"**Perturbations de la chaîne d'approvisionnement :** Des interruptions dans la chaîne d'approvisionnement qui affectent la capacité de l'entreprise à produire et livrer ses produits efficacement.",
		],
	},
};
