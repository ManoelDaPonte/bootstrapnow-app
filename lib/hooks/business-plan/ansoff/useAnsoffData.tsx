// hooks/useAnsoffData.ts
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { AnsoffData, AnsoffCard } from "@/types/ansoff";
import {
	loadAnsoffData,
	saveAnsoffData,
	saveToDatabase,
} from "@/lib/business-plan/ansoff/storage-ansoff";

// Type utilitaire pour s'assurer que la catégorie est une clé valide de AnsoffData
type AnsoffCategory = keyof Omit<AnsoffData, "lastAnalysis" | "lastUpdated">;

export const useAnsoffData = () => {
	const { user, isLoading } = useUser();
	const [cards, setCards] = useState<AnsoffData>(loadAnsoffData());

	useEffect(() => {
		const loadInitialData = async () => {
			if (user) {
				try {
					const response = await fetch(
						"/api/business-plan/ansoff/data"
					);
					if (response.ok) {
						const serverData = await response.json();
						if (serverData) {
							setCards(serverData);
							localStorage.setItem(
								"ansoff-data",
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
		category: AnsoffCategory,
		card: AnsoffCard
	) => {
		const newCards = {
			...cards,
			[category]: card.id
				? cards[category].map((c) => (c.id === card.id ? card : c))
				: [...cards[category], { ...card, id: Date.now() }],
		};

		setCards(newCards);
		saveAnsoffData(newCards);

		if (user) {
			console.log("Utilisateur connecté, sauvegarde en BD");
			await saveToDatabase(newCards);
		}
	};

	const handleDeleteCard = async (
		category: AnsoffCategory,
		cardId: number
	) => {
		const newCards = {
			...cards,
			[category]: cards[category].filter((c) => c.id !== cardId),
		};

		setCards(newCards);
		saveAnsoffData(newCards);
	};

	return {
		cards,
		isLoading,
		user,
		handleSaveCard,
		handleDeleteCard,
	};
};
