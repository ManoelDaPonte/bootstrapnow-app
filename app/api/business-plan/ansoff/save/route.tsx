// app/api/business-plan/ansoff/save/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { updateAnsoffData } from "@/lib/business-plan/hooks/ansoff/storage-ansoff";
import { AnsoffData } from "@/types/ansoff";

export async function POST(request: Request) {
	try {
		const user = await getUserFromSession();
		if (!user?.sub) {
			return NextResponse.json(
				{ error: "Not authenticated" },
				{ status: 401 }
			);
		}

		const body = await request.json();

		// Request body validation
		if (!isValidRequestBody(body)) {
			return NextResponse.json(
				{ error: "Invalid data format" },
				{ status: 400 }
			);
		}

		const { data, qaResponses } = body;

		// Data validation before save
		if (!validateAnsoffData(data)) {
			return NextResponse.json(
				{ error: "Invalid Ansoff structure" },
				{ status: 400 }
			);
		}

		const result = await updateAnsoffData(user.sub, data, qaResponses);

		return NextResponse.json({
			success: true,
			data: result,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Error during save:", error);
		return NextResponse.json(
			{
				error: "Server error during save",
				details:
					process.env.NODE_ENV === "development" ? error : undefined,
			},
			{ status: 500 }
		);
	}
}

function isValidRequestBody(
	body: any
): body is { data: AnsoffData; qaResponses: Record<string, string> } {
	return (
		typeof body === "object" &&
		body !== null &&
		"data" in body &&
		"qaResponses" in body &&
		typeof body.qaResponses === "object"
	);
}

function validateAnsoffData(data: any): boolean {
	if (typeof data !== "object" || data === null) return false;

	const requiredCategories = [
		"penetration",
		"development_market",
		"development_product",
		"diversification",
	];

	// Structure de base
	const hasAllCategories = requiredCategories.every(
		(category) => category in data && Array.isArray(data[category])
	);

	if (!hasAllCategories) return false;

	// Validation des cartes
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
