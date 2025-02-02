// app/api/business-plan/startup-expenses/save/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { updateStartupData } from "@/lib/business-plan/hooks/startup-expenses/storage-startup";
import { FinancialData } from "@/types/startup-expenses";

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
		if (!validateStartupData(data)) {
			console.log("Validation des données startup échouée");
			return NextResponse.json(
				{ error: "Structure startup expenses invalide" },
				{ status: 400 }
			);
		}

		const result = await updateStartupData(user.sub, data);

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

function isValidRequestBody(body: any): body is { data: FinancialData } {
	return typeof body === "object" && body !== null && "data" in body;
}

function validateStartupData(data: any): boolean {
	if (typeof data !== "object" || data === null) {
		console.log("Les données ne sont pas un objet valide");
		return false;
	}

	// Vérifier la structure de base
	if (!data.capital || !data.expenses || !Array.isArray(data.risks)) {
		console.log("Structure de base invalide");
		return false;
	}

	// Vérifier la structure du capital
	if (
		!Array.isArray(data.capital.investors) ||
		!Array.isArray(data.capital.loans)
	) {
		console.log("Structure de capital invalide");
		return false;
	}

	// Vérifier la structure des dépenses
	if (!Array.isArray(data.expenses.categories)) {
		console.log("Structure de dépenses invalide");
		return false;
	}

	// Vérifier les entrées financières
	const validateFinancialEntry = (entry: any) => {
		const isValid =
			typeof entry.id === "string" &&
			typeof entry.name === "string" &&
			typeof entry.amount === "number" &&
			typeof entry.type === "string" &&
			(!entry.category || typeof entry.category === "string");
		if (!isValid) {
			console.log("Entrée financière invalide:", entry);
		}
		return isValid;
	};

	// Vérifier tous les tableaux d'entrées financières
	const validEntries =
		data.capital.investors.every(validateFinancialEntry) &&
		data.capital.loans.every(validateFinancialEntry) &&
		data.expenses.categories.every(validateFinancialEntry);

	if (!validEntries) {
		console.log("Validation des entrées financières échouée");
		return false;
	}

	// Vérifier les risques
	const validateRisk = (risk: any) => {
		const isValid =
			typeof risk.category === "string" &&
			typeof risk.probability === "number" &&
			typeof risk.impact === "number" &&
			typeof risk.mitigation === "string";
		if (!isValid) {
			console.log("Risque invalide:", risk);
		}
		return isValid;
	};

	if (!data.risks.every(validateRisk)) {
		console.log("Validation des risques échouée");
		return false;
	}

	return true;
}
