// lib/openai/formatters/analyzers/skills_matrix.ts
import { FormattedAnalysis } from "@/types/openai/analysis";
export function format_skills_matrix(data: any): FormattedAnalysis {
	const skills_data = data.skills_matrix;

	// Création d'un mapping pour les domaines
	const domain_map = skills_data.data.domains.reduce(
		(acc: Record<string, string>, domain: any) => {
			acc[domain.id] = domain.name;
			return acc;
		},
		{}
	);

	// Création de la matrice de compétences normalisée
	const matrix_data = skills_data.data.people.map((person: any) => {
		const person_skills: Record<string, any> = { name: person.name };
		Object.entries(person.skills).forEach(([domain_id, level]) => {
			person_skills[domain_map[domain_id]] = level;
		});
		return person_skills;
	});

	// Création de l'en-tête et des lignes de la matrice
	const headers = [
		"Nom",
		...skills_data.data.domains.map((d: any) => d.name),
	];
	const matrix_lines = [
		headers.join(" | "),
		"-".repeat(headers.join(" | ").length),
		...matrix_data.map((person_skills: any) => {
			const line = [person_skills.name];
			headers.slice(1).forEach((domain) => {
				const level = person_skills[domain] || 0;
				const stars = "★".repeat(level) + "☆".repeat(5 - level);
				line.push(stars);
			});
			return line.join(" | ");
		}),
	];

	// Analyse des compétences par domaine
	const skill_analysis = skills_data.data.domains.map((domain: any) => {
		const domain_skills = skills_data.data.people
			.map((person: any) => ({
				name: person.name,
				level: person.skills[domain.id] || 0,
			}))
			.sort((a: any, b: any) => b.level - a.level);

		return (
			`\nCompétences en ${domain.name}:\n` +
			domain_skills
				.map(
					({ name, level }: { name: string; level: number }) =>
						`- ${name}: ${"★".repeat(level)}${"☆".repeat(
							5 - level
						)} (niveau ${level}/5)`
				)
				.join("\n")
		);
	});

	// QA formatting
	const qa_questions = {
		gaps: "Quelles sont les principales lacunes en termes de compétences ?",
		training:
			"Comment gérez-vous la formation et le développement des compétences ?",
		creativity: "Comment évaluez-vous et développez-vous la créativité ?",
		problem_solving:
			"Quelle est votre approche de la résolution de problèmes ?",
		leadership_skills:
			"Comment évaluez-vous les compétences en leadership ?",
		leadership_ownership:
			"Comment la propriété et la gouvernance sont-elles structurées ?",
		entrepreneurship_skills:
			"Quelles sont les compétences entrepreneuriales présentes ?",
	};

	const formatted_qa = Object.entries(qa_questions).reduce(
		(acc, [key, question]) => {
			const response = skills_data.qa_responses[`SkillMatrix_${key}`];
			acc[key] = `Question : ${question}\n\nRéponse : ${
				response || "Non renseigné"
			}`;
			return acc;
		},
		{} as Record<string, string>
	);

	// Texte complet
	const complete_text = [
		"Matrice des Compétences :",
		matrix_lines.join("\n"),
		"\nAnalyse détaillée des compétences :",
		...skill_analysis,
		"\nAnalyse complémentaire :",
		...Object.values(formatted_qa),
	].join("\n\n");

	return {
		data: matrix_data,
		qa: skills_data.qa_responses,
		formatted_sections: {
			matrix: matrix_lines.join("\n"),
			analysis: skill_analysis.join("\n"),
		},
		formatted_qa,
		formatted_text: complete_text,
	};
}
