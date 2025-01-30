// hooks/useMarketingMixData.ts
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { MarketingMixData, MarketingMixCard } from "@/types/marketing-mix";
import {
	loadMarketingMixData,
	saveMarketingMixData,
	saveToDatabase,
} from "@/lib/business-plan/hooks/marketing-mix/storage-marketing-mix";

// Type utilitaire pour les catégories du Marketing Mix
type MarketingMixCategory = keyof Omit<MarketingMixData, "lastUpdated">;

export const useMarketingMixData = () => {
	const { user, isLoading } = useUser();
	const [cards, setCards] = useState<MarketingMixData>(
		loadMarketingMixData()
	);

	useEffect(() => {
		const loadInitialData = async () => {
			if (user) {
				try {
					const response = await fetch(
						"/api/business-plan/marketing-mix/data"
					);
					if (response.ok) {
						const serverData = await response.json();
						if (serverData) {
							setCards(serverData);
							localStorage.setItem(
								"marketing-mix-data",
								JSON.stringify(serverData)
							);
						}
					}
				} catch (error) {
					console.error(
						"Erreur lors du chargement des données:",
						error
					);
				}
			}
		};

		if (!isLoading) {
			loadInitialData();
		}
	}, [user, isLoading]);

	const handleSaveCard = async (
		category: MarketingMixCategory,
		card: MarketingMixCard
	) => {
		const newCards = {
			...cards,
			[category]: card.id
				? Array.isArray(cards[category])
					? cards[category].map((c) => (c.id === card.id ? card : c))
					: []
				: [...(cards[category] || []), { ...card, id: Date.now() }],
			lastUpdated: new Date().toISOString(),
		};

		setCards(newCards);
		saveMarketingMixData(newCards);

		if (user) {
			await saveToDatabase(newCards);
		}
	};

	const handleDeleteCard = async (
		category: MarketingMixCategory,
		cardId: number
	) => {
		const newCards = {
			...cards,
			[category]: Array.isArray(cards[category])
				? cards[category].filter((c) => c.id !== cardId)
				: [],
			lastUpdated: new Date().toISOString(),
		};

		setCards(newCards);
		saveMarketingMixData(newCards);

		if (user) {
			await saveToDatabase(newCards);
		}
	};

	return {
		cards,
		isLoading,
		user,
		handleSaveCard,
		handleDeleteCard,
	};
};

export default useMarketingMixData;
