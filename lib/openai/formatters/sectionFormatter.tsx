// lib/openai/formatters/sectionFormatter.ts
import { BUSINESS_PLAN_SECTIONS } from "../config/sections";
import { FormattedAnalyses } from "@/types/openai/analyzers";

export function create_section_prompt(
	analysesFormatted: FormattedAnalyses,
	sectionName: string
): string {
	const sectionConfig =
		BUSINESS_PLAN_SECTIONS[
			sectionName as keyof typeof BUSINESS_PLAN_SECTIONS
		];
	if (!sectionConfig) {
		throw new Error(`Section '${sectionName}' non trouvée`);
	}

	console.log("=== DEBUG create_section_prompt ===");
	console.log("Section name:", sectionName);
	console.log("Available analyses:", Object.keys(analysesFormatted));

	const selectedContent = [];

	// On type explicitement le tuple pour éviter les problèmes avec Sql
	for (const [
		analysisType,
		sectionType,
		fieldName,
	] of sectionConfig.paths as [string, string, string][]) {
		console.log(
			`\nTrying to get content for: ${analysisType}.${sectionType}.${fieldName}`
		);
		const analysis = analysesFormatted[analysisType];
		if (!analysis) {
			console.log(
				`Analysis '${analysisType}' not found in formatted analyses`
			);
			continue;
		}

		let content = "";
		if (sectionType === "formatted_text") {
			content = analysis.formatted_text || "";
			console.log(`formatted_text content found:`, !!content);
		} else if (
			sectionType === "formatted_qa" &&
			analysis.formatted_qa &&
			fieldName in analysis.formatted_qa
		) {
			content = analysis.formatted_qa[fieldName];
			console.log(
				`formatted_qa content found for ${fieldName}:`,
				!!content
			);
		} else if (
			sectionType === "formatted_sections" &&
			analysis.formatted_sections &&
			fieldName in analysis.formatted_sections
		) {
			content = analysis.formatted_sections[fieldName];
			console.log(
				`formatted_sections content found for ${fieldName}:`,
				!!content
			);
		}
		if (!content) {
			console.log("Available sections:");
			if (analysis.formatted_sections) {
				console.log(
					"formatted_sections keys:",
					Object.keys(analysis.formatted_sections)
				);
			}
			if (analysis.formatted_qa) {
				console.log(
					"formatted_qa keys:",
					Object.keys(analysis.formatted_qa)
				);
			}
		}

		if (content) {
			selectedContent.push(
				`${String(analysisType).toUpperCase()} - ${String(
					fieldName
				)}:\n${content}`
			);
		}
	}
	console.log("\nFinal content sections count:", selectedContent.length);
	return selectedContent.join("\n\n");
}

export function combine_analyses_sections(
	analysesFormatted: FormattedAnalyses,
	paths: [string, string, string][]
): string {
	const sections = [];

	for (const [analysisType, sectionType, fieldName] of paths) {
		const analysis = analysesFormatted[analysisType];
		if (!analysis) continue;

		let content = "";
		if (sectionType === "formatted_text") {
			content = analysis.formatted_text || "";
		} else if (sectionType === "formatted_qa" && analysis.formatted_qa) {
			content = analysis.formatted_qa[fieldName] || "";
		} else if (
			sectionType === "formatted_sections" &&
			analysis.formatted_sections
		) {
			content = analysis.formatted_sections[fieldName] || "";
		}

		if (content) {
			sections.push(content);
		}
	}

	return sections.join("\n\n");
}
