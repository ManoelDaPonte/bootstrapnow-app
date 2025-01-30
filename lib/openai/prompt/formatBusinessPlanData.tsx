// lib/business-plan/prompt/formatBusinessPlanData.ts
interface FormattedItem {
	title: string;
	description: string;
}

export const formatArrayData = (
	items: FormattedItem[] | null | undefined
): string => {
	if (!items || items.length === 0) return "NA";
	return items
		.map((item) => `${item.title} (${item.description})`)
		.join("; ");
};

export const formatBusinessPlanData = (data: any) => {
	return {
		// Business Model Canvas
		// BMC (Business Model Canvas)
		"BMC_KeyActivities": formatArrayData(data.canvas?.keyActivities),
		"BMC_ValueProposition": formatArrayData(data.canvas?.valueProposition),
		"BMC_CustomerSegments": formatArrayData(data.canvas?.customerSegments),
		"BMC_Channels": formatArrayData(data.canvas?.channels),
		"BMC_CustomerRelationships": formatArrayData(data.canvas?.customerRelationships),
		"BMC_RevenueStreams": formatArrayData(data.canvas?.revenueStreams),
		"BMC_KeyResources": formatArrayData(data.canvas?.keyResources),
		"BMC_KeyPartners": formatArrayData(data.canvas?.keyPartners),
		"BMC_CostStructure": formatArrayData(data.canvas?.costStructure),
		//Questions
		"BMC_CompetitorAnalysis": formatArrayData(data.canvas?.competitoranalysis),
		"BMC_MarketPositioning": formatArrayData(data.canvas?.marketpositioning),

		// Marketing Funnel
		"MF_Awareness": formatArrayData(data.marketingFunnel?.awareness),
		"MF_Interest": formatArrayData(data.marketingFunnel?.interest),
		"MF_Consideration": formatArrayData(data.marketingFunnel?.consideration),
		"MF_Intent": formatArrayData(data.marketingFunnel?.intent),
		"MF_Purchase": formatArrayData(data.marketingFunnel?.purchase),
		//Questions
		"MF_Loyalty": formatArrayData(data.marketingFunnel?.loyalty),
		"MF_Advocacy": formatArrayData(data.marketingFunnel?.advocacy),
		"MF_PainPoints": formatArrayData(data.marketingFunnel?.painpoints),

		// 7P (Marketing Mix)
		"7P_Product": formatArrayData(data.sevenP?.product),
		"7P_Price": formatArrayData(data.sevenP?.price),
		"7P_Place": formatArrayData(data.sevenP?.place),
		"7P_Promotion": formatArrayData(data.sevenP?.promotion),
		"7P_People": formatArrayData(data.sevenP?.people),
		"7P_Process": formatArrayData(data.sevenP?.process),
		"7P_PhysicalEvidence": formatArrayData(data.sevenP?.physicalEvidence),

		// PESTEL (Political, Economic, Social, Technological, Environmental, Legal)
		"PESTEL_Political": formatArrayData(data.pestel?.political),
		"PESTEL_Economic": formatArrayData(data.pestel?.economic),
		"PESTEL_Social": formatArrayData(data.pestel?.social),
		"PESTEL_Technological": formatArrayData(data.pestel?.technological),
		"PESTEL_Environmental": formatArrayData(data.pestel?.environmental),
		"PESTEL_Legal": formatArrayData(data.pestel?.legal),
		"PESTEL_MarketTrends": formatArrayData(data.pestel?.markettrends),
		//Questions
		"PESTEL_Opportunities": formatArrayData(data.pestel?.opportunities),
		"PESTEL_Threats": formatArrayData(data.pestel?.threats),
		"PESTEL_SocialTrends": formatArrayData(data.pestel?.socialtrends),
		"PESTEL_IndustryTrends": formatArrayData(data.pestel?.industrytrends),
		"PESTEL_Competitive": formatArrayData(data.pestel?.competitive),
		"PESTEL_GeographicalTrends": formatArrayData(data.pestel?.geographicaltrends),
		"PESTEL_Infrastructures": formatArrayData(data.pestel?.infrastructures),

		// Ansoff Matrix
		"Ansoff_MarketPenetration": formatArrayData(data.ansoff?.marketPenetration),
		"Ansoff_ProductDevelopment": formatArrayData(data.ansoff?.productDevelopment),
		"Ansoff_MarketDevelopment": formatArrayData(data.ansoff?.marketDevelopment),
		"Ansoff_Diversification": formatArrayData(data.ansoff?.diversification),
		//Questions
		"Ansoff_GrowthStrategy": formatArrayData(data.ansoff?.growthstrategy),

		// SWOT (Strengths, Weaknesses, Opportunities, Threats)
		"SWOT_Strengths": formatArrayData(data.swot?.strengths),
		"SWOT_Weaknesses": formatArrayData(data.swot?.weaknesses),
		"SWOT_Opportunities": formatArrayData(data.swot?.opportunities),
		"SWOT_Threats": formatArrayData(data.swot?.threats),
		//Questions
		"SWOT_CompetitorStrengths": formatArrayData(data.swot?.competitorstrengths),
		"SWOT_CompetitorWeaknesses": formatArrayData(data.swot?.competitorweaknesses),
		"SWOT_EconomiesOfScale": formatArrayData(data.swot?.economiesofscale),
		"SWOT_OperationalEfficiency": formatArrayData(data.swot?.operationalefficiency),

		// Value Proposition
		"VP_Product": formatArrayData(data.valueProposition?.product),
		"VP_Problem": formatArrayData(data.valueProposition?.problem),
		"VP_Solution": formatArrayData(data.valueProposition?.solution),
		"VP_Jobs": formatArrayData(data.valueProposition?.job),
		"VP_Pains": formatArrayData(data.valueProposition?.pain),
		"VP_Gains": formatArrayData(data.valueProposition?.gain),
		//Questions
		"VP_CustomerProfiles": formatArrayData(data.valueProposition?.customerprofiles),
		"VP_DifferentiationFactors": formatArrayData(data.valueProposition?.differentiationfactors),
		"VP_CustomerInsights": formatArrayData(data.valueProposition?.customerinsights),
		"VP_RiskReducers": formatArrayData(data.valueProposition?.riskreducers),
		"VP_TrustBuilding": formatArrayData(data.valueProposition?.trustbuilding),

		// Skill Matrix
		"SkillMatrix_TechnicalSkills": formatArrayData(data.skillMatrix?.technicalSkills),
		"SkillMatrix_ManagementSkills": formatArrayData(data.skillMatrix?.managementSkills),
		"SkillMatrix_CommunicationSkills": formatArrayData(data.skillMatrix?.communicationSkills),
		"SkillMatrix_LeadershipSkills": formatArrayData(data.skillMatrix?.leadershipSkills),
		"SkillMatrix_ProblemSolving": formatArrayData(data.skillMatrix?.problemSolving),
		"SkillMatrix_Creativity": formatArrayData(data.skillMatrix?.creativity),
		//Questions
		"SkillMatrix_EntrepreneurshipSkills": formatArrayData(data.skillMatrix?.entrepreneurshipSkills),
		"SkillMatrix_Gaps": formatArrayData(data.skillMatrix?.gaps),
		"SkillMatrix_Training": formatArrayData(data.skillMatrix?.training),
		"SkillMatrix_LeadershipOwnership": formatArrayData(data.skillMatrix?.ownership),

		// FP_D1 (Financial Plan - Day 1)
		"FP_D1_Revenue": formatArrayData(data.fpD1?.revenue),
		"FP_D1_Costs": formatArrayData(data.fpD1?.costs),
		"FP_D1_Profit": formatArrayData(data.fpD1?.profit),
		"FP_D1_CashFlow": formatArrayData(data.fpD1?.cashFlow),
		"FP_D1_Investments": formatArrayData(data.fpD1?.investments),
		"FP_D1_Assets": formatArrayData(data.fpD1?.assets),
		"FP_D1_Liabilities": formatArrayData(data.fpD1?.liabilities),
		"FP_RiskAssessment": formatArrayData(data.fpD1?.risks),		

		// FP_12M (Financial Plan - 12 Months)
		"FP_12M_Revenue": formatArrayData(data.fp12M?.revenue),
		"FP_12M_Costs": formatArrayData(data.fp12M?.costs),
		"FP_12M_Profit": formatArrayData(data.fp12M?.profit),
		"FP_12M_CashFlow": formatArrayData(data.fp12M?.cashFlow),
		"FP_12M_Investments": formatArrayData(data.fp12M?.investments),
		"FP_12M_Assets": formatArrayData(data.fp12M?.assets),
		"FP_12M_Liabilities": formatArrayData(data.fp12M?.liabilities),

		// FP_3Y (Financial Plan - 3 Years)
		"FP_3Y_Revenue": formatArrayData(data.fp3Y?.revenue),
		"FP_3Y_Costs": formatArrayData(data.fp3Y?.costs),
		"FP_3Y_Profit": formatArrayData(data.fp3Y?.profit),
		"FP_3Y_CashFlow": formatArrayData(data.fp3Y?.cashFlow),
		"FP_3Y_Investments": formatArrayData(data.fp3Y?.investments),
		"FP_3Y_Assets": formatArrayData(data.fp3Y?.assets),
		"FP_3Y_Liabilities": formatArrayData(data.fp3Y?.liabilities),

		// FP_Q (Questions)
		"FP_TaxLegalConsiderations": formatArrayData(data.fpQ?.taxlegal),
		"FP_Funding": formatArrayData(data.fpQ?.funding),
		"FP_CapitalNeeds": formatArrayData(data.fpQ?.capitalneeds),
		"FP_Budget": formatArrayData(data.fpQ?.budget),
		"FP_ExternalCost": formatArrayData(data.fpQ?.externalcost),
	};
};
