import { QAData } from "@/types/shared/qa-section";

export const SKILL_LEVELS = {
	0: { label: "Non évalué", color: "bg-gray-50" },
	1: { label: "Débutant", color: "bg-red-50" },
	2: { label: "Intermédiaire", color: "bg-orange-50" },
	3: { label: "Avancé", color: "bg-yellow-50" },
	4: { label: "Expert", color: "bg-green-50" },
	5: { label: "Maître", color: "bg-emerald-100" },
} as const;

export const SKILLS_MATRIX_QA_DATA: QAData = {
	sectionTitle: "Questions pour Approfondir Votre Matrice de Compétences",
	categories: [
		{
			id: "gaps-analysis",
			title: "Analyse des Écarts",
			question:
				"Quels sont les principaux écarts de compétences identifiés dans votre équipe et comment prévoyez-vous de les combler ?",
			examples: [
				"Identification des domaines nécessitant un renforcement urgent",
				"Plan de formation pour les compétences critiques manquantes",
				"Stratégie de recrutement pour acquérir des expertises spécifiques",
			],
		},
		{
			id: "development-plan",
			title: "Plan de Développement",
			question:
				"Quel est votre plan d'action pour développer les compétences de l'équipe sur les 12 prochains mois ?",
			examples: [
				"Programmes de formation interne/externe prévus",
				"Système de mentorat et de partage des connaissances",
				"Objectifs de progression par domaine de compétence",
			],
		},
		{
			id: "succession-planning",
			title: "Planification de la Succession",
			question:
				"Comment assurez-vous la continuité des compétences clés au sein de votre équipe ?",
			examples: [
				"Identification des compétences critiques à dupliquer",
				"Formation croisée entre les membres de l'équipe",
				"Plan de backup pour les expertises uniques",
			],
		},
		{
			id: "team-organization",
			title: "Organisation des Équipes",
			question:
				"Comment utilisez-vous cette matrice pour optimiser la composition de vos équipes projets ?",
			examples: [
				"Équilibrage des niveaux d'expertise dans les équipes",
				"Création de binômes senior-junior pour le transfert de compétences",
				"Rotation des rôles pour développer la polyvalence",
			],
		},
	],
};
