// app/api/business-plan/swot/save/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { updateSwotData } from "@/lib/business-plan/hooks/swot/storage-swot";
export async function POST(request: Request) {
	try {
		const user = await getUserFromSession();
		if (!user?.sub) {
			return NextResponse.json(
				{ error: "Non authentifié" },
				{ status: 401 }
			);
		}

		const body = await request.json();
		const { data, qaResponses } = body;
		const result = await updateSwotData(user.sub, data, qaResponses);

		return NextResponse.json({
			success: true,
			data: result,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Erreur lors de la sauvegarde:", error);
		return NextResponse.json(
			{
				error: "Erreur serveur lors de la sauvegarde",
				details:
					process.env.NODE_ENV === "development" ? error : undefined,
			},
			{ status: 500 }
		);
	}
}
