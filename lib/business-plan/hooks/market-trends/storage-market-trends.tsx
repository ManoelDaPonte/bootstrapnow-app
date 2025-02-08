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
	trends: [
		{ id: "trend_1", annee: 2020, tauxCroissance: 5, variationDemande: 4 },
		{ id: "trend_2", annee: 2021, tauxCroissance: 7, variationDemande: 6 },
		{ id: "trend_3", annee: 2022, tauxCroissance: 8, variationDemande: 7 },
		{ id: "trend_4", annee: 2023, tauxCroissance: 10, variationDemande: 9 },
		{
			id: "trend_5",
			annee: 2024,
			tauxCroissance: 12,
			variationDemande: 11,
		},
	],
	marketNumbers: [
		{
			id: "market_size",
			value: "1,200M€",
			title: "Taille du marché",
			description:
				"C'est la taille actuelle du marché global, en pleine croissance.",
			referenceLink: "https://example.com/market_size",
		},
		{
			id: "annual_growth",
			value: "12%",
			title: "Croissance annuelle",
			description:
				"Le marché croît à un taux annuel de 12%, favorisant l'innovation.",
			referenceLink: "https://example.com/annual_growth",
		},
		{
			id: "market_share",
			value: "30%",
			title: "Part de marché des leaders",
			description: "Les trois principaux acteurs dominent 30% du marché.",
			referenceLink: "https://example.com/market_share",
		},
	],
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
