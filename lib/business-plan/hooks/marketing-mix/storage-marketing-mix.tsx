// lib/business-plan/marketing-mix/storage-marketing-mix.ts
import { MarketingMixData } from "@/types/marketing-mix";
import { prisma } from "@/lib/db/prisma";

export const STORAGE_KEY = "marketing-mix-data";

// Sauvegarder les données (localStorage uniquement)
export const saveMarketingMixData = (data: MarketingMixData) => {
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

export async function updateMarketingMixData(
	auth0Id: string,
	data: MarketingMixData
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

		// Mettre à jour ou créer l'analyse Marketing Mix
		const marketingMixAnalysis = await prisma.marketingMixAnalysis.upsert({
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

		return marketingMixAnalysis;
	} catch (error) {
		console.error("Erreur détaillée lors de la sauvegarde:", error);
		throw error;
	}
}

// Calculer la progression en fonction des cartes remplies
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

// Charger les données depuis le localStorage
export const loadMarketingMixData = (): MarketingMixData => {
	if (typeof window === "undefined") return getEmptyMarketingMixData();

	const stored = localStorage.getItem(STORAGE_KEY);
	return stored ? JSON.parse(stored) : getEmptyMarketingMixData();
};

// Retourner une structure de données vide
export const getEmptyMarketingMixData = (): MarketingMixData => ({
	product: [],
	price: [],
	place: [],
	promotion: [],
	people: [],
	process: [],
	physical_evidence: [],
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
export const saveToDatabase = async (data: MarketingMixData) => {
	try {
		const response = await fetch("/api/business-plan/marketing-mix/save", {
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
