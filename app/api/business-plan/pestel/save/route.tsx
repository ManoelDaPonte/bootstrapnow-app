// app/api/business-plan/pestel/save/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { updatePestelData } from "@/lib/business-plan/pestel/storage-pestel";
import { PestelData } from "@/types/pestel";

export async function POST(request: Request) {
	try {
		const user = await getUserFromSession();
		if (!user?.sub) {
			return NextResponse.json(
				{ error: "Non autorisé" },
				{ status: 401 }
			);
		}

		const data = (await request.json()) as PestelData;
		const result = await updatePestelData(user.sub, data);

		return NextResponse.json({ success: true, data: result });
	} catch (error) {
		console.error("Erreur lors de la sauvegarde:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la sauvegarde" },
			{ status: 500 }
		);
	}
}
