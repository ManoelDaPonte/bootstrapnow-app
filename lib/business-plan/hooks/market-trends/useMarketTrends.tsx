import { useState, useEffect, useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { TrendEntry, MarketNumber } from "@/types/market-trends";
import {
	MarketTrendsData,
	loadMarketTrendsData,
	saveMarketTrendsData,
	saveToDatabase,
} from "@/lib/business-plan/hooks/market-trends/storage-market-trends";

export const useMarketTrends = () => {
	const { user, isLoading: authLoading } = useUser();
	const initialData = loadMarketTrendsData();
	const [trends, setTrends] = useState<TrendEntry[]>(initialData.trends);
	const [marketNumbers, setMarketNumbers] = useState<MarketNumber[]>(
		initialData.marketNumbers
	);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadInitialData = async () => {
			if (user) {
				try {
					const response = await fetch(
						"/api/business-plan/market-trends/data"
					);
					if (response.ok) {
						const serverData = await response.json();
						if (serverData && serverData.data) {
							setTrends(serverData.data.trends);
							setMarketNumbers(serverData.data.marketNumbers);
							saveMarketTrendsData(serverData.data);
						}
					}
				} catch (error) {
					console.error(
						"Erreur lors du chargement des données:",
						error
					);
				}
			}
			setIsLoading(false);
		};

		if (!authLoading) {
			loadInitialData();
		}
	}, [user, authLoading]);

	const handleSaveData = async (newData: MarketTrendsData) => {
		try {
			saveMarketTrendsData(newData);
			if (user) {
				await saveToDatabase(newData);
			}
		} catch (error) {
			console.error("Erreur lors de la sauvegarde:", error);
		}
	};

	// Mise à jour locale sans sauvegarde
	const updateTrend = (
		id: string,
		field: keyof TrendEntry,
		value: string
	) => {
		setTrends((prev) =>
			prev.map((trend) => {
				if (trend.id !== id) return trend;
				const newValue =
					field === "annee"
						? parseInt(value)
						: parseFloat(value) || 0;
				return { ...trend, [field]: newValue };
			})
		);
	};

	// Sauvegarde lors de la perte du focus
	const saveTrend = async () => {
		await handleSaveData({ trends, marketNumbers });
	};

	const addTrend = async () => {
		const newTrend: TrendEntry = {
			id: `trend_${Date.now()}`,
			annee: new Date().getFullYear(),
			tauxCroissance: 0,
			variationDemande: 0,
		};
		const newTrends = [...trends, newTrend];
		setTrends(newTrends);
		await handleSaveData({ trends: newTrends, marketNumbers });
	};

	const removeTrend = async (id: string) => {
		const newTrends = trends.filter((trend) => trend.id !== id);
		setTrends(newTrends);
		await handleSaveData({ trends: newTrends, marketNumbers });
	};

	// Mise à jour locale sans sauvegarde
	const updateMarketNumber = (
		id: string,
		field: keyof MarketNumber,
		value: string
	) => {
		setMarketNumbers((prev) =>
			prev.map((item) => {
				if (item.id !== id) return item;
				return { ...item, [field]: value };
			})
		);
	};

	// Sauvegarde lors de la perte du focus
	const saveMarketNumber = async () => {
		await handleSaveData({ trends, marketNumbers });
	};

	const calculateProgress = useCallback(() => {
		const totalFields = trends.length * 3 + marketNumbers.length * 4;
		const filledFields =
			trends.reduce((acc, trend) => {
				return (
					acc +
					Object.values(trend).filter((value) => value !== "").length
				);
			}, 0) +
			marketNumbers.reduce((acc, item) => {
				return (
					acc +
					Object.values(item).filter((value) => value !== "").length
				);
			}, 0);
		return Math.round((filledFields / totalFields) * 100);
	}, [trends, marketNumbers]);

	return {
		trends,
		marketNumbers,
		isLoading: isLoading || authLoading,
		addTrend,
		updateTrend,
		saveTrend,
		removeTrend,
		updateMarketNumber,
		saveMarketNumber,
		calculateProgress,
	};
};
