//lib/openai/hooks/useBusinessPlanGenerator.ts
import { useState } from "react";
import {
	BUSINESS_PLAN_SECTIONS,
	BusinessPlanSection,
	SectionStatus,
	GenerationState,
	Generation,
} from "@/types/business-plan-document/business-plan";

export function useBusinessPlanGenerator() {
	const [generationState, setGenerationState] = useState<GenerationState>({
		status: "idle",
		sections: BUSINESS_PLAN_SECTIONS.map((section) => ({
			section,
			status: "pending",
		})),
		currentSection: undefined,
	});

	const [generations, setGenerations] = useState<Generation[]>([]);
	const [isLoadingHistory, setIsLoadingHistory] = useState(false);

	const loadHistory = async (auth0Id: string) => {
		setIsLoadingHistory(true);
		try {
			const response = await fetch(
				`/api/business-plan-document/history?auth0Id=${auth0Id}`
			);
			if (!response.ok)
				throw new Error("Erreur lors du chargement de l'historique");
			const data = await response.json();
			setGenerations(data);
		} catch (error) {
			console.error("Erreur lors du chargement de l'historique:", error);
		} finally {
			setIsLoadingHistory(false);
		}
	};

	const generateSection = async (
		auth0Id: string,
		sectionName: string
	): Promise<string> => {
		try {
			console.log("Début de la génération de la section:", sectionName);

			// Mise à jour du statut de la section
			setGenerationState((prev) => ({
				...prev,
				status: "generating",
				currentSection: sectionName as BusinessPlanSection,
				sections: prev.sections.map((s) =>
					s.section === sectionName
						? { ...s, status: "generating" }
						: s
				),
			}));

			console.log(
				"État mis à jour - début de génération:",
				generationState
			);

			const response = await fetch("/api/openai/generate-section", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ auth0Id, sectionName }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();

			console.log("Résultat de la génération:", result);

			// Mise à jour du succès
			setGenerationState((prev) => ({
				...prev,
				status: "completed",
				sections: prev.sections.map((s) =>
					s.section === sectionName
						? {
								...s,
								status: "completed",
								content: result.generated_content,
						  }
						: s
				),
			}));

			return result.generated_content;
		} catch (error) {
			console.error("Erreur lors de la génération:", error);

			// Mise à jour de l'erreur
			setGenerationState((prev) => ({
				...prev,
				status: "error",
				sections: prev.sections.map((s) =>
					s.section === sectionName
						? {
								...s,
								status: "error",
								error:
									error instanceof Error
										? error.message
										: "Unknown error",
						  }
						: s
				),
			}));

			throw error;
		}
	};

	const saveGeneratedContent = async (
		auth0Id: string,
		sections: Record<string, string>
	) => {
		try {
			const response = await fetch("/api/openai/save-section", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ auth0Id, sections }),
			});

			if (!response.ok) {
				throw new Error("Failed to save sections");
			}

			return await response.json();
		} catch (error) {
			console.error("Erreur lors de la sauvegarde:", error);
			throw error;
		}
	};

	const generateDocument = async (
		auth0Id: string,
		generationId: string
	): Promise<string> => {
		try {
			console.log("Début de la génération du document");

			const response = await fetch(
				"/api/business-plan-document/generate-document",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ auth0Id, generationId }), // Ajout du generationId
				}
			);

			if (!response.ok) {
				throw new Error("Failed to generate document");
			}

			const { docxUrl } = await response.json();
			return docxUrl;
		} catch (error) {
			console.error("Erreur lors de la génération du document:", error);
			throw error;
		}
	};

	const downloadGeneration = (docxUrl: string) => {
		window.open(docxUrl, "_blank");
	};

	return {
		generationState,
		generations,
		isLoadingHistory,
		generateSection,
		saveGeneratedContent,
		generateDocument,
		loadHistory,
		downloadGeneration,
	};
}
