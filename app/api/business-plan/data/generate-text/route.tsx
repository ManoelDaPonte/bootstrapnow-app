// app/api/business-plan/data/generate-text/route.tsx
import { NextResponse } from "next/server";
import { openai } from "@/lib/openai/config";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
	try {
		// 1. Vérifier l'authentification
		const user = await getUserFromSession();
		if (!user) {
			return NextResponse.json(
				{ error: "Non autorisé" },
				{ status: 401 }
			);
		}

		// 2. Récupérer le prompt du body
		const { prompt } = await request.json();
		if (!prompt) {
			return NextResponse.json(
				{ error: "Le prompt est requis" },
				{ status: 400 }
			);
		}

		// 3. Appeler l'API OpenAI
		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content:
						"Vous êtes un expert en business plan et en stratégie d'entreprise. Votre tâche est d'analyser les informations fournies et de générer un business plan détaillé et professionnel en français.",
				},
				{
					role: "user",
					content: prompt,
				},
			],
			temperature: 0.7,
			max_tokens: 4000,
		});

		const generatedContent =
			completion.choices[0]?.message?.content || "Aucun contenu généré";

		// 4. Récupérer l'ID utilisateur depuis Prisma
		const dbUser = await prisma.user.findUnique({
			where: {
				auth0Id: user.sub,
			},
		});

		if (!dbUser) {
			return NextResponse.json(
				{ error: "Utilisateur non trouvé dans la base de données" },
				{ status: 404 }
			);
		}

		// 5. Sauvegarder le résultat dans la base de données
		const savedPlan = await prisma.generatedBusinessPlan.create({
			data: {
				userId: dbUser.id, // Utiliser l'ID de la base de données, pas l'auth0Id
				content: generatedContent,
				prompt: prompt,
				status: "draft",
			},
		});

		// 6. Retourner la réponse
		return NextResponse.json({
			text: generatedContent,
			planId: savedPlan.id,
			status: "success",
		});
	} catch (error) {
		console.error("Erreur lors de la génération du texte:", error);

		// Retourner une réponse d'erreur correctement formatée
		return NextResponse.json(
			{ error: "Erreur serveur interne" },
			{ status: 500 }
		);
	}
}
