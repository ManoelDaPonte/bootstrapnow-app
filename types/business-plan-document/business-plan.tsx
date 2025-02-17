// types/business-plan.ts
export type Status = "pending" | "generating" | "completed" | "error";

export const BUSINESS_PLAN_SECTIONS = [
	"ES_Overview",
	"ES_Description",
	// "ES_Goal_123",
	// "ES_Target_market",
	// "ES_competition",
	// "ES_management_team",
	// "ES_financial_outlook",
	// "Company_mission_statement",
	// "Company_philosophy_and_vision",
	// "Company_goals_longTerm",
	// "Company_goals_shortandmidTerm",
	// "Company_target_market",
	// "Company_industry",
	// "Company_industry_b",
	// "PnS_What",
	// "PnS_Why",
	// "PnS_Competitive",
	// "PnS_HowMuch",
	// "Market_SizeAndTrends",
	// "Market_evolution",
	// "Market_competency",
	// "Market_MaxShare",
	// "BarriersToEntry_obstaclesStartup",
	// "BarriersToEntry_obstaclesProduction",
	// "BarriersToEntry_risks",
	// "BarriersToEntry_economicalInfluence",
	// "BarriersToEntry_trends",
	// "BarriersToEntry_opportunities",
	// "BarriersToEntry_competencyRisks",
	// "SWOT_Strengths",
	// "SWOT_Weaknesses",
	// "SWOT_Opportunities",
	// "SWOT_Threats",
	// "SWOT_Analysis",
	// "MarketingPlan_Caracteristiques",
	// "MarketingPlan_Avantages",
	// "MarketingPlan_Livraison",
	// "MarketingPlan_Garanties",
	// "MarketingPlan_Contrats",
	// "MarketingPlan_SAV",
	// "MarketingPlan_Formation",
	// "MarketingPlan_BuyerPersona",
	// "MarketingPlan_KeyCompetitors",
	// "MarketingPlan_Niche",
	// "MarketingPlan_Niche_b",
	// "MarketingPlan_Niche_c",
	// "MarketingPlan_Niche_d",
	// "MarketingPlan_HOW",
	// "MarketingPlan_Tactics",
	// "MarketingPlan_PromotionalBudget",
	// "MarketingPlan_LogoAndBranding",
	// "MarketingPlan_FirstConclusion",
	// "MarketingPlan_PricingStrategy",
	// "MarketingPlan_PricingStrategy_competitors",
	// "MarketingPlan_PricingStrategy_Clientelle",
	// "MarketingPlan_LocationYY",
	// "MarketingPlan_DistributionChannel",
	// "MarketingPlan_PartnershipsAndDistributors",
	// "MarketingPlan_ChannelConclusion",
	// "OP_Production",
	// "OP_Production_ressources",
	// "OP_Production_cost",
	// "OP_Production_efficiency",
	// "OP_QualityControl",
	// "OP_QualityControl_b",
	// "OP_QualityControl_c",
	// "OP_Location",
	// "OP_Location_b",
	// "OP_Legal_data",
	// "OP_Personnel",
	// "OP_numbers",
	// "OP_costStructure",
	// "OP_Inventaire",
	// "OP_Fournisseurs_List",
	// "OP_Fournisseurs_Type",
	// "OP_Fournisseurs_Politics",
	// "OP_Fournisseurs_Reliability",
	// "OP_Fournisseurs_Crash",
	// "OP_Fournisseurs_Critical",
	// "OP_Credit",
	// "OP_Credit_Politics",
	// "OP_Credit_Verif",
	// "OP_Credit_Conds",
	// "OP_Credit_Cost",
	// "OP_Credit_Payments",
	// "Management_Biographies",
	// "Management_Gaps",
	// "StartupExpenses",
	// "OpeningDay_BalanceSheet",
	// "FP_12monthsProfitAndLoss",
	// "FP_3years",
] as const;

export type BusinessPlanSection = (typeof BUSINESS_PLAN_SECTIONS)[number];

export interface SectionStatus {
	section: BusinessPlanSection;
	status: Status;
	content?: string;
	error?: string;
}

export interface GenerationState {
	status: "idle" | "generating" | "completed" | "error";
	sections: SectionStatus[];
	currentSection?: BusinessPlanSection;
}

export interface Generation {
	id: string;
	createdAt: string;
	docxUrl?: string;
	status: Status;
}

export interface GenerationStep {
	id: string;
	label: string;
	status: "pending" | "in-progress" | "completed" | "error";
}
