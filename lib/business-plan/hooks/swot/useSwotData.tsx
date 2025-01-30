import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { SwotData, SwotCard } from "@/types/swot";
import {
	loadSwotData,
	saveSwotData,
	saveToDatabase,
} from "@/lib/business-plan/hooks/swot/storage-swot";

type SwotCategory = keyof Omit<SwotData, "lastAnalysis" | "lastUpdated">;

export const useSwotData = () => {
	const { user, isLoading: authLoading } = useUser();
	const [cards, setCards] = useState<SwotData>(loadSwotData());
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadInitialData = async () => {
			if (user) {
				try {
					const response = await fetch(
						"/api/business-plan/swot/data"
					);
					if (response.ok) {
						const serverData = await response.json();
						if (serverData) {
							setCards(serverData);
							saveSwotData(serverData);
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

	const saveData = async (newCards: SwotData) => {
		try {
			// Sauvegarde locale
			saveSwotData(newCards);

			// Sauvegarde en base de données si l'utilisateur est connecté
			if (user) {
				await saveToDatabase(newCards);
			}
		} catch (error) {
			console.error("Erreur lors de la sauvegarde:", error);
		}
	};

	const handleSaveCard = async (category: SwotCategory, card: SwotCard) => {
		const newCards = {
			...cards,
			[category]: card.id
				? cards[category].map((c) => (c.id === card.id ? card : c))
				: [...cards[category], { ...card, id: Date.now() }],
		};

		setCards(newCards);
		await saveData(newCards);
	};

	const handleDeleteCard = async (category: SwotCategory, cardId: number) => {
		const newCards = {
			...cards,
			[category]: cards[category].filter((c) => c.id !== cardId),
		};

		setCards(newCards);
		await saveData(newCards);
	};

	return {
		cards,
		isLoading: isLoading || authLoading,
		user,
		handleSaveCard,
		handleDeleteCard,
	};
};
