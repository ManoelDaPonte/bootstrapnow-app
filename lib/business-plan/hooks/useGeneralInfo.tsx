// hooks/useGeneralInfo.ts
import { useState, useEffect } from "react";
import { GeneralInfo } from "@/types/general-info";
import { useUser } from "@auth0/nextjs-auth0/client";

const STORAGE_KEY = "business-plan-general-info";

// Définir un état initial pour les données
const initialGeneralInfo: GeneralInfo = {
	city: "",
	state: "",
	authors: "",
	zipcode: "",
	website_url: "",
	company_name: "",
	business_type: "product", // valeur par défaut
	email_address: "",
	business_phone: "",
	street_address: "",
};

export const useGeneralInfo = () => {
	const { user, isLoading: authLoading } = useUser();
	const [data, setData] = useState<GeneralInfo>(initialGeneralInfo);
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
						// Fusionner avec l'état initial pour s'assurer que tous les champs existent
						const mergedData = {
							...initialGeneralInfo,
							...serverData,
						};
						setData(mergedData);
						localStorage.setItem(
							STORAGE_KEY,
							JSON.stringify(mergedData)
						);
					}
				} catch (error) {
					console.error(
						"Erreur lors du chargement des données:",
						error
					);
					const localData = localStorage.getItem(STORAGE_KEY);
					if (localData) {
						// Fusionner avec l'état initial pour les données locales aussi
						const parsedData = JSON.parse(localData);
						setData({ ...initialGeneralInfo, ...parsedData });
					}
				}
			} else {
				const localData = localStorage.getItem(STORAGE_KEY);
				if (localData) {
					const parsedData = JSON.parse(localData);
					setData({ ...initialGeneralInfo, ...parsedData });
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
		const updatedData = {
			...data,
			[field]: value,
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
	};

	// Fonction pour sauvegarder les données
	const saveData = async () => {
		if (!user) return;

		setIsSaving(true);
		try {
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
			throw error; // Propager l'erreur pour la gérer dans le composant
		} finally {
			setIsSaving(false);
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
			(field) => data[field] && String(data[field]).trim() !== ""
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
