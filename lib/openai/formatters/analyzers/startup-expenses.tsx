// lib/openai/formatters/analyzers/startup_expenses.ts
import { FormattedAnalysis } from "@/types/openai/analysis";
export function format_startup_expenses(data: any): FormattedAnalysis {
	const startup_data = data.startup_expenses.data;

	// Calcul des totaux
	const total_investment = startup_data.capital.investors.reduce(
		(sum: number, inv: any) => sum + inv.amount,
		0
	);
	const total_loans = startup_data.capital.loans.reduce(
		(sum: number, loan: any) => sum + loan.amount,
		0
	);
	const total_capital = total_investment + total_loans;
	const total_expenses = startup_data.expenses.categories.reduce(
		(sum: number, exp: any) => sum + exp.amount,
		0
	);

	// Analyse du capital
	const capital_analysis = [
		"Analyse du Capital :",
		`\nCapital Total Disponible : ${total_capital.toLocaleString()} €`,
		"\nRépartition des Investissements :",
		...startup_data.capital.investors.map((investor: any) => {
			const percentage = (
				(investor.amount / total_capital) *
				100
			).toFixed(1);
			return `- ${investor.name} (${
				investor.type
			}) : ${investor.amount.toLocaleString()} € (${percentage}% du capital total)`;
		}),
		"\nEmprunts :",
		...startup_data.capital.loans.map(
			(loan: any) => `- ${loan.name} : ${loan.amount.toLocaleString()} €`
		),
	];

	// Analyse des dépenses par type
	const expenses_by_type = startup_data.expenses.categories.reduce(
		(acc: any, expense: any) => {
			if (!acc[expense.type]) acc[expense.type] = [];
			acc[expense.type].push(expense);
			return acc;
		},
		{}
	);

	const expenses_analysis = [
		"\nAnalyse des Dépenses :",
		`\nDépenses Totales : ${total_expenses.toLocaleString()} €`,
		...Object.entries(expenses_by_type).map(
			([type, expenses]: [string, any]) => {
				const type_total = expenses.reduce(
					(sum: number, exp: any) => sum + exp.amount,
					0
				);
				const type_percentage = (
					(type_total / total_expenses) *
					100
				).toFixed(1);
				return [
					`\n${type} (${type_percentage}% des dépenses) :`,
					...expenses.map((expense: any) => {
						const exp_percentage = (
							(expense.amount / total_expenses) *
							100
						).toFixed(1);
						return `- ${
							expense.name
						} : ${expense.amount.toLocaleString()} € (${exp_percentage}% des dépenses totales)`;
					}),
				].join("\n");
			}
		),
	];

	// Analyse des risques
	function getRiskLevel(impact: number, probability: number): string {
		const risk_score = impact * probability;
		if (risk_score < 0.2) return "Faible";
		if (risk_score < 0.4) return "Modéré";
		return "Élevé";
	}

	const risks_analysis = [
		"\nAnalyse des Risques :",
		...startup_data.risks.map((risk: any) => {
			const risk_level = getRiskLevel(risk.impact, risk.probability);
			const risk_score = risk.impact * risk.probability;
			return [
				`\n${risk.category}:`,
				`- Niveau de risque : ${risk_level}`,
				`- Impact : ${risk.impact}/5`,
				`- Probabilité : ${(risk.probability * 100).toFixed(1)}%`,
				`- Score de risque : ${risk_score.toFixed(2)}`,
				`- Stratégie d'atténuation : ${risk.mitigation}`,
			].join("\n");
		}),
	];

	// Analyse financière
	const financial_analysis = [
		"\nAnalyse Financière :",
		`- Capital disponible : ${total_capital.toLocaleString()} €`,
		`- Dépenses mensuelles estimées : ${total_expenses.toLocaleString()} €`,
	];

	if (total_expenses > 0) {
		const runway_months = total_capital / total_expenses;
		financial_analysis.push(
			`- Runway estimé : ${runway_months.toFixed(1)} mois`,
			`- Ratio Capital/Dépenses : ${(
				total_capital / total_expenses
			).toFixed(2)}`
		);
	}

	// Création des sections formatées
	const formatted_sections = {
		capital: capital_analysis.join("\n"),
		expenses: expenses_analysis.join("\n"),
		risks: risks_analysis.join("\n"),
		financial: financial_analysis.join("\n"),
	};

	const formatted_qa = {
		budget: `Question : Comment établissez-vous votre budget ?\n\nRéponse : ${
			startup_data.qa_responses?.FP_Budget || "Non renseigné"
		}`,
		funding: `Question : Quelles sont vos sources de financement ?\n\nRéponse : ${
			startup_data.qa_responses?.FP_Funding || "Non renseigné"
		}`,
		capital_needs: `Question : Quels sont vos besoins en capital ?\n\nRéponse : ${
			startup_data.qa_responses?.FP_CapitelNeeds || "Non renseigné"
		}`,
		external_cost: `Question : Quels sont vos coûts externes ?\n\nRéponse : ${
			startup_data.qa_responses?.FP_ExternalCost || "Non renseigné"
		}`,
		tax_legal: `Question : Quelles sont vos considérations fiscales et légales ?\n\nRéponse : ${
			startup_data.qa_responses?.FP_TaxLegalConsiderations ||
			"Non renseigné"
		}`,
	};

	// Texte complet
	const complete_text = Object.values(formatted_sections).join("\n\n");

	return {
		data: startup_data,
		qa: startup_data.qa_responses,
		formatted_sections,
		formatted_qa,
		formatted_text: complete_text,
	};
}
