// app/api/openai/check-sections/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { DataTracker } from "@/lib/tracking/DataTracker";
import { DataMapper } from "@/lib/openai/generators/DataMapper";
import { format_all_analyses } from "@/lib/openai/formatters";

export async function POST(request: Request) {
	try {
		// Au début de la route
		// console.log("DATABASE_URL configured:", !!process.env.DATABASE_URL);

		const { auth0Id, sections } = await request.json();
		// console.log("Checking sections for auth0Id:", auth0Id);
		// console.log("Sections to check:", sections);

		// Récupérer l'ID utilisateur
		const user = await prisma.user.findUnique({
			where: { auth0Id },
			select: { id: true },
		});
		// console.log("User found:", !!user, user?.id);

		if (!user) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}
		const dbTest = await prisma.$queryRaw`SELECT NOW()`;
		// console.log("Database connection test:", dbTest);

		const dataTracker = new DataTracker();
		const mapper = new DataMapper(process.env.DATABASE_URL || "");

		// console.log("Getting user analyses...");
		const analyses = await mapper.getUserAnalyses(auth0Id);
		// console.log("Analyses retrieved:", Object.keys(analyses));

		// Récupérer et formater les analyses
		const analysesFormatted = format_all_analyses(analyses);

		// Récupérer toutes les métadonnées de section en une seule requête
		const allMetadata = await prisma.sectionMetadata.findMany({
			where: {
				userId: user.id,
				sectionName: {
					in: sections,
				},
			},
		});

		const sectionsStatus = await Promise.all(
			sections.map(async (section: string) => {
				const metadata = allMetadata.find(
					(m) => m.sectionName === section
				);

				// Vérifier que le contenu ET les signatures sont valides
				const hasValidContent =
					metadata?.generatedContent &&
					metadata.generatedContent.length > 0;
				const hasValidSignatures =
					metadata?.dataSignatures &&
					Array.isArray(metadata.dataSignatures) &&
					metadata.dataSignatures.length > 0;

				// Vérifier si les données source ont changé
				const shouldRegenerate =
					!hasValidContent ||
					!hasValidSignatures ||
					(await dataTracker.shouldRegenerateSection(
						user.id,
						section,
						analysesFormatted
					));

				return {
					section,
					hasExistingContent: hasValidContent && hasValidSignatures,
					lastGenerated: metadata?.lastGenerated,
					shouldRegenerate,
					currentSignatures: metadata?.dataSignatures || [],
				};
			})
		);

		console.log("Statut final des sections:", sectionsStatus);

		return NextResponse.json({
			sectionsStatus,
			analysesData: {
				hasChanges: sectionsStatus.some((s) => s.shouldRegenerate),
				sections: sectionsStatus,
			},
		});
	} catch (error) {
		console.error("Error checking sections:", error);
		return NextResponse.json(
			{ error: "Failed to check sections" },
			{ status: 500 }
		);
	}
}
