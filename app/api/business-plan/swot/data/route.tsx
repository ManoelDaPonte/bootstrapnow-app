// app/api/business-plan/swot/data/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { prisma } from "@/lib/db/prisma";
import { getEmptySwotData } from "@/lib/business-plan/hooks/swot/storage-swot";

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
			include: { swotAnalysis: true },
		});

		// Si pas de données, retourner une structure vide mais valide
		const emptyData = {
			data: getEmptySwotData(),
			qaResponses: {},
		};

		if (!userData?.swotAnalysis) {
			return NextResponse.json(emptyData);
		}

		// Validation des données
		const rawData = userData.swotAnalysis.data;
		const rawQAResponses = userData.swotAnalysis.qaResponses;

		// Vérification que les données sont bien structurées
		const isValidData = validateSwotData(rawData);
		if (!isValidData) {
			console.error("Données SWOT invalides en base:", rawData);
			return NextResponse.json(emptyData);
		}

		return NextResponse.json({
			data: rawData,
			qaResponses: rawQAResponses,
		});
	} catch (error) {
		console.error("Erreur lors de la récupération:", error);
		return NextResponse.json(
			{ error: "Erreur serveur lors de la récupération" },
			{ status: 500 }
		);
	}
}

function validateSwotData(data: any): boolean {
	const requiredCategories = [
		"strengths",
		"weaknesses",
		"opportunities",
		"threats",
	];

	// Vérifier que toutes les catégories existent et sont des tableaux
	return requiredCategories.every((category) =>
		Array.isArray(data[category])
	);
}
