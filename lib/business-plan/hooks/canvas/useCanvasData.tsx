import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CanvasData, CanvasCard } from "@/types/canvas";
import { QAResponses } from "@/types/shared/qa-section";
import {
	loadCanvasData,
	saveCanvasData,
	saveToDatabase,
} from "@/lib/business-plan/hooks/canvas/storage-canvas";

type CanvasCategory = keyof Omit<CanvasData, "lastAnalysis" | "lastUpdated">;

export const useCanvasData = () => {
	const { user, isLoading: authLoading } = useUser();
	const [isLoading, setIsLoading] = useState(true);
	const initialData = loadCanvasData();
	const [data, setData] = useState<CanvasData>(initialData.data);
	const [qaResponses, setQAResponses] = useState<QAResponses>(
		initialData.qaResponses
	);

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
							setData(serverData.data);
							setQAResponses(serverData.qaResponses || {});
							saveCanvasData(
								serverData.data,
								serverData.qaResponses || {}
							);
						}
					} else {
						console.error(
							"Erreur lors du chargement:",
							await response.text()
						);
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
		newData: CanvasData,
		newQAResponses: QAResponses
	) => {
		try {
			saveCanvasData(newData, newQAResponses);
			if (user) {
				await saveToDatabase(newData, newQAResponses);
			}
		} catch (error) {
			console.error("Erreur lors de la sauvegarde:", error);
			throw error;
		}
	};

	const handleSaveCard = async (
		category: CanvasCategory,
		card: CanvasCard
	) => {
		try {
			const newData = {
				...data,
				[category]: card.id
					? data[category].map((c) => (c.id === card.id ? card : c))
					: [...data[category], { ...card, id: Date.now() }],
			};

			setData(newData);
			await saveCompleteData(newData, qaResponses);
		} catch (error) {
			console.error("Erreur lors de la sauvegarde de la carte:", error);
			throw error;
		}
	};

	const handleDeleteCard = async (
		category: CanvasCategory,
		cardId: number
	) => {
		try {
			const newData = {
				...data,
				[category]: data[category].filter((c) => c.id !== cardId),
			};

			setData(newData);
			await saveCompleteData(newData, qaResponses);
		} catch (error) {
			console.error("Erreur lors de la suppression de la carte:", error);
			throw error;
		}
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

			setQAResponses(newQAResponses);
			await saveCompleteData(data, newQAResponses);
		} catch (error) {
			console.error(
				"Erreur lors de la sauvegarde de la réponse QA:",
				error
			);
			throw error;
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

export default useCanvasData;
