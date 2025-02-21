//lib/openai/hooks/useBusinessPlanGenerator.ts
import { useState, useCallback } from "react";
import {
	BUSINESS_PLAN_SECTIONS,
	BusinessPlanSection,
	GenerationState,
	Generation,
} from "@/types/business-plan-document/business-plan";
import { toast } from "@/components/ui/use-toast";
import { useUserMetadata } from "@/context/userMetadataProvider";

export interface GenerationStep {
	id: string;
	label: string;
	status: "pending" | "in-progress" | "completed" | "error";
}

export interface DetailedProgress {
	totalSections: number;
	completedSections: number;
	currentSection: string | null;
}

export function useBusinessPlanGenerator() {
	const { metadata, updateTokens } = useUserMetadata();
	const [isGenerating, setIsGenerating] = useState(false);
	const [currentSteps, setCurrentSteps] = useState<GenerationStep[]>([]);
	const [sectionsStatus, setSectionsStatus] = useState<
		Record<string, boolean>
	>({});
	const [detailedProgress, setDetailedProgress] = useState<DetailedProgress>({
		totalSections: 0,
		completedSections: 0,
		currentSection: null,
	});

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

	const updateSectionProgress = (
		totalSections: number,
		completedSections: number,
		currentSection: string | null
	) => {
		setDetailedProgress({
			totalSections,
			completedSections,
			currentSection,
		});
	};

	const generateSection = async (
		auth0Id: string,
		sectionName: string
	): Promise<string> => {
		try {
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

			const response = await fetch("/api/openai/generate-section", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ auth0Id, sectionName }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();

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
		const generatedSections: Record<string, string> = {};
		const tokens = parseInt(metadata?.tokens || "0");
		if (tokens <= 0) {
			toast({
				title: "Tokens insuffisants",
				description:
					"Vous devez avoir au moins 1 token pour générer un business plan.",
				variant: "destructive",
			});
			return;
		}

		setIsGenerating(true);
		initializeGeneration();

		// Initialiser le suivi détaillé des sections
		updateSectionProgress(sections.length, 0, null);

		try {
			// 1. Initialisation
			updateStep("init", "in-progress");
			await new Promise((resolve) => setTimeout(resolve, 1000));
			updateStep("init", "completed");

			// 2. Récupération des données
			updateStep("db-fetch", "in-progress");
			const response = await fetch("/api/openai/check-sections", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ auth0Id, sections }),
			});

			// Ajouter ces logs
			console.log("Response status:", response.status);
			console.log(
				"Response headers:",
				Object.fromEntries(response.headers)
			);

			if (!response.ok) {
				const errorText = await response.text();
				console.error("Error response:", errorText);
				throw new Error(`Failed to check sections: ${errorText}`);
			}

			const { sectionsStatus: newSectionsStatus } = await response.json();
			console.log("Status des sections:", newSectionsStatus);
			// Mettre à jour l'état local des statuts
			setSectionsStatus(
				newSectionsStatus.reduce(
					(acc: Record<string, boolean>, section: any) => {
						acc[section.section] =
							section.shouldRegenerate ||
							!section.hasExistingContent;
						return acc;
					},
					{}
				)
			);
			updateStep("db-fetch", "completed");

			// 3. Génération des sections
			updateStep("sections", "in-progress");
			let completedCount = 0;

			for (const section of sections) {
				try {
					// Mettre à jour la section courante
					updateSectionProgress(
						sections.length,
						completedCount,
						section
					);

					setCurrentSteps((steps) =>
						steps.map((step) =>
							step.id === "sections"
								? {
										...step,
										label: `Génération des sections`,
								  }
								: step
						)
					);

					const sectionStatus = newSectionsStatus.find(
						(s: any) => s.section === section
					);

					if (sectionStatus.shouldRegenerate) {
						const result = await generateSection(auth0Id, section);
						generatedSections[section] = result;
						setSectionsStatus((prev) => ({
							...prev,
							[section]: false,
						}));
					} else {
						const response = await fetch(
							`/api/openai/get-section-content?auth0Id=${auth0Id}&section=${section}`
						);
						if (!response.ok) {
							throw new Error("Failed to get content");
						}
						const { content } = await response.json();
						if (!content) {
							throw new Error(`No content found for ${section}`);
						}
						generatedSections[section] = content;
					}

					// Incrémenter le compteur de sections complétées
					completedCount++;
					updateSectionProgress(
						sections.length,
						completedCount,
						section
					);
				} catch (error) {
					console.error(`Erreur pour la section ${section}:`, error);
					continue;
				}
			}

			// Mise à jour finale de la progression
			updateSectionProgress(sections.length, sections.length, null);
			updateStep("sections", "completed");

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

			// 4. Sauvegarder et générer le document final

			const allSectionsValid = sections.every((section) => {
				const content = generatedSections[section];
				return content && content.length > 0;
			});

			if (allSectionsValid) {
				console.log(
					"Toutes les sections ont été générées:",
					generatedSections
				);

				try {
					// 4. Génération du document Word
					updateStep("word", "in-progress");
					const saveResult = await saveGeneratedContent(
						auth0Id,
						generatedSections
					);
					console.log("Résultat de la sauvegarde:", saveResult);

					const docxUrl = await generateDocument(
						auth0Id,
						saveResult.generationId
					);
					console.log("URL du document généré:", docxUrl);
					updateStep("word", "completed");

					// 5. Finalisation
					updateStep("final", "in-progress");
					await loadHistory(auth0Id);
					updateStep("final", "completed");

					// Réinitialiser le suivi détaillé de la progression
					updateSectionProgress(
						detailedProgress.totalSections,
						detailedProgress.totalSections,
						null
					);

					// Gérer le succès
					await handleSuccess(docxUrl, auth0Id);

					return docxUrl;
				} catch (error) {
					const currentStep = currentSteps.find(
						(step) => step.status === "in-progress"
					);
					if (currentStep) {
						updateStep(currentStep.id, "error");
					}
					throw error;
				}
			} else {
				const missingSections = sections.filter((section) => {
					const content = generatedSections[section];
					return !content || content.length === 0;
				});

				console.error(
					"Sections manquantes ou invalides:",
					missingSections
				);
				throw new Error(
					`Les sections suivantes n'ont pas pu être générées: ${missingSections.join(
						", "
					)}`
				);
			}
		} catch (error) {
			const currentStep = currentSteps.find(
				(step) => step.status === "in-progress"
			);
			if (currentStep) {
				updateStep(currentStep.id, "error");
			}

			// Réinitialiser le suivi détaillé en cas d'erreur
			updateSectionProgress(0, 0, null);

			// Afficher un toast avec le message d'erreur spécifique
			toast({
				title: "Erreur",
				description:
					error instanceof Error
						? error.message
						: "Une erreur est survenue",
				variant: "destructive",
			});

			throw error;
		} finally {
			setIsGenerating(false);
		}
	};

	const loadHistory = useCallback(async (auth0Id: string) => {
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
	}, []);

	const downloadGeneration = (docxUrl: string) => {
		const link = document.createElement("a");
		link.href = docxUrl;
		link.setAttribute("download", "business-plan.docx");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	// Handlers pour la gestion du succès et des erreurs
	const handleSuccess = async (docxUrl: string, auth0Id: string) => {
		toast({
			title: "Succès",
			description: "Votre business plan a été généré avec succès",
			duration: 3000,
		});

		// Télécharger le document
		if (docxUrl) {
			downloadGeneration(docxUrl);
		}

		// Utiliser le token
		try {
			const tokenResponse = await fetch("/api/stripe/use-token", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId: auth0Id }),
			});

			if (tokenResponse.ok) {
				const { tokens: newTokens } = await tokenResponse.json();
				updateTokens(parseInt(newTokens));
			}
		} catch (error) {
			console.error("Erreur lors de l'utilisation du token:", error);
		}
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
		detailedProgress,
		sectionsStatus,
	};
}
