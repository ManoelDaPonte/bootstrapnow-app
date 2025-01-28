// lib/business-plan/value-proposition/storage.ts
import { ValuePropositionData } from "@/types/value-proposition";
import { prisma } from "@/lib/prisma";

export const STORAGE_KEY = "value-proposition-data";

// Sauvegarder les données (localStorage uniquement)
export const saveValuePropositionData = (data: ValuePropositionData) => {
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

export async function updateValuePropositionData(
	auth0Id: string,
	data: ValuePropositionData
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

		// Mettre à jour ou créer l'analyse Value Proposition
		const valuePropositionAnalysis =
			await prisma.valuePropositionAnalysis.upsert({
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

		return valuePropositionAnalysis;
	} catch (error) {
		console.error("Erreur détaillée lors de la sauvegarde:", error);
		throw error;
	}
}

// Calculer la progression en fonction des sections remplies
export const calculateProgress = (data: ValuePropositionData): number => {
	const categories = [
		"customerJobs",
		"pains",
		"gains",
		"products",
		"painRelievers",
		"gainCreators",
	];
	let filledCategories = 0;

	categories.forEach((category) => {
		if ((data[category as keyof ValuePropositionData] ?? []).length > 0) {
			filledCategories++;
		}
	});

	return Math.round((filledCategories / categories.length) * 100);
};

// Charger les données depuis le localStorage
export const loadValuePropositionData = (): ValuePropositionData => {
	if (typeof window === "undefined") return getEmptyValuePropositionData();

	const stored = localStorage.getItem(STORAGE_KEY);
	return stored ? JSON.parse(stored) : getEmptyValuePropositionData();
};

// Retourner une structure de données vide
export const getEmptyValuePropositionData = (): ValuePropositionData => ({
	customerJobs: [],
	pains: [],
	gains: [],
	products: [],
	painRelievers: [],
	gainCreators: [],
});

// Mettre à jour la progression dans la page parent
const updateParentProgress = (progress: number) => {
	if (typeof window === "undefined") return;

	const event = new CustomEvent("valuePropositionProgressUpdate", {
		detail: { progress },
	});
	window.dispatchEvent(event);
};

// Sauvegarder dans la base de données via l'API
export const saveToDatabase = async (data: ValuePropositionData) => {
	try {
		const response = await fetch(
			"/api/business-plan/value-proposition/save",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);

		if (!response.ok) {
			throw new Error(
				"Erreur lors de la sauvegarde dans la base de données"
			);
		}
	} catch (error) {
		console.error("Erreur lors de la sauvegarde dans la BD:", error);
	}
};
