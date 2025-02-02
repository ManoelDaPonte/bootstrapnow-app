import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { prisma } from "@/lib/db/prisma";
import { getEmptyMarketTrendsData } from "@/lib/business-plan/hooks/market-trends/storage-market-trends";

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
			include: { marketTrendsAnalysis: true },
		});

		// Si pas de données, retourner une structure vide mais valide
		if (!userData?.marketTrendsAnalysis) {
			return NextResponse.json({
				data: getEmptyMarketTrendsData(),
			});
		}

		// Validation des données
		const rawData = userData?.marketTrendsAnalysis?.data as {
			trends: {
				id: string;
				annee: number;
				tauxCroissance: number;
				variationDemande: number;
			}[];
			marketNumbers: {
				id: string;
				value: string;
				title: string;
				description: string;
				referenceLink: string;
			}[];
		};

		// Vérifier si les tableaux sont vides
		const isEmpty =
			!rawData?.trends?.length && !rawData?.marketNumbers?.length;
		if (isEmpty) {
			return NextResponse.json({
				data: getEmptyMarketTrendsData(), // Retourne les données par défaut si vide
			});
		}

		// Vérification que les données sont bien structurées
		const isValidData = validateMarketTrendsData(rawData);
		if (!isValidData) {
			console.error("Données Market Trends invalides en base:", rawData);
			return NextResponse.json({
				data: getEmptyMarketTrendsData(),
			});
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

function validateMarketTrendsData(data: any): boolean {
	if (!data || typeof data !== "object") return false;
	if (!Array.isArray(data.trends) || !Array.isArray(data.marketNumbers))
		return false;

	// Valider la structure des trends
	const isValidTrends = data.trends.every(
		(trend: any) =>
			typeof trend === "object" &&
			typeof trend.id === "string" &&
			typeof trend.annee === "number" &&
			typeof trend.tauxCroissance === "number" &&
			typeof trend.variationDemande === "number"
	);

	// Valider la structure des marketNumbers
	const isValidMarketNumbers = data.marketNumbers.every(
		(number: any) =>
			typeof number === "object" &&
			typeof number.id === "string" &&
			typeof number.value === "string" &&
			typeof number.title === "string" &&
			typeof number.description === "string" &&
			typeof number.referenceLink === "string"
	);

	return isValidTrends && isValidMarketNumbers;
}
