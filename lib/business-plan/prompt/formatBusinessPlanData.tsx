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
		"BMC_Key Activities": formatArrayData(data.canvas?.keyActivities),
		"BMC_Value Proposition": formatArrayData(data.canvas?.valueProposition),
		"BMC_Customer Segments": formatArrayData(data.canvas?.customerSegments),

		// SWOT
		SWOT_Strengths: formatArrayData(data.swot?.strengths),
		SWOT_Opportunities: formatArrayData(data.swot?.opportunities),
		SWOT_Weakness: formatArrayData(data.swot?.weaknesses),
		SWOT_Threats: formatArrayData(data.swot?.threats),

		// Ansoff
		"Ansoff_Growth Strategy": formatArrayData(
			data.ansoff?.development_product
		),

		// PESTEL
		// PESTEL_Political: formatArrayData(data.pestel?.political),
	};
};
