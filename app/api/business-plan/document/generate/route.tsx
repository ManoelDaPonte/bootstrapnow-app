import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import { GenerationService } from "@/lib/business-plan/document/GenerationService";
import { DocxToPdfConverter } from "@/lib/business-plan/document/DocxToPdfConverter";

export async function POST(req: Request) {
	try {
		const session = await getSession();
		if (!session?.user) {
			return NextResponse.json(
				{ error: "Non authentifié" },
				{ status: 401 }
			);
		}

		const { format = "docx" } = await req.json();
		const encoder = new TextEncoder();
		const stream = new TransformStream();
		const writer = stream.writable.getWriter();

		const sendEvent = async (event: string, data: any) => {
			console.log("Envoi événement:", event, data);
			await writer.write(
				encoder.encode(
					`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
				)
			);
		};

		// Initialisation du service avec plus de logging
		console.log("Initialisation du service de génération");
		const generationService = new GenerationService(
			process.env.DATABASE_URL!,
			process.env.OPENAI_API_KEY!
		);

		try {
			const buffer = await generationService.generateBusinessPlan(
				session.user.sub,
				{
					onStepChange: async (step) =>
						sendEvent("stepChange", { step }),
					onSectionChange: async (section) =>
						sendEvent("sectionChange", { section }),
					onProgressUpdate: async (progress) =>
						sendEvent("progress", { progress }),
				}
			);

			let finalBuffer = buffer;
			if (format === "pdf") {
				const converter = new DocxToPdfConverter();
				finalBuffer = await converter.convert(buffer);
			}

			// Encoder le buffer en base64 et l'envoyer
			await sendEvent("complete", {
				document: finalBuffer.toString("base64"),
				format,
			});
		} catch (error) {
			await sendEvent("error", {
				message:
					error instanceof Error
						? error.message
						: "Erreur de génération",
			});
		} finally {
			await writer.close();
		}

		return new Response(stream.readable, {
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				Connection: "keep-alive",
			},
		});
	} catch (error) {
		console.error("Erreur principale:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la génération" },
			{ status: 500 }
		);
	}
}
