// lib/openai/formatters/analyzers/swot.ts
import { SwotAnalysisData } from "@/types/openai/analyzers";

export function format_swot(data: any): SwotAnalysisData {
	const swot_data = data.swot;

	// Normalisation des données
	const normalized_data = {
		strengths: swot_data.data.SWOT_Strengths,
		weaknesses: swot_data.data.SWOT_Weaknesses,
		opportunities: swot_data.data.SWOT_Opportunities,
		threats: swot_data.data.SWOT_Threats,
	};

	// Normalisation des réponses QA
	const normalized_qa = {
		competitor_strengths: {
			question:
				"Quelles sont les forces distinctives de vos concurrents qui pourraient constituer une menace ?",
			response: swot_data.qa_responses?.SWOT_CompetitorStrengths,
		},
		competitor_weaknesses: {
			question:
				"Quelles sont les faiblesses notables de vos concurrents ?",
			response: swot_data.qa_responses?.SWOT_CompetitorWeaknesses,
		},
		operational_efficiency: {
			question: "Comment évaluez-vous l'efficacité opérationnelle ?",
			response: swot_data.qa_responses?.SWOT_OperationalEfficiency,
		},
	};

	// Création des sections formatées
	const formatted_sections: Record<string, string> = {
		strengths: [
			"Forces principales :",
			...normalized_data.strengths.map(
				(strength: any) =>
					`- ${strength.title}: ${strength.description}`
			),
		].join("\n"),

		weaknesses: [
			"Faiblesses identifiées :",
			...normalized_data.weaknesses.map(
				(weakness: any) =>
					`- ${weakness.title}: ${weakness.description}`
			),
		].join("\n"),

		opportunities: [
			"Opportunités à saisir :",
			...normalized_data.opportunities.map(
				(opportunity: any) =>
					`- ${opportunity.title}: ${opportunity.description}`
			),
		].join("\n"),

		threats: [
			"Menaces potentielles :",
			...normalized_data.threats.map(
				(threat: any) => `- ${threat.title}: ${threat.description}`
			),
		].join("\n"),
	};

	// Création des QA formatés
	const formatted_qa = Object.entries(normalized_qa).reduce(
		(acc, [key, qa]) => ({
			...acc,
			[key]: `Question : ${qa.question}\n\nRéponse : ${
				qa.response || "Non renseigné"
			}`,
		}),
		{}
	);

	// Création du texte complet formaté
	const complete_text = [
		"Analyse SWOT de l'entreprise :",
		formatted_sections.strengths,
		formatted_sections.weaknesses,
		formatted_sections.opportunities,
		formatted_sections.threats,
		"\nAnalyse complémentaire :",
		...Object.values(formatted_qa),
	].join("\n\n");

	return {
		data: normalized_data,
		qa: normalized_qa,
		formatted_sections,
		formatted_qa,
		formatted_text: complete_text,
	};
}
