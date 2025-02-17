// app/api/business-plan-document/history/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const auth0Id = searchParams.get("auth0Id");

		if (!auth0Id) {
			return NextResponse.json(
				{ error: "auth0Id est requis" },
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

		// Récupérer les 10 dernières générations
		const generations = await prisma.documentGeneration.findMany({
			where: {
				userId: user.id,
			},
			select: {
				id: true,
				status: true,
				docxUrl: true,
				createdAt: true,
			},
			orderBy: {
				createdAt: "desc",
			},
			take: 10,
		});

		return NextResponse.json(generations);
	} catch (error) {
		console.error("Erreur lors de la récupération de l'historique:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
