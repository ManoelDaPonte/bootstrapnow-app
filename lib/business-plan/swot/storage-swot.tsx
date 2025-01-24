// lib/business-plan/swot/storage-swot.ts
import { SwotData } from "@/types/swot";
import { prisma } from "@/lib/prisma"; // Adjust the import path as necessary

export const STORAGE_KEY = "swot-data";

// Sauvegarder les données (localStorage uniquement)
export const saveSwotData = (data: SwotData) => {
	if (typeof window === "undefined") return;
	console.log("Sauvegarde des données SWOT:", data);

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

export async function updateSwotData(auth0Id: string, data: SwotData) {
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

		// Mettre à jour ou créer l'analyse SWOT
		const swotAnalysis = await prisma.swotAnalysis.upsert({
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
		console.log("Analyse SWOT sauvegardée:", swotAnalysis.id);

		return swotAnalysis;
	} catch (error) {
		console.error("Erreur détaillée lors de la sauvegarde:", error);
		throw error;
	}
}

// Calculer la progression en fonction des cartes remplies
export const calculateProgress = (data: SwotData): number => {
	const categories = ["strengths", "weaknesses", "opportunities", "threats"];
	let filledCategories = 0;

	categories.forEach((category) => {
		if ((data[category as keyof SwotData] ?? []).length > 0) {
			filledCategories++;
		}
	});

	return Math.round((filledCategories / categories.length) * 100);
};

// Charger les données depuis le localStorage
export const loadSwotData = (): SwotData => {
	if (typeof window === "undefined") return getEmptySwotData();

	const stored = localStorage.getItem(STORAGE_KEY);
	return stored ? JSON.parse(stored) : getEmptySwotData();
};

// Retourner une structure de données vide
export const getEmptySwotData = (): SwotData => ({
	strengths: [],
	weaknesses: [],
	opportunities: [],
	threats: [],
});

// Mettre à jour la progression dans la page parent
const updateParentProgress = (progress: number) => {
	if (typeof window === "undefined") return;

	const event = new CustomEvent("swotProgressUpdate", {
		detail: { progress },
	});
	window.dispatchEvent(event);
};

// Sauvegarder dans la base de données via l'API
export const saveToDatabase = async (data: SwotData) => {
	try {
		console.log("Tentative de sauvegarde dans la base de données");
		const response = await fetch("/api/business-plan/swot/save", {
			// Nouvelle route
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
