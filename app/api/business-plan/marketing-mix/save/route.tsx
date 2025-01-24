// app/api/business-plan/marketing-mix/save/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { updateMarketingMixData } from "@/lib/business-plan/marketing-mix/storage-marketing-mix";
import { MarketingMixData } from "@/types/marketing-mix";

export async function POST(request: Request) {
	try {
		const user = await getUserFromSession();
		if (!user?.sub) {
			return NextResponse.json(
				{ error: "Non autorisé" },
				{ status: 401 }
			);
		}

		const data = (await request.json()) as MarketingMixData;
		const result = await updateMarketingMixData(user.sub, data);

		return NextResponse.json({ success: true, data: result });
	} catch (error) {
		console.error("Erreur lors de la sauvegarde:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la sauvegarde" },
			{ status: 500 }
		);
	}
}
