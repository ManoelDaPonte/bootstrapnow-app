// lib/business-plan/pestel/storage-pestel.ts
import { PestelData } from "@/types/pestel";
import { prisma } from "@/lib/prisma";

export const STORAGE_KEY = "pestel-data";

// Sauvegarder les données (localStorage uniquement)
export const savePestelData = (data: PestelData) => {
	if (typeof window === "undefined") return;

	// Sauvegarder dans localStorage
	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({
			...data,
			lastUpdated: new Date().toISOString(),
		})
	);

	// Mettre à jour la progression dans la page parent
	updateParentProgress(calculateProgress(data));
};

export async function updatePestelData(auth0Id: string, data: PestelData) {
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
				updatedAt: new Date(),
			},
			create: {
				userId: user.id,
				data: JSON.parse(JSON.stringify(data)),
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

// Charger les données depuis le localStorage
export const loadPestelData = (): PestelData => {
	if (typeof window === "undefined") return getEmptyPestelData();

	const stored = localStorage.getItem(STORAGE_KEY);
	return stored ? JSON.parse(stored) : getEmptyPestelData();
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
export const saveToDatabase = async (data: PestelData) => {
	try {
		const response = await fetch("/api/business-plan/pestel/save", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(
				"Erreur lors de la sauvegarde dans la base de données"
			);
		}
	} catch (error) {
		console.error("Erreur lors de la sauvegarde dans la BD:", error);
	}
};
