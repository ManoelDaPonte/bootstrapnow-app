import { useState, useEffect } from "react";
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
	const [trends, setTrends] = useState<TrendEntry[]>([]);
	const [marketNumbers, setMarketNumbers] = useState<MarketNumber[]>([]);
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
			} else {
				const localData = loadMarketTrendsData();
				setTrends(localData.trends);
				setMarketNumbers(localData.marketNumbers);
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

	const saveMarketNumber = async () => {
		await handleSaveData({ trends, marketNumbers });
	};

	const addMarketNumber = () => {
		const newMarketNumber = {
			id: Date.now().toString(),
			title: "",
			value: "",
			description: "",
			referenceLink: "",
		};
		setMarketNumbers((prev) => [...prev, newMarketNumber]);
		saveTrend(); // Sauvegarder les changements
	};

	const removeMarketNumber = (id: string) => {
		setMarketNumbers((prev) => prev.filter((n) => n.id !== id));
		saveTrend(); // Sauvegarder les changements
	};

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
		addMarketNumber,
		removeMarketNumber,
	};
};
