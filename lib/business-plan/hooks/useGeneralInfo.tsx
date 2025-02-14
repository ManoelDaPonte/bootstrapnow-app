// hooks/useGeneralInfo.ts
import { useState, useEffect } from "react";
import { GeneralInfo } from "@/types/general-info";
import { useUser } from "@auth0/nextjs-auth0/client";

const STORAGE_KEY = "business-plan-general-info";

export const useGeneralInfo = () => {
	const { user, isLoading: authLoading } = useUser();
	const [data, setData] = useState<GeneralInfo>({});
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

	// Chargement initial des données
	useEffect(() => {
		const loadData = async () => {
			if (user) {
				try {
					const response = await fetch(
						"/api/business-plan/general-info/data"
					);
					if (response.ok) {
						const serverData = await response.json();
						setData(serverData);
						localStorage.setItem(
							STORAGE_KEY,
							JSON.stringify(serverData)
						);
					}
				} catch (error) {
					console.error(
						"Erreur lors du chargement des données:",
						error
					);
					const localData = localStorage.getItem(STORAGE_KEY);
					if (localData) {
						setData(JSON.parse(localData));
					}
				}
			} else {
				const localData = localStorage.getItem(STORAGE_KEY);
				if (localData) {
					setData(JSON.parse(localData));
				}
			}
			setIsLoading(false);
		};

		if (!authLoading) {
			loadData();
		}
	}, [user, authLoading]);

	// Fonction pour mettre à jour un champ
	const updateField = (field: keyof GeneralInfo, value: string) => {
		setData((prev) => ({
			...prev,
			[field]: value,
		}));

		// Sauvegarder localement
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				...data,
				[field]: value,
			})
		);
	};

	// Fonction pour sauvegarder les données
	const saveData = async () => {
		if (user) {
			setIsSaving(true);
			try {
				console.log("Sauvegarde des données:", data);
				const response = await fetch(
					"/api/business-plan/general-info/save",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(data),
					}
				);

				if (!response.ok) {
					throw new Error("Erreur lors de la sauvegarde");
				}
			} catch (error) {
				console.error("Erreur lors de la sauvegarde:", error);
			} finally {
				setIsSaving(false);
			}
		}
	};

	// Vérifier si toutes les informations importantes sont remplies
	const getCompletionPercentage = (): number => {
		const requiredFields: (keyof GeneralInfo)[] = [
			"company_name",
			"business_type",
			"authors",
			"business_phone",
			"email_address",
		];

		const filledFields = requiredFields.filter(
			(field) => data[field] && data[field]!.trim() !== ""
		).length;

		return Math.round((filledFields / requiredFields.length) * 100);
	};

	return {
		data,
		isLoading,
		isSaving,
		updateField,
		saveData,
		completionPercentage: getCompletionPercentage(),
	};
};
