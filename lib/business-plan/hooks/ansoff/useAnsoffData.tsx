import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { AnsoffData, AnsoffCard } from "@/types/ansoff";
import {
	loadAnsoffData,
	saveAnsoffData,
	saveToDatabase,
} from "@/lib/business-plan/hooks/ansoff/storage-ansoff";

// Type utilitaire pour s'assurer que la catégorie est une clé valide de AnsoffData
type AnsoffCategory = keyof Omit<AnsoffData, "lastAnalysis" | "lastUpdated">;

export const useAnsoffData = () => {
	const { user, isLoading: authLoading } = useUser();
	const [cards, setCards] = useState<AnsoffData>(loadAnsoffData());
	const [isLoading, setIsLoading] = useState(true);

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
							saveAnsoffData(serverData);
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

	const saveData = async (newCards: AnsoffData) => {
		try {
			// Sauvegarde locale
			saveAnsoffData(newCards);

			// Sauvegarde en base de données si l'utilisateur est connecté
			if (user) {
				await saveToDatabase(newCards);
			}
		} catch (error) {
			console.error("Erreur lors de la sauvegarde:", error);
			// Vous pourriez ajouter ici une notification d'erreur pour l'utilisateur
		}
	};

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
		await saveData(newCards);
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
