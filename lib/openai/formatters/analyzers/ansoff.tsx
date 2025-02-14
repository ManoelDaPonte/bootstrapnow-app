// lib/openai/formatters/analyzers/ansoff.ts
import { FormattedAnalysis } from "@/types/openai/analysis";
export function format_ansoff(data: any): FormattedAnalysis {
	const ansoff_data = data.ansoff;

	// Normalisation des données
	const normalized_data = {
		market_penetration: ansoff_data.data.Ansoff_MarketPenetration,
		product_development: ansoff_data.data.Ansoff_ProductDevelopment,
		market_development: ansoff_data.data.Ansoff_MarketDevelopment,
		diversification: ansoff_data.data.Ansoff_Diversification,
	};

	// Création des sections formatées
	const formatted_sections = {
		market_penetration: [
			"1. Pénétration de Marché (Marchés existants - Produits existants) :",
			...normalized_data.market_penetration.map(
				(item: any) => `- ${item.title}: ${item.description}`
			),
		].join("\n"),

		product_development: [
			"2. Développement de Produit (Marchés existants - Nouveaux produits) :",
			...normalized_data.product_development.map(
				(item: any) => `- ${item.title}: ${item.description}`
			),
		].join("\n"),

		market_development: [
			"3. Développement de Marché (Nouveaux marchés - Produits existants) :",
			...normalized_data.market_development.map(
				(item: any) => `- ${item.title}: ${item.description}`
			),
		].join("\n"),

		diversification: [
			"4. Diversification (Nouveaux marchés - Nouveaux produits) :",
			...normalized_data.diversification.map(
				(item: any) => `- ${item.title}: ${item.description}`
			),
		].join("\n"),
	};

	// QA formatting
	const formatted_qa = {
		growth_strategy: `Question : Quels sont les facteurs clés qui influenceront votre stratégie de croissance ?\n\nRéponse : ${
			ansoff_data.qa_responses?.Ansoff_GrowthStrategy || "Non renseigné"
		}`,

		technological_forecasting: `Question : Comment anticipez-vous l'évolution technologique ?\n\nRéponse : ${
			ansoff_data.qa_responses?.Ansoff_TechnologicalForecasting ||
			"Non renseigné"
		}`,
	};

	// Texte complet
	const complete_text = [
		"Matrice de croissance Ansoff :",
		"Cette analyse présente les quatre stratégies de croissance :",
		...Object.values(formatted_sections),
		"\nAnalyse stratégique complémentaire :",
		...Object.values(formatted_qa),
	].join("\n\n");

	return {
		data: normalized_data,
		qa: ansoff_data.qa_responses,
		formatted_sections,
		formatted_qa,
		formatted_text: complete_text,
	};
}
