//lib/hooks/business-plan/useTemplateProgress@/libthooks/business-plan/s
import { useSwotData } from "@/lib/hooks/business-plan/swot/useSwotData";
import { usePestelData } from "@/lib/hooks/business-plan/pestel/usePestelData";
import { useCanvasData } from "@/lib/hooks/business-plan/canvas/useCanvasData";
import { useValuePropositionData } from "@/lib/hooks/business-plan/proposition-value/useValuePropositionData";
import { useMarketingMixData } from "@/lib/hooks/business-plan/marketing-mix/useMarketingMixData";
import { useAnsoffData } from "@/lib/hooks/business-plan/ansoff/useAnsoffData";
import { useFunnelChartData } from "@/lib/hooks/business-plan/funnel-chart/useFunnelChartData";
import { calculateProgress as calculatePestelProgress } from "@/lib/business-plan/pestel/storage-pestel";
import { calculateProgress as calculateSwotProgress } from "@/lib/business-plan/swot/storage-swot";
import { calculateProgress as calculateCanvasProgress } from "@/lib/business-plan/canvas/storage-canvas";
import { calculateProgress as calculateValuePropositionProgress } from "@/lib/business-plan/value-proposition/storage-value-proposition";
import { calculateProgress as calculateMarketingMixProgress } from "@/lib/business-plan/marketing-mix/storage-marketing-mix";
import { calculateProgress as calculateAnsoffProgress } from "@/lib/business-plan/ansoff/storage-ansoff";
import { calculateProgress as calculateFunnelChartProgress } from "@/lib/business-plan/funnel-chart/storage-funnel-chart";

export const useTemplateProgress = () => {
	const { cards: swotData } = useSwotData();
	const { cards: pestelData } = usePestelData();
	const { cards: canvasData } = useCanvasData();
	const { data: valuePropositionData } = useValuePropositionData();
	const { cards: marketingMixData } = useMarketingMixData();
	const { cards: ansoffData } = useAnsoffData();
	const { sections: funnelChartData } = useFunnelChartData();

	return {
		market: {
			"Business Model Canvas": calculateCanvasProgress(canvasData),
			"Funnel Chart": calculateFunnelChartProgress(funnelChartData),
		},
		strategy: {
			"Marketing Mix": calculateMarketingMixProgress(marketingMixData),
			PESTEL: calculatePestelProgress(pestelData),
		},
		economic: {
			"Matrice Ansoff": calculateAnsoffProgress(ansoffData),
			SWOT: calculateSwotProgress(swotData),
		},
		execution: {
			"Skills Matrix": 100,
			"Value Proposition":
				calculateValuePropositionProgress(valuePropositionData),
		},
	};
};
