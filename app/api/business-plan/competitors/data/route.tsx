import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { prisma } from "@/lib/db/prisma";
import { getEmptyCompetitorsData } from "@/lib/business-plan/hooks/competitors/storage-competitors";

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
			include: { competitorsAnalysis: true },
		});

		if (!userData?.competitorsAnalysis) {
			return NextResponse.json({
				data: getEmptyCompetitorsData(),
			});
		}

		const rawData = userData.competitorsAnalysis.data;

		// Vérification que les données sont bien structurées
		const isValidData = validateCompetitorsData(rawData);
		if (!isValidData) {
			console.error("Données Competitors invalides en base:", rawData);
			return NextResponse.json({
				data: getEmptyCompetitorsData(),
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

function validateCompetitorsData(data: any): boolean {
	if (!data || typeof data !== "object") return false;
	if (!Array.isArray(data.competitors)) return false;

	return data.competitors.every(
		(comp: any) =>
			typeof comp === "object" &&
			typeof comp.id === "string" &&
			typeof comp.nom === "string" &&
			typeof comp.solution === "string" &&
			typeof comp.prix === "number" &&
			typeof comp.valeurPercue === "number" &&
			typeof comp.strategie === "string" &&
			typeof comp.zoneGeographique === "string" &&
			typeof comp.ciblageClient === "string" &&
			typeof comp.forces === "string" &&
			typeof comp.faiblesses === "string" &&
			typeof comp.impactDirect === "string" &&
			typeof comp.impactIndirect === "string"
	);
}
