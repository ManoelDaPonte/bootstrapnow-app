import {
	ValuePropositionData,
	ValuePropositionCategory,
} from "@/types/value-proposition";
import { QAResponses } from "@/types/shared/qa-section";
import { prisma } from "@/lib/db/prisma";
import { VALUE_PROPOSITION_QA_DATA } from "@/lib/business-plan/config/value-proposition";

export const STORAGE_KEY = "value-proposition-data";
export const QA_STORAGE_KEY = "value-proposition-qa-responses";

export const saveValuePropositionData = (
	data: ValuePropositionData,
	qaResponses: QAResponses
) => {
	if (typeof window === "undefined") return;

	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({
			...data,
			lastUpdated: new Date().toISOString(),
		})
	);

	localStorage.setItem(QA_STORAGE_KEY, JSON.stringify(qaResponses));

	// Mettre à jour avec les deux paramètres
	updateParentProgress(calculateProgress(data, qaResponses));
};
export async function updateValuePropositionData(
	auth0Id: string,
	data: ValuePropositionData,
	qaResponses: QAResponses
) {
	try {
		const user = await prisma.user.upsert({
			where: { auth0Id },
			update: {},
			create: {
				auth0Id,
				email: "",
			},
		});

		const valuePropositionAnalysis =
			await prisma.valuePropositionAnalysis.upsert({
				where: { userId: user.id },
				update: {
					data: JSON.parse(JSON.stringify(data)),
					qaResponses: qaResponses,
					updatedAt: new Date(),
				},
				create: {
					userId: user.id,
					data: JSON.parse(JSON.stringify(data)),
					qaResponses: qaResponses,
				},
			});

		return valuePropositionAnalysis;
	} catch (error) {
		console.error("Erreur détaillée lors de la sauvegarde:", error);
		throw error;
	}
}

export const calculateProgress = (
	data: ValuePropositionData,
	qaResponses: QAResponses = {}
): number => {
	// 1. Calculer la progression des sections de la Value Proposition
	const categories: ValuePropositionCategory[] = [
		"customerJobs",
		"pains",
		"gains",
		"products",
		"painRelievers",
		"gainCreators",
	];

	let filledCategories = 0;
	categories.forEach((category) => {
		if (data[category]?.length > 0) {
			filledCategories++;
		}
	});

	// 2. Calculer la progression des réponses QA
	const questionIds = VALUE_PROPOSITION_QA_DATA.categories.map(
		(cat) => cat.id
	);
	const answeredQuestions = questionIds.filter(
		(id) => qaResponses[id] && qaResponses[id].trim() !== ""
	).length;
	const totalQAQuestions = questionIds.length;

	// 3. Calculer la progression totale
	const categoriesWeight = 0.7; // 70% pour les sections Value Proposition
	const qaWeight = 0.3; // 30% pour les questions

	const categoriesProgress = (filledCategories / categories.length) * 100;
	const qaProgress =
		totalQAQuestions > 0 ? (answeredQuestions / totalQAQuestions) * 100 : 0;

	const totalProgress = Math.round(
		categoriesProgress * categoriesWeight + qaProgress * qaWeight
	);

	return Math.min(100, totalProgress);
};

interface StoredData {
	data: ValuePropositionData;
	qaResponses: QAResponses;
}

export const loadValuePropositionData = (): StoredData => {
	if (typeof window === "undefined") {
		return {
			data: getEmptyValuePropositionData(),
			qaResponses: {},
		};
	}

	const storedData = localStorage.getItem(STORAGE_KEY);
	const storedQA = localStorage.getItem(QA_STORAGE_KEY);

	return {
		data: storedData
			? JSON.parse(storedData)
			: getEmptyValuePropositionData(),
		qaResponses: storedQA ? JSON.parse(storedQA) : {},
	};
};

export const getEmptyValuePropositionData = (): ValuePropositionData => ({
	customerJobs: [],
	pains: [],
	gains: [],
	products: [],
	painRelievers: [],
	gainCreators: [],
});

const updateParentProgress = (progress: number) => {
	if (typeof window === "undefined") return;

	const event = new CustomEvent("valuePropositionProgressUpdate", {
		detail: { progress },
	});
	window.dispatchEvent(event);
};

export const saveToDatabase = async (
	data: ValuePropositionData,
	qaResponses: QAResponses
) => {
	try {
		const response = await fetch(
			"/api/business-plan/value-proposition/save",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ data, qaResponses }),
			}
		);

		if (!response.ok) {
			throw new Error(
				"Erreur lors de la sauvegarde dans la base de données"
			);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error("Erreur lors de la sauvegarde dans la BD:", error);
		throw error;
	}
};
