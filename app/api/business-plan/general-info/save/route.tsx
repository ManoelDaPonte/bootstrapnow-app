// app/api/business-plan/general-info/save/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
	try {
		const user = await getUserFromSession();
		if (!user?.sub) {
			return NextResponse.json(
				{ error: "Utilisateur non authentifié" },
				{ status: 401 }
			);
		}

		// D'abord, récupérer ou créer l'utilisateur
		const dbUser = await prisma.user.upsert({
			where: { auth0Id: user.sub },
			update: {},
			create: {
				auth0Id: user.sub,
				email: user.email || "",
			},
		});

		const data = await request.json();

		// Ensuite, mettre à jour les informations générales
		const result = await prisma.generalInfo.upsert({
			where: {
				userId: dbUser.id,
			},
			update: {
				data: data,
				updatedAt: new Date(),
			},
			create: {
				userId: dbUser.id,
				data: data,
			},
		});

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
					process.env.NODE_ENV === "development"
						? String(error)
						: undefined,
			},
			{ status: 500 }
		);
	}
}
