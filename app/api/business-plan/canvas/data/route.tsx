// app/api/business-plan/canvas/data/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { prisma } from "@/lib/db/prisma";
import { getEmptyCanvasData } from "@/lib/business-plan/hooks/canvas/storage-canvas";

function validateCanvasData(data: any) {
	const requiredKeys = [
		"keyPartners",
		"keyActivities",
		"keyResources",
		"valueProposition",
		"customerRelationships",
		"channels",
		"customerSegments",
		"costStructure",
		"revenueStreams",
	];

	if (!data || typeof data !== "object") return false;

	return requiredKeys.every((key) => {
		return (
			Array.isArray(data[key]) &&
			data[key].every(
				(item: any) =>
					typeof item === "object" &&
					typeof item.id === "number" &&
					typeof item.title === "string" &&
					typeof item.description === "string"
			)
		);
	});
}

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
			include: { canvasAnalysis: true },
		});

		// Structure par défaut
		const defaultData = {
			data: getEmptyCanvasData(),
			qaResponses: {},
		};

		if (!userData?.canvasAnalysis) {
			return NextResponse.json(defaultData);
		}

		// Validation des données récupérées
		const rawData = userData.canvasAnalysis.data;
		const rawQAResponses = userData.canvasAnalysis.qaResponses;

		if (!validateCanvasData(rawData)) {
			console.error("Données Canvas invalides en base:", rawData);
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
