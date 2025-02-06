// lib/business-plan/canvas/storage-canvas.ts
import { CanvasData } from "@/types/canvas";
import { prisma } from "@/lib/db/prisma";
import { CanvasCard } from "@/types/canvas";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { QAResponses } from "@/types/shared/qa-section";

export const STORAGE_KEY = "canvas-data";
export const QA_STORAGE_KEY = "canvas-qa-responses";

interface StoredData {
	data: CanvasData;
	qaResponses: QAResponses;
}

export const saveCanvasData = (data: CanvasData, qaResponses: QAResponses) => {
	if (typeof window === "undefined") return;

	// Sauvegarder les données principales
	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({
			...data,
			lastUpdated: new Date().toISOString(),
		})
	);

	// Sauvegarder les QA responses séparément
	localStorage.setItem(QA_STORAGE_KEY, JSON.stringify(qaResponses));

	updateParentProgress(calculateProgress(data));
};

export async function updateCanvasData(
	auth0Id: string,
	data: CanvasData,
	qaResponses: QAResponses
) {
	try {
		const session = await getUserFromSession();
		if (!session) {
			throw new Error("Session utilisateur non trouvée");
		}

		const user = await prisma.user.upsert({
			where: { auth0Id },
			update: {},
			create: {
				auth0Id,
				email: session.email || `${auth0Id}@temporary.com`,
			},
		});

		const canvasAnalysis = await prisma.canvasAnalysis.upsert({
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
	console.log("filledCategories", filledCategories);
	console.log("categories.length", categories.length);

	return Math.round((filledCategories / categories.length) * 100);
};

interface StoredData {
	data: CanvasData;
	qaResponses: QAResponses;
}

export const loadCanvasData = (): StoredData => {
	if (typeof window === "undefined") {
		return {
			data: getEmptyCanvasData(),
			qaResponses: {},
		};
	}

	let parsedData = getEmptyCanvasData();
	let parsedQA = {};

	try {
		const storedData = localStorage.getItem(STORAGE_KEY);
		if (storedData) {
			const parsed = JSON.parse(storedData);
			if (parsed && typeof parsed === "object") {
				parsedData = parsed;
			}
		}
	} catch (error) {
		console.error("Erreur lors du chargement des données:", error);
	}

	try {
		const storedQA = localStorage.getItem(QA_STORAGE_KEY);
		if (storedQA) {
			const parsed = JSON.parse(storedQA);
			if (parsed && typeof parsed === "object") {
				parsedQA = parsed;
			}
		}
	} catch (error) {
		console.error("Erreur lors du chargement des QA responses:", error);
	}

	return {
		data: parsedData,
		qaResponses: parsedQA,
	};
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
export const saveToDatabase = async (
	data: CanvasData,
	qaResponses: QAResponses
) => {
	try {
		const response = await fetch("/api/business-plan/canvas/save", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data, qaResponses }),
		});

		if (!response.ok) {
			const responseData = await response.json();
			throw new Error(
				`Erreur ${response.status}: ${JSON.stringify(responseData)}`
			);
		}

		return await response.json();
	} catch (error) {
		console.error("Erreur détaillée:", error);
		throw error;
	}
};
