// lib/openai/services/SectionContextService.ts

import { prisma } from "@/lib/db/prisma";
import { SECTION_ORDER } from "../config/section-order";
import {
	BusinessPlanSection,
	Status,
} from "@/types/business-plan-document/business-plan";
import { logger } from "@/lib/logger";

export interface SectionContext {
	sectionName: BusinessPlanSection;
	content: string;
	order: number;
	status?: Status;
}

export class SectionContextService {
	async getPreviousSectionsContext(
		auth0Id: string,
		currentSection: string
	): Promise<SectionContext[]> {
		logger.debug(`Récupération contexte pour section: ${currentSection}`);

		// D'abord récupérer le userId interne
		const user = await prisma.user.findUnique({
			where: { auth0Id },
			select: { id: true },
		});

		if (!user) {
			logger.error(`Utilisateur non trouvé pour auth0Id: ${auth0Id}`);
			return [];
		}

		const previousSections =
			SECTION_ORDER.getPreviousSections(currentSection);
		logger.debug(
			`Sections précédentes à chercher: ${previousSections.join(", ")}`
		);

		const sectionMetadata = await prisma.sectionMetadata.findMany({
			where: {
				userId: user.id, // Utiliser l'ID interne
				sectionName: {
					in: previousSections,
				},
			},
			select: {
				sectionName: true,
				generatedContent: true,
				version: true,
				lastGenerated: true,
			},
			orderBy: {
				lastGenerated: "desc",
			},
		});

		// Ajouter des logs pour le debug
		logger.debug(`Nombre de sections trouvées: ${sectionMetadata.length}`);
		sectionMetadata.forEach((metadata) => {
			logger.debug(`Section trouvée: ${metadata.sectionName}`);
		});

		return sectionMetadata
			.sort(
				(a, b) =>
					SECTION_ORDER.getIndex(a.sectionName) -
					SECTION_ORDER.getIndex(b.sectionName)
			)
			.map((metadata) => ({
				sectionName: metadata.sectionName as BusinessPlanSection,
				content: metadata.generatedContent,
				order: SECTION_ORDER.getIndex(metadata.sectionName) + 1,
			}));
	}

	formatContextForPrompt(contexts: SectionContext[]): string {
		if (contexts.length === 0) return "";

		logger.debug(`Formatage du contexte pour ${contexts.length} sections`);

		return (
			"\n\nContexte des sections précédentes:\n" +
			contexts
				.map((context) => {
					logger.debug(
						`Ajout du contexte pour la section ${context.sectionName}`
					);
					return `Section ${context.sectionName} (${context.order}/${SECTION_ORDER.sections.length}):\n${context.content}`;
				})
				.join("\n\n")
		);
	}
}
