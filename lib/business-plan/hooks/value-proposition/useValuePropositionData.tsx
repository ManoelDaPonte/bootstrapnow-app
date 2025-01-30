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
} from "@/lib/business-plan/hooks/value-proposition/storage-value-proposition";

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
		saveValuePropositionData(newData);

		if (user) {
			await saveToDatabase(newData);
		}
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
