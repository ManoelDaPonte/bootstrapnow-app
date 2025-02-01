// lib/business-plan/hooks/startup-expenses/storage-startup.tsx
import { FinancialData, FinancialEntry, Risk } from "@/types/startup-expenses";
import { prisma } from "@/lib/db/prisma";

export const STORAGE_KEY = "startup-expenses-data";

export const saveStartupData = (data: FinancialData) => {
	if (typeof window === "undefined") return;

	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({
			...data,
			lastUpdated: new Date().toISOString(),
		})
	);

	updateParentProgress(calculateProgress(data));
};

export async function updateStartupData(auth0Id: string, data: FinancialData) {
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
				updatedAt: new Date(),
			},
			create: {
				userId: user.id,
				data: JSON.parse(JSON.stringify(data)),
			},
		});

		return startupAnalysis;
	} catch (error) {
		console.error("Erreur détaillée lors de la sauvegarde:", error);
		throw error;
	}
}

export const calculateProgress = (data: FinancialData): number => {
	const totalFields =
		(data.capital.investors.length +
			data.capital.loans.length +
			data.expenses.categories.length) *
			4 + // 4 champs par entrée financière
		data.risks.length * 4; // 4 champs par risque

	if (totalFields === 0) return 0;

	// Calculer les champs remplis
	const filledFinancialFields = [
		...data.capital.investors,
		...data.capital.loans,
		...data.expenses.categories,
	].reduce(
		(acc, entry) =>
			acc +
			((entry.name ? 1 : 0) +
				(entry.amount ? 1 : 0) +
				(entry.type ? 1 : 0) +
				(entry.category ? 1 : 0)),
		0
	);

	const filledRiskFields = data.risks.reduce(
		(acc, risk) =>
			acc +
			((risk.category ? 1 : 0) +
				(risk.probability ? 1 : 0) +
				(risk.impact ? 1 : 0) +
				(risk.mitigation ? 1 : 0)),
		0
	);

	return Math.round(
		((filledFinancialFields + filledRiskFields) / totalFields) * 100
	);
};

export const loadStartupData = (): FinancialData => {
	if (typeof window === "undefined") {
		return getEmptyStartupData();
	}

	const storedData = localStorage.getItem(STORAGE_KEY);
	return storedData ? JSON.parse(storedData) : getEmptyStartupData();
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

export const saveToDatabase = async (data: FinancialData) => {
	try {
		const response = await fetch(
			"/api/business-plan/startup-expenses/save",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ data }),
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
