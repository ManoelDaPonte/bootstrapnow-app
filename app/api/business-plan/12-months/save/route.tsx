// app/api/business-plan/12-months/save/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { updateProfitLossData } from "@/lib/business-plan/hooks/12-months/storage-12-months";
import { ProfitLossData } from "@/types/12-months";
import { QAResponses } from "@/types/shared/qa-section";

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

		if (!isValidRequestBody(body)) {
			return NextResponse.json(
				{ error: "Format de données invalide" },
				{ status: 400 }
			);
		}

		const { data, qaResponses } = body;

		if (!validateProfitLossData(data)) {
			return NextResponse.json(
				{ error: "Structure profit/loss invalide" },
				{ status: 400 }
			);
		}

		const result = await updateProfitLossData(user.sub, data, qaResponses);

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
function isValidRequestBody(
	body: any
): body is { data: ProfitLossData; qaResponses: QAResponses } {
	return (
		typeof body === "object" &&
		body !== null &&
		"data" in body &&
		"qaResponses" in body &&
		typeof body.qaResponses === "object"
	);
}
function validateProfitLossData(data: any): boolean {
	if (typeof data !== "object" || data === null) return false;

	const requiredCategories = ["revenue", "expenses"];
	const months = Array.from({ length: 12 }, (_, i) => `M${i + 1}`); // Utiliser M1-M12 au lieu de Jan-Dec

	const hasValidCategories = requiredCategories.every((category) =>
		Array.isArray(data[category])
	);

	if (!hasValidCategories) return false;

	return requiredCategories.every((category) =>
		data[category].every((entry: any) => {
			const hasValidId =
				typeof entry.id === "string" || typeof entry.id === "number";
			const hasValidCategory = typeof entry.category === "string";
			const hasValidMonths = months.every((month) => {
				const value = entry[month];
				return (
					typeof value === "number" &&
					!isNaN(value) &&
					isFinite(value)
				);
			});

			return hasValidId && hasValidCategory && hasValidMonths;
		})
	);
}
