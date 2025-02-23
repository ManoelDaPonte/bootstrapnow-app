// lib/openai/config/sections.tsx
export const BUSINESS_PLAN_SECTIONS = {
	ES_Overview: {
		title: "Vue globale de l'entreprise",
		paths: [
			["canvas", "formatted_sections", "key_activities"],
			["canvas", "formatted_sections", "value_proposition"],
			["canvas", "formatted_sections", "customer_segments"],
			["pestel", "formatted_qa", "opportunities"],
			["pestel", "formatted_qa", "threats"],
			["swot", "formatted_sections", "strengths"],
			["swot", "formatted_sections", "opportunities"],
			["ansoff", "formatted_qa", "growth_strategy"],
		],
	},
	ES_Description: {
		title: "Description du produit/service",
		paths: [
			["value_proposition", "formatted_sections", "customer_jobs"],
			["value_proposition", "formatted_sections", "pains"],
			["value_proposition", "formatted_sections", "gains"],
			["value_proposition", "formatted_sections", "products"],
			["canvas", "formatted_sections", "value_proposition"],
			["canvas", "formatted_sections", "customer_segments"],
			["swot", "formatted_sections", "strengths"],
			["swot", "formatted_sections", "opportunities"],
			["funnel_chart", "formatted_qa", "pain_points"],
			["funnel_chart", "formatted_sections", "visibilité"],
		],
	},
	ES_Goal_123: {
		title: "Objectifs à court, moyen et long terme",
		paths: [
			["canvas", "formatted_sections", "key_activities"],
			["canvas", "formatted_sections", "revenue_streams"],
			["swot", "formatted_sections", "opportunities"],
			["swot", "formatted_sections", "threats"],
			["ansoff", "formatted_qa", "growth_strategy"],
			["startup_expenses", "formatted_sections", "capital"],
			["monthly_projection", "formatted_sections", "summary"],
			["yearly_projection", "formatted_sections", "trend_analysis"],
			["startup_expenses", "formatted_sections", "financial"],
			["monthly_projection", "formatted_sections", "growth_analysis"],
			["yearly_projection", "formatted_sections", "yearly_analysis"],
		],
	},
	ES_Target_market: {
		title: "Marché cible",
		paths: [
			["canvas", "formatted_sections", "customer_segments"],
			["funnel_chart", "formatted_sections", "visibilité"],
			["funnel_chart", "formatted_sections", "intérêt"],
			["value_proposition", "formatted_qa", "vp_customer_profiles"],
			["pestel", "formatted_sections", "social"],
		],
	},
	ES_competition: {
		title: "Concurrence",
		paths: [
			["canvas", "formatted_sections", "value_proposition"],
			["competitors", "formatted_text"],
			["swot", "formatted_sections", "strengths"],
			["swot", "formatted_sections", "weaknesses"],
			["swot", "formatted_sections", "threats"],
			["funnel_chart", "formatted_sections", "considération"],
			["funnel_chart", "formatted_sections", "achat"],
			["value_proposition", "formatted_qa", "vp_differentiation_factors"],
		],
	},
	ES_management_team: {
		title: "Équipe de direction",
		paths: [
			["skills_matrix", "formatted_text"],
			["skills_matrix", "formatted_qa", "leadership_skills"],
			["canvas", "formatted_sections", "key_resources"],
			["swot", "formatted_sections", "strengths"],
			["marketing_mix", "formatted_sections", "people"],
		],
	},
	ES_financial_outlook: {
		title: "Perspectives financières",
		paths: [
			["startup_expenses", "formatted_sections", "capital"],
			["monthly_projection", "formatted_sections", "monthly_analysis"],
			["yearly_projection", "formatted_sections", "yearly_analysis"],
			["startup_expenses", "formatted_sections", "expenses"],
			["monthly_projection", "formatted_sections", "growth_analysis"],
			["yearly_projection", "formatted_sections", "trend_analysis"],
			["canvas", "formatted_sections", "revenue_streams"],
			["canvas", "formatted_sections", "cost_structure"],
			["swot", "formatted_sections", "opportunities"],
			["swot", "formatted_sections", "threats"],
			["ansoff", "formatted_sections", "market_development"],
			["ansoff", "formatted_sections", "diversification"],
			["yearly_projection", "formatted_sections", "summary"],
		],
	},

	Company_mission_statement: {
		title: "Mission de l'entreprise",
		paths: [
			["canvas", "formatted_sections", "value_proposition"],
			["canvas", "formatted_sections", "customer_segments"],
			["value_proposition", "formatted_sections", "customer_jobs"],
			["value_proposition", "formatted_sections", "pains"],
			["swot", "formatted_sections", "opportunities"],
		],
	},

	Company_philosophy_and_vision: {
		title: "Mission de l'entreprise",
		paths: [
			["marketing_mix", "formatted_sections", "people"],
			["pestel", "formatted_sections", "social"],
			["swot", "formatted_sections", "strengths"],
		],
	},

	Company_goals_longTerm: {
		title: "Mission de l'entreprise",
		paths: [
			["ansoff", "formatted_sections", "market_development"],
			["pestel", "formatted_qa", "industry_trends"],
			["swot", "formatted_sections", "opportunities"],
		],
	},

	Company_goals_shortandmidTerm: {
		title: "Mission de l'entreprise",
		paths: [
			["monthly_projection", "formatted_sections", "monthly_analysis"],
			["monthly_projection", "formatted_sections", "expenses_analysis"],
			["monthly_projection", "formatted_sections", "growth_analysis"],
			["ansoff", "formatted_sections", "market_development"],
			["ansoff", "formatted_sections", "diversification"],
			["canvas", "formatted_sections", "key_activities"],
		],
	},

	Company_target_market: {
		title: "Mission de l'entreprise",
		paths: [
			["canvas", "formatted_sections", "customer_segments"],
			["market_trends", "formatted_text"],
			["value_proposition", "formatted_qa", "vp_customer_profiles"],
			["pestel", "formatted_qa", "opportunities"],
		],
	},

	Company_industry: {
		title: "Mission de l'entreprise",
		paths: [
			["pestel", "formatted_sections", "economic"],
			["pestel", "formatted_sections", "technological"],
			["swot", "formatted_sections", "opportunities"],
			["swot", "formatted_sections", "threats"],
		],
	},

	Company_industry_b: {
		title: "Mission de l'entreprise",
		paths: [
			["swot", "formatted_sections", "strengths"],
			["value_proposition", "formatted_qa", "vp_differentiation_factors"],
			["competitors", "formatted_text"],
		],
	},

	Company_legal_structure: {
		title: "Structure légale",
		paths: [
			["pestel", "formatted_qa", "legal_licenses"],
			["pestel", "formatted_qa", "legal_official_brand"],
			["pestel", "formatted_qa", "legal_warranty"],
			["startup_expenses", "formatted_qa", "tax_legal"],
			["pestel", "formatted_sections", "economic"],
			["canvas", "formatted_sections", "cost_structure"],
		],
	},
	PESTEL_chart_P: {
		title: "Pestel, politique",
		paths: [
			["pestel", "formatted_sections", "political"],
		],
	},
	PESTEL_chart_E1: {
		title: "Pestel, politique",
		paths: [
			["pestel", "formatted_sections", "economic"],
		],
	},
	PESTEL_chart_S: {
		title: "Pestel, social",
		paths: [
			["pestel", "formatted_sections", "social"],
		],
	},
	PESTEL_chart_T: {
		title: "Pestel, technologique",
		paths: [
			["pestel", "formatted_sections", "technological"],
		],
	},
	PESTEL_chart_E2: {
		title: "Pestel, environnemental",
		paths: [
			["pestel", "formatted_sections", "environmental"],
		],
	},
	PESTEL_chart_L: {
		title: "Pestel, legal",
		paths: [
			["pestel", "formatted_sections", "legal"],
		],
	},
	PnS_What: {
		title: "Produit et Services : Quoi",
		paths: [
			["canvas", "formatted_sections", "value_proposition"],
			["canvas", "formatted_sections", "key_activities"],
			["canvas", "formatted_sections", "key_resources"],
			["canvas", "formatted_sections", "key_partners"],
			["pestel", "formatted_sections", "economic"],
			["pestel", "formatted_sections", "technological"],
		],
	},
	PnS_Why: {
		title: "Produit et Services : Pourquoi",
		paths: [
			["value_proposition", "formatted_sections", "customer_jobs"],
			["value_proposition", "formatted_sections", "pains"],
			["pestel", "formatted_qa", "opportunities"],
			["market_trends", "formatted_sections", "trends_summary"],
			["swot", "formatted_sections", "opportunities"],
			["canvas", "formatted_qa", "market_positioning"],
			["value_proposition", "formatted_sections", "gains"],
		],
	},
	PnS_Competitive: {
		title: "Produit et Services : Competitif",
		paths: [
			["swot", "formatted_sections", "strengths"],
			["canvas", "formatted_sections", "key_resources"],
			["value_proposition", "formatted_sections", "gains"],
			["swot", "formatted_sections", "opportunities"],
			["swot", "formatted_sections", "threats"],
		],
	},
	PnS_HowMuch: {
		title: "Produit et Services : Combien",
		paths: [
			["swot", "formatted_sections", "strengths"],
			["canvas", "formatted_sections", "key_resources"],
			["canvas", "formatted_sections", "cost_structure"],
			["canvas", "formatted_sections", "revenue_streams"],
			["value_proposition", "formatted_sections", "gains"],
			["swot", "formatted_sections", "opportunities"],
			["swot", "formatted_sections", "threats"],
			["pestel", "formatted_sections", "technological"],
		],
	},
	Market_SizeAndTrends: {
		title: "Marché : Taille et tendances",
		paths: [
			["market_trends", "formatted_sections", "trends_summary"],
			["market_trends", "formatted_sections", "market_numbers"],
			["pestel", "formatted_sections", "economic"],
			["pestel", "formatted_qa", "industry_trends"],
			["swot", "formatted_sections", "opportunities"],
			["swot", "formatted_sections", "threats"],
			["canvas", "formatted_sections", "customer_segments"],
			["value_proposition", "formatted_sections", "customer_jobs"],
			["pestel", "formatted_sections", "technological"],
		],
	},
	Market_evolution: {
		title: "Évolution du marché",
		paths: [
			["canvas", "formatted_sections", "customer_segments"],
			["value_proposition", "formatted_sections", "customer_jobs"],
			["value_proposition", "formatted_sections", "pains"],
			["pestel", "formatted_qa", "social_trends"],
			["ansoff", "formatted_sections", "market_development"],
		],
	},
	Market_competency: {
		title: "Compétiteurs du marché",
		paths: [
			["canvas", "formatted_qa", "market_positioning"],
			["swot", "formatted_qa", "competitor_strengths"],
			["swot", "formatted_qa", "competitor_weaknesses"],
			["value_proposition", "formatted_sections", "gains"],
			["pestel", "formatted_qa", "competitive"],
		],
	},
	Market_MaxShare: {
		title: "Parts de marché atteignable",
		paths: [
			["monthly_projection", "formatted_text"],
			["yearly_projection", "formatted_text"],
			["funnel_chart", "formatted_sections", "visibilité"],
			["funnel_chart", "formatted_qa", "loyalty"],
			["value_proposition", "formatted_sections", "gains"],
			["swot", "formatted_sections", "opportunities"],
		],
	},
	BarriersToEntry_obstaclesStartup: {
		title: "Barrière à l'entrée",
		paths: [
			["canvas", "formatted_sections", "cost_structure"],
			["startup_expenses", "formatted_sections", "expenses"],
			["startup_expenses", "formatted_text"],
			["startup_expenses", "formatted_sections", "capital"],
			["startup_expenses", "formatted_qa", "funding"],
			["startup_expenses", "formatted_qa", "capital_needs"],
			["canvas", "formatted_sections", "key_partners"],
		],
	},
	BarriersToEntry_obstaclesProduction: {
		title: "Barrière à l'entrée",
		paths: [
			["canvas", "formatted_sections", "key_resources"],
			["canvas", "formatted_sections", "cost_structure"],
			["swot", "formatted_sections", "strengths"],
			["swot", "formatted_qa", "economies_of_scale"],
			["swot", "formatted_qa", "operational_efficiency"],
			["canvas", "formatted_sections", "key_partners"],
			["value_proposition", "formatted_sections", "gains"],
		],
	},
	BarriersToEntry_risks: {
		title: "Barrière à l'entrée",
		paths: [
			["pestel", "formatted_sections", "technological"],
			["canvas", "formatted_sections", "key_resources"],
			["swot", "formatted_sections", "threats"],
			["value_proposition", "formatted_sections", "gains"],
			["ansoff", "formatted_sections", "product_development"],
			["ansoff", "formatted_sections", "technological_forecasting"],
		],
	},
	BarriersToEntry_economicalInfluence: {
		title: "Barrière à l'entrée",
		paths: [
			["pestel", "formatted_sections", "economic"],
			["swot", "formatted_sections", "threats"],
			["canvas", "formatted_sections", "key_resources"],
			["startup_expenses", "formatted_sections", "risks"],
		],
	},
	BarriersToEntry_trends: {
		title: "Barrière à l'entrée",
		paths: [
			["pestel", "formatted_qa", "industry_trends"],
			["swot", "formatted_sections", "opportunities"],
			["value_proposition", "formatted_sections", "pains"],
			["value_proposition", "formatted_sections", "gains"],
			["ansoff", "formatted_sections", "market_development"],
			["ansoff", "formatted_sections", "product_development"],
			["canvas", "formatted_sections", "customer_segments"],
			["canvas", "formatted_sections", "value_proposition"],
		],
	},
	BarriersToEntry_opportunities: {
		title: "Barrière à l'entrée",
		paths: [
			["ansoff", "formatted_sections", "market_development"],
			["pestel", "formatted_qa", "geographical_trends"],
			["swot", "formatted_sections", "opportunities"],
			["canvas", "formatted_sections", "customer_segments"],
			["canvas", "formatted_sections", "value_proposition"],
			["canvas", "formatted_sections", "key_partners"],
			["canvas", "formatted_sections", "channels"],
		],
	},
	BarriersToEntry_competencyRisks: {
		title: "Barrière à l'entrée",
		paths: [
			["swot", "formatted_sections", "threats"],
			["value_proposition", "formatted_sections", "gains"],
			["canvas", "formatted_qa", "market_positioning"],
			["competitors", "formatted_text"],
			["swot", "formatted_sections", "strengths"],
			["canvas", "formatted_sections", "key_activities"],
			["canvas", "formatted_sections", "customer_relationships"],
		],
	},
	SWOT_Strengths: {
		title: "Analyse des forces",
		paths: [
			["canvas", "formatted_qa", "idee_globale"],
			["swot", "formatted_sections", "strengths"],
			["swot", "formatted_sections", "weaknesses"],
			["swot", "formatted_sections", "opportunities"],
			["swot", "formatted_sections", "threats"],
		],
	},
	SWOT_Weaknesses: {
		title: "Analyse des faiblesses",
		paths: [
			["canvas", "formatted_qa", "idee_globale"],
			["swot", "formatted_sections", "strengths"],
			["swot", "formatted_sections", "weaknesses"],
			["swot", "formatted_sections", "opportunities"],
			["swot", "formatted_sections", "threats"],
		],
	},
	SWOT_Opportunities: {
		title: "Analyse des opportunités",
		paths: [
			["canvas", "formatted_qa", "idee_globale"],
			["swot", "formatted_sections", "strengths"],
			["swot", "formatted_sections", "weaknesses"],
			["swot", "formatted_sections", "opportunities"],
			["swot", "formatted_sections", "threats"],
		],
	},
	SWOT_Threats: {
		title: "Analyse des menaces",
		paths: [
			["canvas", "formatted_qa", "idee_globale"],
			["swot", "formatted_sections", "strengths"],
			["swot", "formatted_sections", "weaknesses"],
			["swot", "formatted_sections", "opportunities"],
			["swot", "formatted_sections", "threats"],
		],
	},
	SWOT_Analysis: {
		title: "Analyse SWOT",
		paths: [
			["canvas", "formatted_qa", "idee_globale"],
			["swot", "formatted_sections", "strengths"],
			["swot", "formatted_sections", "weaknesses"],
			["swot", "formatted_sections", "opportunities"],
			["swot", "formatted_sections", "threats"],
		],
	},
	BMC_chart_key_partners:{
		title: "Business modèle, activités clés",
		paths: [
			["canvas", "formatted_sections", "key_partners"],
		],
	},
	BMC_chart_key_activities:{
		title: "Business modèle, activités clés",
		paths: [
			["canvas", "formatted_sections", "key_activities"],
		],
	},
	BMC_chart_value_proposition:{
		title: "Business modèle, activités clés",
		paths: [
			["canvas", "formatted_sections", "value_proposition"],
		],
	},
	BMC_chart_key_resources:{
		title: "Business modèle, activités clés",
		paths: [
			["canvas", "formatted_sections", "key_resources"],
		],
	},
	BMC_chart_channels:{
		title: "Business modèle, activités clés",
		paths: [
			["canvas", "formatted_sections", "channels"],
		],
	},
	BMC_chart_customer_relationship:{
		title: "Business modèle, activités clés",
		paths: [
			["canvas", "formatted_sections", "customer_relationships"],
		],
	},
	BMC_chart_customer_segments:{
		title: "Business modèle, activités clés",
		paths: [
			["canvas", "formatted_sections", "customer_segments"],
		],
	},
	BMC_chart_cost_structure:{
		title: "Business modèle, activités clés",
		paths: [
			["canvas", "formatted_sections", "cost_structure"],
		],
	},
	BMC_chart_revenus:{
		title: "Business modèle, activités clés",
		paths: [
			["canvas", "formatted_sections", "revenue_streams"],
		],
	},
	MarketingPlan_Caracteristiques: {
		title: "Barrière à l'entrée",
		paths: [
			["value_proposition", "formatted_sections", "products"],
			["canvas", "formatted_sections", "key_resources"],
			["swot", "formatted_sections", "strengths"],
			["canvas", "formatted_sections", "value_proposition"],
			["canvas", "formatted_sections", "key_activities"],
			["swot", "formatted_sections", "opportunities"],
		],
	},
	MarketingPlan_Avantages: {
		title: "Barrière à l'entrée",
		paths: [
			["value_proposition", "formatted_sections", "pains"],
			["value_proposition", "formatted_sections", "gains"],
			["canvas", "formatted_sections", "customer_segments"],
			["canvas", "formatted_sections", "value_proposition"],
			["swot", "formatted_sections", "strengths"],
			["swot", "formatted_sections", "opportunities"],
			["canvas", "formatted_sections", "customer_relationships"],
		],
	},
	MarketingPlan_Livraison: {
		title: "Barrière à l'entrée",
		paths: [
			["canvas", "formatted_sections", "channels"],
			["canvas", "formatted_sections", "customer_relationships"],
			["canvas", "formatted_sections", "key_partners"],
			["swot", "formatted_sections", "strengths"],
		],
	},
	MarketingPlan_Garanties: {
		title: "Marketing plan, les garanties",
		paths: [
			["canvas", "formatted_sections", "customer_relationships"],
			["value_proposition", "formatted_qa", "vp_risk_reducers"],
			["swot", "formatted_sections", "strengths"],
			["value_proposition", "formatted_qa", "vp_risk_reducers"],
		],
	},
	MarketingPlan_Contrats: {
		title: "Marketing plan, les contrats",
		paths: [
			["canvas", "formatted_sections", "key_activities"],
			["canvas", "formatted_sections", "customer_relationships"],
			["canvas", "formatted_sections", "key_resources"],
			["value_proposition", "formatted_sections", "gains"],
		],
	},
	MarketingPlan_SAV: {
		title: "Marketing plan, le service après-vente",
		paths: [
			["canvas", "formatted_sections", "channels"],
			["canvas", "formatted_sections", "customer_relationships"],
			["swot", "formatted_sections", "strengths"],
			["value_proposition", "formatted_sections", "gains"],
		],
	},
	MarketingPlan_Formation: {
		title: "Marketing plan, les formations",
		paths: [
			["canvas", "formatted_sections", "key_activities"],
			["canvas", "formatted_sections", "customer_relationships"],
			["value_proposition", "formatted_sections", "pains"],
			["swot", "formatted_sections", "opportunities"],
		],
	},
	MarketingPlan_Policy: {
		title: "Marketing plan, la politique de remboursement",
		paths: [
			["canvas", "formatted_sections", "cost_structure"],
			["canvas", "formatted_sections", "customer_relationships"],
			["marketing_mix", "formatted_sections", "product"],
		],
	},
	MarketingPlan_BuyerPersona: {
		title: "Marketing plan, le client type",
		paths: [
			["canvas", "formatted_sections", "customer_segments"],
			["funnel_chart", "formatted_sections", "visibilité"],
			["funnel_chart", "formatted_sections", "intérêt"],
			["swot", "formatted_sections", "opportunities"],
			["ansoff", "formatted_sections", "market_development"],
			["marketing_mix", "formatted_sections", "people"],
		],
	},
	MarketingPlan_KeyCompetitors: {
		title: "Marketing plan, les compétiteurs clés",
		paths: [
			["competitors", "formatted_text"],
			["canvas", "formatted_qa", "competitor_strengths"],
			["canvas", "formatted_qa", "competitor_weaknesses"],
			["swot", "formatted_sections", "strengths"],
			["swot", "formatted_sections", "weaknesses"],
			["canvas", "formatted_sections", "value_proposition"],
			["canvas", "formatted_sections", "customer_segments"],
		],
	},
	MarketingPlan_Niche: {
		title: "Marketing plan, le marché de niche",
		paths: [
			["canvas", "formatted_sections", "key_activities"],
			["canvas", "formatted_sections", "value_proposition"],
			["funnel_chart", "formatted_sections", "intérêt"],
			["swot", "formatted_qa", "competitor_weaknesses"],
		],
	},
	MarketingPlan_Niche_b: {
		title: "Marketing plan, le marché de niche",
		paths: [
			["pestel", "formatted_sections", "political"],
			["pestel", "formatted_sections", "economic"],
			["pestel", "formatted_sections", "social"],
			["pestel", "formatted_sections", "technological"],
			["pestel", "formatted_sections", "environmental"],
			["pestel", "formatted_sections", "legal"],
		],
	},
	MarketingPlan_Niche_c: {
		title: "Marketing plan, le marché de niche",
		paths: [
			["funnel_chart", "formatted_sections", "visibilité"],
			["marketing_mix", "formatted_sections", "people"],
			["canvas", "formatted_sections", "customer_segments"],
		],
	},
	MarketingPlan_Niche_d: {
		title: "Marketing plan, le marché de niche",
		paths: [
			["canvas", "formatted_sections", "key_activities"],
			["funnel_chart", "formatted_sections", "visibilité"],
			["canvas", "formatted_sections", "value_proposition"],
			["funnel_chart", "formatted_sections", "intérêt"],
			["swot", "formatted_qa", "competitor_weaknesses"],
		],
	},
	MarketingPlan_HOW: {
		title: "Marketing plan, comment faire",
		paths: [
			["canvas", "formatted_sections", "channels"],
			["funnel_chart", "formatted_sections", "achat"],
			["marketing_mix", "formatted_sections", "promotion"],
		],
	},
	MarketingPlan_Tactics: {
		title: "Marketing plan, tactiques",
		paths: [
			["canvas", "formatted_sections", "value_proposition"],
			["swot", "formatted_sections", "strengths"],
			["funnel_chart", "formatted_sections", "visibilité"],
			["marketing_mix", "formatted_sections", "promotion"],
			["funnel_chart", "formatted_sections", "intérêt"],
			["canvas", "formatted_sections", "customer_relationships"],
			["marketing_mix", "formatted_sections", "product"],
			["value_proposition", "formatted_sections", "customer_jobs"],
			["swot", "formatted_sections", "opportunities"],
			["pestel", "formatted_sections", "social"],
			["funnel_chart", "formatted_qa", "advocacy"],
		],
	},
	MarketingPlan_LogoAndBranding: {
		title: "Marketing plan, image de marque",
		paths: [
			["marketing_mix", "formatted_sections", "product"],
			["swot", "formatted_sections", "strengths"],
			["canvas", "formatted_sections", "value_proposition"],
		],
	},
	MarketingPlan_FirstConclusion: {
		title: "Marketing plan, première conclusion",
		paths: [
			["canvas", "formatted_sections", "value_proposition"],
			["swot", "formatted_sections", "strengths"],
			["funnel_chart", "formatted_sections", "visibilité"],
			["marketing_mix", "formatted_sections", "promotion"],
			["funnel_chart", "formatted_sections", "intérêt"],
			["canvas", "formatted_sections", "customer_relationships"],
			["marketing_mix", "formatted_sections", "product"],
			["canvas", "formatted_sections", "channels"],
			["funnel_chart", "formatted_sections", "achat"],
		],
	},
	MarketingPlan_PromotionalBudget: {
		title: "Marketing plan, budget promotionnel",
		paths: [
			["startup_expenses", "formatted_qa", "budget"],
			["startup_expenses", "formatted_sections", "expenses"],
			["startup_expenses", "formatted_text"],
			["startup_expenses", "formatted_sections", "capital"],
			["canvas", "formatted_sections", "channels"],
			["marketing_mix", "formatted_sections", "promotion"],
			["funnel_chart", "formatted_sections", "intérêt"],
			["value_proposition", "formatted_sections", "customer_jobs"],
			["marketing_mix", "formatted_sections", "product"],
			["swot", "formatted_sections", "opportunities"],
			["funnel_chart", "formatted_qa", "advocacy"],
			["canvas", "formatted_sections", "customer_relationships"],
		],
	},
	MarketingPlan_PricingStrategy: {
		title: "Marketing plan, stratégie de pricing",
		paths: [
			["marketing_mix", "formatted_qa", "marketing_plan_sensibility"],
			["canvas", "formatted_sections", "value_proposition"],
			["swot", "formatted_sections", "opportunities"],
		],
	},
	MarketingPlan_PricingStrategy_competitors: {
		title: "Marketing plan, compétiteurs",
		paths: [
			["competitors", "formatted_text"],
			["swot", "formatted_qa", "competitor_weaknesses"],
			["canvas", "formatted_sections", "channels"],
			["canvas", "formatted_sections", "customer_segments"],
			["funnel_chart", "formatted_sections", "intérêt"],
		],
	},
	MarketingPlan_PricingStrategy_Clientelle: {
		title: "Marketing plan, stratégie de clientelle",
		paths: [
			["marketing_mix", "formatted_sections", "process"],
			["canvas", "formatted_sections", "customer_relationships"],
		],
	},
	MarketingPlan_Location: {
		title: "Marketing plan, localisation",
		paths: [
			["canvas", "formatted_sections", "customer_segments"],
			["funnel_chart", "formatted_sections", "visibilité"],
			["marketing_mix", "formatted_sections", "place"],
			["pestel", "formatted_qa", "infrastructures"],
			["canvas", "formatted_sections", "key_resources"],
			["canvas", "formatted_sections", "cost_structure"],
			["swot", "formatted_sections", "opportunities"],
		],
	},
	MarketingPlan_DistributionChannel: {
		title: "Marketing plan, cannaux de distribution",
		paths: [
			["canvas", "formatted_sections", "channels"],
			["marketing_mix", "formatted_sections", "place"],
		],
	},
	MarketingPlan_PartnershipsAndDistributors: {
		title: "Marketing plan, partenaires et distributeurs",
		paths: [
			["canvas", "formatted_sections", "key_partners"],
			["ansoff", "formatted_sections", "market_development"],
			["swot", "formatted_sections", "opportunities"],
			["value_proposition", "formatted_sections", "gains"],
		],
	},
	MarketingPlan_ChannelConclusion: {
		title: "Marketing plan, conclusion de distribution",
		paths: [
			["canvas", "formatted_sections", "channels"],
			["canvas", "formatted_sections", "customer_segments"],
			["marketing_mix", "formatted_sections", "promotion"],
			["funnel_chart", "formatted_sections", "intérêt"],
			["marketing_mix", "formatted_sections", "place"],
			["pestel", "formatted_qa", "infrastructures"],
			["canvas", "formatted_sections", "key_resources"],
			["canvas", "formatted_sections", "key_partners"],
			["ansoff", "formatted_sections", "market_development"],
		],
	},
	OP_Production: {
		title: "Plan opérationnel, production",
		paths: [
			["canvas", "formatted_sections", "key_resources"],
			["swot", "formatted_sections", "threats"],
			["pestel", "formatted_sections", "technological"],
		],
	},
	OP_Production_ressources: {
		title: "Plan opérationnel, ressources pour produire",
		paths: [
			["canvas", "formatted_sections", "key_resources"],
			["marketing_mix", "formatted_sections", "process"],
		],
	},
	OP_Production_cost: {
		title: "Plan opérationnel, coût de production",
		paths: [
			["canvas", "formatted_sections", "cost_structure"],
			["startup_expenses", "formatted_sections", "expenses"],
			["monthly_projection", "formatted_sections", "expenses_analysis"],
			["yearly_projection", "formatted_sections", "expenses_analysis"],
		],
	},
	OP_Production_efficiency: {
		title: "Plan opérationnel, efficience de production",
		paths: [
			["swot", "formatted_sections", "opportunities"],
			["ansoff", "formatted_sections", "product_development"],
		],
	},
	OP_QualityControl: {
		title: "Plan opérationnel, contrôle qualité",
		paths: [
			["canvas", "formatted_qa", "control_pos"],
			["canvas", "formatted_sections", "key_activities"],
			["marketing_mix", "formatted_sections", "process"],
		],
	},
	OP_QualityControl_b: {
		title: "Plan opérationnel, contrôle qualité",
		paths: [
			["canvas", "formatted_qa", "control_inspection"],
			["swot", "formatted_sections", "weaknesses"],
			["canvas", "formatted_qa", "control_retour"],
			["canvas", "formatted_sections", "customer_relationships"],
			["funnel_chart", "formatted_qa", "loyalty"],
		],
	},
	OP_QualityControl_c: {
		title: "Plan opérationnel, contrôle qualité",
		paths: [
			["pestel", "formatted_sections", "political"],
			["swot", "formatted_sections", "opportunities"],
			["canvas", "formatted_sections", "cost_structure"],
			["marketing_mix", "formatted_sections", "physical_evidence"],
		],
	},
	OP_Location: {
		title: "Plan opérationnel, environnement juridique",
		paths: [
			["canvas", "formatted_sections", "customer_segments"],
			["funnel_chart", "formatted_sections", "visibilité"],
			["marketing_mix", "formatted_sections", "place"],
			["pestel", "formatted_qa", "infrastructures"],
			["canvas", "formatted_sections", "key_resources"],
			["canvas", "formatted_sections", "cost_structure"],
			["swot", "formatted_sections", "opportunities"],
			["canvas", "formatted_sections", "customer_relationships"],
		],
	},
	OP_Location_b: {
		title: "Plan opérationnel, environnement juridique",
		paths: [
			["canvas", "formatted_qa", "localisation"],
			["pestel", "formatted_sections", "legal"],
			["swot", "formatted_sections", "opportunities"],
		],
	},
	OP_Legal_data: {
		title: "Plan opérationnel, environnement juridique",
		paths: [
			["pestel", "formatted_qa", "legal_licenses"],
			["pestel", "formatted_qa", "legal_official_brand"],
			["pestel", "formatted_qa", "legal_warranty"],
			["startup_expenses", "formatted_qa", "tax_legal"],
			["pestel", "formatted_sections", "economic"],
			["canvas", "formatted_sections", "cost_structure"],
		],
	},
	OP_Legal_data_c: {
		title: "Plan opérationnel, environnement juridique",
		paths: [
			["canvas", "formatted_sections", "key_activities"],
			["pestel", "formatted_qa", "legal_environmental_regulations"],
			["pestel", "formatted_qa", "legal_particular_regulations"],
			["pestel", "formatted_qa", "legal_cautions"],
		],
	},
	OP_Personnel: {
		title: "Plan opérationnel, ressources humaines",
		paths: [
			["canvas", "formatted_sections", "key_resources"],
			["skills_matrix", "formatted_sections", "analysis"],
			["skills_matrix", "formatted_qa", "leadership_skills"],
			["skills_matrix", "formatted_qa", "problem_solving"],
			["skills_matrix", "formatted_qa", "entrepreneurship_skills"],
		],
	},
	OP_numbers: {
		title: "Plan opérationnel, chiffres",
		paths: [
			["canvas", "formatted_sections", "key_activities"],
			["swot", "formatted_sections", "opportunities"],
			["skills_matrix", "formatted_qa", "leadership_skills"],
			["skills_matrix", "formatted_qa", "problem_solving"],
			["skills_matrix", "formatted_qa", "entrepreneurship_skills"],
			["canvas", "formatted_sections", "key_partners"],
			["marketing_mix", "formatted_sections", "people"],
		],
	},
	OP_costStructure: {
		title: "Plan opérationnel, structure de coûts",
		paths: [
			["canvas", "formatted_sections", "cost_structure"],
			["swot", "formatted_sections", "opportunities"],
			["marketing_mix", "formatted_sections", "people"],
			["swot", "formatted_sections", "opportunities"],
			["canvas", "formatted_sections", "key_activities"],
			["marketing_mix", "formatted_sections", "process"],
		],
	},
	OP_Inventaire: {
		title: "Plan opérationnel, inventaire",
		paths: [
			["monthly_projection", "formatted_qa", "stock_type"],
			["monthly_projection", "formatted_qa", "stock_cost"],
			["monthly_projection", "formatted_qa", "stock_churn"],
			["monthly_projection", "formatted_qa", "stock_variation"],
			["monthly_projection", "formatted_qa", "stock_delay"],
			["canvas", "formatted_sections", "key_resources"],
			["canvas", "formatted_sections", "channels"],
			["swot", "formatted_sections", "weaknesses"],
			["canvas", "formatted_sections", "cost_structure"],
		],
	},
	OP_Fournisseurs_List: {
		title: "Plan opérationnel, liste des fournisseurs",
		paths: [
			["canvas", "formatted_qa", "fournisseurs"],
			["canvas", "formatted_sections", "key_resources"],
			["canvas", "formatted_sections", "key_partners"],
		],
	},
	OP_Fournisseurs_Type: {
		title: "Plan opérationnel, types de fournisseurs",
		paths: [
			["canvas", "formatted_sections", "key_resources"],
			["canvas", "formatted_qa", "produit_critique"],
			["monthly_projection", "formatted_qa", "stock_type"],
			["monthly_projection", "formatted_qa", "stock_churn"],
			["canvas", "formatted_sections", "channels"],
		],
	},
	OP_Fournisseurs_Politics: {
		title: "Plan opérationnel, politique des fournisseurs",
		paths: [
			["canvas", "formatted_qa", "politique_credit"],
			["canvas", "formatted_sections", "cost_structure"],
			["marketing_mix", "formatted_sections", "place"],
		],
	},
	OP_Fournisseurs_Reliability: {
		title: "Plan opérationnel, confiance des fournisseurs",
		paths: [
			["canvas", "formatted_qa", "antecedents"],
			["swot", "formatted_sections", "weaknesses"],
			["swot", "formatted_sections", "opportunities"],
		],
	},
	OP_Fournisseurs_Crash: {
		title: "Plan opérationnel, problèmes fournisseurs",
		paths: [
			["canvas", "formatted_qa", "rupture_approvisionnement"],
			["canvas", "formatted_sections", "key_resources"],
			["canvas", "formatted_sections", "customer_relationships"],
			["swot", "formatted_sections", "weaknesses"],
		],
	},
	OP_Fournisseurs_Critical: {
		title: "Plan opérationnel, fournisseurs critiques",
		paths: [
			["canvas", "formatted_qa", "variation_couts_fournitures"],
			["canvas", "formatted_sections", "key_partners"],
			["canvas", "formatted_sections", "key_resources"],
			["pestel", "formatted_sections", "economic"],
			["canvas", "formatted_sections", "cost_structure"],
		],
	},
	OP_Credit: {
		title: "Plan opérationnel, crédit",
		paths: [
			["pestel", "formatted_sections", "social"],
			["canvas", "formatted_sections", "customer_relationships"],
			["monthly_projection", "formatted_qa", "credit_common"],
		],
	},
	OP_Credit_Politics: {
		title: "Plan opérationnel, politique de crédit",
		paths: [
			["monthly_projection", "formatted_qa", "credit_policy"],
			["canvas", "formatted_qa", "politique_credit"],
			["canvas", "formatted_sections", "cost_structure"],
			["canvas", "formatted_sections", "customer_relationships"],
		],
	},
	OP_Credit_Verif: {
		title: "Plan opérationnel, vérification de crédit",
		paths: [
			["monthly_projection", "formatted_qa", "credit_verification"],
			["swot", "formatted_sections", "weaknesses"],
			["canvas", "formatted_sections", "customer_relationships"],
		],
	},
	OP_Credit_Conds: {
		title: "Plan opérationnel, conditions de crédit",
		paths: [
			["monthly_projection", "formatted_qa", "credit_conditions"],
			["canvas", "formatted_sections", "cost_structure"],
			["marketing_mix", "formatted_sections", "price"],
		],
	},
	OP_Credit_Cost: {
		title: "Plan opérationnel, coût de crédit",
		paths: [
			["canvas", "formatted_sections", "cost_structure"],
			["marketing_mix", "formatted_sections", "price"],
		],
	},
	OP_Credit_Payments: {
		title: "Plan opérationnel, crédits de paiement",
		paths: [
			["monthly_projection", "formatted_qa", "credit_slow_payments"],
			["monthly_projection", "formatted_qa", "credit_late_payments"],
			["canvas", "formatted_sections", "customer_relationships"],
			["swot", "formatted_sections", "weaknesses"],
		],
	},
	Management_Biographies: {
		title: "Management, biographies",
		paths: [
			["skills_matrix", "formatted_qa", "leadership_skills"],
			["canvas", "formatted_sections", "key_resources"],
			["skills_matrix", "formatted_qa", "leadership_ownership"],
			["skills_matrix", "formatted_qa", "entrepreneurship_skills"],
			["swot", "formatted_sections", "strengths"],
			["skills_matrix", "formatted_qa", "problem_solving"],
			["skills_matrix", "formatted_qa", "creativity"],
			["canvas", "formatted_sections", "value_proposition"],
		],
	},
	Management_Gaps: {
		title: "Management, lacunes",
		paths: [
			["canvas", "formatted_sections", "key_resources"],
			["swot", "formatted_sections", "opportunities"],
			["canvas", "formatted_sections", "key_activities"],
			["skills_matrix", "formatted_qa", "gaps"],
			["ansoff", "formatted_sections", "diversification"],
			["startup_expenses", "formatted_qa", "external_cost"],
		],
	},
	Management_Advisors: {
		title: "Management, conseillers",
		paths: [
			["skills_matrix", "formatted_qa", "leadership_ownership"],
			["skills_matrix", "formatted_qa", "SkillMatrix_Training"],
			["skills_matrix", "formatted_qa", "gaps"],
			["ansoff", "formatted_sections", "diversification"],
		],
	},
	StartupExpenses: {
		title: "Dépenses de démarrage",
		paths: [
			["startup_expenses", "formatted_qa", "funding"],
			["startup_expenses", "formatted_qa", "capital_needs"],
			["startup_expenses", "formatted_qa", "budget"],
			["startup_expenses", "formatted_qa", "external_cost"],
		],
	},
	OpeningDay_BalanceSheet: {
		title: "Dépenses au premier jour",
		paths: [
			["startup_expenses", "formatted_sections", "capital"],
			["startup_expenses", "formatted_sections", "expenses"],
			["startup_expenses", "formatted_sections", "risks"],
			["startup_expenses", "formatted_sections", "financial"],
			["startup_expenses", "formatted_text"],
		],
	},
	PersonnalFinanceStatement: {
		title: "Bilan financiers personnels",
		paths: [
			["startup_expenses", "formatted_sections", "capital"],
			["startup_expenses", "formatted_sections", "expenses"],
			["startup_expenses", "formatted_sections", "risks"],
			["startup_expenses", "formatted_sections", "financial"],
			["startup_expenses", "formatted_text"],
		],
	},
	FP_12monthsProfitAndLoss: {
		title: "Barrière à l'entrée",
		paths: [
			["monthly_projection", "formatted_sections", "summary"],
			["monthly_projection", "formatted_sections", "monthly_analysis"],
			["monthly_projection", "formatted_sections", "expenses_analysis"],
			["monthly_projection", "formatted_sections", "growth_analysis"],
			["monthly_projection", "formatted_text"],
		],
	},
	FP_3years: {
		title: "Barrière à l'entrée",
		paths: [
			["yearly_projection", "formatted_sections", "summary"],
			["yearly_projection", "formatted_sections", "yearly_analysis"],
			["yearly_projection", "formatted_sections", "expenses_analysis"],
			["yearly_projection", "formatted_sections", "trend_analysis"],
			["yearly_projection", "formatted_text"],
		],
	},
};
