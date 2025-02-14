// app/api/business-plan/12-months/data/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { prisma } from "@/lib/db/prisma";
import { getEmptyProfitLossData } from "@/lib/business-plan/hooks/12-months/storage-12-months";

export async function GET() {
	try {
		const user = await getUserFromSession();
		if (!user) {
			return NextResponse.json(
				{ error: "Utilisateur non authentifié" },
				{ status: 401 }
			);
		}

		const userData = await prisma.user.findUnique({
			where: { auth0Id: user.sub },
			include: { monthlyProjectionAnalysis: true },
		});

		// Si pas de données, retourner une structure vide mais valide
		const emptyData = {
			data: getEmptyProfitLossData(),
			qaResponses: {},
		};

		if (!userData?.monthlyProjectionAnalysis) {
			return NextResponse.json(emptyData);
		}

		// Validation des données
		const rawData = userData.monthlyProjectionAnalysis.data;
		const rawQAResponses = userData.monthlyProjectionAnalysis.qaResponses;

		// Vérification que les données sont bien structurées
		const isValidData = validateProfitLossData(rawData);
		if (!isValidData) {
			console.error("Données profit/loss invalides en base:", rawData);
			return NextResponse.json(emptyData);
		}

		return NextResponse.json({
			data: rawData,
			qaResponses: rawQAResponses || {}, // S'assurer de toujours retourner un objet pour qaResponses
		});
	} catch (error) {
		console.error("Erreur lors de la récupération:", error);
		return NextResponse.json(
			{ error: "Erreur serveur lors de la récupération" },
			{ status: 500 }
		);
	}
}
function validateProfitLossData(data: any): boolean {
	if (typeof data !== "object" || data === null) return false;

	const requiredCategories = ["revenue", "expenses"];
	const months = Array.from({ length: 12 }, (_, i) => `M${i + 1}`); // Utiliser M1-M12 au lieu de Jan-Dec

	const hasValidCategories = requiredCategories.every((category) =>
		Array.isArray(data[category])
	);

	if (!hasValidCategories) return false;

	return requiredCategories.every((category) =>
		data[category].every((entry: any) => {
			const hasValidId =
				typeof entry.id === "string" || typeof entry.id === "number";
			const hasValidCategory = typeof entry.category === "string";
			const hasValidMonths = months.every((month) => {
				const value = entry[month];
				return (
					typeof value === "number" &&
					!isNaN(value) &&
					isFinite(value)
				);
			});

			return hasValidId && hasValidCategory && hasValidMonths;
		})
	);
}
