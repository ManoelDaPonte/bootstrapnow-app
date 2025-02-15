// app/api/business-plan/document/download/route.ts
import { NextResponse } from "next/server";
import { getGeneratedDocument } from "@/lib/business-plan/document/GenerationService";
import { DocxToPdfConverter } from "@/lib/business-plan/document/DocxToPdfConverter";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const documentId = searchParams.get("id");
	const format = searchParams.get("format") || "docx";

	if (!documentId) {
		return NextResponse.json(
			{ error: "Document ID missing" },
			{ status: 400 }
		);
	}

	try {
		const documentBuffer = await getGeneratedDocument(documentId);

		if (format === "pdf") {
			const converter = new DocxToPdfConverter();
			const pdfBuffer = await converter.convert(documentBuffer);

			return new NextResponse(pdfBuffer, {
				headers: {
					"Content-Type": "application/pdf",
					"Content-Disposition":
						'attachment; filename="business-plan.pdf"',
				},
			});
		}

		return new NextResponse(documentBuffer, {
			headers: {
				"Content-Type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				"Content-Disposition":
					'attachment; filename="business-plan.docx"',
			},
		});
	} catch (error) {
		console.error("Error downloading document:", error);
		return NextResponse.json(
			{ error: "Error downloading document" },
			{ status: 500 }
		);
	}
}
