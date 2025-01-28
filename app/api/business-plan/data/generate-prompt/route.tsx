// app/api/business-plan/data/generate-prompt/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { prisma } from "@/lib/prisma";
import { formatBusinessPlanData } from "@/lib/business-plan/prompt/formatBusinessPlanData";
import { replacePlaceholders } from "@/lib/business-plan/prompt/replacePlaceholders";

export async function GET() {
	try {
		// 1. Obtenir l'utilisateur
		const user = await getUserFromSession();
		if (!user) {
			return NextResponse.json(
				{ error: "Non autorisé" },
				{ status: 401 }
			);
		}

		// 2. Récupérer les données de l'utilisateur
		const userData = await prisma.user.findUnique({
			where: { auth0Id: user.sub },
			include: {
				swotAnalysis: true,
				ansoffAnalysis: true,
				canvasAnalysis: true,
			},
		});

		if (!userData) {
			return NextResponse.json(
				{ error: "Utilisateur non trouvé" },
				{ status: 404 }
			);
		}

		// 3. Lire le template
		const templatePath = path.join(
			process.cwd(),
			"data",
			"business-plan-template.txt"
		);
		const template = await fs.readFile(templatePath, "utf-8");

		// 4. Formater les données
		const businessPlanData = {
			swot: userData.swotAnalysis?.data,
			ansoff: userData.ansoffAnalysis?.data,
			canvas: userData.canvasAnalysis?.data,
		};

		const formattedData = formatBusinessPlanData(businessPlanData);

		// 5. Remplacer les placeholders
		const prompt = replacePlaceholders(template, formattedData);

		return NextResponse.json({ prompt });
	} catch (error) {
		console.error("Erreur lors de la génération du prompt:", error);
		return NextResponse.json(
			{ error: "Erreur serveur interne" },
			{ status: 500 }
		);
	}
}
