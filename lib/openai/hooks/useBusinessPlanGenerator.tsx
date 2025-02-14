// lib/business-plan/hooks/useBusinessPlanGenerator.ts
import { useState } from "react";

interface GenerationProgress {
	currentSection: string;
	completedSections: string[];
	errors: Array<{ section: string; error: string }>;
	status: "idle" | "generating" | "completed" | "error";
}

export function useBusinessPlanGenerator() {
	const [progress, setProgress] = useState<GenerationProgress>({
		currentSection: "",
		completedSections: [],
		errors: [],
		status: "idle",
	});

	const generateSection = async (auth0Id: string, sectionName: string) => {
		try {
			setProgress((prev) => ({
				...prev,
				currentSection: sectionName,
				status: "generating",
			}));

			const response = await fetch("/api/openai/generate-section", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					auth0Id,
					sectionName,
				}),
			});

			if (!response.ok) {
				throw new Error(`Erreur HTTP: ${response.status}`);
			}

			const result = await response.json();

			// Log les détails pour le debugging
			console.log(`Section ${sectionName}:`, {
				metadata: result.metadata,
				validPaths: result.metadata.valid_paths_count,
				totalPaths: result.metadata.total_paths_count,
				contentLength: result.generated_content?.length || 0,
			});

			setProgress((prev) => ({
				...prev,
				completedSections: [...prev.completedSections, sectionName],
				status: "completed",
			}));

			return result;
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Erreur inconnue";

			setProgress((prev) => ({
				...prev,
				errors: [
					...prev.errors,
					{ section: sectionName, error: errorMessage },
				],
				status: "error",
			}));

			console.error(
				`Erreur lors de la génération de ${sectionName}:`,
				errorMessage
			);
			throw error;
		}
	};

	const generateFullBusinessPlan = async (auth0Id: string) => {
		const sectionsToGenerate = [
			"ES_Overview",
			"ES_Description",
			// Ajoutez d'autres sections selon vos besoins
		];

		const results = [];

		for (const section of sectionsToGenerate) {
			try {
				const result = await generateSection(auth0Id, section);
				results.push(result);
			} catch (error) {
				console.error(`Échec de la génération pour ${section}`);
				// Continue avec la section suivante malgré l'erreur
			}
		}

		return results;
	};

	return {
		progressGeneration: progress,
		generateSection,
		generateFullBusinessPlan,
	};
}
