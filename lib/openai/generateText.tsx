// lib/openai/generateText.ts
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function generateText(prompt: string) {
	const completion = await openai.chat.completions.create({
		model: "gpt-4",
		messages: [
			{
				role: "system",
				content:
					"Vous êtes un expert en business plan et stratégie d'entreprise.",
			},
			{
				role: "user",
				content: prompt,
			},
		],
		temperature: 0.7,
		max_tokens: 4000,
	});

	return completion.choices[0].message;
}
