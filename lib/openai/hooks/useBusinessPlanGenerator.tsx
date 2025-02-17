//lib/openai/hooks/useBusinessPlanGenerator.ts
import { useState } from "react";
import {
	BUSINESS_PLAN_SECTIONS,
	BusinessPlanSection,
	SectionStatus,
	GenerationState,
	Generation,
} from "@/types/business-plan-document/business-plan";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export interface GenerationStep {
	id: string;
	label: string;
	status: "pending" | "in-progress" | "completed" | "error";
}

export function useBusinessPlanGenerator() {
	const [isGenerating, setIsGenerating] = useState(false);
	const [currentSteps, setCurrentSteps] = useState<GenerationStep[]>([]);
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
	const updateStep = (stepId: string, status: GenerationStep["status"]) => {
		setCurrentSteps((steps) =>
			steps.map((step) =>
				step.id === stepId ? { ...step, status } : step
			)
		);
	};

	const initializeGeneration = () => {
		const steps: GenerationStep[] = [
			{ id: "init", label: "Initialisation", status: "pending" },
			{
				id: "db-fetch",
				label: "Récupération des données",
				status: "pending",
			},
			{
				id: "sections",
				label: "Génération des sections",
				status: "pending",
			},
			{
				id: "word",
				label: "Génération du document Word",
				status: "pending",
			},
			{ id: "final", label: "Finalisation", status: "pending" },
		];

		setCurrentSteps(steps);
		return steps;
	};

	const generateBusinessPlan = async (
		auth0Id: string,
		sections: string[]
	) => {
		setIsGenerating(true);
		const steps = initializeGeneration();

		try {
			// 1. Initialisation
			updateStep("init", "in-progress");
			await new Promise((resolve) => setTimeout(resolve, 1000));
			updateStep("init", "completed");

			// 2. Récupération des données
			updateStep("db-fetch", "in-progress");
			await new Promise((resolve) => setTimeout(resolve, 1000));
			updateStep("db-fetch", "completed");

			// 3. Génération des sections
			const generatedSections: Record<string, string> = {};
			updateStep("sections", "in-progress");

			for (const section of sections) {
				// Mettre à jour le libellé de l'étape avec la section en cours
				setCurrentSteps((steps) =>
					steps.map((step) =>
						step.id === "sections"
							? {
									...step,
									label: `Génération de la section ${section}`,
							  }
							: step
					)
				);

				const result = await generateSection(auth0Id, section);
				generatedSections[section] = result;
			}

			// Remettre le libellé original et marquer comme terminé
			setCurrentSteps((steps) =>
				steps.map((step) =>
					step.id === "sections"
						? {
								...step,
								label: "Génération des sections",
								status: "completed",
						  }
						: step
				)
			);

			// 4. Sauvegarde et génération du document
			updateStep("word", "in-progress");
			const { generationId } = await saveGeneratedContent(
				auth0Id,
				generatedSections
			);
			const docxUrl = await generateDocument(auth0Id, generationId);
			updateStep("word", "completed");

			// 5. Finalisation
			updateStep("final", "in-progress");
			await loadHistory(auth0Id);
			updateStep("final", "completed");

			toast({
				title: "Succès",
				description: "Votre business plan a été généré avec succès",
				duration: 3000,
			});

			const link = document.createElement("a");
			link.href = docxUrl;
			link.setAttribute("download", "business-plan.docx");
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			return docxUrl;
		} catch (error) {
			const currentStep = currentSteps.find(
				(step) => step.status === "in-progress"
			);
			if (currentStep) {
				updateStep(currentStep.id, "error");
			}
			throw error;
		} finally {
			setTimeout(() => {
				setIsGenerating(false);
				setCurrentSteps([]);
			}, 2000);
		}
	};

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

	const downloadGeneration = (docxUrl: string) => {
		const link = document.createElement("a");
		link.href = docxUrl;
		link.setAttribute("download", "business-plan.docx");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return {
		generationState,
		generations,
		isLoadingHistory,
		isGenerating,
		currentSteps,
		generateSection,
		saveGeneratedContent,
		generateDocument,
		generateBusinessPlan,
		loadHistory,
		downloadGeneration,
	};
}
