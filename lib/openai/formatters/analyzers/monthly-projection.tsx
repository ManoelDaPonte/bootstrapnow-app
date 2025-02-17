// lib/openai/formatters/analyzers/monthly_projection.ts
import { MonthlyProjectionData } from "@/types/openai/analyzers";
export function format_monthly_projection(data: any): MonthlyProjectionData {
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

	const formatted_qa = {
		// Inventaire
		stock_type: `Question : Quel type de stock gérez-vous ?\n\nRéponse : ${
			projection_data.qa_responses?.OP_Inventaire_stocktype ||
			"Non renseigné"
		}`,
		stock_cost: `Question : Quels sont vos coûts de stockage ?\n\nRéponse : ${
			projection_data.qa_responses?.OP_Inventaire_stockcost ||
			"Non renseigné"
		}`,
		stock_churn: `Question : Quel est votre taux de rotation des stocks ?\n\nRéponse : ${
			projection_data.qa_responses?.OP_Inventaire_stockchurn ||
			"Non renseigné"
		}`,
		stock_variation: `Question : Comment gérez-vous les variations de stock ?\n\nRéponse : ${
			projection_data.qa_responses?.OP_Inventaire_stockvariation ||
			"Non renseigné"
		}`,
		stock_delay: `Question : Quels sont vos délais de réapprovisionnement ?\n\nRéponse : ${
			projection_data.qa_responses?.OP_Inventaire_stockdelay ||
			"Non renseigné"
		}`,

		// Crédit
		credit_common: `Question : Quelles sont vos pratiques courantes de crédit ?\n\nRéponse : ${
			projection_data.qa_responses?.OP_Credit_common || "Non renseigné"
		}`,
		credit_policy: `Question : Quelle est votre politique de crédit ?\n\nRéponse : ${
			projection_data.qa_responses?.OP_Credit_policy || "Non renseigné"
		}`,
		credit_conditions: `Question : Quelles sont vos conditions de crédit ?\n\nRéponse : ${
			projection_data.qa_responses?.OP_Credit_conditions ||
			"Non renseigné"
		}`,
		credit_verification: `Question : Comment vérifiez-vous la solvabilité ?\n\nRéponse : ${
			projection_data.qa_responses?.OP_Credit_verification ||
			"Non renseigné"
		}`,
		credit_slow_payments: `Question : Comment gérez-vous les paiements lents ?\n\nRéponse : ${
			projection_data.qa_responses?.OP_Credit_slowpayments ||
			"Non renseigné"
		}`,
		credit_late_payments: `Question : Comment gérez-vous les retards de paiement ?\n\nRéponse : ${
			projection_data.qa_responses?.OP_Credit_latepayments ||
			"Non renseigné"
		}`,
	};

	return {
		data: {
			revenue_totals,
			expenses_totals,
			margins,
			margin_percentages,
			revenue_growth,
			details,
		},
		qa: projection_data.qa_responses,
		formatted_sections,
		formatted_qa,
		formatted_text: complete_text,
	};
}
