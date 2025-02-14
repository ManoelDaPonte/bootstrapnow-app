// app/api/test-analyzers/route.ts
import { DataMapper } from "@/lib/openai/generators/DataMapper";
import { format_all_analyses } from "@/lib/openai/formatters";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { auth0Id } = await req.json();

		if (!auth0Id) {
			return NextResponse.json(
				{ error: "auth0Id is required" },
				{ status: 400 }
			);
		}

		const mapper = new DataMapper(process.env.DATABASE_URL || "");
		const analyses = await mapper.getUserAnalyses(auth0Id);
		const formattedAnalyses = format_all_analyses(analyses);

		// Préparer les résultats pour chaque type d'analyse
		const results = Object.entries(formattedAnalyses).map(
			([analysisType, analysis]) => {
				const stats = {
					type: analysisType,
					hasSections:
						!!analysis.formatted_sections &&
						Object.keys(analysis.formatted_sections).length > 0,
					hasQA:
						!!analysis.formatted_qa &&
						Object.keys(analysis.formatted_qa).length > 0,
					textLength: analysis.formatted_text?.length || 0,
					sectionsCount: Object.keys(
						analysis.formatted_sections || {}
					).length,
					qaCount: Object.keys(analysis.formatted_qa || {}).length,
					formatted_text: analysis.formatted_text,
					sections: Object.keys(analysis.formatted_sections || {}),
					qa: Object.keys(analysis.formatted_qa || {}),
				};

				return stats;
			}
		);

		return NextResponse.json({ results });
	} catch (error) {
		console.error("Error in test-analyzers:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
