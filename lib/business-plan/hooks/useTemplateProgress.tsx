//lib/hooks/business-plan/useTemplateProgress
import { useSwotData } from "@/lib/business-plan/hooks/swot/useSwotData";
import { usePestelData } from "@/lib/business-plan/hooks/pestel/usePestelData";
import { useCanvasData } from "@/lib/business-plan/hooks/canvas/useCanvasData";
import { useValuePropositionData } from "@/lib/business-plan/hooks/value-proposition/useValuePropositionData";
import { useMarketingMixData } from "@/lib/business-plan/hooks/marketing-mix/useMarketingMixData";
import { useAnsoffData } from "@/lib/business-plan/hooks/ansoff/useAnsoffData";
import { useFunnelChartData } from "@/lib/business-plan/hooks/funnel-chart/useFunnelChartData";
import { useSkillMatrix } from "@/lib/business-plan/hooks/skills-matrix/useSkillMatrix";
import { useProfitLossData as useProfitLossData3 } from "@/lib/business-plan/hooks/3-years/useProfitLossData";
import { useProfitLossData as useProfitLossData12 } from "@/lib/business-plan/hooks/12-months/useProfitLossData";
import { useStartupData } from "@/lib/business-plan/hooks/startup-expenses/useStartupData";
import { useMarketTrends } from "@/lib/business-plan/hooks/market-trends/useMarketTrends";
import { useCompetitors } from "@/lib/business-plan/hooks/competitors/useCompetitors";
import { calculateProgress as calculateSkillMatrixProgress } from "@/lib/business-plan/hooks/skills-matrix/storage-skills-matrix";
import { calculateProgress as calculatePestelProgress } from "@/lib/business-plan/hooks/pestel/storage-pestel";
import { calculateProgress as calculateSwotProgress } from "@/lib/business-plan/hooks/swot/storage-swot";
import { calculateProgress as calculateCanvasProgress } from "@/lib/business-plan/hooks/canvas/storage-canvas";
import { calculateProgress as calculateValuePropositionProgress } from "@/lib/business-plan/hooks/value-proposition/storage-value-proposition";
import { calculateProgress as calculateMarketingMixProgress } from "@/lib/business-plan/hooks/marketing-mix/storage-marketing-mix";
import { calculateProgress as calculateAnsoffProgress } from "@/lib/business-plan/hooks/ansoff/storage-ansoff";
import { calculateProgress as calculateFunnelChartProgress } from "@/lib/business-plan/hooks/funnel-chart/storage-funnel-chart";
import { calculateProgress as calculateProfitLossProgress3 } from "@/lib/business-plan/hooks/3-years/storage-profit-loss";
import { calculateProgress as calculateProfitlossProgress12 } from "@/lib/business-plan/hooks/12-months/storage-12-months";
import { calculateProgress as calculateStartupProgress } from "@/lib/business-plan/hooks/startup-expenses/storage-startup";
import { calculateProgress as calculateMarketTrendsProgress } from "@/lib/business-plan/hooks/market-trends/storage-market-trends";
import { calculateProgress as calculateCompetitorsProgress } from "@/lib/business-plan/hooks/competitors/storage-competitors";

export const useTemplateProgress = () => {
	const { cards: swotData, qaResponses: qaResponsesSwot } = useSwotData();
	const { cards: pestelData, qaResponses: qaResponsesPestel } =
		usePestelData();
	const { cards: canvasData, qaResponses: qaResponsesCanvas } =
		useCanvasData();
	const { cards: valuePropositionData, qaResponses: qaResponsesValueProp } =
		useValuePropositionData();
	const { cards: marketingMixData, qaResponses: qaResponsesMarketing } =
		useMarketingMixData();
	const { cards: ansoffData, qaResponses: qaResponsesAnsoff } =
		useAnsoffData();
	const { sections: funnelChartData, qaResponses: qaResponsesFunnel } =
		useFunnelChartData();
	const {
		people,
		domains,
		qaResponses: qaResponsesSkills,
	} = useSkillMatrix();
	const { profitLossData: profitLossData3 } = useProfitLossData3();
	const {
		profitLossData: profitLossData12,
		qaResponses: qaResponsesProfilLoss,
	} = useProfitLossData12();
	const { data: startupExpenseData } = useStartupData();
	const { trends, marketNumbers } = useMarketTrends();
	const { competitors } = useCompetitors();

	return {
		model: {
			"Business Model Canvas": calculateCanvasProgress(
				canvasData,
				qaResponsesCanvas
			),
			"Funnel d'acquisition": calculateFunnelChartProgress(
				funnelChartData,
				qaResponsesFunnel
			),
		},
		strategy: {
			"Marketing Mix": calculateMarketingMixProgress(
				marketingMixData,
				qaResponsesMarketing
			),
			PESTEL: calculatePestelProgress(pestelData, qaResponsesPestel),
		},
		economic: {
			"Matrice d'Ansoff": calculateAnsoffProgress(
				ansoffData,
				qaResponsesAnsoff
			),
			SWOT: calculateSwotProgress(swotData, qaResponsesSwot),
		},
		execution: {
			"Matrice de compétences": calculateSkillMatrixProgress(
				{ people, domains },
				qaResponsesSkills
			),
			"Proposition de valeur": calculateValuePropositionProgress(
				valuePropositionData,
				qaResponsesValueProp
			),
		},
		market: {
			"Tendances du marché": calculateMarketTrendsProgress({
				trends,
				marketNumbers,
			}),
			Competiteurs: calculateCompetitorsProgress({ competitors }),
		},
		financial: {
			"Projection sur 3 ans":
				calculateProfitLossProgress3(profitLossData3),
			"Projection sur 12 mois": calculateProfitlossProgress12(
				profitLossData12,
				qaResponsesProfilLoss
			),
			"Dépenses de démarrage":
				calculateStartupProgress(startupExpenseData),
		},
	};
};
