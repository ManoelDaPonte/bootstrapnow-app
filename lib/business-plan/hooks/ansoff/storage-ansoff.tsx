// lib/business-plan/ansoff/storage-ansoff.ts
import { AnsoffData, StoredData } from "@/types/ansoff";
import { prisma } from "@/lib/db/prisma";
import { QAResponses } from "@/types/shared/qa-section";
import { ANSOFF_QA_DATA } from "@/lib/business-plan/config/ansoff";

export const STORAGE_KEY = "ansoff-data";
export const QA_STORAGE_KEY = "ansoff-qa-responses";

export const saveAnsoffData = (data: AnsoffData, qaResponses: QAResponses) => {
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

export async function updateAnsoffData(
	auth0Id: string,
	data: AnsoffData,
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

		const ansoffAnalysis = await prisma.ansoffAnalysis.upsert({
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

		return ansoffAnalysis;
	} catch (error) {
		console.error("Detailed save error:", error);
		throw error;
	}
}

export const calculateProgress = (
	data: AnsoffData,
	qaResponses: QAResponses = {}
): number => {
	// 1. Calculer la progression des sections Ansoff
	const categories = [
		"penetration",
		"development_market",
		"development_product",
		"diversification",
	];

	let filledCategories = 0;
	categories.forEach((category) => {
		if ((data[category as keyof AnsoffData] ?? []).length > 0) {
			filledCategories++;
		}
	});

	// 2. Calculer la progression des réponses QA
	const questionIds = ANSOFF_QA_DATA.categories.map((cat) => cat.id);
	const answeredQuestions = questionIds.filter(
		(id) => qaResponses[id] && qaResponses[id].trim() !== ""
	).length;
	const totalQAQuestions = questionIds.length;

	// 3. Calculer la progression totale
	const categoriesWeight = 0.7; // 70% pour la matrice Ansoff
	const qaWeight = 0.3; // 30% pour les questions

	const categoriesProgress = (filledCategories / categories.length) * 100;
	const qaProgress =
		totalQAQuestions > 0 ? (answeredQuestions / totalQAQuestions) * 100 : 0;

	const totalProgress = Math.round(
		categoriesProgress * categoriesWeight + qaProgress * qaWeight
	);

	return Math.min(100, totalProgress);
};

// Charger les données depuis le localStorage
export const loadAnsoffData = (): StoredData => {
	if (typeof window === "undefined") {
		return {
			data: getEmptyAnsoffData(),
			qaResponses: {},
		};
	}

	const storedData = localStorage.getItem(STORAGE_KEY);
	const storedQA = localStorage.getItem(QA_STORAGE_KEY);

	return {
		data: storedData ? JSON.parse(storedData) : getEmptyAnsoffData(),
		qaResponses: storedQA ? JSON.parse(storedQA) : {},
	};
};

// Retourner une structure de données vide
export const getEmptyAnsoffData = (): AnsoffData => ({
	penetration: [],
	development_market: [],
	development_product: [],
	diversification: [],
});

// Mettre à jour la progression dans la page parent
const updateParentProgress = (progress: number) => {
	if (typeof window === "undefined") return;

	const event = new CustomEvent("ansoffProgressUpdate", {
		detail: { progress },
	});
	window.dispatchEvent(event);
};

// Sauvegarder dans la base de données via l'API
export const saveToDatabase = async (
	data: AnsoffData,
	qaResponses: QAResponses
) => {
	try {
		const response = await fetch("/api/business-plan/ansoff/save", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data, qaResponses }),
		});

		if (!response.ok) {
			throw new Error("Database save error");
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error("DB save error:", error);
		throw error;
	}
};
