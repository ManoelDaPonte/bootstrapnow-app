// lib/business-plan/funnel-chart/storage-funnel-chart.ts
import { FunnelSection } from "@/types/funnel-chart";
import { prisma } from "@/lib/db/prisma";

export const STORAGE_KEY = "funnel-chart-data";

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

export const saveFunnelChartData = (data: FunnelSection[]) => {
	if (typeof window === "undefined") return;

	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({
			sections: data,
			lastUpdated: new Date().toISOString(),
		})
	);

	updateParentProgress(calculateProgress(data));
};

export async function updateFunnelChartData(
	auth0Id: string,
	data: FunnelSection[]
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
				updatedAt: new Date(),
			},
			create: {
				userId: user.id,
				data: JSON.parse(JSON.stringify(data)),
			},
		});

		return funnelAnalysis;
	} catch (error) {
		console.error("Erreur lors de la sauvegarde:", error);
		throw error;
	}
}

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

export const loadFunnelChartData = (): FunnelSection[] => {
	if (typeof window === "undefined") return INITIAL_SECTIONS;

	const stored = localStorage.getItem(STORAGE_KEY);
	return stored ? JSON.parse(stored).sections : INITIAL_SECTIONS;
};

const updateParentProgress = (progress: number) => {
	if (typeof window === "undefined") return;

	const event = new CustomEvent("funnelChartProgressUpdate", {
		detail: { progress },
	});
	window.dispatchEvent(event);
};

export const saveToDatabase = async (data: FunnelSection[]) => {
	try {
		const response = await fetch("/api/business-plan/funnel-chart/save", {
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
