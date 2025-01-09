// lib/config/configSWOT.tsx

import { iconMapping } from "./iconMapping";
import { SwotSectionConfig, DescriptionContent } from "./types";

/**
 * Configuration des sections SWOT (icônes, titres, etc.)
 */
export const swotSections: SwotSectionConfig[] = [
	{
		id: "strengths",
		title: "Forces",
		icon: iconMapping.chartBar,
		// Vous pouvez ajouter `className` et `titleClass` si nécessaire
	},
	{
		id: "weaknesses",
		title: "Faiblesses",
		icon: iconMapping.exclamation,
	},
	{
		id: "opportunities",
		title: "Opportunités",
		icon: iconMapping.lightbulb,
	},
	{
		id: "threats",
		title: "Menaces",
		icon: iconMapping.info,
	},
];

/**
 * Description courte pour l'infobulle (tooltip) au survol
 */
export const swotShortDescriptions: Record<string, string> = {
	strengths: "Les atouts internes de votre entreprise.",
	weaknesses: "Les points faibles internes de votre entreprise.",
	opportunities: "Les opportunités externes pour votre entreprise.",
	threats: "Les menaces externes pour votre entreprise.",
};

/**
 * Description détaillée pour chaque section (affichée dans la modale)
 */
export const swotDetailedDescriptions: Record<string, DescriptionContent> = {
	strengths: {
		title: "Forces",
		sections: [
			{
				header: "À propos des Forces",
				content:
					"Les forces sont les atouts internes de votre entreprise qui vous donnent un avantage concurrentiel. Elles peuvent inclure des ressources uniques, une expertise particulière, une excellente réputation, etc.",
			},
			{
				header: "Exemples",
				list: [
					"Excellente réputation sur le marché.",
					"Technologie de pointe.",
					"Équipe hautement qualifiée.",
					"Processus opérationnels efficaces.",
					"Forte reconnaissance de la marque.",
				],
			},
		],
	},
	weaknesses: {
		title: "Faiblesses",
		sections: [
			{
				header: "À propos des Faiblesses",
				content:
					"Les faiblesses sont les points internes qui limitent la capacité de votre entreprise à atteindre ses objectifs. Elles peuvent inclure des ressources insuffisantes, un manque d'expertise, des processus inefficaces, etc.",
			},
			{
				header: "Exemples",
				list: [
					"Ressources financières limitées.",
					"Dépendance à un seul fournisseur.",
					"Manque de reconnaissance de marque.",
					"Faiblesse des processus internes.",
					"Incapacité à attirer et retenir les talents.",
				],
			},
		],
	},
	opportunities: {
		title: "Opportunités",
		sections: [
			{
				header: "À propos des Opportunités",
				content:
					"Les opportunités sont des facteurs externes que votre entreprise peut exploiter pour sa croissance et son développement. Elles peuvent inclure des tendances du marché, des avancées technologiques, des changements réglementaires favorables, etc.",
			},
			{
				header: "Exemples",
				list: [
					"Expansion sur de nouveaux marchés.",
					"Lancements de nouveaux produits.",
					"Adoption de nouvelles technologies.",
					"Augmentation de la demande pour des produits durables.",
					"Partenariats stratégiques avec d'autres entreprises.",
				],
			},
		],
	},
	threats: {
		title: "Menaces",
		sections: [
			{
				header: "À propos des Menaces",
				content:
					"Les menaces sont des facteurs externes qui pourraient nuire à la performance de votre entreprise. Elles peuvent inclure la concurrence accrue, les changements réglementaires défavorables, les fluctuations économiques, etc.",
			},
			{
				header: "Exemples",
				list: [
					"Concurrence accrue.",
					"Changements réglementaires.",
					"Fluctuations économiques.",
					"Évolution rapide des préférences des consommateurs.",
					"Risques liés à la cybersécurité.",
				],
			},
		],
	},
};
