import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { AnsoffData, AnsoffCard } from "@/types/ansoff";
import { QAResponses } from "@/types/shared/qa-section";
import {
	loadAnsoffData,
	saveAnsoffData,
	saveToDatabase,
} from "@/lib/business-plan/hooks/ansoff/storage-ansoff";

type AnsoffCategory = keyof Omit<AnsoffData, "lastAnalysis" | "lastUpdated">;

export const useAnsoffData = () => {
	const { user, isLoading: authLoading } = useUser();
	const [data, setData] = useState<AnsoffData>(loadAnsoffData().data);
	const [qaResponses, setQAResponses] = useState<QAResponses>(
		loadAnsoffData().qaResponses
	);
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
							setData(serverData.data);
							setQAResponses(serverData.qaResponses);
							saveAnsoffData(
								serverData.data,
								serverData.qaResponses
							);
						}
					}
				} catch (error) {
					console.error("Data load error:", error);
				}
			}
			setIsLoading(false);
		};

		if (!authLoading) {
			loadInitialData();
		}
	}, [user, authLoading]);

	const saveCompleteData = async (
		newData: AnsoffData,
		newQAResponses: QAResponses
	) => {
		try {
			saveAnsoffData(newData, newQAResponses);
			if (user) {
				await saveToDatabase(newData, newQAResponses);
			}
		} catch (error) {
			console.error("Save error:", error);
		}
	};

	const handleSaveCard = async (
		category: AnsoffCategory,
		card: AnsoffCard
	) => {
		const newData = {
			...data,
			[category]: card.id
				? data[category].map((c) => (c.id === card.id ? card : c))
				: [...data[category], { ...card, id: Date.now() }],
		};

		setData(newData);
		await saveCompleteData(newData, qaResponses);
	};

	const handleDeleteCard = async (
		category: AnsoffCategory,
		cardId: number
	) => {
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

			// Local save
			saveAnsoffData(data, newQAResponses);

			// DB save if logged in
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
