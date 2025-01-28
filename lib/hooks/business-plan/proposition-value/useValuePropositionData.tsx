// hooks/useValuePropositionData.ts
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
	ValuePropositionData,
	ValuePropositionCategory,
	ValuePropositionCard,
} from "@/types/value-proposition";
import {
	loadValuePropositionData,
	saveValuePropositionData,
	saveToDatabase,
} from "@/lib/hooks/business-plan/proposition-value/storage-value-proposition";

export const useValuePropositionData = () => {
	const { user, isLoading } = useUser();
	const [data, setData] = useState<ValuePropositionData>(
		loadValuePropositionData()
	);

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
							setData(serverData);
							saveValuePropositionData(serverData);
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

	const handleSaveItem = async (
		category: ValuePropositionCategory,
		content: string
	) => {
		const newCard: ValuePropositionCard = {
			id: Date.now(),
			content,
		};

		const newData = {
			...data,
			[category]: [...data[category], newCard],
		};

		setData(newData);
		saveValuePropositionData(newData);

		if (user) {
			await saveToDatabase(newData);
		}
	};

	const handleUpdateItem = async (
		category: ValuePropositionCategory,
		cardId: number,
		content: string
	) => {
		const newData = {
			...data,
			[category]: data[category].map((card) =>
				card.id === cardId ? { ...card, content } : card
			),
		};

		setData(newData);
		saveValuePropositionData(newData);

		if (user) {
			await saveToDatabase(newData);
		}
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
		saveValuePropositionData(newData);

		if (user) {
			await saveToDatabase(newData);
		}
	};

	return {
		data,
		isLoading,
		user,
		handleSaveItem,
		handleUpdateItem,
		handleDeleteItem,
	};
};
