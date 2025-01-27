import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FunnelSection } from "@/types/funnel-chart";
import {
	loadFunnelChartData,
	saveFunnelChartData,
	saveToDatabase,
	INITIAL_SECTIONS,
} from "@/lib/hooks/business-plan/funnel-chart/storage-funnel-chart";

export const useFunnelChartData = () => {
	const { user, isLoading } = useUser();
	const [sections, setSections] = useState<FunnelSection[]>(
		loadFunnelChartData() || INITIAL_SECTIONS
	);

	useEffect(() => {
		const loadInitialData = async () => {
			if (user) {
				try {
					const response = await fetch(
						"/api/business-plan/funnel-chart/data"
					);
					if (response.ok) {
						const serverData = await response.json();
						if (serverData && serverData.length > 0) {
							setSections(serverData);
							localStorage.setItem(
								"funnel-chart-data",
								JSON.stringify(serverData)
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
		};

		if (!isLoading) {
			loadInitialData();
		}
	}, [user, isLoading]);

	const handleUpdateSections = async (newSections: FunnelSection[]) => {
		setSections(newSections);
		saveFunnelChartData(newSections);

		if (user) {
			console.log("Utilisateur connecté, sauvegarde en BD");
			await saveToDatabase(newSections);
		}
	};

	return {
		sections,
		isLoading,
		user,
		handleUpdateSections,
	};
};
