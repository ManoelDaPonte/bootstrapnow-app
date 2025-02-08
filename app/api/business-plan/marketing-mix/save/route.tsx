// app/api/business-plan/marketing-mix/save/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { updateMarketingMixData } from "@/lib/business-plan/hooks/marketing-mix/storage-marketing-mix";
export async function POST(request: Request) {
	try {
		const user = await getUserFromSession();
		if (!user?.sub) {
			return NextResponse.json(
				{ error: "Non autorisé" },
				{ status: 401 }
			);
		}

		const body = await request.json();

		const { data, qaResponses } = body;
		const result = await updateMarketingMixData(
			user.sub,
			data,
			qaResponses
		);

		return NextResponse.json({
			success: true,
			data: result,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Erreur lors de la sauvegarde:", error);
		return NextResponse.json(
			{
				error: "Erreur lors de la sauvegarde",
				details:
					process.env.NODE_ENV === "development" ? error : undefined,
			},
			{ status: 500 }
		);
	}
}
