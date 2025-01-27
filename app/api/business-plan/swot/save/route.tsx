// app/api/business-plan/swot/save/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { updateSwotData } from "@/lib/hooks/business-plan/swot/storage-swot";
import { SwotData } from "@/types/swot";

export async function POST(request: Request) {
	try {
		const user = await getUserFromSession();
		if (!user?.sub) {
			return NextResponse.json(
				{ error: "Non autorisé" },
				{ status: 401 }
			);
		}

		const data = (await request.json()) as SwotData;
		const result = await updateSwotData(user.sub, data);

		return NextResponse.json({ success: true, data: result });
	} catch (error) {
		console.error("Erreur lors de la sauvegarde:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la sauvegarde" },
			{ status: 500 }
		);
	}
}
