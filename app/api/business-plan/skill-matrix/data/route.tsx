// app/api/business-plan/skill-matrix/data/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { prisma } from "@/lib/prisma";

export async function GET() {
	try {
		const user = await getUserFromSession();
		if (!user) {
			return NextResponse.json(
				{ error: "Utilisateur non trouvé" },
				{ status: 404 }
			);
		}

		// Récupérer les données de l'utilisateur
		const userData = await prisma.user.findUnique({
			where: { auth0Id: user.sub },
			include: { skillMatrix: true },
		});

		if (!userData?.skillMatrix) {
			return NextResponse.json({
				people: [],
				domains: [],
			});
		}

		return NextResponse.json(userData.skillMatrix.data);
	} catch (error) {
		console.error("Erreur lors de la récupération:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la récupération" },
			{ status: 500 }
		);
	}
}
