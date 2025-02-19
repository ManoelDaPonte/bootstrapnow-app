// lib/openai/formatters/analyzers/marketing_mix.ts
import { FormattedAnalysis } from "@/types/openai/analysis";

export function format_marketing_mix(data: any): FormattedAnalysis {
	const mix_data = data.marketing_mix;

	// Normalisation des données
	const normalized_data = {
		product: mix_data.data["7P_Product"],
		price: mix_data.data["7P_Price"],
		place: mix_data.data["7P_Place"],
		promotion: mix_data.data["7P_Promotion"],
		people: mix_data.data["7P_People"],
		process: mix_data.data["7P_Process"],
		physical_evidence: mix_data.data["7P_Physical_Evidence"],
	};

	// Création des sections formatées
	const formatted_sections: Record<string, string> = {};
	for (const [key, items] of Object.entries(normalized_data)) {
		const title = key.charAt(0).toUpperCase() + key.slice(1);
		formatted_sections[key] = [
			`${title} :`,
			...(items as any[]).map(
				(item) => `- ${item.title}: ${item.description}`
			),
		].join("\n");
	}

	// QA formatting
	const formatted_qa = {
		marketing_plan_sensibility: `Question : Comment avez-vous analysé la sensibilité du marché ?\n\nRéponse : ${
			mix_data.qa_responses?.MarketingPlan_Sensibility || "Non renseigné"
		}`,
	};

	// Texte complet
	const complete_text = [
		"Analyse Marketing Mix (7P) :",
		...Object.values(formatted_sections),
		"\nAnalyse complémentaire :",
		...Object.values(formatted_qa),
	].join("\n\n");

	return {
		data: normalized_data,
		qa: mix_data.qa_responses,
		formatted_sections,
		formatted_qa,
		formatted_text: complete_text,
	};
}
