// lib/business-plan/canvas/storage-canvas.ts
import { CanvasData } from "@/types/canvas";
import { prisma } from "@/lib/prisma";

export const STORAGE_KEY = "canvas-data";

// Sauvegarder les données (localStorage uniquement)
export const saveCanvasData = (data: CanvasData) => {
	if (typeof window === "undefined") return;
	console.log("Sauvegarde des données Canvas:", data);

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

export async function updateCanvasData(auth0Id: string, data: CanvasData) {
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

		// Mettre à jour ou créer le Business Model Canvas
		const canvasAnalysis = await prisma.canvasAnalysis.upsert({
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
		console.log("Business Model Canvas sauvegardé:", canvasAnalysis.id);

		return canvasAnalysis;
	} catch (error) {
		console.error("Erreur détaillée lors de la sauvegarde:", error);
		throw error;
	}
}

// Calculer la progression en fonction des sections remplies
export const calculateProgress = (data: CanvasData): number => {
	const categories = [
		"keyPartners",
		"keyActivities",
		"keyResources",
		"valueProposition",
		"customerRelationships",
		"channels",
		"customerSegments",
		"costStructure",
		"revenueStreams",
	];

	let filledCategories = 0;

	categories.forEach((category) => {
		if ((data[category as keyof CanvasData] ?? []).length > 0) {
			filledCategories++;
		}
	});

	return Math.round((filledCategories / categories.length) * 100);
};

// Charger les données depuis le localStorage
export const loadCanvasData = (): CanvasData => {
	if (typeof window === "undefined") return getEmptyCanvasData();

	const stored = localStorage.getItem(STORAGE_KEY);
	return stored ? JSON.parse(stored) : getEmptyCanvasData();
};

// Retourner une structure de données vide
export const getEmptyCanvasData = (): CanvasData => ({
	keyPartners: [],
	keyActivities: [],
	keyResources: [],
	valueProposition: [],
	customerRelationships: [],
	channels: [],
	customerSegments: [],
	costStructure: [],
	revenueStreams: [],
});

// Mettre à jour la progression dans la page parent
const updateParentProgress = (progress: number) => {
	if (typeof window === "undefined") return;

	const event = new CustomEvent("canvasProgressUpdate", {
		detail: { progress },
	});
	window.dispatchEvent(event);
};

// Sauvegarder dans la base de données via l'API
export const saveToDatabase = async (data: CanvasData) => {
	try {
		console.log("Tentative de sauvegarde dans la base de données");
		const response = await fetch("/api/business-plan/canvas/save", {
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
