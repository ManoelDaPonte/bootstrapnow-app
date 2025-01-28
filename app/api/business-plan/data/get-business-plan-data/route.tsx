// app/api/business-plan/data/get-business-plan-data/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";

export async function GET() {
	try {
		const user = await getUserFromSession();

		if (!user) {
			return NextResponse.json(
				{ error: "Non autorisé" },
				{ status: 401 }
			);
		}

		// Récupérer l'utilisateur avec toutes ses analyses
		const userData = await prisma.user.findUnique({
			where: { auth0Id: user.sub },
			include: {
				swotAnalysis: true,
				ansoffAnalysis: true,
				pestelAnalysis: true,
				canvasAnalysis: true,
				marketingMixAnalysis: true,
				skillMatrix: true,
				valuePropositionAnalysis: true,
				funnelChartAnalysis: true,
			},
		});

		if (!userData) {
			return NextResponse.json(
				{ error: "Utilisateur non trouvé" },
				{ status: 404 }
			);
		}

		// Formater les données pour les rendre plus faciles à utiliser
		const businessPlanData = {
			swot: userData.swotAnalysis?.data || null,
			ansoff: userData.ansoffAnalysis?.data || null,
			pestel: userData.pestelAnalysis?.data || null,
			canvas: userData.canvasAnalysis?.data || null,
			marketingMix: userData.marketingMixAnalysis?.data || null,
			skillMatrix: userData.skillMatrix?.data || null,
			valueProposition: userData.valuePropositionAnalysis?.data || null,
			funnelChart: userData.funnelChartAnalysis?.data || null,
		};

		return NextResponse.json(businessPlanData);
	} catch (error) {
		console.error("Erreur lors de la récupération des données:", error);
		return NextResponse.json(
			{ error: "Erreur serveur interne" },
			{ status: 500 }
		);
	}
}
