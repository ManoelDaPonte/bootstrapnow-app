// app/api/business-plan/profit-loss/save/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { updateProfitLossData } from "@/lib/business-plan/hooks/3-years/storage-profit-loss";
import { ProfitLossData } from "@/types/profit-loss";

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
		console.log("Corps de la requête reçu:", JSON.stringify(body, null, 2));

		// Validation du corps de la requête
		if (!isValidRequestBody(body)) {
			console.log("Validation du corps de la requête échouée");
			return NextResponse.json(
				{ error: "Format de données invalide" },
				{ status: 400 }
			);
		}

		const { data } = body;

		// Vérification des données avant sauvegarde
		if (!validateProfitLossData(data)) {
			console.log("Validation des données profit/loss échouée");
			return NextResponse.json(
				{ error: "Structure profit/loss invalide" },
				{ status: 400 }
			);
		}

		const result = await updateProfitLossData(user.sub, data);

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

function isValidRequestBody(body: any): body is { data: ProfitLossData } {
	return (
		typeof body === "object" &&
		body !== null &&
		"data" in body &&
		typeof body.data === "object" &&
		body.data !== null &&
		"revenue" in body.data &&
		"expenses" in body.data &&
		Array.isArray(body.data.revenue) &&
		Array.isArray(body.data.expenses)
	);
}

function validateProfitLossData(data: any): boolean {
	if (typeof data !== "object" || data === null) {
		console.log("Les données ne sont pas un objet valide");
		return false;
	}

	const requiredCategories = ["revenue", "expenses"];
	const requiredYears = ["Year 1", "Year 2", "Year 3"];

	// Vérifier la structure de base
	const hasValidCategories = requiredCategories.every((category) =>
		Array.isArray(data[category])
	);

	if (!hasValidCategories) {
		console.log("Les catégories requises ne sont pas des tableaux valides");
		return false;
	}

	// Vérifier chaque catégorie
	return requiredCategories.every((category) =>
		data[category].every((entry: any, index: number) => {
			// Vérifier l'ID
			if (typeof entry.id !== "string" && typeof entry.id !== "number") {
				console.log(`ID invalide dans ${category}[${index}]`);
				return false;
			}

			// Vérifier la catégorie
			if (typeof entry.category !== "string") {
				console.log(`Catégorie invalide dans ${category}[${index}]`);
				return false;
			}

			// Vérifier les années
			return requiredYears.every((year) => {
				const yearValue = entry[year];
				const isValid = typeof yearValue === "number";
				if (!isValid) {
					console.log(
						`Valeur invalide pour ${year} dans ${category}[${index}]:`,
						yearValue
					);
				}
				return isValid;
			});
		})
	);
}
