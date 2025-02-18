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

export class DataTracker {
	private generateSignature(data: any): string {
		const sortedData = this.sortObjectDeep(data);
		const dataString = JSON.stringify(sortedData);
		return crypto.createHash("sha256").update(dataString).digest("hex");
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
		const metadata = await prisma.sectionMetadata.findUnique({
			where: {
				userId_sectionName: {
					userId,
					sectionName,
				},
			},
		});

		// Cast safely from JSON to our type
		const storedSignatures =
			metadata?.dataSignatures as unknown as StoredDataSignatures;
		if (!storedSignatures) return [];

		// Convert stored format to DataSignature format
		return storedSignatures.map((sig) => ({
			...sig,
			timestamp: sig.timestamp, // Already a string now
		}));
	}

	public async shouldRegenerateSection(
		userId: string,
		sectionName: string,
		currentData: FormattedAnalyses
	): Promise<boolean> {
		const sectionConfig =
			BUSINESS_PLAN_SECTIONS[
				sectionName as keyof typeof BUSINESS_PLAN_SECTIONS
			];
		if (!sectionConfig) return true;

		const storedSignatures = await this.getStoredSignatures(
			userId,
			sectionName
		);

		console.log(`Vérification de la section ${sectionName}`);
		console.log("Signatures stockées:", storedSignatures);

		let hasChanges = false;
		let hasValidData = false;

		for (const [
			analysisType,
			sectionType,
			fieldName,
		] of sectionConfig.paths) {
			const analysis = currentData[analysisType];
			if (!analysis) continue;

			let dataToCheck = null;
			if (sectionType === "formatted_text") {
				dataToCheck = analysis.formatted_text;
			} else if (
				sectionType === "formatted_qa" &&
				analysis.formatted_qa
			) {
				dataToCheck = analysis.formatted_qa[fieldName];
			} else if (
				sectionType === "formatted_sections" &&
				analysis.formatted_sections
			) {
				dataToCheck = analysis.formatted_sections[fieldName];
			}

			if (dataToCheck) {
				hasValidData = true;
				const currentSignature = this.generateSignature(dataToCheck);
				const storedSignature = storedSignatures.find(
					(sig) =>
						sig.analysisType === analysisType &&
						sig.fieldName === fieldName // Ajout du fieldName pour une comparaison plus précise
				);

				console.log(`Vérification de ${analysisType}.${fieldName}:`, {
					currentSignature,
					storedSignature: storedSignature?.signature,
				});

				if (
					!storedSignature ||
					storedSignature.signature !== currentSignature
				) {
					console.log(
						`Changement détecté dans ${analysisType}.${fieldName}`
					);
					hasChanges = true;
					break; // On peut arrêter dès qu'un changement est détecté
				}
			}
		}

		// Si aucune donnée valide n'a été trouvée ou s'il y a eu des changements
		return !hasValidData || hasChanges;
	}

	// Mise à jour de updateSectionMetadata pour inclure fieldName
	public async updateSectionMetadata(
		userId: string,
		sectionName: string,
		currentData: FormattedAnalyses,
		generatedContent: string
	): Promise<void> {
		const sectionConfig =
			BUSINESS_PLAN_SECTIONS[
				sectionName as keyof typeof BUSINESS_PLAN_SECTIONS
			];
		if (!sectionConfig) return;

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

			let dataToCheck = null;
			if (sectionType === "formatted_text") {
				dataToCheck = analysis.formatted_text;
			} else if (
				sectionType === "formatted_qa" &&
				analysis.formatted_qa
			) {
				dataToCheck = analysis.formatted_qa[fieldName];
			} else if (
				sectionType === "formatted_sections" &&
				analysis.formatted_sections
			) {
				dataToCheck = analysis.formatted_sections[fieldName];
			}

			if (dataToCheck) {
				dataSignatures.push({
					analysisType,
					fieldName, // Ajout du fieldName
					signature: this.generateSignature(dataToCheck),
					timestamp: new Date().toISOString(),
				});
			}
		}

		await prisma.sectionMetadata.upsert({
			where: {
				userId_sectionName: {
					userId,
					sectionName,
				},
			},
			update: {
				dataSignatures: dataSignatures as any,
				generatedContent,
				lastGenerated: new Date(),
			},
			create: {
				userId,
				sectionName,
				dataSignatures: dataSignatures as any,
				generatedContent,
				lastGenerated: new Date(),
			},
		});
	}
}
