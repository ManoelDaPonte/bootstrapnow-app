// hooks/usePestelData.ts
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { PestelData, PestelCard } from "@/types/pestel";
import {
	loadPestelData,
	savePestelData,
	saveToDatabase,
} from "@/lib/business-plan/hooks/pestel/storage-pestel";

// Type utilitaire pour s'assurer que la catégorie est une clé valide de PestelData
type PestelCategory = keyof Omit<PestelData, "lastAnalysis" | "lastUpdated">;

export const usePestelData = () => {
	const { user, isLoading } = useUser();
	const [cards, setCards] = useState<PestelData>(loadPestelData());

	useEffect(() => {
		const loadInitialData = async () => {
			if (user) {
				try {
					// Utiliser la route pour récupérer les données PESTEL
					const response = await fetch(
						"/api/business-plan/pestel/data"
					);
					if (response.ok) {
						const serverData = await response.json();
						if (serverData) {
							setCards(serverData);
							localStorage.setItem(
								"pestel-data",
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
		category: PestelCategory,
		card: PestelCard
	) => {
		const newCards = {
			...cards,
			[category]: card.id
				? cards[category].map((c) => (c.id === card.id ? card : c))
				: [...cards[category], { ...card, id: Date.now() }],
		};

		setCards(newCards);
		savePestelData(newCards);

		if (user) {
			await saveToDatabase(newCards);
		}
	};

	const handleDeleteCard = async (
		category: PestelCategory,
		cardId: number
	) => {
		const newCards = {
			...cards,
			[category]: cards[category].filter((c) => c.id !== cardId),
		};

		setCards(newCards);
		savePestelData(newCards);

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
