// lib/config/configSkillMatrix.tsx

import { FaInfoCircle } from "react-icons/fa";
import { SectionConfig, TeamMember } from "./types";

/**
 * Niveaux de compétence
 */
export const levels = [
	{
		name: "Basique",
		color: "#F4A8A8",
		description: "Nécessite une formation de base",
	},
	{
		name: "Avancé",
		color: "#F7C38A",
		description: "Nécessite une formation avancée",
	},
	{
		name: "Compétent",
		color: "#F8E19D",
		description: "Aucune formation nécessaire",
	},
	{ name: "Formateur", color: "#A6D8A8", description: "Niveau expert" },
];

/**
 * Domaines initiaux
 */
export const initialDomains = [
	"Six Sigma",
	"Microsoft Office",
	"Matériel PC",
	"Infrastructure",
	"Texte ici",
];

/**
 * Membres initiaux de l'équipe
 */
export const initialTeamMembers: TeamMember[] = [
	{
		id: "1",
		name: "Trevor Janes",
		role: "Analyste BI",
		skills: {
			"Six Sigma": "",
			"Microsoft Office": "",
			"Matériel PC": "",
			Infrastructure: "",
			"Texte ici": "",
		},
	},
	{
		id: "2",
		name: "Maria Suttkey",
		role: "Programmeuse Python",
		skills: {
			"Six Sigma": "",
			"Microsoft Office": "",
			"Matériel PC": "",
			Infrastructure: "",
			"Texte ici": "",
		},
	},
];

/**
 * Description de la matrice des compétences
 */
export const descriptionContent = {
	title: "À propos de la matrice des compétences",
	sections: [
		{
			header: "À propos de la matrice des compétences",
			content:
				"Cette matrice est un outil essentiel pour cartographier les compétences de votre équipe, identifier les forces et les axes d'amélioration, et planifier les formations futures.",
		},
		{
			header: "Comment utiliser la matrice",
			list: [
				'Ajoutez des membres d\'équipe avec le bouton "Ajouter une ligne"',
				"Créez de nouveaux domaines de compétence selon vos besoins",
				"Évaluez les compétences en sélectionnant le niveau approprié",
				"Exportez les données en CSV pour analyse approfondie",
			],
		},
		{
			header: "Bonnes pratiques",
			list: [
				"Mettez à jour régulièrement les niveaux de compétence",
				"Utilisez les données pour planifier les formations",
				"Identifiez les experts qui peuvent former leurs collègues",
				"Assurez une distribution équilibrée des compétences dans l'équipe",
			],
		},
		{
			header: "Exemple d'utilisation",
			content:
				'Un membre "Basique" en "Six Sigma" pourrait être jumelé avec un "Formateur" pour développer ses compétences. Les "Compétents" peuvent travailler de manière autonome, tandis que les "Avancés" peuvent participer à la formation des autres.',
		},
		{
			header: "Niveaux de compétence",
			list: levels.map((level) => (
				<div
					key={level.name}
					style={{
						backgroundColor: level.color,
						padding: "5px",
						borderRadius: "5px",
						marginBottom: "5px",
					}}
				>
					<span className="legend-title">{level.name}: </span>
					{level.description}
				</div>
			)),
		},
	],
};

/**
 * Configuration des sections pour SkillsMatrix
 */
export const skillMatrixSections: SectionConfig[] = [
	{
		id: "skillsMatrix",
		title: "Matrice des Compétences",
		icon: <FaInfoCircle />,
	},
];
