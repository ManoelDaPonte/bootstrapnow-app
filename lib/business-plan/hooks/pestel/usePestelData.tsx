// hooks/usePestelData.ts
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { PestelData, PestelCard } from "@/types/pestel";
import { QAResponses } from "@/types/shared/qa-section";
import {
	loadPestelData,
	savePestelData,
	saveToDatabase,
} from "@/lib/business-plan/hooks/pestel/storage-pestel";

// Type utilitaire pour s'assurer que la catégorie est une clé valide de PestelData
type PestelCategory = keyof Omit<PestelData, "lastAnalysis" | "lastUpdated">;

export const usePestelData = () => {
	const { user, isLoading: authLoading } = useUser();
	const [cards, setCards] = useState<PestelData>(loadPestelData().data);
	const [qaResponses, setQAResponses] = useState<QAResponses>(
		loadPestelData().qaResponses
	);
	const [isLoading, setIsLoading] = useState(true);

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
							setCards(serverData.data);
							setQAResponses(serverData.qaResponses);
							savePestelData(
								serverData.data,
								serverData.qaResponses
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
			setIsLoading(false);
		};

		if (!authLoading) {
			loadInitialData();
		}
	}, [user, authLoading]);

	const saveCompleteData = async (
		newData: PestelData,
		newQAResponses: QAResponses
	) => {
		try {
			savePestelData(newData, newQAResponses);
			if (user) {
				await saveToDatabase(newData, newQAResponses);
			}
		} catch (error) {
			console.error("Erreur lors de la sauvegarde:", error);
		}
	};

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
		await saveCompleteData(newCards, qaResponses);
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
		await saveCompleteData(newCards, qaResponses);
	};

	const handleQAResponseChange = (categoryId: string, response: string) => {
		setQAResponses((prev) => ({
			...prev,
			[categoryId]: response,
		}));
	};

	const handleQAResponseSave = async (
		categoryId: string,
		response: string
	) => {
		try {
			const newQAResponses = {
				...qaResponses,
				[categoryId]: response,
			};

			// Sauvegarde locale
			savePestelData(cards, newQAResponses);

			// Sauvegarde en BD si connecté
			if (user) {
				await saveToDatabase(cards, newQAResponses);
			}
		} catch (error) {
			console.error("Failed to save QA response:", error);
		}
	};

	return {
		cards: cards,
		qaResponses,
		isLoading: isLoading || authLoading,
		user,
		handleSaveCard,
		handleDeleteCard,
		handleQAResponseChange,
		handleQAResponseSave,
	};
};
