// lib/business-plan/hooks/12-months/storage-12-months.tsx
import { ProfitLossData, MonthlyProjectionData } from "@/types/12-months";
import { prisma } from "@/lib/db/prisma";
import { QAResponses } from "@/types/shared/qa-section";
import { INVENTAIRE_QA_DATA } from "@/lib/business-plan/config/12-months";

export const STORAGE_KEY = "profit-loss-data";
export const QA_STORAGE_KEY = "profit-loss-qa-responses";

export const saveProfitLossData = (
	data: ProfitLossData,
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

	// Mettre à jour avec les deux paramètres
	updateParentProgress(calculateProgress(data, qaResponses));
};

export async function updateProfitLossData(
	auth0Id: string,
	data: ProfitLossData,
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

		const profitLossAnalysis =
			await prisma.monthlyProjectionAnalysis.upsert({
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

		return profitLossAnalysis;
	} catch (error) {
		console.error("Erreur détaillée lors de la sauvegarde:", error);
		throw error;
	}
}

export const calculateProgress = (
	data: ProfitLossData,
	qaResponses: QAResponses = {}
): number => {
	// 1. Calculer la progression des entrées financières
	const totalFields = (data.revenue.length + data.expenses.length) * 13; // 12 mois + catégorie

	const filledFields = [...data.revenue, ...data.expenses].reduce(
		(acc, entry) => {
			const monthFields = Object.values(entry)
				.filter((value) => typeof value === "number")
				.filter((value) => value !== 0).length;
			return acc + (entry.category ? 1 : 0) + monthFields;
		},
		0
	);

	// 2. Calculer la progression des réponses QA
	const questionIds = INVENTAIRE_QA_DATA.categories.map((cat) => cat.id);
	const answeredQuestions = questionIds.filter(
		(id) => qaResponses[id] && qaResponses[id].trim() !== ""
	).length;
	const totalQAQuestions = questionIds.length;

	// 3. Calculer la progression totale
	const financialWeight = 0.7; // 70% pour les données financières
	const qaWeight = 0.3; // 30% pour les questions

	const financialProgress =
		totalFields > 0 ? (filledFields / totalFields) * 100 : 0;

	const qaProgress =
		totalQAQuestions > 0 ? (answeredQuestions / totalQAQuestions) * 100 : 0;

	const totalProgress = Math.round(
		financialProgress * financialWeight + qaProgress * qaWeight
	);

	return Math.min(100, totalProgress);
};

export const loadProfitLossData = (): MonthlyProjectionData => {
	if (typeof window === "undefined") {
		return {
			data: getEmptyProfitLossData(),
			qaResponses: {},
		};
	}

	const storedData = localStorage.getItem(STORAGE_KEY);
	const storedQA = localStorage.getItem(QA_STORAGE_KEY);

	return {
		data: storedData ? JSON.parse(storedData) : getEmptyProfitLossData(),
		qaResponses:
			storedQA && storedQA !== "undefined" ? JSON.parse(storedQA) : {},
	};
};

export const getEmptyProfitLossData = (): ProfitLossData => ({
	revenue: [],
	expenses: [],
});

const updateParentProgress = (progress: number) => {
	if (typeof window === "undefined") return;

	const event = new CustomEvent("profitLossProgressUpdate", {
		detail: { progress },
	});
	window.dispatchEvent(event);
};

export const saveToDatabase = async (
	data: ProfitLossData,
	qaResponses: QAResponses
) => {
	try {
		const response = await fetch("/api/business-plan/12-months/save", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data, qaResponses }),
		});

		if (!response.ok) {
			throw new Error(
				"Erreur lors de la sauvegarde dans la base de données"
			);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error("Erreur lors de la sauvegarde dans la BD:", error);
		throw error;
	}
};
