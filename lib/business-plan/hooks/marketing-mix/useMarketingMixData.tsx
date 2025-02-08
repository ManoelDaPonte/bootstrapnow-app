import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { MarketingMixData, MarketingMixCard } from "@/types/marketing-mix";
import { QAResponses } from "@/types/shared/qa-section";
import {
	loadMarketingMixData,
	saveMarketingMixData,
	saveToDatabase,
} from "@/lib/business-plan/hooks/marketing-mix/storage-marketing-mix";

// Type utilitaire pour les catégories du Marketing Mix
type MarketingMixCategory = keyof Omit<MarketingMixData, "lastUpdated">;

export const useMarketingMixData = () => {
	const { user, isLoading: authLoading } = useUser();
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState<MarketingMixData>(
		loadMarketingMixData().data
	);
	const [qaResponses, setQAResponses] = useState<QAResponses>(
		loadMarketingMixData().qaResponses
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
							setData(serverData.data);
							setQAResponses(serverData.qaResponses);
							saveMarketingMixData(
								serverData.data,
								serverData.qaResponses
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
		newData: MarketingMixData,
		newQAResponses: QAResponses
	) => {
		try {
			saveMarketingMixData(newData, newQAResponses);
			if (user) {
				await saveToDatabase(newData, newQAResponses);
			}
		} catch (error) {
			console.error("Erreur lors de la sauvegarde:", error);
			throw error;
		}
	};

	const handleSaveCard = async (
		category: MarketingMixCategory,
		card: MarketingMixCard
	) => {
		try {
			const newData = {
				...data,
				[category]: card.id
					? Array.isArray(data[category])
						? data[category].map((c) =>
								c.id === card.id ? card : c
						  )
						: []
					: [
							...(Array.isArray(data[category])
								? data[category]
								: []),
							{ ...card, id: Date.now() },
					  ],
				lastUpdated: new Date().toISOString(),
			};

			setData(newData);
			await saveCompleteData(newData, qaResponses);
		} catch (error) {
			console.error("Erreur lors de la sauvegarde de la carte:", error);
			throw error;
		}
	};

	const handleDeleteCard = async (
		category: MarketingMixCategory,
		cardId: number
	) => {
		try {
			const newData = {
				...data,
				[category]: Array.isArray(data[category])
					? data[category].filter((c) => c.id !== cardId)
					: [],
				lastUpdated: new Date().toISOString(),
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

export default useMarketingMixData;
