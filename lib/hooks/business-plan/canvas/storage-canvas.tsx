// lib/business-plan/canvas/storage-canvas.ts
import { CanvasData } from "@/types/canvas";
import { prisma } from "@/lib/prisma";
import { CanvasCard } from "@/types/canvas";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";

export const STORAGE_KEY = "canvas-data";

// Sauvegarder les données (localStorage uniquement)
export const saveCanvasData = (data: CanvasData) => {
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

export async function updateCanvasData(auth0Id: string, data: CanvasData) {
	try {
		// Récupérer les informations de session pour avoir l'email
		const session = await getUserFromSession();
		if (!session) {
			throw new Error("Session utilisateur non trouvée");
		}

		// Vérifier et créer/mettre à jour l'utilisateur directement avec upsert
		const user = await prisma.user.upsert({
			where: { auth0Id },
			update: {}, // Pas besoin de mettre à jour quoi que ce soit
			create: {
				auth0Id,
				email: session.email || `${auth0Id}@temporary.com`, // Utiliser l'email de la session
			},
		});

		// S'assurer que les données sont bien structurées
		const sanitizedData: CanvasData = {
			keyPartners: Array.isArray(data.keyPartners)
				? data.keyPartners
				: [],
			keyActivities: Array.isArray(data.keyActivities)
				? data.keyActivities
				: [],
			keyResources: Array.isArray(data.keyResources)
				? data.keyResources
				: [],
			valueProposition: Array.isArray(data.valueProposition)
				? data.valueProposition
				: [],
			customerRelationships: Array.isArray(data.customerRelationships)
				? data.customerRelationships
				: [],
			channels: Array.isArray(data.channels) ? data.channels : [],
			customerSegments: Array.isArray(data.customerSegments)
				? data.customerSegments
				: [],
			costStructure: Array.isArray(data.costStructure)
				? data.costStructure
				: [],
			revenueStreams: Array.isArray(data.revenueStreams)
				? data.revenueStreams
				: [],
		};

		// Vérifier que chaque carte a la bonne structure
		const validateCard = (card: any): card is CanvasCard => {
			return (
				typeof card === "object" &&
				card !== null &&
				typeof card.id === "number" &&
				typeof card.title === "string" &&
				typeof card.description === "string"
			);
		};

		// S'assurer que toutes les cartes sont valides
		Object.values(sanitizedData).forEach((cards) => {
			if (!Array.isArray(cards) || !cards.every(validateCard)) {
				throw new Error("Structure de carte invalide");
			}
		});

		// Utiliser le type Json de Prisma explicitement
		const canvasAnalysis = await prisma.canvasAnalysis.upsert({
			where: { userId: user.id },
			update: {
				data: sanitizedData as any,
				updatedAt: new Date(),
			},
			create: {
				userId: user.id,
				data: sanitizedData as any,
			},
		});

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
		const response = await fetch("/api/business-plan/canvas/save", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const responseData = await response.json();

		if (!response.ok) {
			throw new Error(
				`Erreur ${response.status}: ${JSON.stringify(responseData)}`
			);
		}
	} catch (error) {
		console.error("Erreur détaillée:", error);
		throw error;
	}
};
