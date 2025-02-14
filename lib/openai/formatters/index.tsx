// lib/openai/formatters/index.ts
import {
	SwotAnalysisData,
	MarketTrendsData,
	CompetitorsAnalysisData,
	MonthlyProjectionData,
	YearlyProjectionData,
	BaseFormattedData,
	FormattedAnalyses,
} from "@/types/openai/analyzers";
import { BUSINESS_PLAN_SECTIONS } from "@/lib/openai/config/sections";
import { SECTION_SYSTEM_PROMPTS } from "@/lib/openai/config/prompts";

// Imports des formateurs
import { format_swot } from "./analyzers/swot";
import { format_pestel } from "./analyzers/pestel";
import { format_canvas } from "./analyzers/canvas";
import { format_ansoff } from "./analyzers/ansoff";
import { format_marketing_mix } from "./analyzers/marketing-mix";
import { format_value_proposition } from "./analyzers/value-proposition";
import { format_funnel } from "./analyzers/funnel";
import { format_skills_matrix } from "./analyzers/skills-matrix";
import { format_market_trends } from "./analyzers/market-trends";
import { format_startup_expenses } from "./analyzers/startup-expenses";
import { format_monthly_projection } from "./analyzers/monthly-projection";
import { format_yearly_projection } from "./analyzers/yearly-projection";
import { format_competitors } from "./analyzers/competitors";

// Types d'export
export type AnalyzerResult =
	| SwotAnalysisData
	| MarketTrendsData
	| CompetitorsAnalysisData
	| MonthlyProjectionData
	| YearlyProjectionData
	| BaseFormattedData;

// Objet contenant tous les formateurs
export const analyzers = {
	swot: format_swot,
	pestel: format_pestel,
	canvas: format_canvas,
	ansoff: format_ansoff,
	marketing_mix: format_marketing_mix,
	value_proposition: format_value_proposition,
	funnel_chart: format_funnel,
	skills_matrix: format_skills_matrix,
	market_trends: format_market_trends,
	startup_expenses: format_startup_expenses,
	monthly_projection: format_monthly_projection,
	yearly_projection: format_yearly_projection,
	competitors: format_competitors,
} as const;

export type AnalyzerType = keyof typeof analyzers;

// Fonction principale de formatage
export function format_all_analyses(
	analyses: Record<string, any>
): FormattedAnalyses {
	const formatted_analyses: FormattedAnalyses = {};

	for (const [analysis_type, analysis_data] of Object.entries(analyses)) {
		if (analysis_type in analyzers) {
			try {
				const result = analyzers[analysis_type as AnalyzerType]({
					[analysis_type]: analysis_data,
				});

				// S'assurer que le résultat correspond à l'interface FormattedAnalysis
				formatted_analyses[analysis_type] = {
					formatted_sections: result.formatted_sections || {},
					formatted_text: result.formatted_text || "",
					formatted_qa: result.formatted_qa,
					data: result.data,
				};
			} catch (error) {
				console.error(
					`Erreur lors du formatage de ${analysis_type}:`,
					error
				);
			}
		}
	}

	return formatted_analyses;
}
// Export individuel des formateurs
export {
	format_swot,
	format_pestel,
	format_canvas,
	format_ansoff,
	format_marketing_mix,
	format_value_proposition,
	format_funnel,
	format_skills_matrix,
	format_market_trends,
	format_startup_expenses,
	format_monthly_projection,
	format_yearly_projection,
	format_competitors,
};
