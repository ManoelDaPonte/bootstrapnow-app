// lib/business-plan/marketing-mix/storage-marketing-mix.ts
import { MarketingMixData } from "@/types/marketing-mix";
import { QAResponses } from "@/types/shared/qa-section";
import { prisma } from "@/lib/db/prisma";

export const STORAGE_KEY = "marketing-mix-data";
export const QA_STORAGE_KEY = "marketing-mix-qa-responses";

// Sauvegarder les données (localStorage uniquement)
export const saveMarketingMixData = (
	data: MarketingMixData,
	qaResponses: QAResponses
) => {
	if (typeof window === "undefined") return;

	// Sauvegarder les données principales
	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({
			...data,
			lastUpdated: new Date().toISOString(),
		})
	);

	// Sauvegarder les réponses QA séparément
	localStorage.setItem(QA_STORAGE_KEY, JSON.stringify(qaResponses));

	updateParentProgress(calculateProgress(data));
};

export async function updateMarketingMixData(
	auth0Id: string,
	data: MarketingMixData,
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

		const marketingMixAnalysis = await prisma.marketingMixAnalysis.upsert({
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

		return marketingMixAnalysis;
	} catch (error) {
		console.error("Erreur lors de la sauvegarde:", error);
		throw error;
	}
}

interface StoredData {
	data: MarketingMixData;
	qaResponses: QAResponses;
}

export const loadMarketingMixData = (): StoredData => {
	if (typeof window === "undefined") {
		return {
			data: getEmptyMarketingMixData(),
			qaResponses: {},
		};
	}

	let parsedData = getEmptyMarketingMixData();
	let parsedQA = {};

	try {
		const storedData = localStorage.getItem(STORAGE_KEY);
		if (storedData) {
			const parsed = JSON.parse(storedData);
			// Vérification que les données sont valides
			if (parsed && typeof parsed === "object") {
				parsedData = parsed;
			}
		}
	} catch (error) {
		console.error("Erreur lors du chargement des données:", error);
		// En cas d'erreur, on utilise les données vides par défaut
	}

	try {
		const storedQA = localStorage.getItem(QA_STORAGE_KEY);
		if (storedQA) {
			const parsed = JSON.parse(storedQA);
			// Vérification que les QA responses sont valides
			if (parsed && typeof parsed === "object") {
				parsedQA = parsed;
			}
		}
	} catch (error) {
		console.error("Erreur lors du chargement des QA responses:", error);
		// En cas d'erreur, on utilise un objet vide
	}

	return {
		data: parsedData,
		qaResponses: parsedQA,
	};
};

// Retourner une structure de données vide
export const getEmptyMarketingMixData = (): MarketingMixData => ({
	product: [],
	price: [],
	place: [],
	promotion: [],
	people: [],
	process: [],
	physicalEvidence: [],
	lastUpdated: new Date().toISOString(),
});

// Mettre à jour la progression dans la page parent
const updateParentProgress = (progress: number) => {
	if (typeof window === "undefined") return;
	const event = new CustomEvent("marketingMixProgressUpdate", {
		detail: { progress },
	});
	window.dispatchEvent(event);
};

// Sauvegarder dans la base de données via l'API
export const saveToDatabase = async (
	data: MarketingMixData,
	qaResponses: QAResponses
) => {
	try {
		const response = await fetch("/api/business-plan/marketing-mix/save", {
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

export const calculateProgress = (data: MarketingMixData): number => {
	const categories = [
		"product",
		"price",
		"place",
		"promotion",
		"people",
		"process",
		"physical_evidence",
	];
	let filledCategories = 0;

	categories.forEach((category) => {
		if ((data[category as keyof MarketingMixData] ?? []).length > 0) {
			filledCategories++;
		}
	});

	return Math.round((filledCategories / categories.length) * 100);
};
