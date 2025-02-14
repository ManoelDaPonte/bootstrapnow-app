import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FinancialData, FinancialEntry, Risk } from "@/types/startup-expenses";
import { QAResponses } from "@/types/shared/qa-section";
import {
	loadStartupData,
	saveStartupData,
	saveToDatabase,
} from "./storage-startup";

export const useStartupData = () => {
	const { user, isLoading: authLoading } = useUser();
	const initialData = loadStartupData();
	const [data, setData] = useState<FinancialData>(initialData.data);
	const [qaResponses, setQAResponses] = useState<QAResponses>(
		initialData.qaResponses
	);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

	useEffect(() => {
		const loadInitialData = async () => {
			if (user) {
				try {
					const response = await fetch(
						"/api/business-plan/startup-expenses/data"
					);
					if (response.ok) {
						const serverData = await response.json();
						if (serverData) {
							setData(serverData.data);
							setQAResponses(serverData.qaResponses || {});
							saveStartupData(
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

	// Mise à jour locale
	const handleUpdateData = (newData: FinancialData) => {
		setData(newData);
		saveStartupData(newData, qaResponses);
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
		saveStartupData(data, newQAResponses);
		setHasUnsavedChanges(true);
	};

	// Handlers pour les entrées financières
	const handleUpdateEntry = (
		section: keyof FinancialData["capital"] | "expenses",
		id: string,
		field: keyof FinancialEntry,
		value: string | number
	) => {
		const newData = { ...data };
		if (section === "expenses") {
			newData.expenses.categories = newData.expenses.categories.map(
				(entry) =>
					entry.id === id ? { ...entry, [field]: value } : entry
			);
		} else {
			newData.capital[section] = newData.capital[section].map((entry) =>
				entry.id === id ? { ...entry, [field]: value } : entry
			);
		}
		handleUpdateData(newData);
	};

	const handleAddEntry = (
		section: keyof FinancialData["capital"] | "expenses"
	) => {
		const newEntry: FinancialEntry = {
			id: `${String(section)}_${Date.now()}`,
			name: "",
			amount: 0,
			type: "",
			category: "",
		};

		const newData = { ...data };
		if (section === "expenses") {
			newData.expenses.categories = [
				...newData.expenses.categories,
				newEntry,
			];
		} else {
			newData.capital[section] = [...newData.capital[section], newEntry];
		}
		handleUpdateData(newData);
	};

	const handleRemoveEntry = (
		section: keyof FinancialData["capital"] | "expenses",
		id: string
	) => {
		const newData = { ...data };
		if (section === "expenses") {
			newData.expenses.categories = newData.expenses.categories.filter(
				(entry) => entry.id !== id
			);
		} else {
			newData.capital[section] = newData.capital[section].filter(
				(entry) => entry.id !== id
			);
		}
		handleUpdateData(newData);
	};

	// Handlers pour les risques
	const handleUpdateRisk = (
		index: number,
		field: keyof Risk,
		value: string | number
	) => {
		const newData = {
			...data,
			risks: data.risks.map((risk, i) =>
				i === index ? { ...risk, [field]: value } : risk
			),
		};
		handleUpdateData(newData);
	};

	const handleAddRisk = (risk: Risk) => {
		handleUpdateData({
			...data,
			risks: [...data.risks, risk],
		});
	};

	const handleRemoveRisk = (index: number) => {
		handleUpdateData({
			...data,
			risks: data.risks.filter((_, i) => i !== index),
		});
	};

	// Sauvegarde en base de données
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
		data,
		qaResponses,
		isLoading: isLoading || authLoading,
		isSaving,
		hasUnsavedChanges,
		handleUpdateEntry,
		handleAddEntry,
		handleRemoveEntry,
		handleUpdateRisk,
		handleAddRisk,
		handleRemoveRisk,
		handleQAResponseChange,
		handleQAResponseSave,
		saveChanges,
	};
};
