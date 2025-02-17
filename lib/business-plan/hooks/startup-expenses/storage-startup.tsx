import { FinancialData } from "@/types/startup-expenses";
import { QAResponses } from "@/types/shared/qa-section";
import { prisma } from "@/lib/db/prisma";
import { STARTUP_QA_DATA } from "@/lib/business-plan/config/startup-expenses";

export const STORAGE_KEY = "startup-expenses-data";
export const QA_STORAGE_KEY = "startup-expenses-qa-responses";

export const saveStartupData = (
	data: FinancialData,
	qaResponses: QAResponses
) => {
	if (typeof window === "undefined") return;

	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({
			...data,
			lastUpdated: new Date().toISOString(),
		})
	);

	localStorage.setItem(QA_STORAGE_KEY, JSON.stringify(qaResponses));

	updateParentProgress(calculateProgress(data, qaResponses));
};

export async function updateStartupData(
	auth0Id: string,
	data: FinancialData,
	qaResponses: QAResponses
) {
	try {
		const user = await prisma.user.upsert({
			where: { auth0Id },
			update: {},
			create: {
				auth0Id,
				email: "",
			},
		});

		const startupAnalysis = await prisma.startupExpensesAnalysis.upsert({
			where: { userId: user.id },
			update: {
				data: JSON.parse(JSON.stringify(data)),
				qaResponses: qaResponses,
				updatedAt: new Date(),
			},
			create: {
				userId: user.id,
				data: JSON.parse(JSON.stringify(data)),
				qaResponses: qaResponses,
			},
		});

		return startupAnalysis;
	} catch (error) {
		console.error("Erreur détaillée lors de la sauvegarde:", error);
		throw error;
	}
}

export const calculateProgress = (
	data: FinancialData,
	qaResponses: QAResponses = {}
): number => {
	// Section weights
	const SECTION_WEIGHTS = {
		capital: 0.3, // 30% du total
		expenses: 0.2, // 20% du total
		risks: 0.2, // 20% du total
		qa: 0.3, // 30% du total
	};

	// Calcul pour la section Capital (investisseurs + prêts)
	const capitalProgress = () => {
		const hasInvestors = data.capital.investors.length > 0;
		const hasLoans = data.capital.loans.length > 0;

		if (!hasInvestors && !hasLoans) return 0;

		const investorsComplete = data.capital.investors.every(
			(inv) => inv.name && inv.amount && inv.type
		);
		const loansComplete = data.capital.loans.every(
			(loan) => loan.name && loan.amount && loan.type
		);

		// Si on a au moins un type de financement complet
		if (hasInvestors && investorsComplete) return 1;
		if (hasLoans && loansComplete) return 1;

		// Sinon, progression partielle
		return 0.5;
	};

	// Calcul pour la section Dépenses
	const expensesProgress = () => {
		if (data.expenses.categories.length === 0) return 0;

		const complete = data.expenses.categories.every(
			(exp) => exp.name && exp.amount && exp.type
		);

		return complete ? 1 : 0.5;
	};

	// Calcul pour la section Risques
	const risksProgress = () => {
		if (data.risks.length === 0) return 0;

		const complete = data.risks.every(
			(risk) =>
				risk.category &&
				risk.probability !== undefined &&
				risk.impact !== undefined &&
				risk.mitigation
		);

		return complete ? 1 : 0.5;
	};

	// Calcul pour la section QA
	const qaProgress = () => {
		const questionIds = STARTUP_QA_DATA.categories.map((cat) => cat.id);
		const answeredQuestions = questionIds.filter(
			(id) => qaResponses[id] && qaResponses[id].trim() !== ""
		).length;

		return questionIds.length > 0
			? answeredQuestions / questionIds.length
			: 0;
	};

	// Calcul de la progression totale pondérée
	const totalProgress =
		capitalProgress() * SECTION_WEIGHTS.capital +
		expensesProgress() * SECTION_WEIGHTS.expenses +
		risksProgress() * SECTION_WEIGHTS.risks +
		qaProgress() * SECTION_WEIGHTS.qa;

	// Conversion en pourcentage et arrondi
	return Math.round(totalProgress * 100);
};

export const loadStartupData = () => {
	if (typeof window === "undefined") {
		return {
			data: getEmptyStartupData(),
			qaResponses: {},
		};
	}

	const storedData = localStorage.getItem(STORAGE_KEY);
	const storedQA = localStorage.getItem(QA_STORAGE_KEY);

	return {
		data: storedData ? JSON.parse(storedData) : getEmptyStartupData(),
		qaResponses: storedQA ? JSON.parse(storedQA) : {},
	};
};

export const getEmptyStartupData = (): FinancialData => ({
	capital: {
		investors: [],
		loans: [],
	},
	expenses: {
		categories: [],
	},
	revenue: 0,
	projections: {
		year1: 0,
		year2: 0,
		year3: 0,
	},
	risks: [],
	categoryDefinitions: {
		investors: [],
		loans: [],
		expenses: [],
	},
});

const updateParentProgress = (progress: number) => {
	if (typeof window === "undefined") return;

	const event = new CustomEvent("startupProgressUpdate", {
		detail: { progress },
	});
	window.dispatchEvent(event);
};

export const saveToDatabase = async (
	data: FinancialData,
	qaResponses: QAResponses
) => {
	try {
		const response = await fetch(
			"/api/business-plan/startup-expenses/save",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ data, qaResponses }),
			}
		);

		if (!response.ok) {
			throw new Error(
				"Erreur lors de la sauvegarde dans la base de données"
			);
		}

		return await response.json();
	} catch (error) {
		console.error("Erreur lors de la sauvegarde dans la BD:", error);
		throw error;
	}
};
