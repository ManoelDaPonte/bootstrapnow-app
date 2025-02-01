import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { prisma } from "@/lib/db/prisma";
import { getEmptySkillMatrixData } from "@/lib/business-plan/hooks/skills-matrix/storage-skills-matrix";

export async function GET() {
	try {
		const user = await getUserFromSession();
		if (!user) {
			return NextResponse.json(
				{ error: "Utilisateur non authentifié" },
				{ status: 401 }
			);
		}

		const userData = await prisma.user.findUnique({
			where: { auth0Id: user.sub },
			include: { skillMatrix: true },
		});

		// Si pas de données, retourner une structure vide mais valide
		const emptyData = {
			data: getEmptySkillMatrixData(),
			qaResponses: {},
		};

		if (!userData?.skillMatrix) {
			return NextResponse.json(emptyData);
		}

		// Validation des données
		const rawData = userData.skillMatrix.data;
		const rawQAResponses = userData.skillMatrix.qaResponses;

		// Vérification que les données sont bien structurées
		const isValidData = validateSkillMatrixData(rawData);
		if (!isValidData) {
			console.error("Données Skills Matrix invalides en base:", rawData);
			return NextResponse.json(emptyData);
		}

		return NextResponse.json({
			data: rawData,
			qaResponses: rawQAResponses,
		});
	} catch (error) {
		console.error("Erreur lors de la récupération:", error);
		return NextResponse.json(
			{ error: "Erreur serveur lors de la récupération" },
			{ status: 500 }
		);
	}
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
