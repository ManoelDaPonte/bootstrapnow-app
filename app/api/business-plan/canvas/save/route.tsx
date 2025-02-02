// app/api/business-plan/canvas/save/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { updateCanvasData } from "@/lib/business-plan/hooks/canvas/storage-canvas";
import { CanvasData } from "@/types/canvas";
import { QAResponses } from "@/types/shared/qa-section";

export async function POST(request: Request) {
	try {
		const user = await getUserFromSession();
		if (!user?.sub) {
			return NextResponse.json(
				{ error: "Non autorisé" },
				{ status: 401 }
			);
		}

		let body;
		try {
			body = await request.json();
		} catch (parseError) {
			return NextResponse.json(
				{ error: "Données JSON invalides" },
				{ status: 400 }
			);
		}

		const { data, qaResponses } = body;
		const result = await updateCanvasData(user.sub, data, qaResponses);

		return NextResponse.json({
			success: true,
			data: result,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Erreur serveur:", error);
		return NextResponse.json(
			{
				error: "Erreur serveur",
				details:
					process.env.NODE_ENV === "development" ? error : undefined,
			},
			{ status: 500 }
		);
	}
}
