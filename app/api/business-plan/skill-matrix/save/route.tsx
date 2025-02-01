import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { updateSkillMatrixData } from "@/lib/business-plan/hooks/skills-matrix/storage-skills-matrix";
import { Person, Domain } from "@/types/skill-matrix";

interface SkillMatrixData {
	people: Person[];
	domains: Domain[];
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

		const { data, qaResponses } = body;

		// Vérification des données avant sauvegarde
		if (!validateSkillMatrixData(data)) {
			return NextResponse.json(
				{ error: "Structure Skills Matrix invalide" },
				{ status: 400 }
			);
		}

		const result = await updateSkillMatrixData(user.sub, data, qaResponses);

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
): body is { data: SkillMatrixData; qaResponses: Record<string, string> } {
	return (
		typeof body === "object" &&
		body !== null &&
		"data" in body &&
		"qaResponses" in body &&
		typeof body.qaResponses === "object"
	);
}

function validateSkillMatrixData(data: any): boolean {
	if (!data || typeof data !== "object") return false;
	if (!Array.isArray(data.people) || !Array.isArray(data.domains))
		return false;

	// Valider la structure de chaque personne
	const isValidPeople = data.people.every(
		(person: any) =>
			typeof person === "object" &&
			typeof person.id === "string" &&
			typeof person.name === "string" &&
			typeof person.skills === "object"
	);

	// Valider la structure de chaque domaine
	const isValidDomains = data.domains.every(
		(domain: any) =>
			typeof domain === "object" &&
			typeof domain.id === "string" &&
			typeof domain.name === "string"
	);

	return isValidPeople && isValidDomains;
}
