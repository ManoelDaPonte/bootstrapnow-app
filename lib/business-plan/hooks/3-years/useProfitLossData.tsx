// lib/business-plan/hooks/profit-loss/useProfitLossData.tsx
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ProfitLossData } from "@/types/profit-loss";
import {
	loadProfitLossData,
	saveProfitLossData,
	saveToDatabase,
} from "@/lib/business-plan/hooks/3-years/storage-profit-loss";

export const useProfitLossData = () => {
	const { user, isLoading: authLoading } = useUser();
	const [data, setData] = useState<ProfitLossData>(loadProfitLossData());
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

	useEffect(() => {
		const loadInitialData = async () => {
			if (user) {
				try {
					const response = await fetch(
						"/api/business-plan/3-years/data"
					);
					if (response.ok) {
						const serverData = await response.json();
						if (serverData) {
							setData(serverData.data);
							saveProfitLossData(serverData.data);
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

	// Mise à jour locale uniquement
	const handleUpdateData = (newData: ProfitLossData) => {
		setData(newData);
		saveProfitLossData(newData); // Sauvegarde locale
		setHasUnsavedChanges(true);
	};

	// Sauvegarde en base de données
	const saveChanges = async () => {
		setIsSaving(true);
		try {
			if (user) {
				await saveToDatabase(data);
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
		isLoading: isLoading || authLoading,
		isSaving,
		hasUnsavedChanges,
		user,
		handleUpdateData,
		saveChanges,
	};
};
