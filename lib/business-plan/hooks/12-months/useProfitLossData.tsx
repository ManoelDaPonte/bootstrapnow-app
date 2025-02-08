// lib/business-plan/hooks/12-months/useProfitLossData.tsx
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ProfitLossData } from "@/types/12-months";
import { QAResponses } from "@/types/shared/qa-section";
import {
	loadProfitLossData,
	saveProfitLossData,
	saveToDatabase,
} from "./storage-12-months";

export const useProfitLossData = () => {
	const { user, isLoading: authLoading } = useUser();
	const [data, setData] = useState<ProfitLossData>(loadProfitLossData().data);
	const [qaResponses, setQAResponses] = useState<QAResponses>({});
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

	useEffect(() => {
		const loadInitialData = async () => {
			if (user) {
				try {
					const response = await fetch(
						"/api/business-plan/12-months/data"
					);
					if (response.ok) {
						const serverData = await response.json();
						if (serverData) {
							setData(serverData.data);
							// S'assurer que qaResponses existe dans la réponse
							setQAResponses(serverData.qaResponses || {});
							saveProfitLossData(
								serverData.data,
								serverData.qaResponses || {}
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

	const handleUpdateData = (newData: ProfitLossData) => {
		setData(newData);
		saveProfitLossData(newData, qaResponses);
		setHasUnsavedChanges(true);
	};

	const handleQAResponseChange = (categoryId: string, response: string) => {
		setQAResponses((prev) => ({
			...prev,
			[categoryId]: response,
		}));
		setHasUnsavedChanges(true);
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

		try {
			if (user) {
				await saveToDatabase(data, newQAResponses);
			}
			saveProfitLossData(data, newQAResponses);
			setHasUnsavedChanges(false);
		} catch (error) {
			console.error("Failed to save QA response:", error);
		}
	};

	const saveChanges = async () => {
		setIsSaving(true);
		try {
			if (user) {
				await saveToDatabase(data, qaResponses);
			}
			setHasUnsavedChanges(false);
		} catch (error) {
			console.error("Erreur lors de la sauvegarde:", error);
		} finally {
			setIsSaving(false);
		}
	};

	return {
		profitLossData: data,
		qaResponses,
		isLoading: isLoading || authLoading,
		isSaving,
		hasUnsavedChanges,
		user,
		handleUpdateData,
		handleQAResponseChange,
		handleQAResponseSave,
		saveChanges,
	};
};
