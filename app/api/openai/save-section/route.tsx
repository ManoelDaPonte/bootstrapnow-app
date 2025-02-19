// app/api/openai/save-sections/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
	try {
		const { auth0Id, sections } = await req.json();

		if (!auth0Id || !sections) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		// Récupérer l'ID utilisateur interne
		const user = await prisma.user.findUnique({
			where: { auth0Id },
			select: { id: true },
		});

		if (!user) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

		// Créer ou mettre à jour la génération de document
		const documentGeneration = await prisma.documentGeneration.create({
			data: {
				userId: user.id,
				status: "completed", // Changé de "pending" à "completed"
				sections: sections,
				expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
			},
		});

		return NextResponse.json({
			success: true,
			generationId: documentGeneration.id,
		});
	} catch (error) {
		console.error("Error saving sections:", error);
		return NextResponse.json(
			{ error: "Failed to save sections" },
			{ status: 500 }
		);
	}
}
