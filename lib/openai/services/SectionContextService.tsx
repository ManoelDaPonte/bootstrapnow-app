// lib/openai/services/SectionContextService.ts

import { prisma } from "@/lib/db/prisma";
import { SECTION_ORDER } from "../config/section-order";
import {
	BusinessPlanSection,
	Status,
} from "@/types/business-plan-document/business-plan";
import { BUSINESS_PLAN_SECTIONS } from "@/lib/openai/config/sections";
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

		// Récupérer le groupe de contexte de la section courante
		const config =
			BUSINESS_PLAN_SECTIONS[
				currentSection as keyof typeof BUSINESS_PLAN_SECTIONS
			];
		const currentGroup =
			"contextGroup" in config ? config.contextGroup : null;

		// Obtenir toutes les sections précédentes
		const previousSections =
			SECTION_ORDER.getPreviousSections(currentSection);

		// Filtrer les sections du même groupe
		const relevantSections = previousSections.filter((section) => {
			const sectionConfig =
				BUSINESS_PLAN_SECTIONS[
					section as keyof typeof BUSINESS_PLAN_SECTIONS
				];
			return (
				"contextGroup" in sectionConfig &&
				sectionConfig.contextGroup === currentGroup
			);
		});

		logger.debug(
			`Sections précédentes à chercher: ${relevantSections.join(", ")}`
		);

		const sectionMetadata = await prisma.sectionMetadata.findMany({
			where: {
				userId: user.id,
				sectionName: {
					in: relevantSections,
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
			"\n\nContenu déjà rédigé pour le business plan :\n" +
			contexts
				.map((context) => {
					logger.debug(
						`Ajout du contexte pour la section ${context.sectionName}`
					);
					return `${context.content}`;
				})
				.join("\n\n")
		);
	}
}
