import { TrendEntry, MarketNumber } from "@/types/market-trends";
import { prisma } from "@/lib/db/prisma";

export interface MarketTrendsData {
	trends: TrendEntry[];
	marketNumbers: MarketNumber[];
	lastUpdated?: string;
}

export const STORAGE_KEY = "market-trends-data";

export const saveMarketTrendsData = (data: MarketTrendsData) => {
	if (typeof window === "undefined") return;

	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({
			...data,
			lastUpdated: new Date().toISOString(),
		})
	);

	// Ajouter la mise à jour de la progression
	updateParentProgress(calculateProgress(data));
};

const updateParentProgress = (progress: number) => {
	if (typeof window === "undefined") return;
	const event = new CustomEvent("marketTrendsProgressUpdate", {
		detail: { progress },
	});
	window.dispatchEvent(event);
};
export async function updateMarketTrendsData(
	auth0Id: string,
	data: MarketTrendsData
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

		const marketTrendsAnalysis = await prisma.marketTrendsAnalysis.upsert({
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

		return marketTrendsAnalysis;
	} catch (error) {
		console.error("Erreur détaillée lors de la sauvegarde:", error);
		throw error;
	}
}

export const loadMarketTrendsData = (): MarketTrendsData => {
	if (typeof window === "undefined") {
		return getEmptyMarketTrendsData();
	}

	const storedData = localStorage.getItem(STORAGE_KEY);
	return storedData ? JSON.parse(storedData) : getEmptyMarketTrendsData();
};

export const getEmptyMarketTrendsData = (): MarketTrendsData => ({
	trends: [],
	marketNumbers: [],
	lastUpdated: new Date().toISOString(),
});

export const saveToDatabase = async (data: MarketTrendsData) => {
	try {
		const response = await fetch("/api/business-plan/market-trends/save", {
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

		const result = await response.json();
		return result;
	} catch (error) {
		console.error("Erreur lors de la sauvegarde dans la BD:", error);
		throw error;
	}
};

export const calculateProgress = (data: MarketTrendsData): number => {
	// 1. Calculer la progression des tendances et chiffres du marché
	const totalFields = data.trends.length * 3 + data.marketNumbers.length * 4;
	if (totalFields === 0) return 0;

	const filledFields =
		data.trends.reduce((acc, trend) => {
			return (
				acc +
				Object.values(trend).filter((value) => value !== "").length
			);
		}, 0) +
		data.marketNumbers.reduce((acc, item) => {
			return (
				acc + Object.values(item).filter((value) => value !== "").length
			);
		}, 0);

	// Puisqu'il n'y a pas de QA dans ce composant, on utilise un poids de 100%
	return Math.min(100, Math.round((filledFields / totalFields) * 100));
};
