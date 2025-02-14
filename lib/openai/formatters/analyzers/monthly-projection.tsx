// lib/openai/formatters/analyzers/monthly_projection.ts
import { MonthlyProjectionData } from "@/types/openai/analyzers";
export function format_monthly_projection(data: any): MonthlyProjectionData {
	console.log("=== DEBUG monthly_projection ===");
	console.log("Input data:", data);
	const projection_data = data.monthly_projection;
	const months = Array.from({ length: 12 }, (_, i) => `M${i + 1}`);

	// Fonction utilitaire pour calculer les totaux mensuels
	function calculateMonthlyTotals(data: any[], months: string[]) {
		return months.reduce((acc, month) => {
			acc[month] = data.reduce(
				(sum, item) => sum + parseFloat(item[month] || 0),
				0
			);
			return acc;
		}, {} as Record<string, number>);
	}

	// Calcul des totaux
	const revenue_totals = calculateMonthlyTotals(
		projection_data.data.revenue,
		months
	);
	const expenses_totals = calculateMonthlyTotals(
		projection_data.data.expenses,
		months
	);

	// Calcul des marges
	const margins = months.reduce((acc, month) => {
		acc[month] = revenue_totals[month] - expenses_totals[month];
		return acc;
	}, {} as Record<string, number>);

	const margin_percentages = months.reduce((acc, month) => {
		acc[month] =
			revenue_totals[month] !== 0
				? (margins[month] / revenue_totals[month]) * 100
				: 0;
		return acc;
	}, {} as Record<string, number>);

	// Analyse des tendances de croissance
	const revenue_growth = months.slice(1).map((month, index) => {
		const previous = revenue_totals[months[index]];
		const current = revenue_totals[month];
		return previous !== 0 ? ((current - previous) / previous) * 100 : 0;
	});

	// Calculs annuels
	const total_annual_revenue = Object.values(revenue_totals).reduce(
		(a, b) => a + b,
		0
	);
	const total_annual_expenses = Object.values(expenses_totals).reduce(
		(a, b) => a + b,
		0
	);
	const total_annual_margin = total_annual_revenue - total_annual_expenses;
	const margin_percentage =
		total_annual_revenue !== 0
			? (total_annual_margin / total_annual_revenue) * 100
			: 0;

	// Création des sections formatées
	const formatted_sections = {
		summary: `Résumé Financier Annuel :
  - Revenu total : ${total_annual_revenue.toLocaleString()} €
  - Dépenses totales : ${total_annual_expenses.toLocaleString()} €
  - Marge totale : ${total_annual_margin.toLocaleString()} €
  - Pourcentage de marge : ${margin_percentage.toFixed(1)}%`,

		monthly_analysis: months
			.map(
				(month) => `
  ${month}:
  - Revenus : ${revenue_totals[month].toLocaleString()} €
  - Dépenses : ${expenses_totals[month].toLocaleString()} €
  - Marge : ${margins[month].toLocaleString()} €
  - Taux de marge : ${margin_percentages[month].toFixed(1)}%`
			)
			.join("\n"),

		expenses_analysis: (() => {
			const expenses_by_category: Record<string, number> = {};
			projection_data.data.expenses.forEach((expense: any) => {
				const category = expense.category;
				const total = months.reduce(
					(sum, month) => sum + parseFloat(expense[month] || 0),
					0
				);
				expenses_by_category[category] =
					(expenses_by_category[category] || 0) + total;
			});

			return Object.entries(expenses_by_category)
				.map(([category, total]) => {
					const percentage = (total / total_annual_expenses) * 100;
					return `- ${category}: ${total.toLocaleString()} € (${percentage.toFixed(
						1
					)}% des dépenses totales)`;
				})
				.join("\n");
		})(),

		growth_analysis: `
  - Croissance moyenne mensuelle du revenu : ${(
		revenue_growth.reduce((a, b) => a + b, 0) / revenue_growth.length
  ).toFixed(1)}%
  - Meilleur mois : ${
		Object.entries(margins).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
  } (marge de ${Math.max(...Object.values(margins)).toLocaleString()} €)
  - Mois le plus difficile : ${
		Object.entries(margins).reduce((a, b) => (a[1] < b[1] ? a : b))[0]
  } (marge de ${Math.min(...Object.values(margins)).toLocaleString()} €)`,
	};

	// Texte complet
	const complete_text = Object.values(formatted_sections).join("\n\n");

	const details: Record<
		string,
		{
			month: string;
			revenue: number;
			expenses: number;
			margin: number;
			margin_percentage: number;
		}
	> = {};

	months.forEach((month) => {
		details[month] = {
			month,
			revenue: revenue_totals[month],
			expenses: expenses_totals[month],
			margin: margins[month],
			margin_percentage: margin_percentages[month],
		};
	});
	console.log("Formatted sections:", formatted_sections);
	console.log("Complete text:", complete_text);
	console.log("=== END DEBUG monthly_projection ===");

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
		formatted_text: complete_text,
	};
}
