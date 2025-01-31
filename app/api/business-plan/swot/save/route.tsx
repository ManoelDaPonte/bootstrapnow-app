// app/api/business-plan/swot/save/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { updateSwotData } from "@/lib/business-plan/hooks/swot/storage-swot";
import { SwotData } from "@/types/swot";

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

		// Validation du corps de la requête
		if (!isValidRequestBody(body)) {
			return NextResponse.json(
				{ error: "Format de données invalide" },
				{ status: 400 }
			);
		}

		const { data, qaResponses } = body;

		// Vérification des données avant sauvegarde
		if (!validateSwotData(data)) {
			return NextResponse.json(
				{ error: "Structure SWOT invalide" },
				{ status: 400 }
			);
		}

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

function isValidRequestBody(
	body: any
): body is { data: SwotData; qaResponses: Record<string, string> } {
	return (
		typeof body === "object" &&
		body !== null &&
		"data" in body &&
		"qaResponses" in body &&
		typeof body.qaResponses === "object"
	);
}

function validateSwotData(data: any): boolean {
	if (typeof data !== "object" || data === null) return false;

	const requiredCategories = [
		"strengths",
		"weaknesses",
		"opportunities",
		"threats",
	];

	// Vérifier la structure de base
	const hasAllCategories = requiredCategories.every(
		(category) => category in data && Array.isArray(data[category])
	);

	if (!hasAllCategories) return false;

	// Vérifier la structure de chaque carte
	return requiredCategories.every((category) =>
		data[category].every(
			(card: any) =>
				typeof card === "object" &&
				card !== null &&
				typeof card.id === "number" &&
				typeof card.title === "string" &&
				typeof card.description === "string"
		)
	);
}
