// app/api/business-plan/canvas/save/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { updateCanvasData } from "@/lib/hooks/business-plan/canvas/storage-canvas";
import { CanvasData } from "@/types/canvas";

export async function POST(request: Request) {
	try {
		const user = await getUserFromSession();

		if (!user?.sub) {
			return NextResponse.json(
				{ error: "Non autorisé" },
				{ status: 401 }
			);
		}

		const rawData = await request.text();

		let data: CanvasData;
		try {
			data = JSON.parse(rawData);

			// Validation stricte de la structure CanvasData
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

			const isValidData = requiredKeys.every((key) =>
				Array.isArray(data[key as keyof CanvasData])
			);

			if (!isValidData) {
				return NextResponse.json(
					{ error: "Structure de données invalide" },
					{ status: 400 }
				);
			}
		} catch (parseError) {
			console.error("Erreur de parsing:", parseError);
			return NextResponse.json(
				{ error: "Données invalides", details: parseError },
				{ status: 400 }
			);
		}

		const result = await updateCanvasData(user.sub, data);
		return NextResponse.json({ success: true, data: result });
	} catch (error) {
		console.error("Erreur complète API:", error);
		return NextResponse.json(
			{
				error: "Erreur serveur",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}
