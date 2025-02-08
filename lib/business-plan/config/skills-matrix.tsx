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
			id: "SkillMatrix_LeadershipOwnership",
			title: "Gouvernance et prise de décision",
			question:
				"Quelle structure juridique avez-vous choisie pour votre entreprise et quel impact a-t-elle sur la gouvernance et la prise de décision ?",
			examples: [
				"SARL (Société à Responsabilité Limitée) : Une gestion centralisée avec un gérant unique, facilitant la prise de décision mais limitant la flexibilité pour l'entrée de nouveaux investisseurs.",
				"SAS (Société par Actions Simplifiée) : Plus de souplesse dans la gouvernance, avec une répartition flexible des pouvoirs et une attractivité accrue pour les investisseurs.",
				"Entreprise Individuelle : Une gouvernance simple et rapide, mais avec une responsabilité illimitée pouvant impacter le patrimoine personnel.",
			],
		},
		{
			id: "SkillMatrix_EntrepreneurshipSkills",
			title: "Expérience entrepreneuriale",
			question:
				"Quelle est votre expérience antérieure dans la création et la gestion d'entreprises, et comment cela influence-t-il votre approche actuelle ?",
			examples: [
				"Identification des compétences critiques à dupliquer",
				"Formation croisée entre les membres de l'équipe",
				"Plan de backup pour les expertises uniques",
			],
		},
		{
			id: "SkillMatrix_Gaps",
			title: "Lacunes identifiées",
			question:
				"Quelles sont les lacunes spécifiques en matière de gestion ou d’expérience qui pourraient freiner le développement de votre projet ?",
			examples: [
				"Manque de compétences en gestion financière, ce qui complique l’établissement de prévisions budgétaires précises.",
				"Peu d’expérience en leadership d’équipe, rendant difficile la motivation et la coordination des collaborateurs.",
				"Faible maîtrise du marketing digital, limitant la capacité à attirer des clients via les canaux numériques.",
			],
		},
		{
			id: "SkillMatrix_Training",
			title: "Amélioration de l'équipe",
			question:
				"Quel est votre plan pour garantir que ces lacunes en matière de gestion ou d’expérience soient comblées efficacement ?",
			examples: [
				"Suivre une formation en gestion financière via des cours en ligne ou des ateliers spécifiques.",
				"Engager un mentor ou un coach en leadership pour améliorer les compétences en gestion d’équipe et en prise de décision.",
				"Participer à des séminaires ou des programmes de certification en marketing digital pour acquérir les compétences nécessaires à la promotion de l’entreprise en ligne.",
			],
		},
		{
			id: "SkillMatrix_ProblemSolving",
			title: "Résolution de problèmes",
			question:
				"Quelles compétences supplémentaires apportent les membres de votre équipe en résolution de problème ?",
			examples: [
			],
		},
		{
			id: "SkillMatrix_Creativity",
			title: "Créativité",
			question:
				"Quelles compétences supplémentaires apportent les membres de votre équipe en créativité ?",
			examples: [
			],
		},
		{
			id: "SkillMatrix_LeadershipSkills",
			title: "Leadership",
			question:
				"Quelles compétences supplémentaires apportent les membres de votre équipe en leadership ?",
			examples: [
			],
		},
	],
};
