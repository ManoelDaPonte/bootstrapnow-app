// hooks/useSwotData.ts
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { SwotData, SwotCard } from "@/types/swot";
import {
	loadSwotData,
	saveSwotData,
	saveToDatabase,
} from "@/lib/hooks/business-plan/swot/storage-swot";

// Type utilitaire pour s'assurer que la catégorie est une clé valide de SwotData
type SwotCategory = keyof Omit<SwotData, "lastAnalysis" | "lastUpdated">;

export const useSwotData = () => {
	const { user, isLoading } = useUser();
	const [cards, setCards] = useState<SwotData>(loadSwotData());

	useEffect(() => {
		const loadInitialData = async () => {
			if (user) {
				try {
					// Utiliser la nouvelle route pour récupérer les données
					const response = await fetch(
						"/api/business-plan/swot/data"
					);
					if (response.ok) {
						const serverData = await response.json();
						if (serverData) {
							setCards(serverData);
							localStorage.setItem(
								"swot-data",
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

	const handleSaveCard = async (category: SwotCategory, card: SwotCard) => {
		const newCards = {
			...cards,
			[category]: card.id
				? cards[category].map((c) => (c.id === card.id ? card : c))
				: [...cards[category], { ...card, id: Date.now() }],
		};

		setCards(newCards);
		saveSwotData(newCards);

		if (user) {
			console.log("Utilisateur connecté, sauvegarde en BD");
			await saveToDatabase(newCards);
		}
	};

	const handleDeleteCard = async (category: SwotCategory, cardId: number) => {
		const newCards = {
			...cards,
			[category]: cards[category].filter((c) => c.id !== cardId),
		};

		setCards(newCards);
		saveSwotData(newCards);
	};

	return {
		cards,
		isLoading,
		user,
		handleSaveCard,
		handleDeleteCard,
	};
};
