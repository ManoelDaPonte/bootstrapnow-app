// app/api/business-plan/swot/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

interface RequestBody {
	prompt: string;
}

export async function POST(request: Request): Promise<Response> {
	try {
		const { prompt }: RequestBody = await request.json();

		if (!prompt) {
			return NextResponse.json(
				{ error: "Le prompt est requis pour l'analyse." },
				{ status: 400 }
			);
		}

		const openai = new OpenAI();

		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content: `En tant que consultant en stratégie d'entreprise expérimenté, votre mission est d'analyser
          minutieusement chaque élément de l'analyse SWOT fournie. Pour chaque point :

          1. Fournissez une analyse approfondie et contextuelle
          2. Identifiez les implications stratégiques
          3. Proposez des actions concrètes et réalisables
          4. Établissez des liens entre les différents éléments de l'analyse

          Votre réponse doit être structurée, professionnelle et orientée vers l'action.`,
				},
				{ role: "user", content: prompt },
			],
			max_tokens: 2048,
			temperature: 0.7,
		});

		const swotText = response.choices[0].message?.content?.trim() || "";

		return NextResponse.json({ swotText });
	} catch (error: any) {
		console.error("Erreur lors de la génération du SWOT :", error);
		return NextResponse.json(
			{
				error: "Une erreur est survenue lors de l'analyse. Veuillez réessayer.",
			},
			{ status: 500 }
		);
	}
}
