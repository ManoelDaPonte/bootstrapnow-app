// lib/tracking/DataTracker.ts
import crypto from "crypto";
import { prisma } from "@/lib/db/prisma";
import { BUSINESS_PLAN_SECTIONS } from "@/lib/openai/config/sections";
import { FormattedAnalyses } from "@/types/openai/analyzers";
import {
	DataSignature,
	StoredDataSignature,
	StoredDataSignatures,
} from "@/types/section-tracking";
import { logger } from "@/lib/logger";

export class DataTracker {
	private readonly CURRENT_VERSION = 12;

	private generateSignature(data: any): string {
		logger.setSection("DataTracker").debug("Génération signature");
		const sortedData = this.sortObjectDeep(data);
		return crypto
			.createHash("sha256")
			.update(JSON.stringify(sortedData))
			.digest("hex");
	}
	private sortObjectDeep(obj: any): any {
		if (obj === null || typeof obj !== "object") {
			return obj;
		}

		if (Array.isArray(obj)) {
			return obj.map(this.sortObjectDeep.bind(this)).sort();
		}

		return Object.keys(obj)
			.sort()
			.reduce((sorted: any, key: string) => {
				sorted[key] = this.sortObjectDeep(obj[key]);
				return sorted;
			}, {});
	}

	private async getStoredSignatures(
		userId: string,
		sectionName: string
	): Promise<DataSignature[]> {
		logger.debug(`Récupération signatures stockées: ${sectionName}`);

		const metadata = await prisma.sectionMetadata.findUnique({
			where: { userId_sectionName: { userId, sectionName } },
		});

		if (!metadata?.dataSignatures) {
			logger.debug("Aucune signature trouvée");
			return [];
		}

		return (metadata.dataSignatures as unknown as StoredDataSignatures).map(
			(sig) => ({
				...sig,
				timestamp: sig.timestamp,
			})
		);
	}

	public async shouldRegenerateSection(
		userId: string,
		sectionName: string,
		currentData: FormattedAnalyses
	): Promise<boolean> {
		logger.info(`Vérification régénération: ${sectionName}`);

		// Récupérer les métadonnées complètes au lieu de juste les signatures
		const metadata = await prisma.sectionMetadata.findUnique({
			where: { userId_sectionName: { userId, sectionName } },
		});

		// Vérifier la version en premier
		if (!metadata?.version || metadata.version < this.CURRENT_VERSION) {
			logger.info(
				`Régénération requise: version ${
					metadata?.version || "non définie"
				} < ${this.CURRENT_VERSION}`
			);
			return true;
		}

		const sectionConfig =
			BUSINESS_PLAN_SECTIONS[
				sectionName as keyof typeof BUSINESS_PLAN_SECTIONS
			];
		if (!sectionConfig) {
			logger.info(
				"Configuration section non trouvée -> Régénération requise"
			);
			return true;
		}

		const storedSignatures = metadata
			? (metadata.dataSignatures as unknown as StoredDataSignatures)
			: [];
		let hasChanges = false;
		let hasValidData = false;

		for (const [
			analysisType,
			sectionType,
			fieldName,
		] of sectionConfig.paths) {
			const analysis = currentData[analysisType];
			if (!analysis) continue;

			const dataToCheck = this.getDataToCheck(
				analysis,
				sectionType,
				fieldName
			);

			if (dataToCheck) {
				hasValidData = true;
				const currentSignature = this.generateSignature(dataToCheck);
				const storedSignature = storedSignatures.find(
					(sig) =>
						sig.analysisType === analysisType &&
						sig.fieldName === fieldName
				);

				if (
					!storedSignature ||
					storedSignature.signature !== currentSignature
				) {
					logger.debug(
						`Changement détecté: ${analysisType}.${fieldName}`
					);
					hasChanges = true;
					break;
				}
			}
		}

		const shouldRegenerate = !hasValidData || hasChanges;
		logger.info(
			`Régénération ${
				shouldRegenerate ? "requise" : "non requise"
			} pour ${sectionName}`
		);
		return shouldRegenerate;
	}

	// Mise à jour de updateSectionMetadata pour inclure fieldName
	public async updateSectionMetadata(
		userId: string,
		sectionName: string,
		currentData: FormattedAnalyses,
		generatedContent: string
	): Promise<void> {
		logger.info(`Mise à jour métadonnées: ${sectionName}`);

		const sectionConfig =
			BUSINESS_PLAN_SECTIONS[
				sectionName as keyof typeof BUSINESS_PLAN_SECTIONS
			];
		if (!sectionConfig) {
			logger.error("Configuration section non trouvée");
			return;
		}

		const dataSignatures: Array<
			StoredDataSignature & { fieldName: string }
		> = [];

		for (const [
			analysisType,
			sectionType,
			fieldName,
		] of sectionConfig.paths) {
			const analysis = currentData[analysisType];
			if (!analysis) continue;

			const dataToCheck = this.getDataToCheck(
				analysis,
				sectionType,
				fieldName
			);

			if (dataToCheck) {
				dataSignatures.push({
					analysisType,
					fieldName,
					signature: this.generateSignature(dataToCheck),
					timestamp: new Date().toISOString(),
				});
			}
		}

		logger.debug(`Mise à jour avec ${dataSignatures.length} signatures`);

		await prisma.sectionMetadata.upsert({
			where: { userId_sectionName: { userId, sectionName } },
			update: {
				dataSignatures: dataSignatures as any,
				generatedContent,
				lastGenerated: new Date(),
				version: this.CURRENT_VERSION, // Ajout de la version dans l'update
			},
			create: {
				userId,
				sectionName,
				dataSignatures: dataSignatures as any,
				generatedContent,
				lastGenerated: new Date(),
				version: this.CURRENT_VERSION, // Ajout de la version dans le create
			},
		});

		logger.info("Métadonnées mises à jour avec succès");
	}

	private getDataToCheck(
		analysis: any,
		sectionType: string,
		fieldName: string
	): any {
		if (sectionType === "formatted_text") {
			return analysis.formatted_text;
		} else if (sectionType === "formatted_qa" && analysis.formatted_qa) {
			return analysis.formatted_qa[fieldName];
		} else if (
			sectionType === "formatted_sections" &&
			analysis.formatted_sections
		) {
			return analysis.formatted_sections[fieldName];
		}
		return null;
	}
}
