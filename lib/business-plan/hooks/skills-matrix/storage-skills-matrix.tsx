import { Person, Domain } from "@/types/skill-matrix";
import { QAResponses } from "@/types/shared/qa-section";
import { prisma } from "@/lib/db/prisma";
import { SKILLS_MATRIX_QA_DATA } from "@/lib/business-plan/config/skills-matrix";

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

	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({
			...data,
			lastUpdated: new Date().toISOString(),
		})
	);

	localStorage.setItem(QA_STORAGE_KEY, JSON.stringify(qaResponses));

	// Mettre à jour avec les deux paramètres
	updateParentProgress(calculateProgress(data, qaResponses));
};

const updateParentProgress = (progress: number) => {
	if (typeof window === "undefined") return;
	const event = new CustomEvent("skillMatrixProgressUpdate", {
		detail: { progress },
	});
	window.dispatchEvent(event);
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

export const calculateProgress = (
	data: SkillMatrixData,
	qaResponses: QAResponses = {}
): number => {
	// 1. Calculer la progression de la matrice elle-même
	const hasMinimumData = data.people.length > 0 && data.domains.length > 0;

	// Calculer le taux de remplissage des compétences
	const totalPossibleSkills = data.people.length * data.domains.length;
	let filledSkills = 0;

	data.people.forEach((person) => {
		Object.values(person.skills).forEach((skill) => {
			if (skill !== undefined && skill !== null) {
				filledSkills++;
			}
		});
	});

	// 2. Calculer la progression des réponses QA
	const questionIds = SKILLS_MATRIX_QA_DATA.categories.map((cat) => cat.id);
	const answeredQuestions = questionIds.filter(
		(id) => qaResponses[id] && qaResponses[id].trim() !== ""
	).length;
	const totalQAQuestions = questionIds.length;

	// 3. Calculer la progression totale
	const matrixWeight = 0.7; // 70% pour la matrice
	const qaWeight = 0.3; // 30% pour les questions

	const matrixProgress =
		hasMinimumData && totalPossibleSkills > 0
			? (filledSkills / totalPossibleSkills) * 100
			: 0;

	const qaProgress =
		totalQAQuestions > 0 ? (answeredQuestions / totalQAQuestions) * 100 : 0;

	const totalProgress = Math.round(
		matrixProgress * matrixWeight + qaProgress * qaWeight
	);

	return Math.min(100, totalProgress);
};
