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

		const data = (await request.json()) as CanvasData;
		const result = await updateCanvasData(user.sub, data);

		return NextResponse.json({ success: true, data: result });
	} catch (error) {
		console.error("Erreur lors de la sauvegarde:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la sauvegarde" },
			{ status: 500 }
		);
	}
}
