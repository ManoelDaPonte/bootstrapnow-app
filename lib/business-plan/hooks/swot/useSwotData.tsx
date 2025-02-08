import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { SwotData, SwotCard } from "@/types/swot";
import { QAResponses } from "@/types/shared/qa-section";
import {
	loadSwotData,
	saveSwotData,
	saveToDatabase,
} from "@/lib/business-plan/hooks/swot/storage-swot";

type SwotCategory = keyof Omit<SwotData, "lastAnalysis" | "lastUpdated">;

export const useSwotData = () => {
	const { user, isLoading: authLoading } = useUser();
	const [data, setData] = useState<SwotData>(loadSwotData().data);
	const [qaResponses, setQAResponses] = useState<QAResponses>(
		loadSwotData().qaResponses
	);
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
							setData(serverData.data);
							setQAResponses(serverData.qaResponses);
							saveSwotData(
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
		newData: SwotData,
		newQAResponses: QAResponses
	) => {
		try {
			saveSwotData(newData, newQAResponses);
			if (user) {
				await saveToDatabase(newData, newQAResponses);
			}
		} catch (error) {
			console.error("Erreur lors de la sauvegarde:", error);
		}
	};
	const handleSaveCard = async (category: SwotCategory, card: SwotCard) => {
		const newData = {
			...data,
			[category]: card.id
				? data[category].map((c) => (c.id === card.id ? card : c))
				: [...data[category], { ...card, id: Date.now() }],
		};

		setData(newData);
		await saveCompleteData(newData, qaResponses);
	};

	const handleDeleteCard = async (category: SwotCategory, cardId: number) => {
		const newData = {
			...data,
			[category]: data[category].filter((c) => c.id !== cardId),
		};

		setData(newData);
		await saveCompleteData(newData, qaResponses);
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
			saveSwotData(data, newQAResponses);

			// Sauvegarde en BD si connecté
			if (user) {
				await saveToDatabase(data, newQAResponses);
			}
		} catch (error) {
			console.error("Failed to save QA response:", error);
		}
	};

	return {
		cards: data,
		qaResponses,
		isLoading: isLoading || authLoading,
		user,
		handleSaveCard,
		handleDeleteCard,
		handleQAResponseChange,
		handleQAResponseSave,
	};
};
