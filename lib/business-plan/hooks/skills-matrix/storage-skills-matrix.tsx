import { Person, Domain } from "@/types/skill-matrix";
import { QAResponses } from "@/types/shared/qa-section";
import { prisma } from "@/lib/db/prisma";

interface SkillMatrixData {
	people: Person[];
	domains: Domain[];
}

export const STORAGE_KEY = "skill-matrix-data";
export const QA_STORAGE_KEY = "skill-matrix-qa-responses";

export const saveSkillMatrixData = (
	data: SkillMatrixData,
	qaResponses: QAResponses
) => {
	if (typeof window === "undefined") return;

	// Sauvegarder les données de la matrice
	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({
			...data,
			lastUpdated: new Date().toISOString(),
		})
	);

	// Sauvegarder les réponses QA séparément
	localStorage.setItem(QA_STORAGE_KEY, JSON.stringify(qaResponses));
};

export async function updateSkillMatrixData(
	auth0Id: string,
	data: SkillMatrixData,
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

		const skillMatrix = await prisma.skillMatrix.upsert({
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

		return skillMatrix;
	} catch (error) {
		console.error("Erreur détaillée lors de la sauvegarde:", error);
		throw error;
	}
}

interface StoredData {
	data: SkillMatrixData;
	qaResponses: QAResponses;
}

export const loadSkillMatrixData = (): StoredData => {
	if (typeof window === "undefined") {
		return {
			data: getEmptySkillMatrixData(),
			qaResponses: {},
		};
	}

	const storedData = localStorage.getItem(STORAGE_KEY);
	const storedQA = localStorage.getItem(QA_STORAGE_KEY);

	return {
		data: storedData ? JSON.parse(storedData) : getEmptySkillMatrixData(),
		qaResponses: storedQA ? JSON.parse(storedQA) : {},
	};
};

export const getEmptySkillMatrixData = (): SkillMatrixData => ({
	people: [],
	domains: [],
});

export const saveToDatabase = async (
	data: SkillMatrixData,
	qaResponses: QAResponses
) => {
	try {
		const response = await fetch("/api/business-plan/skill-matrix/save", {
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
