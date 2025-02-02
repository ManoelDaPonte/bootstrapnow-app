// hooks/useFunnelChartData.ts
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FunnelSection } from "@/types/funnel-chart";
import { QAResponses } from "@/types/shared/qa-section";
import {
	loadFunnelChartData,
	saveFunnelChartData,
	saveToDatabase,
	INITIAL_SECTIONS,
} from "@/lib/business-plan/hooks/funnel-chart/storage-funnel-chart";

export const useFunnelChartData = () => {
	const { user, isLoading: authLoading } = useUser();
	const [isLoading, setIsLoading] = useState(true);
	const initialData = loadFunnelChartData();
	const [sections, setSections] = useState<FunnelSection[]>(
		initialData.sections
	);
	const [qaResponses, setQAResponses] = useState<QAResponses>(
		initialData.qaResponses
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
						if (serverData) {
							setSections(serverData.data || INITIAL_SECTIONS);
							setQAResponses(serverData.qaResponses || {});
							saveFunnelChartData(
								serverData.data || INITIAL_SECTIONS,
								serverData.qaResponses || {}
							);
						}
					} else {
						console.error(
							"Erreur lors du chargement:",
							await response.text()
						);
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

	const saveCompleteData = async (
		newSections: FunnelSection[],
		newQAResponses: QAResponses
	) => {
		try {
			saveFunnelChartData(newSections, newQAResponses);
			if (user) {
				await saveToDatabase(newSections, newQAResponses);
			}
		} catch (error) {
			console.error("Erreur lors de la sauvegarde:", error);
			throw error;
		}
	};

	const handleUpdateSections = async (newSections: FunnelSection[]) => {
		try {
			setSections(newSections);
			await saveCompleteData(newSections, qaResponses);
		} catch (error) {
			console.error("Erreur lors de la mise à jour des sections:", error);
			throw error;
		}
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

			setQAResponses(newQAResponses);
			await saveCompleteData(sections, newQAResponses);
		} catch (error) {
			console.error(
				"Erreur lors de la sauvegarde de la réponse QA:",
				error
			);
			throw error;
		}
	};

	return {
		sections,
		qaResponses,
		isLoading: isLoading || authLoading,
		user,
		handleUpdateSections,
		handleQAResponseChange,
		handleQAResponseSave,
	};
};

export default useFunnelChartData;
