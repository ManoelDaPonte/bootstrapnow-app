// lib/openai/formatters/analyzers/pestel.ts
import { FormattedAnalysis } from "@/types/openai/analysis";
export function format_pestel(data: any): FormattedAnalysis {
	const pestel_data = data.pestel;

	if (!pestel_data?.data || !pestel_data?.qa_responses) {
		console.warn("Données PESTEL invalides ou manquantes:", pestel_data);
		return {
			data: {},
			formatted_sections: {},
			formatted_text: "",
			formatted_qa: {},
		};
	}

	// Normalisation des données avec vérification de type
	const normalized_data = {
		political: Array.isArray(pestel_data.data.PESTEL_Political)
			? pestel_data.data.PESTEL_Political
			: [],
		economic: Array.isArray(pestel_data.data.PESTEL_Economical)
			? pestel_data.data.PESTEL_Economical
			: [],
		social: Array.isArray(pestel_data.data.PESTEL_Social)
			? pestel_data.data.PESTEL_Social
			: [],
		technological: Array.isArray(pestel_data.data.PESTEL_Technological)
			? pestel_data.data.PESTEL_Technological
			: [],
		environmental: Array.isArray(pestel_data.data.PESTEL_Environmental)
			? pestel_data.data.PESTEL_Environmental
			: [],
		legal: Array.isArray(pestel_data.data.PESTEL_Legal)
			? pestel_data.data.PESTEL_Legal
			: [],
	};

	// Création des sections formatées
	const formatted_sections: Record<string, string> = {};
	for (const [key, items] of Object.entries(normalized_data)) {
		const title = key.charAt(0).toUpperCase() + key.slice(1);
		formatted_sections[key] = [
			`Facteurs ${title}s :`,
			...items.map((item: any) =>
				typeof item === "object" && item !== null
					? `- ${item.title || ""}: ${item.description || ""}`
					: `- ${item || ""}`
			),
		].join("\n");
	}

	// Formatage des QA avec correspondance directe aux clés existantes
	const formatted_qa: Record<string, string> = {
		opportunities: `Question : Quelles sont les opportunités d'expansion ou de diversification ?\n\nRéponse : ${
			pestel_data.qa_responses.PESTEL_Opportunities || "Non renseigné"
		}`,
		threats: `Question : Quelles sont les menaces principales ?\n\nRéponse : ${
			pestel_data.qa_responses.PESTEL_Threats || "Non renseigné"
		}`,
		social_trends: `Question : Quelles sont les tendances sociales ?\n\nRéponse : ${
			pestel_data.qa_responses.PESTEL_SocialTrends || "Non renseigné"
		}`,
		industry_trends: `Question : Quelles sont les tendances majeures de votre industrie ?\n\nRéponse : ${
			pestel_data.qa_responses.PESTEL_IndustryTrends || "Non renseigné"
		}`,
		competitive: `Question : Comment évaluez-vous la stabilité du paysage concurrentiel ?\n\nRéponse : ${
			pestel_data.qa_responses.PESTEL_Competitive || "Non renseigné"
		}`,
		geographical_trends: `Question : Quelles sont les tendances géographiques ?\n\nRéponse : ${
			pestel_data.qa_responses.PESTEL_GeographicalTrends ||
			"Non renseigné"
		}`,
		infrastructures: `Question : Quelles infrastructures sont cruciales ?\n\nRéponse : ${
			pestel_data.qa_responses.PESTEL_Infrastructures || "Non renseigné"
		}`,
	};

	// Texte complet
	const complete_text = [
		"Analyse PESTEL de l'environnement :",
		...Object.values(formatted_sections).filter(
			(section) => section.trim() !== ""
		),
		"\nAnalyse complémentaire :",
		...Object.values(formatted_qa).filter((qa) => qa.trim() !== ""),
	].join("\n\n");

	return {
		data: normalized_data,
		qa: pestel_data.qa_responses,
		formatted_sections,
		formatted_qa,
		formatted_text: complete_text,
	};
}
