// lib/config/configValueProposition.tsx

import { FaCogs, FaExclamationCircle, FaLightbulb } from "react-icons/fa";
import { SectionConfig, DescriptionContent } from "./types";

/**
 * Configuration des sections pour la Proposition de Valeur
 */
export const valuePropositionSections: SectionConfig[] = [
	{
		id: "products",
		title: "Produits et Services",
		icon: <FaCogs />,
		className: "bg-blue-100",
		titleClass: "text-blue-700",
	},
	{
		id: "problem",
		title: "Problèmes Résolus",
		icon: <FaExclamationCircle />,
		className: "bg-red-100",
		titleClass: "text-red-700",
	},
	{
		id: "valueCreation",
		title: "Création de Valeur",
		icon: <FaLightbulb />,
		className: "bg-green-100",
		titleClass: "text-green-700",
	},
	{
		id: "gains",
		title: "Gains",
		icon: <FaLightbulb />,
		className: "bg-yellow-100",
		titleClass: "text-yellow-700",
	},
	{
		id: "jobs",
		title: "Jobs",
		icon: <FaCogs />,
		className: "bg-purple-100",
		titleClass: "text-purple-700",
	},
	{
		id: "pains",
		title: "Pains",
		icon: <FaExclamationCircle />,
		className: "bg-gray-100",
		titleClass: "text-gray-700",
	},
];

/**
 * Description détaillée pour chaque section de la Proposition de Valeur
 */
export const valuePropositionDetailedDescriptions: Record<
	string,
	DescriptionContent
> = {
	products: {
		title: "Produits et Services",
		sections: [
			{
				header: "À propos des produits et services",
				content:
					"Cette section détaille les solutions spécifiques que vous proposez pour répondre aux besoins de vos clients.",
			},
			{
				header: "Exemple",
				list: [
					"**Exemple :** 'Un logiciel de gestion tout-en-un pour organiser les tâches et les communications.'",
				],
			},
		],
	},
	problem: {
		title: "Problèmes Résolus",
		sections: [
			{
				header: "À propos des problèmes résolus",
				content:
					"Identifiez clairement les problèmes ou défis que votre solution est conçue pour résoudre.",
			},
			{
				header: "Exemple",
				list: [
					"**Exemple :** 'Manque de visibilité sur l'avancement des projets d'équipe.'",
				],
			},
		],
	},
	valueCreation: {
		title: "Création de Valeur",
		sections: [
			{
				header: "À propos de la création de valeur",
				content:
					"Détaillez comment votre produit ou service génère de la valeur unique pour vos clients.",
			},
			{
				header: "Exemple",
				list: [
					"**Exemple :** 'Réduction des coûts opérationnels grâce à des processus automatisés.'",
				],
			},
		],
	},
	gains: {
		title: "Gains",
		sections: [
			{
				header: "À propos des gains",
				content:
					"Les gains représentent les bénéfices ou avantages que votre solution peut offrir à vos clients.",
			},
			{
				header: "Exemple",
				list: [
					"**Exemple :** 'Amélioration de la productivité grâce à une interface utilisateur simplifiée.'",
				],
			},
		],
	},
	jobs: {
		title: "Jobs",
		sections: [
			{
				header: "À propos des jobs",
				content:
					"Les jobs sont les tâches que votre client cherche à accomplir, qu'elles soient fonctionnelles, émotionnelles ou sociales.",
			},
			{
				header: "Exemple",
				list: [
					"**Exemple :** 'Organiser efficacement ses projets grâce à un outil collaboratif.'",
				],
			},
		],
	},
	pains: {
		title: "Pains",
		sections: [
			{
				header: "À propos des pains",
				content:
					"Les pains décrivent les problèmes ou obstacles rencontrés par vos clients.",
			},
			{
				header: "Exemple",
				list: [
					"**Exemple :** 'Temps perdu à chercher des fichiers dispersés sur plusieurs plateformes.'",
				],
			},
		],
	},
};
