import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { prisma } from "@/lib/db/prisma";
import { getEmptyValuePropositionData } from "@/lib/business-plan/hooks/value-proposition/storage-value-proposition";

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
			include: { valuePropositionAnalysis: true },
		});

		// Si pas de données, retourner une structure vide mais valide
		const emptyData = {
			data: getEmptyValuePropositionData(),
			qaResponses: {},
		};

		if (!userData?.valuePropositionAnalysis) {
			return NextResponse.json(emptyData);
		}

		// Validation des données
		const rawData = userData.valuePropositionAnalysis.data;
		const rawQAResponses = userData.valuePropositionAnalysis.qaResponses;

		// Vérification que les données sont bien structurées
		const isValidData = validateValuePropositionData(rawData);
		if (!isValidData) {
			console.error(
				"Données Value Proposition invalides en base:",
				rawData
			);
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

function validateValuePropositionData(data: any): boolean {
	const requiredCategories = [
		"customerJobs",
		"pains",
		"gains",
		"products",
		"painRelievers",
		"gainCreators",
	];

	// Vérifier que toutes les catégories existent et sont des tableaux
	return requiredCategories.every((category) =>
		Array.isArray(data[category])
	);
}
