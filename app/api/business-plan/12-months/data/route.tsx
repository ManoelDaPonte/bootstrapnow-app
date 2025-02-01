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
		};

		if (!userData?.monthlyProjectionAnalysis) {
			return NextResponse.json(emptyData);
		}

		// Validation des données
		const rawData = userData.monthlyProjectionAnalysis.data;

		// Vérification que les données sont bien structurées
		const isValidData = validateProfitLossData(rawData);
		if (!isValidData) {
			console.error("Données profit/loss invalides en base:", rawData);
			return NextResponse.json(emptyData);
		}

		return NextResponse.json({
			data: rawData,
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
	const requiredCategories = ["revenue", "expenses"];

	// Vérifier que toutes les catégories existent et sont des tableaux
	const hasValidCategories = requiredCategories.every((category) =>
		Array.isArray(data[category])
	);

	if (!hasValidCategories) return false;

	// Vérifier la structure de chaque entrée
	return requiredCategories.every((category) =>
		data[category].every((entry: any) => {
			const hasValidId =
				typeof entry.id === "string" || typeof entry.id === "number";
			const hasValidCategory = typeof entry.category === "string";

			// Vérifier que tous les mois ont des valeurs numériques
			const months = [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec",
			];
			const hasValidMonths = months.every(
				(month) => typeof entry[month] === "number"
			);

			return hasValidId && hasValidCategory && hasValidMonths;
		})
	);
}
