// lib/business-plan/pestel/storage-pestel.ts
import { PestelData } from "@/types/pestel";
import { QAResponses } from "@/types/shared/qa-section";
import { prisma } from "@/lib/db/prisma";

export const STORAGE_KEY = "pestel-data";
export const QA_STORAGE_KEY = "pestel-qa-responses";

// Sauvegarder les données (localStorage uniquement)
export const savePestelData = (data: PestelData, qaResponse: QAResponses) => {
	if (typeof window === "undefined") return;

	// Sauvegarder dans localStorage
	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({
			...data,
			lastUpdated: new Date().toISOString(),
		})
	);

	// Sauvegarder les réponses QA séparément
	localStorage.setItem(QA_STORAGE_KEY, JSON.stringify(qaResponse));

	// Mettre à jour la progression dans la page parent
	updateParentProgress(calculateProgress(data));
};

export async function updatePestelData(
	auth0Id: string,
	data: PestelData,
	qaResponses: QAResponses
) {
	try {
		// Trouver ou créer l'utilisateur
		const user = await prisma.user.upsert({
			where: { auth0Id },
			update: {},
			create: {
				auth0Id,
				email: "", // À remplir avec l'email de Auth0
			},
		});

		// Mettre à jour ou créer l'analyse PESTEL
		const pestelAnalysis = await prisma.pestelAnalysis.upsert({
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

		return pestelAnalysis;
	} catch (error) {
		console.error("Erreur détaillée lors de la sauvegarde:", error);
		throw error;
	}
}

// Calculer la progression en fonction des cartes remplies
export const calculateProgress = (data: PestelData): number => {
	const categories = [
		"political",
		"economic",
		"social",
		"technological",
		"environmental",
		"legal",
	];
	let filledCategories = 0;

	categories.forEach((category) => {
		if ((data[category as keyof PestelData] ?? []).length > 0) {
			filledCategories++;
		}
	});

	return Math.round((filledCategories / categories.length) * 100);
};

interface StoredData {
	data: PestelData;
	qaResponses: QAResponses;
}

// Charger les données depuis le localStorage
export const loadPestelData = (): StoredData => {
	if (typeof window === "undefined") {
		return {
			data: getEmptyPestelData(),
			qaResponses: {},
		};
	}

	const storedData = localStorage.getItem(STORAGE_KEY);
	const storedQA = localStorage.getItem(QA_STORAGE_KEY);

	return {
		data: storedData ? JSON.parse(storedData) : getEmptyPestelData(),
		qaResponses: storedQA ? JSON.parse(storedQA) : {},
	};
};

// Retourner une structure de données vide
export const getEmptyPestelData = (): PestelData => ({
	political: [],
	economic: [],
	social: [],
	technological: [],
	environmental: [],
	legal: [],
});

// Mettre à jour la progression dans la page parent
const updateParentProgress = (progress: number) => {
	if (typeof window === "undefined") return;

	const event = new CustomEvent("pestelProgressUpdate", {
		detail: { progress },
	});
	window.dispatchEvent(event);
};

// Sauvegarder dans la base de données via l'API
export const saveToDatabase = async (
	data: PestelData,
	qaResponses: QAResponses
) => {
	try {
		const response = await fetch("/api/business-plan/pestel/save", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data, qaResponses }),
		});

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
