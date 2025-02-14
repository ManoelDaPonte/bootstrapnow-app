// app/api/openai/generate-section/route.ts
import { NextResponse } from "next/server";
import { SectionGenerator } from "@/lib/openai/generators/SectionGenerator";

export async function POST(request: Request) {
	console.log("Début de la requête de génération");
	try {
		// 1. Validation des variables d'environnement
		const databaseUrl = process.env.DATABASE_URL;
		const openaiApiKey = process.env.OPENAI_API_KEY;

		if (!databaseUrl || !openaiApiKey) {
			throw new Error("Variables d'environnement manquantes");
		}

		// 2. Validation du corps de la requête
		const body = await request.json();
		console.log("Corps de la requête reçu:", {
			auth0Id: body.auth0Id,
			sectionName: body.sectionName,
		});

		const hasEnvVars = {
			databaseUrl: !!process.env.DATABASE_URL,
			openaiApiKey: !!process.env.OPENAI_API_KEY,
		};
		console.log("Variables d'environnement:", hasEnvVars);

		const { auth0Id, sectionName } = body;

		if (!auth0Id || !sectionName) {
			return NextResponse.json(
				{ error: "auth0Id et sectionName sont requis" },
				{ status: 400 }
			);
		}

		// 3. Génération de la section
		const generator = new SectionGenerator(databaseUrl, openaiApiKey);
		const result = await generator.generateSection(auth0Id, sectionName);

		// 4. Log du succès
		console.log(
			`Section générée pour l'utilisateur ${auth0Id}: ${sectionName}`
		);

		console.log("Génération réussie:", {
			sectionName: body.sectionName,
			contentLength: result.generated_content?.length,
		});

		return NextResponse.json(result);
	} catch (error) {
		console.error("Erreur dans la route API:", {
			error,
			stack: error instanceof Error ? error.stack : undefined,
		});

		// 5. Gestion des erreurs
		const errorMessage =
			error instanceof Error ? error.message : "Une erreur est survenue";
		console.error(errorMessage);

		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
