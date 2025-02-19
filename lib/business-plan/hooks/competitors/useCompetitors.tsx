import { useState, useEffect, useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CompetitorEntry } from "@/types/competitors";
import {
	CompetitorsData,
	loadCompetitorsData,
	saveCompetitorsData,
	saveToDatabase,
} from "@/lib/business-plan/hooks/competitors/storage-competitors";

export const useCompetitors = () => {
	const { user, isLoading: authLoading } = useUser();
	const initialData = loadCompetitorsData();
	const [competitors, setCompetitors] = useState<CompetitorEntry[]>(
		initialData.competitors
	);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadInitialData = async () => {
			if (user) {
				try {
					const response = await fetch(
						"/api/business-plan/competitors/data"
					);
					if (response.ok) {
						const serverData = await response.json();
						if (serverData && serverData.data) {
							setCompetitors(serverData.data.competitors);
							saveCompetitorsData(serverData.data);
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

	const handleSaveData = async (newCompetitors: CompetitorEntry[]) => {
		try {
			const newData: CompetitorsData = { competitors: newCompetitors };
			saveCompetitorsData(newData);
			if (user) {
				await saveToDatabase(newData);
			}
		} catch (error) {
			console.error("Erreur lors de la sauvegarde:", error);
		}
	};

	const addCompetitor = async () => {
		const newCompetitor: CompetitorEntry = {
			id: `comp_${Date.now()}`,
			nom: "",
			solution: "",
			prix: 0,
			valeurPercue: 0,
			strategie: "",
			zoneGeographique: "",
			ciblageClient: "",
			forces: "",
			faiblesses: "",
			impactDirect: "",
			impactIndirect: "",
		};
		const newCompetitors = [...competitors, newCompetitor];
		setCompetitors(newCompetitors);
		await handleSaveData(newCompetitors);
	};

	const updateCompetitor = (
		id: string,
		field: keyof CompetitorEntry,
		value: string
	) => {
		setCompetitors((prev) =>
			prev.map((comp) => {
				if (comp.id !== id) return comp;
				const newValue =
					field === "prix" || field === "valeurPercue"
						? parseFloat(value) || 0
						: value;
				return { ...comp, [field]: newValue };
			})
		);
	};

	const saveCompetitor = async () => {
		await handleSaveData(competitors);
	};

	const removeCompetitor = async (id: string) => {
		if (id === "my_company") return; // Empêche la suppression de notre entreprise
		const newCompetitors = competitors.filter((comp) => comp.id !== id);
		setCompetitors(newCompetitors);
		await handleSaveData(newCompetitors);
	};

	const calculateProgress = useCallback(() => {
		// On utilise keyof pour s'assurer que les champs correspondent à l'interface
		const fieldsToCount: Array<keyof CompetitorEntry> = [
			"nom",
			"solution",
			"prix",
			"valeurPercue",
			"strategie",
			"zoneGeographique",
			"ciblageClient",
			"forces",
			"faiblesses",
			"impactDirect",
			"impactIndirect",
		];
		const totalFields = competitors.length * fieldsToCount.length;

		const filledFields = competitors.reduce((acc, comp) => {
			return (
				acc +
				fieldsToCount.reduce((fieldAcc, field) => {
					const value = comp[field];
					// Vérification spécifique selon le type de champ
					const isFieldFilled =
						typeof value === "number"
							? value > 0
							: typeof value === "string"
							? value.trim() !== ""
							: false;
					return fieldAcc + (isFieldFilled ? 1 : 0);
				}, 0)
			);
		}, 0);

		return Math.min(100, Math.round((filledFields / totalFields) * 100));
	}, [competitors]);

	return {
		competitors,
		isLoading: isLoading || authLoading,
		updateCompetitor,
		saveCompetitor,
		addCompetitor,
		calculateProgress,
		removeCompetitor,
	};
};
