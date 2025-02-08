// app/api/business-plan/pestel/data/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { prisma } from "@/lib/db/prisma";
import { getEmptyPestelData } from "@/lib/business-plan/hooks/pestel/storage-pestel";

export async function GET() {
	try {
		const user = await getUserFromSession();
		if (!user) {
			return NextResponse.json(
				{ error: "Utilisateur non trouvé" },
				{ status: 404 }
			);
		}

		// Récupérer les données de l'utilisateur
		const userData = await prisma.user.findUnique({
			where: { auth0Id: user.sub },
			include: { pestelAnalysis: true },
		});

		const emptyData = {
			data: getEmptyPestelData(),
			qaResponses: {},
		};

		if (!userData?.pestelAnalysis) {
			return NextResponse.json(emptyData);
		}

		// Validation des données
		const rawData = userData.pestelAnalysis.data;
		const rawQAResponses = userData.pestelAnalysis.qaResponses;

		// Vérification que les données sont bien structurées
		const isValidData = validatePestelData(rawData);
		if (!isValidData) {
			console.error("Données Pestel invalides en base:", rawData);
			return NextResponse.json(emptyData);
		}

		return NextResponse.json({
			data: rawData,
			qaResponses: rawQAResponses,
		});
	} catch (error) {
		console.error("Erreur lors de la récupération:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la récupération" },
			{ status: 500 }
		);
	}
}

function validatePestelData(data: any): boolean {
	const requiredCategories = [
		"political",
		"economic",
		"social", // Changed from "sociocultural" to "social"
		"technological",
		"environmental",
		"legal",
	];

	// Vérifier que l'objet data existe et n'est pas null
	if (!data || typeof data !== "object") {
		return false;
	}

	// Vérifier que toutes les catégories requises existent et sont des tableaux
	return requiredCategories.every((category) =>
		Array.isArray(data[category])
	);
}
