// lib/business-plan/funnel-chart/storage-funnel-chart.ts
import { FunnelSection } from "@/types/funnel-chart";
import { QAResponses } from "@/types/shared/qa-section";
import { prisma } from "@/lib/db/prisma";

export const STORAGE_KEY = "funnel-chart-data";
export const QA_STORAGE_KEY = "funnel-chart-qa-responses";

export const INITIAL_SECTIONS: FunnelSection[] = [
	{
		id: 1,
		title: "Visibilité",
		size: 100,
		cards: [],
		color: "from-yellow-50 to-yellow-100",
	},
	{
		id: 2,
		title: "Intérêt",
		size: 85,
		cards: [],
		color: "from-yellow-100 to-orange-100",
	},
	{
		id: 3,
		title: "Considération",
		size: 70,
		cards: [],
		color: "from-orange-100 to-orange-200",
	},
	{
		id: 4,
		title: "Intention",
		size: 55,
		cards: [],
		color: "from-orange-200 to-red-200",
	},
	{
		id: 5,
		title: "Achat",
		size: 40,
		cards: [],
		color: "from-red-200 to-red-300",
	},
];

interface StoredData {
	sections: FunnelSection[];
	qaResponses: QAResponses;
}

export const saveFunnelChartData = (
	data: FunnelSection[],
	qaResponses: QAResponses
) => {
	if (typeof window === "undefined") return;

	// Sauvegarder les données principales
	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({
			sections: data,
			lastUpdated: new Date().toISOString(),
		})
	);

	// Sauvegarder les QA responses séparément
	localStorage.setItem(QA_STORAGE_KEY, JSON.stringify(qaResponses));

	updateParentProgress(calculateProgress(data));
};

export async function updateFunnelChartData(
	auth0Id: string,
	data: FunnelSection[],
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

		const funnelAnalysis = await prisma.funnelChartAnalysis.upsert({
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

		return funnelAnalysis;
	} catch (error) {
		console.error("Erreur lors de la sauvegarde:", error);
		throw error;
	}
}

export const loadFunnelChartData = (): StoredData => {
	if (typeof window === "undefined") {
		return {
			sections: INITIAL_SECTIONS,
			qaResponses: {},
		};
	}

	let parsedSections = INITIAL_SECTIONS;
	let parsedQA = {};

	try {
		const storedData = localStorage.getItem(STORAGE_KEY);
		if (storedData) {
			const parsed = JSON.parse(storedData);
			if (parsed && parsed.sections && Array.isArray(parsed.sections)) {
				parsedSections = parsed.sections;
			}
		}
	} catch (error) {
		console.error("Erreur lors du chargement des sections:", error);
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
		sections: parsedSections,
		qaResponses: parsedQA,
	};
};

export const calculateProgress = (sections: FunnelSection[] = []): number => {
	if (!sections || sections.length === 0) return 0;

	let totalCards = 0;
	sections.forEach((section) => {
		if (section.cards && section.cards.length > 0) {
			totalCards++;
		}
	});

	return Math.round((totalCards / sections.length) * 100);
};

const updateParentProgress = (progress: number) => {
	if (typeof window === "undefined") return;
	const event = new CustomEvent("funnelChartProgressUpdate", {
		detail: { progress },
	});
	window.dispatchEvent(event);
};

export const saveToDatabase = async (
	data: FunnelSection[],
	qaResponses: QAResponses
) => {
	try {
		const response = await fetch("/api/business-plan/funnel-chart/save", {
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
