import { SwotData } from "@/types/swot";
import { QAResponses } from "@/types/shared/qa-section";
import { prisma } from "@/lib/db/prisma";

export const STORAGE_KEY = "swot-data";
export const QA_STORAGE_KEY = "swot-qa-responses";

export const saveSwotData = (data: SwotData, qaResponses: QAResponses) => {
	if (typeof window === "undefined") return;

	// Sauvegarder les données SWOT
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

export async function updateSwotData(
	auth0Id: string,
	data: SwotData,
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

		const swotAnalysis = await prisma.swotAnalysis.upsert({
			where: { userId: user.id },
			update: {
				data: JSON.parse(JSON.stringify(data)), // Conversion nécessaire pour le type JSON
				qaResponses: qaResponses,
				updatedAt: new Date(),
			},
			create: {
				userId: user.id,
				data: JSON.parse(JSON.stringify(data)),
				qaResponses: qaResponses,
			},
		});

		return swotAnalysis;
	} catch (error) {
		console.error("Erreur détaillée lors de la sauvegarde:", error);
		throw error;
	}
}

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

interface StoredData {
	data: SwotData;
	qaResponses: QAResponses;
}

export const loadSwotData = (): StoredData => {
	if (typeof window === "undefined") {
		return {
			data: getEmptySwotData(),
			qaResponses: {},
		};
	}

	const storedData = localStorage.getItem(STORAGE_KEY);
	const storedQA = localStorage.getItem(QA_STORAGE_KEY);

	return {
		data: storedData ? JSON.parse(storedData) : getEmptySwotData(),
		qaResponses: storedQA ? JSON.parse(storedQA) : {},
	};
};

export const getEmptySwotData = (): SwotData => ({
	strengths: [],
	weaknesses: [],
	opportunities: [],
	threats: [],
});

const updateParentProgress = (progress: number) => {
	if (typeof window === "undefined") return;

	const event = new CustomEvent("swotProgressUpdate", {
		detail: { progress },
	});
	window.dispatchEvent(event);
};

export const saveToDatabase = async (
	data: SwotData,
	qaResponses: QAResponses
) => {
	try {
		const response = await fetch("/api/business-plan/swot/save", {
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
