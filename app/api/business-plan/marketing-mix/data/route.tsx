// app/api/business-plan/marketing-mix/data/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { prisma } from "@/lib/db/prisma";
import { getEmptyMarketingMixData } from "@/lib/business-plan/hooks/marketing-mix/storage-marketing-mix";

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
			include: { marketingMixAnalysis: true },
		});

		// Structure de données vide par défaut
		const emptyData = {
			data: getEmptyMarketingMixData(),
			qaResponses: {},
		};

		if (!userData?.marketingMixAnalysis) {
			return NextResponse.json(emptyData);
		}

		// Validation des données récupérées
		const rawData = userData.marketingMixAnalysis.data;
		const rawQAResponses = userData.marketingMixAnalysis.qaResponses;

		return NextResponse.json({
			data: rawData,
			qaResponses: rawQAResponses,
		});
	} catch (error) {
		console.error("Erreur lors de la récupération:", error);
		return NextResponse.json(
			{
				error: "Erreur serveur lors de la récupération",
				details:
					process.env.NODE_ENV === "development" ? error : undefined,
			},
			{ status: 500 }
		);
	}
}
