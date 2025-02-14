// lib/openai/config/mappings.ts
import { FieldMappings } from "@/types/openai/mapping";

export const FIELD_MAPPINGS: FieldMappings = {
	canvas: {
		data: {
			channels: "BMC_Channels",
			keyPartners: "BMC_KeyPartners",
			keyResources: "BMC_KeyResources",
			costStructure: "BMC_CostStructure",
			keyActivities: "BMC_KeyActivities",
			revenueStreams: "BMC_RevenueStreams",
			customerSegments: "BMC_CustomerSegments",
			valueProposition: "BMC_ValueProposition",
			customerRelationships: "BMC_CustomerRelationships",
		},
		qa_responses: {
			PRODUITouSERVICE: "PRODUITouSERVICE",
			idée_globale: "idée_globale",
			BMC_CompetitorAnalysis: "BMC_CompetitorAnalysis",
			BMC_MarketPositioning: "BMC_MarketPositioning",
			BMC_IdentificationFournisseurs: "BMC_IdentificationFournisseurs",
			BMC_ProduitCritiquestock: "BMC_ProduitCritiquestock",
			BMC_PolitiquedeCredit: "BMC_PolitiquedeCredit",
			BMC_AntécédentsetFiabilité: "BMC_AntécédentsetFiabilité",
			BMC_RuptureApprovisionnement: "BMC_RuptureApprovisionnement",
			BMC_VariationCoutsFournitures: "BMC_VariationCoutsFournitures",
			OP_Control_POS: "OP_Control_POS",
			OP_Control_inspection: "OP_Control_inspection",
			OP_Control_retourInformation: "OP_Control_retourInformation",
			OP_localisation_restrictions: "OP_localisation_restrictions",
		},
	},
	ansoff: {
		data: {
			development_product: "Ansoff_ProductDevelopment",
			diversification: "Ansoff_Diversification",
			development_market: "Ansoff_MarketDevelopment",
			penetration: "Ansoff_MarketPenetration",
		},
		qa_responses: {
			Ansoff_GrowthStrategy: "Ansoff_GrowthStrategy",
			Ansoff_TechnologicalForecasting: "Ansoff_TechnologicalForecasting",
		},
	},
	competitors: {
		data: {
			id: "id",
			nom: "nom",
			prix: "prix",
			forces: "forces",
			solution: "solution",
			strategie: "strategie",
			faiblesses: "faiblesses",
			impactDirect: "impactDirect",
			valeurPercue: "valeurPercue",
			ciblageClient: "ciblageClient",
			impactIndirect: "impactIndirect",
			zoneGeographique: "zoneGeographique",
		},
	},
	funnel_chart: {
		data: {
			MF_Awareness: "MF_Awareness",
			MF_Consideration: "MF_Consideration",
			MF_Interest: "MF_Interest",
			MF_Intention: "MF_Intention",
			MF_Purchase: "MF_Purchase",
			size: "size",
			color: "color",
			title: "title",
		},
		qa_responses: {
			MF_Loyalty: "MF_Loyalty",
			MF_Advocacy: "MF_Advocacy",
			MF_PainPoints: "MF_PainPoints",
		},
	},
	market_trends: {
		data: {
			trends: "market_trends",
			marketNumbers: "market_numbers",
		},
	},
	marketing_mix: {
		data: {
			place: "7P_Place",
			price: "7P_Price",
			people: "7P_People",
			process: "7P_Process",
			product: "7P_Product",
			promotion: "7P_Promotion",
			physical_evidence: "7P_Physical_Evidence",
		},
		qa_responses: {
			MarketingPlan_Sensibility: "MarketingPlan_Sensibility",
		},
	},
	monthly_projection: {
		data: {
			revenue: "revenue",
			expenses: "expenses",
			M1: "month_1",
			M2: "month_2",
			M3: "month_3",
			M4: "month_4",
			M5: "month_5",
			M6: "month_6",
			M7: "month_7",
			M8: "month_8",
			M9: "month_9",
			M10: "month_10",
			M11: "month_11",
			M12: "month_12",
			category: "category",
		},
		qa_responses: {
			OP_Inventaire_stocktype: "OP_Inventaire_stocktype",
			OP_Inventaire_stockcost: "OP_Inventaire_stockcost",
			OP_Inventaire_stockchurn: "OP_Inventaire_stockchurn",
			OP_Inventaire_stockvariation: "OP_Inventaire_stockvariation",
			OP_Inventaire_stockdelay: "OP_Inventaire_stockdelay",
			OP_Credit_common: "OP_Credit_common",
			OP_Credit_policy: "OP_Credit_policy",
			OP_Credit_verification: "OP_Credit_verification",
			OP_Credit_conditions: "OP_Credit_conditions",
			OP_Credit_slowpayments: "OP_Credit_slowpayments",
			OP_Credit_latepayments: "OP_Credit_latepayments",
		},
	},
	pestel: {
		data: {
			legal: "PESTEL_Legal",
			social: "PESTEL_Social",
			economic: "PESTEL_Economical",
			political: "PESTEL_Political",
			environmental: "PESTEL_Environmental",
			technological: "PESTEL_Technological",
		},
		qa_responses: {
			PESTEL_Opportunities: "PESTEL_Opportunities",
			PESTEL_Threats: "PESTEL_Threats",
			PESTEL_SocialTrends: "PESTEL_SocialTrends",
			PESTEL_IndustryTrends: "PESTEL_IndustryTrends",
			PESTEL_Competitive: "PESTEL_Competitive",
			PESTEL_GeographicalTrends: "PESTEL_GeographicalTrends",
			PESTEL_Infrastructures: "PESTEL_Infrastructures",
			OP_Legal_licenses: "OP_Legal_licenses",
			OP_Legal_officialbrand: "OP_Legal_officialbrand",
			OP_Legal_warranty: "OP_Legal_warranty",
			OP_Legal_environmentalregulations:
				"OP_Legal_environmentalregulations",
			OP_Legal_particularregulations: "OP_Legal_particularregulations",
			OP_Legal_cautions: "OP_Legal_cautions",
		},
	},

	skills_matrix: {
		data: {
			people: "people",
			domains: "domains",
		},
		qa_responses: {
			SkillMatrix_LeadershipOwnership: "SkillMatrix_LeadershipOwnership",
			SkillMatrix_EntrepreneurshipSkills:
				"SkillMatrix_EntrepreneurshipSkills",
			SkillMatrix_Gaps: "SkillMatrix_Gaps",
			SkillMatrix_Training: "SkillMatrix_Training",
			SkillMatrix_ProblemSolving: "SkillMatrix_ProblemSolving",
			SkillMatrix_Creativity: "SkillMatrix_Creativity",
			SkillMatrix_LeadershipSkills: "SkillMatrix_LeadershipSkills",
		},
	},

	startup_expenses: {
		data: {
			risks: "risks",
			capital: "capital",
			revenue: "revenue",
			expenses: "expenses",
			projections: "projections",
			categoryDefinitions: "categoryDefinitions",
		},
	},

	swot: {
		data: {
			threats: "SWOT_Threats",
			strengths: "SWOT_Strengths",
			weaknesses: "SWOT_Weaknesses",
			opportunities: "SWOT_Opportunities",
		},
		qa_responses: {
			SWOT_CompetitorStrengths: "SWOT_CompetitorStrengths",
			SWOT_CompetitorWeaknesses: "SWOT_CompetitorWeaknesses",
			SWOT_EconomiesOfScale: "SWOT_EconomiesOfScale",
			SWOT_OperationalEfficiency: "SWOT_OperationalEfficiency",
		},
	},

	value_proposition: {
		data: {
			gains: "VP_Gains",
			pains: "VP_Pains",
			products: "VP_Product",
			customerJobs: "VP_Customer_Jobs",
			gainCreators: "VP_gainCreators",
			painRelievers: "painRelievers",
		},
		qa_responses: {
			VP_CustomerProfiles: "VP_CustomerProfiles",
			VP_DifferentiationFactors: "VP_DifferentiationFactors",
			VP_CustomerInsights: "VP_CustomerInsights",
			VP_RiskReducers: "VP_RiskReducers",
		},
	},

	yearly_projection: {
		data: {
			revenue: "revenue",
			expenses: "expenses",
			lastUpdated: "lastUpdated",
		},
	},
};

// Type guard pour vérifier la validité des mappings
export function isValidMapping(mapping: unknown): mapping is FieldMappings {
	if (typeof mapping !== "object" || mapping === null) {
		return false;
	}

	for (const [key, value] of Object.entries(mapping)) {
		if (typeof value !== "object" || value === null) {
			return false;
		}

		if ("data" in value && typeof value.data !== "object") {
			return false;
		}

		if ("qa_responses" in value && typeof value.qa_responses !== "object") {
			return false;
		}
	}

	return true;
}

// Fonction utilitaire pour accéder aux mappings de manière sécurisée
export function getMappingForAnalysis(
	analysisType: string,
	dataType: "data" | "qa_responses"
): Record<string, string> {
	const mapping = FIELD_MAPPINGS[analysisType]?.[dataType];
	if (!mapping) {
		throw new Error(`Mapping non trouvé pour ${analysisType}.${dataType}`);
	}
	return mapping;
}
