// lib/openai/formatters/sectionFormatter.ts
import { BUSINESS_PLAN_SECTIONS } from "../config/sections";
import { FormattedAnalyses } from "@/types/openai/analyzers";
import { logger } from "@/lib/logger";

export function create_section_prompt(
	analysesFormatted: FormattedAnalyses,
	sectionName: string
): string {
	logger
		.setSection("Formatter")
		.info(`Création du prompt pour ${sectionName}`);
	const sectionConfig =
		BUSINESS_PLAN_SECTIONS[
			sectionName as keyof typeof BUSINESS_PLAN_SECTIONS
		];
	if (!sectionConfig) {
		logger.error(`Section non trouvée: ${sectionName}`);
		throw new Error(`Section '${sectionName}' non trouvée`);
	}

	const selectedContent = [];
	logger.debug(`Traitement de ${sectionConfig.paths.length} chemins`);

	// On type explicitement le tuple pour éviter les problèmes avec Sql
	for (const [
		analysisType,
		sectionType,
		fieldName,
	] of sectionConfig.paths as [string, string, string][]) {
		const analysis = analysesFormatted[analysisType];
		if (!analysis) {
			logger.debug(`Analyse non trouvée: ${analysisType}`);
			continue;
		}

		let content = "";
		if (sectionType === "formatted_text") {
			content = analysis.formatted_text || "";
		} else if (
			sectionType === "formatted_qa" &&
			analysis.formatted_qa &&
			fieldName in analysis.formatted_qa
		) {
			content = analysis.formatted_qa[fieldName];
		} else if (
			sectionType === "formatted_sections" &&
			analysis.formatted_sections &&
			fieldName in analysis.formatted_sections
		) {
			content = analysis.formatted_sections[fieldName];
		}
		if (!content) {
			if (analysis.formatted_sections) {
			}
			if (analysis.formatted_qa) {
			}
		}

		if (content) {
			selectedContent.push(
				`${String(analysisType).toUpperCase()} - ${String(
					fieldName
				)}:\n${content}`
			);
			logger.debug(`Contenu ajouté: ${analysisType}.${fieldName}`);
		}
	}
	logger.info(`Prompt créé avec ${selectedContent.length} sections`);
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
