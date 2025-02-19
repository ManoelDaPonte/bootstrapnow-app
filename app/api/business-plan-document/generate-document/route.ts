// app/api/business-plan-document/generate-document/route.ts
import { NextResponse } from "next/server";
import { DocumentGenerator } from "@/lib/business-plan-document/documentGenerator";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    console.log("Début de la génération du document");
    const { auth0Id, generationId } = await req.json();

    if (!auth0Id || !generationId) {
      return NextResponse.json(
        { error: "auth0Id et generationId sont requis" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { auth0Id },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // 1. Récupérer les sections générées depuis la base de données
    const generatedContent = await prisma.documentGeneration.findFirst({
      where: {
        id: generationId,
        userId: user.id,
        status: "completed",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!generatedContent) {
      return NextResponse.json(
        { error: "Aucun contenu généré trouvé" },
        { status: 404 }
      );
    }

    // 2. Initialiser le générateur de document
    const generator = new DocumentGenerator(
      process.env.AZURE_STORAGE_CONNECTION_STRING!
    );

    // 3. Générer le document en passant auth0Id
    const docBuffer = await generator.generateDocument(
      generatedContent.sections as Record<string, string>,
      auth0Id
    );

    // 4. Sauvegarder dans Azure et obtenir l'URL
    const docxUrl = await generator.saveDocument(auth0Id, docBuffer);

    // 5. Mettre à jour la base de données avec l'URL
    await prisma.documentGeneration.update({
      where: { id: generatedContent.id },
      data: {
        docxUrl,
        status: "completed",
      },
    });

    return NextResponse.json({ docxUrl });
  } catch (error) {
    console.error("Erreur de génération du document:", error);
    return NextResponse.json(
      { error: "Échec de la génération du document" },
      { status: 500 }
    );
  }
}