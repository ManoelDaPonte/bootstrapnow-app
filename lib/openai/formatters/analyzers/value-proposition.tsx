// lib/openai/formatters/analyzers/value_proposition.ts
import { FormattedAnalysis } from "@/types/openai/analysis";
export function format_value_proposition(data: any): FormattedAnalysis {
	const vp_data = data.value_proposition;

	// Normalisation des données
	const normalized_data = {
		gains: vp_data.data.VP_Gains,
		pains: vp_data.data.VP_Pains,
		products: vp_data.data.VP_Product,
		customer_jobs: vp_data.data.VP_Customer_Jobs,
		gain_creators: vp_data.data.VP_gainCreators,
		pain_relievers: vp_data.data.painRelievers,
	};

	// Création des sections formatées
	const formatted_sections = {
		customer_jobs: [
			"Missions des clients :",
			...normalized_data.customer_jobs.map(
				(job: any) => `- ${job.title}: ${job.description}`
			),
		].join("\n"),

		pains: [
			"Points de douleur :",
			...normalized_data.pains.map(
				(pain: any) => `- ${pain.title}: ${pain.description}`
			),
		].join("\n"),

		gains: [
			"Bénéfices attendus :",
			...normalized_data.gains.map(
				(gain: any) => `- ${gain.title}: ${gain.description}`
			),
		].join("\n"),

		products: [
			"Produits et Services :",
			...normalized_data.products.map(
				(product: any) => `- ${product.title}: ${product.description}`
			),
		].join("\n"),

		pain_relievers: [
			"Solutions aux points de douleur :",
			...normalized_data.pain_relievers.map(
				(reliever: any) =>
					`- ${reliever.title}: ${reliever.description}`
			),
		].join("\n"),

		gain_creators: [
			"Créateurs de bénéfices :",
			...normalized_data.gain_creators.map(
				(creator: any) => `- ${creator.title}: ${creator.description}`
			),
		].join("\n"),
	};

	// QA formatting
	const formatted_qa = {
		vp_risk_reducers: `Question : Comment réduisez-vous les risques ?\n\nRéponse : ${
			vp_data.qa_responses?.VP_RiskReducers || "Non renseigné"
		}`,
		vp_customer_insights: `Question : Quelles observations clés sur vos clients ?\n\nRéponse : ${
			vp_data.qa_responses?.VP_CustomerInsights || "Non renseigné"
		}`,
		vp_customer_profiles: `Question : Quel est le profil type de vos clients ?\n\nRéponse : ${
			vp_data.qa_responses?.VP_CustomerProfiles || "Non renseigné"
		}`,
		vp_differentiation_factors: `Question : Comment vous différenciez-vous ?\n\nRéponse : ${
			vp_data.qa_responses?.VP_DifferentiationFactors || "Non renseigné"
		}`,
	};

	// Texte complet
	const complete_text = [
		"Analyse de la Proposition de Valeur :",
		...Object.values(formatted_sections),
		"\nAnalyse complémentaire :",
		...Object.values(formatted_qa),
	].join("\n\n");

	return {
		data: normalized_data,
		qa: vp_data.qa_responses,
		formatted_sections,
		formatted_qa,
		formatted_text: complete_text,
	};
}
