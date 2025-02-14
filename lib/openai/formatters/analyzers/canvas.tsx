// lib/openai/formatters/analyzers/canvas.ts
import { FormattedAnalysis } from "@/types/openai/analysis";
export function format_canvas(data: any): FormattedAnalysis {
	const canvas_data = data.canvas;

	if (!canvas_data?.data || !canvas_data?.qa_responses) {
		console.warn("Données Canvas invalides ou manquantes:", canvas_data);
		return {
			data: {},
			formatted_sections: {},
			formatted_text: "",
			formatted_qa: {},
		};
	}

	// Normalisation avec vérification
	const normalized_data = {
		key_partners: ensureArray(canvas_data.data.BMC_KeyPartners),
		key_activities: ensureArray(canvas_data.data.BMC_KeyActivities),
		key_resources: ensureArray(canvas_data.data.BMC_KeyResources),
		value_proposition: ensureArray(canvas_data.data.BMC_ValueProposition),
		customer_relationships: ensureArray(
			canvas_data.data.BMC_CustomerRelationships
		),
		channels: ensureArray(canvas_data.data.BMC_Channels),
		customer_segments: ensureArray(canvas_data.data.BMC_CustomerSegments),
		cost_structure: ensureArray(canvas_data.data.BMC_CostStructure),
		revenue_streams: ensureArray(canvas_data.data.BMC_RevenueStreams),
	};

	// Helper function pour assurer qu'on a toujours un tableau
	function ensureArray(data: any): any[] {
		if (Array.isArray(data)) return data;
		if (typeof data === "string")
			return [{ title: "Item", description: data }];
		return [];
	}

	// Formatage des sections avec validation
	const formatted_sections: Record<string, string> = {};
	for (const [key, items] of Object.entries(normalized_data)) {
		const title = key
			.split("_")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");

		formatted_sections[key] = [
			`${title} :`,
			...items.map((item) => {
				if (typeof item === "object" && item !== null) {
					return `- ${item.title || ""}: ${item.description || ""}`;
				}
				return `- ${item || ""}`;
			}),
		].join("\n");
	}

	const formatted_qa = {
		idee_globale: `Question : Quelle est l'idée globale de votre projet ?\n\nRéponse : ${
			canvas_data.qa_responses.idée_globale || "Non renseigné"
		}`,
		market_positioning: `Question : Comment vous positionnez-vous sur le marché ?\n\nRéponse : ${
			canvas_data.qa_responses.BMC_MarketPositioning || "Non renseigné"
		}`,
		control_pos: `Question : Comment contrôlez-vous vos points de vente ?\n\nRéponse : ${
			canvas_data.qa_responses.OP_Control_POS || "Non renseigné"
		}`,
		produit_ou_service: `Question : Quel est votre produit ou service ?\n\nRéponse : ${
			canvas_data.qa_responses.PRODUITouSERVICE || "Non renseigné"
		}`,
		politique_de_credit: `Question : Quelle est votre politique de crédit ?\n\nRéponse : ${
			canvas_data.qa_responses.BMC_PolitiquedeCredit || "Non renseigné"
		}`,
		control_inspection: `Question : Comment contrôlez-vous l'inspection de vos produits ?\n\nRéponse : ${
			canvas_data.qa_responses.OP_Control_inspection || "Non renseigné"
		}`,
		competitor_analysis: `Question : Quelle est votre analyse de la concurrence ?\n\nRéponse : ${
			canvas_data.qa_responses.BMC_CompetitorAnalysis || "Non renseigné"
		}`,
		produit_critique_stock: `Question : Quel est votre produit critique en stock ?\n\nRéponse : ${
			canvas_data.qa_responses.BMC_ProduitCritiquestock || "Non renseigné"
		}`,
		rupture_approvisionnement: `Question : Comment gérez-vous les ruptures d'approvisionnement ?\n\nRéponse : ${
			canvas_data.qa_responses.BMC_RuptureApprovisionnement ||
			"Non renseigné"
		}`,
		control_retour_information: `Question : Comment contrôlez-vous les retours d'information ?\n\nRéponse : ${
			canvas_data.qa_responses.OP_Control_retourInformation ||
			"Non renseigné"
		}`,
		localisation_restrictions: `Question : Avez-vous des restrictions de localisation ?\n\nRéponse : ${
			canvas_data.qa_responses.OP_localisation_restrictions ||
			"Non renseigné"
		}`,
		antecedents_et_fiabilite: `Question : Quels sont vos antécédents et votre fiabilité ?\n\nRéponse : ${
			canvas_data.qa_responses.BMC_AntécédentsetFiabilité ||
			"Non renseigné"
		}`,
		variation_couts_fournitures: `Question : Comment gérez-vous les variations des coûts de fournitures ?\n\nRéponse : ${
			canvas_data.qa_responses.BMC_VariationCoutsFournitures ||
			"Non renseigné"
		}`,
		identification_fournisseurs: `Question : Comment identifiez-vous vos fournisseurs ?\n\nRéponse : ${
			canvas_data.qa_responses.BMC_IdentificationFournisseurs ||
			"Non renseigné"
		}`,
	};

	// Création du texte complet
	const complete_text = [
		"Business Model Canvas :",
		...Object.values(formatted_sections),
		"\nAnalyse complémentaire :",
		...Object.values(formatted_qa),
	].join("\n\n");

	return {
		data: normalized_data,
		qa: canvas_data.qa_responses,
		formatted_sections,
		formatted_qa,
		formatted_text: complete_text,
	};
}
