// app/api/openai/generate-section/route.ts
import { NextResponse } from "next/server";
import { SectionGenerator } from "@/lib/openai/generators/SectionGenerator";
import { DataTracker } from "@/lib/tracking/DataTracker";
import { prisma } from "@/lib/db/prisma";
import { DataMapper } from "@/lib/openai/generators/DataMapper";
import { format_all_analyses } from "@/lib/openai/formatters";

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

		const { auth0Id, sectionName } = body;

		if (!auth0Id || !sectionName) {
			return NextResponse.json(
				{ error: "auth0Id et sectionName sont requis" },
				{ status: 400 }
			);
		}

		// 3. Récupération des données d'analyse
		const mapper = new DataMapper(databaseUrl);
		const analyses = await mapper.getUserAnalyses(auth0Id);
		const analysesFormatted = format_all_analyses(analyses);
		console.log(`Analyses récupérées pour ${sectionName}`, {
			analysisTypes: Object.keys(analyses),
			hasFormatted: Object.keys(analysesFormatted).length,
		});

		// 4. Génération de la section
		const generator = new SectionGenerator(databaseUrl, openaiApiKey);
		const result = await generator.generateSection(auth0Id, sectionName);

		// 5. Si la génération est réussie, mettre à jour les métadonnées
		if (result.generated_content) {
			const user = await prisma.user.findUnique({
				where: { auth0Id },
				select: { id: true },
			});

			if (user) {
				const dataTracker = new DataTracker();
				try {
					await dataTracker.updateSectionMetadata(
						user.id,
						sectionName,
						analysesFormatted,
						result.generated_content
					);
				} catch (error) {
					console.error(
						"Erreur lors de la mise à jour des métadonnées:",
						error
					);
					// Ne pas échouer la requête si la mise à jour des métadonnées échoue
				}
			}
			if (user) {
				console.log(`Métadonnées mises à jour pour ${sectionName}`, {
					timestamp: new Date().toISOString(),
					userId: user.id,
				});
			}
		}

		// 6. Log du succès
		console.log("Génération réussie:", {
			sectionName,
			contentLength: result.generated_content?.length,
		});

		return NextResponse.json({
			...result,
			analysesFormatted, // Inclure les analyses formatées dans la réponse
		});
	} catch (error) {
		console.error("Erreur dans la route API:", {
			error,
			stack: error instanceof Error ? error.stack : undefined,
		});

		const errorMessage =
			error instanceof Error ? error.message : "Une erreur est survenue";
		console.error(errorMessage);

		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
