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
			id: "political-impact",
			title: "Impact Politique",
			question:
				"Comment les changements politiques actuels et futurs peuvent-ils affecter votre activité ?",
			examples: [
				"Changements de politique commerciale",
				"Nouvelles réglementations sectorielles",
				"Impact des élections sur votre secteur",
			],
		},
		{
			id: "economic-trends",
			title: "Tendances Économiques",
			question:
				"Quelles sont les principales tendances économiques qui influencent votre marché ?",
			examples: [
				"Variations des taux d'intérêt",
				"Tendances de l'emploi",
				"Évolution du pouvoir d'achat",
			],
		},
		{
			id: "technological-evolution",
			title: "Évolution Technologique",
			question:
				"Comment les avancées technologiques impactent-elles votre secteur ?",
			examples: [
				"Nouvelles technologies disruptives",
				"Évolution des processus de production",
				"Changements dans les habitudes de consommation",
			],
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
