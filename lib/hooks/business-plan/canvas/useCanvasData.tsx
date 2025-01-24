// hooks/useCanvasData.ts
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CanvasData, CanvasCard } from "@/types/canvas";
import {
	loadCanvasData,
	saveCanvasData,
	saveToDatabase,
} from "@/lib/business-plan/canvas/storage-canvas";

type CanvasCategory = keyof Omit<CanvasData, "lastAnalysis" | "lastUpdated">;

export const useCanvasData = () => {
	const { user, isLoading } = useUser();
	const [cards, setCards] = useState<CanvasData>(loadCanvasData());

	useEffect(() => {
		const loadInitialData = async () => {
			if (user) {
				try {
					const response = await fetch(
						"/api/business-plan/canvas/data"
					);
					if (response.ok) {
						const serverData = await response.json();
						if (serverData) {
							setCards(serverData);
							localStorage.setItem(
								"canvas-data",
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
		category: CanvasCategory,
		card: CanvasCard
	) => {
		const newCards = {
			...cards,
			[category]: card.id
				? cards[category].map((c) => (c.id === card.id ? card : c))
				: [...cards[category], { ...card, id: Date.now() }],
		};

		setCards(newCards);
		saveCanvasData(newCards);

		if (user) {
			console.log("Utilisateur connecté, sauvegarde en BD");
			await saveToDatabase(newCards);
		}
	};

	const handleDeleteCard = async (
		category: CanvasCategory,
		cardId: number
	) => {
		const newCards = {
			...cards,
			[category]: cards[category].filter((c) => c.id !== cardId),
		};

		setCards(newCards);
		saveCanvasData(newCards);

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

export default useCanvasData;
