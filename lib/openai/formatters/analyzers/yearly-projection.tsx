import { YearlyProjectionData } from "@/types/openai/analyzers";

export function format_yearly_projection(data: any): YearlyProjectionData {
	const defaultResponse = {
		data: {
			revenue_totals: {},
			expenses_totals: {},
			margins: {},
			margin_percentages: {},
			revenue_growth: [],
			details: {},
		},
		formatted_sections: {
			summary: "Données non disponibles",
			yearly_analysis: "Données non disponibles",
			expenses_analysis: "Données non disponibles",
			trend_analysis: "Données non disponibles",
		},
		formatted_text: "Données non disponibles",
	};

	// Si pas de données ou structure invalide, retourner la réponse par défaut
	if (
		!data?.yearly_projection?.data?.revenue ||
		!data?.yearly_projection?.data?.expenses
	) {
		return defaultResponse;
	}

	const projection_data = data.yearly_projection;
	const years = ["Year 1", "Year 2", "Year 3"];

	// Fonction utilitaire pour calculer les totaux annuels
	function calculateYearlyTotals(dataArray: any[], years: string[]) {
		if (!Array.isArray(dataArray)) return {};

		return years.reduce((acc, year) => {
			acc[year] = dataArray.reduce(
				(sum, item) => sum + parseFloat(item[year] || 0),
				0
			);
			return acc;
		}, {} as Record<string, number>);
	}

	try {
		// Calcul des totaux
		const revenue_totals = calculateYearlyTotals(
			projection_data.data.revenue || [],
			years
		);
		const expenses_totals = calculateYearlyTotals(
			projection_data.data.expenses || [],
			years
		);

		// Calcul des marges
		const margins = years.reduce((acc, year) => {
			acc[year] = revenue_totals[year] - expenses_totals[year];
			return acc;
		}, {} as Record<string, number>);

		const margin_percentages = years.reduce((acc, year) => {
			acc[year] =
				revenue_totals[year] !== 0
					? (margins[year] / revenue_totals[year]) * 100
					: 0;
			return acc;
		}, {} as Record<string, number>);

		// Calcul des taux de croissance
		const revenue_growth = years.slice(1).map((year, index) => {
			const previous = revenue_totals[years[index]];
			const current = revenue_totals[year];
			return previous !== 0 ? ((current - previous) / previous) * 100 : 0;
		});

		// Calculs totaux sur 3 ans
		const total_revenue = Object.values(revenue_totals).reduce(
			(a, b) => a + b,
			0
		);
		const total_expenses = Object.values(expenses_totals).reduce(
			(a, b) => a + b,
			0
		);
		const total_margin = total_revenue - total_expenses;
		const avg_margin_percentage =
			total_revenue !== 0 ? (total_margin / total_revenue) * 100 : 0;

		// Création des sections formatées
		const formatted_sections = {
			summary: `Résumé Financier sur 3 ans :
- Revenu total cumulé : ${total_revenue.toLocaleString()} €
- Dépenses totales cumulées : ${total_expenses.toLocaleString()} €
- Marge totale cumulée : ${total_margin.toLocaleString()} €
- Pourcentage de marge moyen : ${avg_margin_percentage.toFixed(1)}%`,

			yearly_analysis: years
				.map(
					(year) => `
${year}:
- Revenus : ${revenue_totals[year].toLocaleString()} €
- Dépenses : ${expenses_totals[year].toLocaleString()} €
- Marge : ${margins[year].toLocaleString()} €
- Taux de marge : ${margin_percentages[year].toFixed(1)}%`
				)
				.join("\n"),

			expenses_analysis: years
				.map((year) => {
					const year_expenses = projection_data.data.expenses.reduce(
						(acc: Record<string, number>, expense: any) => {
							const category = expense.category;
							const amount = parseFloat(expense[year] || "0");
							acc[category] = (acc[category] || 0) + amount;
							return acc;
						},
						{}
					);

					const total_year_expenses = expenses_totals[year];

					return (
						`\n${year}:` +
						Object.entries(year_expenses)
							.map(([category, amount]) => {
								const percentage =
									total_year_expenses !== 0
										? ((amount as number) /
												total_year_expenses) *
										  100
										: 0;
								return `- ${category}: ${(
									amount as number
								).toLocaleString()} € (${percentage.toFixed(
									1
								)}% des dépenses)`;
							})
							.join("\n")
					);
				})
				.join("\n"),

			trend_analysis: `\nAnalyse des Tendances :

Croissance du revenu :${years
				.slice(1)
				.map(
					(year, i) =>
						`\n- Année ${i + 2} vs Année ${i + 1}: ${revenue_growth[
							i
						].toFixed(1)}%`
				)
				.join("")}

Evolution des marges :${years
				.slice(1)
				.map((year, i) => {
					const margin_evolution =
						margin_percentages[year] - margin_percentages[years[i]];
					return `\n- Année ${i + 2} vs Année ${
						i + 1
					}: ${margin_evolution.toFixed(1)} points de marge`;
				})
				.join("")}`,
		};

		// Créer l'objet details
		const details: Record<
			string,
			{
				year: string;
				revenue: number;
				expenses: number;
				margin: number;
				margin_percentage: number;
			}
		> = {};

		years.forEach((year) => {
			details[year] = {
				year,
				revenue: revenue_totals[year],
				expenses: expenses_totals[year],
				margin: margins[year],
				margin_percentage: margin_percentages[year],
			};
		});

		// Texte complet
		const formatted_text = Object.values(formatted_sections).join("\n\n");

		return {
			data: {
				revenue_totals,
				expenses_totals,
				margins,
				margin_percentages,
				revenue_growth,
				details,
			},
			formatted_sections,
			formatted_text,
		};
	} catch (error) {
		console.error("Erreur dans le formatage yearly_projection:", error);
		return defaultResponse;
	}
}
