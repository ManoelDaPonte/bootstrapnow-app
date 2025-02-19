// lib/openai/formatters/analyzers/market_trends.ts
import { MarketTrendsData } from "@/types/openai/analyzers";
export function format_market_trends(data: any): MarketTrendsData {
	const trends_data = data.market_trends;

	// Tri des tendances par année
	const trends = [...trends_data.data.market_trends].sort(
		(a, b) => a.annee - b.annee
	);
	const market_numbers = trends_data.data.market_numbers;

	// Calcul des moyennes
	const avg_growth =
		trends.reduce((sum, t) => sum + t.tauxCroissance, 0) / trends.length;
	const avg_demand =
		trends.reduce((sum, t) => sum + t.variationDemande, 0) / trends.length;

	// Formatage des sections
	const formatted_sections: Record<string, string> = {
		market_indicators: market_numbers
			.map(
				(indicator: any) =>
					`\n${indicator.title}:\n- Valeur : ${indicator.value}\n- Description : ${indicator.description}`
			)
			.join("\n"),

		yearly_trends: trends
			.map((trend, i) => {
				const growth_vs_prev =
					i > 0
						? ` (${(
								trend.tauxCroissance -
								trends[i - 1].tauxCroissance
						  ).toFixed(1)}% vs année précédente)`
						: "";
				const demand_vs_prev =
					i > 0
						? ` (${(
								trend.variationDemande -
								trends[i - 1].variationDemande
						  ).toFixed(1)}% vs année précédente)`
						: "";

				return `\nAnnée ${trend.annee}:\n- Taux de croissance : ${trend.tauxCroissance}%${growth_vs_prev}\n- Variation de la demande : ${trend.variationDemande}%${demand_vs_prev}`;
			})
			.join("\n"),

		trends_summary: `
  Evolution sur la période complète:
  - Evolution du taux de croissance : ${(
		trends[trends.length - 1].tauxCroissance - trends[0].tauxCroissance
  ).toFixed(1)}%
  - Evolution de la variation de la demande : ${(
		trends[trends.length - 1].variationDemande - trends[0].variationDemande
  ).toFixed(1)}%
  - Taux de croissance moyen : ${avg_growth.toFixed(1)}%
  - Variation moyenne de la demande : ${avg_demand.toFixed(1)}%`,
	};

	// Market analysis
	const market_size = market_numbers.find(
		(ind: any) => ind.id === "market_size"
	);
	const market_growth = market_numbers.find(
		(ind: any) => ind.id === "annual_growth"
	);
	const market_share = market_numbers.find(
		(ind: any) => ind.id === "market_share"
	);

	if (market_size && market_growth && market_share) {
		formatted_sections.market_analysis = `
  Analyse détaillée du marché:
  - Taille du marché: ${market_size.value}
  - Croissance annuelle: ${market_growth.value}
  - Part de marché des leaders: ${market_share.value}
  
  Implications:
  - Le marché représente actuellement ${market_size.value}, avec une croissance annuelle de ${market_growth.value}.
  - La concentration du marché est de ${market_share.value} pour les leaders.`;
	}

	// Texte complet
	const complete_text = [
		"Analyse des Tendances du Marché :",
		formatted_sections.market_indicators,
		formatted_sections.yearly_trends,
		formatted_sections.trends_summary,
		formatted_sections.market_analysis,
	].join("\n\n");

	return {
		data: {
			trends,
			market_numbers,
			average_growth: avg_growth,
			average_demand: avg_demand,
		},
		formatted_sections,
		formatted_text: complete_text,
	};
}
