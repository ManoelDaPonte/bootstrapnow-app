import { CompetitorEntry } from "@/types/competitors";
import { prisma } from "@/lib/db/prisma";
import { INITIAL_COMPETITORS } from "@/lib/business-plan/config/competitors";

export interface CompetitorsData {
	competitors: CompetitorEntry[];
	lastUpdated?: string;
}

export const STORAGE_KEY = "competitors-data";

export const saveCompetitorsData = (data: CompetitorsData) => {
	if (typeof window === "undefined") return;

	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({
			...data,
			lastUpdated: new Date().toISOString(),
		})
	);

	// Ajouter la mise à jour de la progression
	updateParentProgress(calculateProgress(data));
};

const updateParentProgress = (progress: number) => {
	if (typeof window === "undefined") return;
	const event = new CustomEvent("competitorsProgressUpdate", {
		detail: { progress },
	});
	window.dispatchEvent(event);
};

export async function updateCompetitorsData(
	auth0Id: string,
	data: CompetitorsData
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

		const competitorsAnalysis = await prisma.competitorsAnalysis.upsert({
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

		return competitorsAnalysis;
	} catch (error) {
		console.error("Erreur détaillée lors de la sauvegarde:", error);
		throw error;
	}
}

export const loadCompetitorsData = (): CompetitorsData => {
	if (typeof window === "undefined") {
		return getEmptyCompetitorsData();
	}

	const storedData = localStorage.getItem(STORAGE_KEY);
	return storedData ? JSON.parse(storedData) : getEmptyCompetitorsData();
};

export const getEmptyCompetitorsData = (): CompetitorsData => ({
	competitors: INITIAL_COMPETITORS, // Utilise les données initiales de la config
	lastUpdated: new Date().toISOString(),
});

export const saveToDatabase = async (data: CompetitorsData) => {
	try {
		const response = await fetch("/api/business-plan/competitors/save", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data }),
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

export const calculateProgress = (data: CompetitorsData): number => {
	const fieldsToCount: Array<keyof CompetitorEntry> = [
		"nom",
		"solution",
		"prix",
		"valeurPercue",
		"strategie",
		"zoneGeographique",
		"ciblageClient",
		"forces",
		"faiblesses",
		"impactDirect",
		"impactIndirect",
	];
	const totalFields = data.competitors.length * fieldsToCount.length;

	const filledFields = data.competitors.reduce((acc, comp) => {
		return (
			acc +
			fieldsToCount.reduce((fieldAcc, field) => {
				const value = comp[field];
				const isFieldFilled =
					typeof value === "number"
						? value > 0
						: typeof value === "string"
						? value.trim() !== ""
						: false;
				return fieldAcc + (isFieldFilled ? 1 : 0);
			}, 0)
		);
	}, 0);

	return Math.min(100, Math.round((filledFields / totalFields) * 100));
};
