// lib/openai/formatters/analyzers/funnel.ts
import { FormattedAnalysis } from "@/types/openai/analysis";
export function format_funnel(data: any): FormattedAnalysis {
	const funnel_data = data.funnel_chart;
	const stages = data.funnel_chart?.data || [];

	if (!Array.isArray(stages) || stages.length === 0) {
		console.warn("Données funnel invalides ou vides", stages);
		return {
			formatted_sections: {},
			formatted_text: "",
			data: { stages: [] },
		};
	}

	// Tri des étapes par ID
	stages.sort((a: any, b: any) => a.id - b.id);

	// Normalisation et formatage des sections
	const formatted_sections: Record<string, string> = {};
	let previous_size = stages[0]?.size || 0;

	stages.forEach((stage: any) => {
		const conversion_rate = (stage.size / previous_size) * 100 || 100;
		const stage_key = stage.title.toLowerCase().replace(" ", "_");

		formatted_sections[stage_key] = `
  Étape: ${stage.title} (${stage.size}%)
  Taux de conversion: ${conversion_rate.toFixed(1)}% de l'étape précédente
  
  Actions mises en place:
  ${stage.cards
		.map((card: any) => `- ${card.title}: ${card.description}`)
		.join("\n")}
  `;

		previous_size = stage.size;
	});

	// QA formatting
	const formatted_qa = {
		loyalty: `Question : Comment fidélisez-vous vos clients ?\n\nRéponse : ${
			funnel_data.qa_responses?.MF_Loyalty || "Non renseigné"
		}`,
		advocacy: `Question : Comment encouragez-vous vos clients à devenir ambassadeurs ?\n\nRéponse : ${
			funnel_data.qa_responses?.MF_Advocacy || "Non renseigné"
		}`,
		pain_points: `Question : Quels sont les points de friction ?\n\nRéponse : ${
			funnel_data.qa_responses?.MF_PainPoints || "Non renseigné"
		}`,
	};

	// Texte complet
	const complete_text = [
		"Analyse de l'entonnoir de conversion :",
		...Object.values(formatted_sections),
		"\nAnalyse complémentaire :",
		...Object.values(formatted_qa),
	].join("\n\n");

	return {
		data: stages,
		qa: funnel_data.qa_responses,
		formatted_sections,
		formatted_qa,
		formatted_text: complete_text,
	};
}
