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
	console.log("Données à valider:", JSON.stringify(data, null, 2));

	if (typeof data !== "object" || data === null) {
		console.log("Les données ne sont pas un objet valide");
		return false;
	}

	const requiredCategories = ["revenue", "expenses"];

	// Vérifier la structure de base
	const hasValidCategories = requiredCategories.every((category) =>
		Array.isArray(data[category])
	);

	if (!hasValidCategories) {
		console.log("Les catégories requises ne sont pas des tableaux valides");
		return false;
	}

	// Vérifier chaque catégorie
	return requiredCategories.every((category) => {
		const entries = data[category];
		return entries.every((entry: any, index: number) => {
			console.log(
				`Validation de l'entrée ${index} dans ${category}:`,
				entry
			);

			// Vérifier l'ID
			const hasValidId =
				typeof entry.id === "string" || typeof entry.id === "number";
			if (!hasValidId) {
				console.log(`ID invalide dans ${category}[${index}]`);
				return false;
			}

			// Vérifier la catégorie
			const hasValidCategory = typeof entry.category === "string";
			if (!hasValidCategory) {
				console.log(`Catégorie invalide dans ${category}[${index}]`);
				return false;
			}

			// Vérifier les mois
			const months = [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec",
			];

			for (const month of months) {
				const monthValue = entry[month];
				if (typeof monthValue !== "number") {
					console.log(
						`Valeur invalide pour ${month} dans ${category}[${index}]:`,
						monthValue
					);
					return false;
				}
			}

			return true;
		});
	});
}
