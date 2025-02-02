import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { updateCompetitorsData } from "@/lib/business-plan/hooks/competitors/storage-competitors";
import { CompetitorEntry } from "@/types/competitors";

interface CompetitorsData {
	competitors: CompetitorEntry[];
}

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

		const { data } = body;

		// Vérification des données avant sauvegarde
		if (!validateCompetitorsData(data)) {
			return NextResponse.json(
				{ error: "Structure Competitors invalide" },
				{ status: 400 }
			);
		}

		const result = await updateCompetitorsData(user.sub, data);

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

function isValidRequestBody(body: any): body is { data: CompetitorsData } {
	return typeof body === "object" && body !== null && "data" in body;
}

function validateCompetitorsData(data: any): boolean {
	if (!data || typeof data !== "object") return false;
	if (!Array.isArray(data.competitors)) return false;

	return data.competitors.every(
		(comp: any) =>
			typeof comp === "object" &&
			typeof comp.id === "string" &&
			typeof comp.nom === "string" &&
			typeof comp.solution === "string" &&
			typeof comp.prix === "number" &&
			typeof comp.valeurPercue === "number" &&
			typeof comp.strategie === "string" &&
			typeof comp.zoneGeographique === "string" &&
			typeof comp.ciblageClient === "string" &&
			typeof comp.forces === "string" &&
			typeof comp.faiblesses === "string" &&
			typeof comp.impactDirect === "string" &&
			typeof comp.impactIndirect === "string"
	);
}
