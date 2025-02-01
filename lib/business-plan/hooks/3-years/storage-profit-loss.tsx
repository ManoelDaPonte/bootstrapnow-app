// lib/business-plan/hooks/profit-loss/storage-profit-loss.tsx
import { ProfitLossData, ProfitLossEntry } from "@/types/profit-loss";
import { prisma } from "@/lib/db/prisma";

export const STORAGE_KEY = "profit-loss-data";

export const saveProfitLossData = (data: ProfitLossData) => {
	if (typeof window === "undefined") return;

	// Sauvegarde locale
	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({
			...data,
			lastUpdated: new Date().toISOString(),
		})
	);

	updateParentProgress(calculateProgress(data));
};

export async function updateProfitLossData(
	auth0Id: string,
	data: ProfitLossData
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

		const profitLossAnalysis = await prisma.yearlyProjectionAnalysis.upsert(
			{
				where: { userId: user.id },
				update: {
					data: JSON.parse(JSON.stringify(data)),
					updatedAt: new Date(),
				},
				create: {
					userId: user.id,
					data: JSON.parse(JSON.stringify(data)),
				},
			}
		);

		return profitLossAnalysis;
	} catch (error) {
		console.error("Erreur détaillée lors de la sauvegarde:", error);
		throw error;
	}
}

export const calculateProgress = (data: ProfitLossData): number => {
	const totalFields = (data.revenue.length + data.expenses.length) * 4; // catégorie + 3 années
	if (totalFields === 0) return 0;

	const filledFields = [...data.revenue, ...data.expenses].reduce(
		(acc, entry) => {
			const yearFields = ["Year 1", "Year 2", "Year 3"].filter(
				(year: string) => entry[year as keyof ProfitLossEntry] !== 0
			).length;
			return acc + (entry.category ? 1 : 0) + yearFields;
		},
		0
	);

	return Math.round((filledFields / totalFields) * 100);
};

export const loadProfitLossData = (): ProfitLossData => {
	if (typeof window === "undefined") {
		return getEmptyProfitLossData();
	}

	const storedData = localStorage.getItem(STORAGE_KEY);
	return storedData ? JSON.parse(storedData) : getEmptyProfitLossData();
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

export const saveToDatabase = async (data: ProfitLossData) => {
	try {
		const response = await fetch("/api/business-plan/3-years/save", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data }),
		});

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
