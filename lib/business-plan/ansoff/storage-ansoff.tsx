// lib/business-plan/ansoff/storage-ansoff.ts
import { AnsoffData } from "@/types/ansoff";
import { prisma } from "@/lib/prisma";

export const STORAGE_KEY = "ansoff-data";

// Sauvegarder les données (localStorage uniquement)
export const saveAnsoffData = (data: AnsoffData) => {
	if (typeof window === "undefined") return;
	console.log("Sauvegarde des données Ansoff:", data);

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

export async function updateAnsoffData(auth0Id: string, data: AnsoffData) {
	try {
		console.log("Début de la sauvegarde pour user:", auth0Id);

		// Trouver ou créer l'utilisateur
		const user = await prisma.user.upsert({
			where: { auth0Id },
			update: {},
			create: {
				auth0Id,
				email: "", // À remplir avec l'email de Auth0
			},
		});
		console.log("Utilisateur trouvé/créé:", user.id);

		// Mettre à jour ou créer l'analyse Ansoff
		const ansoffAnalysis = await prisma.ansoffAnalysis.upsert({
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
		console.log("Analyse Ansoff sauvegardée:", ansoffAnalysis.id);

		return ansoffAnalysis;
	} catch (error) {
		console.error("Erreur détaillée lors de la sauvegarde:", error);
		throw error;
	}
}

// Calculer la progression en fonction des cartes remplies
export const calculateProgress = (data: AnsoffData): number => {
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

	return Math.round((filledCategories / categories.length) * 100);
};

// Charger les données depuis le localStorage
export const loadAnsoffData = (): AnsoffData => {
	if (typeof window === "undefined") return getEmptyAnsoffData();

	const stored = localStorage.getItem(STORAGE_KEY);
	return stored ? JSON.parse(stored) : getEmptyAnsoffData();
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
export const saveToDatabase = async (data: AnsoffData) => {
	try {
		console.log("Tentative de sauvegarde dans la base de données");
		const response = await fetch("/api/business-plan/ansoff/save", {
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
		console.log("Sauvegarde dans la base de données réussie");
	} catch (error) {
		console.error("Erreur lors de la sauvegarde dans la BD:", error);
	}
};
