// app/api/business-plan/funnel-chart/data/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { prisma } from "@/lib/db/prisma";
import { INITIAL_SECTIONS } from "@/lib/business-plan/hooks/funnel-chart/storage-funnel-chart";

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
			include: { funnelChartAnalysis: true },
		});

		// Structure par défaut
		const defaultData = {
			data: INITIAL_SECTIONS,
			qaResponses: {},
		};

		if (!userData?.funnelChartAnalysis) {
			return NextResponse.json(defaultData);
		}

		// Validation des données récupérées
		const rawData = userData.funnelChartAnalysis.data;
		const rawQAResponses = userData.funnelChartAnalysis.qaResponses;

		// Vérification de base de la structure des données
		if (!Array.isArray(rawData)) {
			console.error("Données Funnel Chart invalides en base:", rawData);
			return NextResponse.json(defaultData);
		}

		return NextResponse.json({
			data: rawData,
			qaResponses: rawQAResponses || {},
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
