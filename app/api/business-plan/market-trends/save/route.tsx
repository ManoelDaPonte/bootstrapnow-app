import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { updateMarketTrendsData } from "@/lib/business-plan/hooks/market-trends/storage-market-trends";
import { TrendEntry, MarketNumber } from "@/types/market-trends";

interface MarketTrendsData {
	trends: TrendEntry[];
	marketNumbers: MarketNumber[];
}

export async function POST(request: Request) {
	try {
		const user = await getUserFromSession();
		if (!user?.sub) {
			return NextResponse.json(
				{ error: "Non authentifié" },
				{ status: 401 }
			);
		}

		const body = await request.json();

		// Validation du corps de la requête
		if (!isValidRequestBody(body)) {
			return NextResponse.json(
				{ error: "Format de données invalide" },
				{ status: 400 }
			);
		}

		const { data } = body;

		// Vérification des données avant sauvegarde
		if (!validateMarketTrendsData(data)) {
			return NextResponse.json(
				{ error: "Structure Market Trends invalide" },
				{ status: 400 }
			);
		}

		const result = await updateMarketTrendsData(user.sub, data);

		return NextResponse.json({
			success: true,
			data: result,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Erreur lors de la sauvegarde:", error);
		return NextResponse.json(
			{
				error: "Erreur serveur lors de la sauvegarde",
				details:
					process.env.NODE_ENV === "development" ? error : undefined,
			},
			{ status: 500 }
		);
	}
}

function isValidRequestBody(body: any): body is { data: MarketTrendsData } {
	return typeof body === "object" && body !== null && "data" in body;
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
