// hooks/useSwotAnalysis.ts
import { useState } from "react";
import { SwotAnalysis, SwotData } from "@/types/swot";

export const useSwotAnalysis = () => {
	const [analysisState, setAnalysisState] = useState<SwotAnalysis>({
		analysis: "",
		loading: false,
		error: null,
	});

	const generatePrompt = (cards: SwotData): string => {
		const sections = {
			forces: cards.strengths,
			faiblesses: cards.weaknesses,
			opportunités: cards.opportunities,
			menaces: cards.threats,
		};

		let prompt = "Voici l'analyse SWOT de mon projet :\n\n";

		Object.entries(sections).forEach(([category, items]) => {
			prompt += `${category.toUpperCase()} :\n`;
			items.forEach((item) => {
				prompt += `- ${item.title}: ${item.description}\n`;
			});
			prompt += "\n";
		});

		prompt += "\nPourriez-vous :\n";
		prompt +=
			"1. Analyser chaque point et développer des paragraphes détaillés\n";
		prompt +=
			"2. Proposer des axes d'amélioration concrets pour chaque faiblesse\n";
		prompt +=
			"3. Suggérer des stratégies pour exploiter les opportunités\n";
		prompt += "4. Recommander des actions pour atténuer les menaces\n";
		prompt += "5. Donner votre avis global sur la viabilité du projet\n";

		return prompt;
	};

	const generateAnalysis = async (cards: SwotData) => {
		setAnalysisState((prev) => ({ ...prev, loading: true, error: null }));

		try {
			const prompt = generatePrompt(cards);
			const response = await fetch(
				"/api/business-plan/swot/generate-swot",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ prompt }),
				}
			);

			if (!response.ok) {
				throw new Error("Erreur lors de la génération de l'analyse");
			}

			const data = await response.json();
			setAnalysisState({
				analysis: data.swotText,
				loading: false,
				error: null,
			});
		} catch (error) {
			setAnalysisState({
				...analysisState,
				loading: false,
				error:
					error instanceof Error
						? error.message
						: "Une erreur est survenue",
			});
		}
	};

	return {
		analysisState,
		generateAnalysis,
	};
};
