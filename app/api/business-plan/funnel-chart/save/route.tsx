// app/api/business-plan/funnel-chart/save/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { updateFunnelChartData } from "@/lib/business-plan/hooks/funnel-chart/storage-funnel-chart";
import { FunnelSection } from "@/types/funnel-chart";
import { QAResponses } from "@/types/shared/qa-section";

interface RequestBody {
	data: FunnelSection[];
	qaResponses: QAResponses;
}

function isValidRequestBody(body: any): body is RequestBody {
	return (
		body &&
		typeof body === "object" &&
		Array.isArray(body.data) &&
		body.data.every(
			(section: any) =>
				typeof section === "object" &&
				typeof section.id === "number" &&
				typeof section.title === "string" &&
				typeof section.size === "number" &&
				Array.isArray(section.cards) &&
				typeof section.color === "string"
		) &&
		(!body.qaResponses ||
			(typeof body.qaResponses === "object" &&
				Object.entries(body.qaResponses).every(
					([key, value]) =>
						typeof key === "string" && typeof value === "string"
				)))
	);
}

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

		if (!isValidRequestBody(body)) {
			return NextResponse.json(
				{ error: "Format de données invalide" },
				{ status: 400 }
			);
		}

		const { data, qaResponses } = body;
		const result = await updateFunnelChartData(user.sub, data, qaResponses);

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
