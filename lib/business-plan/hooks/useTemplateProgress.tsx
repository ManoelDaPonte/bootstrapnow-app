//lib/hooks/business-plan/useTemplateProgress@/libthooks/business-plan/s
import { useSwotData } from "@/lib/business-plan/hooks/swot/useSwotData";
import { usePestelData } from "@/lib/business-plan/hooks/pestel/usePestelData";
import { useCanvasData } from "@/lib/business-plan/hooks/canvas/useCanvasData";
import { useValuePropositionData } from "@/lib/business-plan/hooks/value-proposition/useValuePropositionData";
import { useMarketingMixData } from "@/lib/business-plan/hooks/marketing-mix/useMarketingMixData";
import { useAnsoffData } from "@/lib/business-plan/hooks/ansoff/useAnsoffData";
import { useFunnelChartData } from "@/lib/business-plan/hooks/funnel-chart/useFunnelChartData";
import { calculateProgress as calculatePestelProgress } from "@/lib/business-plan/hooks/pestel/storage-pestel";
import { calculateProgress as calculateSwotProgress } from "@/lib/business-plan/hooks/swot/storage-swot";
import { calculateProgress as calculateCanvasProgress } from "@/lib/business-plan/hooks/canvas/storage-canvas";
import { calculateProgress as calculateValuePropositionProgress } from "@/lib/business-plan/hooks/value-proposition/storage-value-proposition";
import { calculateProgress as calculateMarketingMixProgress } from "@/lib/business-plan/hooks/marketing-mix/storage-marketing-mix";
import { calculateProgress as calculateAnsoffProgress } from "@/lib/business-plan/hooks/ansoff/storage-ansoff";
import { calculateProgress as calculateFunnelChartProgress } from "@/lib/business-plan/hooks/funnel-chart/storage-funnel-chart";

export const useTemplateProgress = () => {
	const { cards: swotData } = useSwotData();
	const { cards: pestelData } = usePestelData();
	const { cards: canvasData } = useCanvasData();
	const { cards: valuePropositionData } = useValuePropositionData();
	const { cards: marketingMixData } = useMarketingMixData();
	const { cards: ansoffData } = useAnsoffData();
	const { sections: funnelChartData } = useFunnelChartData();

	return {
		model: {
			"Business Model Canvas": calculateCanvasProgress(canvasData),
			"Funnel d'acquisition":
				calculateFunnelChartProgress(funnelChartData),
		},
		strategy: {
			"Marketing Mix": calculateMarketingMixProgress(marketingMixData),
			PESTEL: calculatePestelProgress(pestelData),
		},
		economic: {
			"Matrice d'Ansoff": calculateAnsoffProgress(ansoffData),
			SWOT: calculateSwotProgress(swotData),
		},
		execution: {
			"Matrice de compétences": 100,
			"Proposition de valeur":
				calculateValuePropositionProgress(valuePropositionData),
		},
		financial: {
			"Projection sur 3 ans": 100,
			"Projection sur 12 mois": 100,
			"Dépenses de démarrage": 100,
		},
		market: {
			"Tendances du marché": 100,
			Competiteurs: 100,
		},
	};
};
