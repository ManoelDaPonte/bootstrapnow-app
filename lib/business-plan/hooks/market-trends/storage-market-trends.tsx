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
