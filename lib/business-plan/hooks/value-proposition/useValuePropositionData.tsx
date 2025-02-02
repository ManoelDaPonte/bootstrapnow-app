import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
	ValuePropositionData,
	ValuePropositionCategory,
	ValuePropositionCard,
} from "@/types/value-proposition";
import { QAResponses } from "@/types/shared/qa-section";
import {
	loadValuePropositionData,
	saveValuePropositionData,
	saveToDatabase,
} from "@/lib/business-plan/hooks/value-proposition/storage-value-proposition";

export const useValuePropositionData = () => {
	const { user, isLoading: authLoading } = useUser();
	const [data, setData] = useState<ValuePropositionData>(
		loadValuePropositionData().data
	);
	const [qaResponses, setQAResponses] = useState<QAResponses>(
		loadValuePropositionData().qaResponses
	);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadInitialData = async () => {
			if (user) {
				try {
					const response = await fetch(
						"/api/business-plan/value-proposition/data"
					);
					if (response.ok) {
						const serverData = await response.json();
						if (serverData) {
							setData(serverData.data);
							setQAResponses(serverData.qaResponses);
							saveValuePropositionData(
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
		newData: ValuePropositionData,
		newQAResponses: QAResponses
	) => {
		try {
			saveValuePropositionData(newData, newQAResponses);
			if (user) {
				await saveToDatabase(newData, newQAResponses);
			}
		} catch (error) {
			console.error("Erreur lors de la sauvegarde:", error);
		}
	};

	const handleSaveItem = async (
		category: ValuePropositionCategory,
		title: string,
		description: string = ""
	) => {
		const newCard: ValuePropositionCard = {
			id: Date.now(),
			title,
			description,
			content: `${title}${description ? ` - ${description}` : ""}`,
		};

		const newData = {
			...data,
			[category]: [...data[category], newCard],
		};

		setData(newData);
		await saveCompleteData(newData, qaResponses);
	};

	const handleUpdateItem = async (
		category: ValuePropositionCategory,
		cardId: number,
		title: string,
		description: string = ""
	) => {
		const newData = {
			...data,
			[category]: data[category].map((card) =>
				card.id === cardId
					? {
							...card,
							title,
							description,
							content: `${title}${
								description ? ` - ${description}` : ""
							}`,
					  }
					: card
			),
		};

		setData(newData);
		await saveCompleteData(newData, qaResponses);
	};

	const handleDeleteItem = async (
		category: ValuePropositionCategory,
		cardId: number
	) => {
		const newData = {
			...data,
			[category]: data[category].filter((card) => card.id !== cardId),
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
		const newQAResponses = {
			...qaResponses,
			[categoryId]: response,
		};

		setQAResponses(newQAResponses);
		await saveCompleteData(data, newQAResponses);
	};

	return {
		cards: data,
		qaResponses,
		isLoading: isLoading || authLoading,
		user,
		handleSaveItem,
		handleUpdateItem,
		handleDeleteItem,
		handleQAResponseChange,
		handleQAResponseSave,
	};
};
