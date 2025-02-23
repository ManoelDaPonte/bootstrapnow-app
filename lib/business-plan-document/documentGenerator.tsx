// lib/business-plan-document/documentGenerator.ts
import { BlobServiceClient, BlobSASPermissions } from "@azure/storage-blob";
import { readFileSync } from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { prisma } from "@/lib/db/prisma";
import { mapPlaceholders, replacePlaceholders } from "./placeholderMapper";
import { Prisma } from "@prisma/client";

interface GeneralInfo {
	city: string;
	state: string;
	authors: string;
	zipcode: string;
	website_url: string;
	company_name: string;
	business_type: string;
	email_address: string;
	business_phone: string;
	street_address: string;
}

interface MarketTrendsData {
	trends: Array<{
		id: string;
		annee: number;
		tauxCroissance: number;
		variationDemande: number;
	}>;
	marketNumbers: Array<{
		id: string;
		title: string;
		value: string;
		description: string;
		referenceLink: string;
	}>;
}

export class DocumentGenerator {
	private blobService: BlobServiceClient;

	constructor(connectionString: string) {
		this.blobService =
			BlobServiceClient.fromConnectionString(connectionString);
	}

	private async loadTemplate(): Promise<Buffer> {
		const templatePath = path.join(
			process.cwd(),
			"public/templates/business-plan-template.docx"
		);
		return readFileSync(templatePath);
	}

	private async getGeneralInfo(auth0Id: string): Promise<GeneralInfo | null> {
		const user = await prisma.user.findUnique({
			where: { auth0Id },
			include: {
				generalInfo: true,
			},
		});

		if (!user?.generalInfo?.data) {
			return null;
		}

		const rawData = user.generalInfo.data as Prisma.JsonValue;
		if (
			typeof rawData === "object" &&
			rawData !== null &&
			!Array.isArray(rawData)
		) {
			return rawData as unknown as GeneralInfo;
		}

		return null;
	}

	private async getMarketTrendsData(
		auth0Id: string
	): Promise<MarketTrendsData | null> {
		const user = await prisma.user.findUnique({
			where: { auth0Id },
			include: {
				marketTrendsAnalysis: true,
			},
		});

		if (!user?.marketTrendsAnalysis?.data) {
			return null;
		}

		const rawData = user.marketTrendsAnalysis.data as Prisma.JsonValue;
		if (
			typeof rawData === "object" &&
			rawData !== null &&
			!Array.isArray(rawData)
		) {
			return rawData as unknown as MarketTrendsData;
		}

		return null;
	}

	private convertMarkdownToDocxTemplater(text: string): string {
		// Convertit **texte** en {{~b texte}} pour le formatage en gras
		return text.replace(/\*\*(.+?)\*\*/g, "{{~b $1}}");
	}

	async generateDocument(
		sections: Record<string, string>,
		auth0Id: string
	): Promise<Buffer> {
		try {
			const template = await this.loadTemplate();
			const zip = new PizZip(template);

			// Récupérer les données supplémentaires
			const [generalInfo, marketTrendsData] = await Promise.all([
				this.getGeneralInfo(auth0Id),
				this.getMarketTrendsData(auth0Id),
			]);

			if (!generalInfo) {
				throw new Error("Informations générales non trouvées");
			}

			if (!marketTrendsData) {
				throw new Error("Données de tendances de marché non trouvées");
			}

			// Obtenir les placeholders
			const placeholders = mapPlaceholders(generalInfo, marketTrendsData);

			// Appliquer les remplacements aux sections et convertir le Markdown
			const processedSections: Record<string, string> = {};
			for (const [key, content] of Object.entries(sections)) {
				const withPlaceholders = replacePlaceholders(
					content,
					placeholders
				);
				processedSections[key] =
					this.convertMarkdownToDocxTemplater(withPlaceholders);
			}

			// Fusionner les placeholders directs avec les sections traitées
			const templateData = {
				...processedSections,
				...placeholders,
			};

			const doc = new Docxtemplater(zip, {
				paragraphLoop: true,
				linebreaks: true,
				delimiters: {
					start: "{{",
					end: "}}",
				},
				nullGetter() {
					return "";
				},
				parser: function (tag) {
					// Gestion spéciale pour le formatage en gras
					if (tag.startsWith("~b ")) {
						return {
							get: function (_scope) {
								const value = tag.substring(3) || "";
								return {
									type: "string",
									value: value,
									bold: true,
								};
							},
						};
					}
					// Parser standard pour les autres tags
					return {
						get: function (scope) {
							const value = scope[tag] || "";
							return value.toString().replace(/\r?\n/g, "\n");
						},
					};
				},
			});

			try {
				await doc.renderAsync(templateData);
			} catch (error) {
				console.error("Erreur lors du rendu:", error);
				throw error;
			}

			const buf = doc.getZip().generate({
				type: "nodebuffer",
				compression: "DEFLATE",
			});

			return buf;
		} catch (error) {
			console.error("Erreur détaillée lors de la génération:", error);
			if (error instanceof Error && (error as any).properties?.errors) {
				console.error(
					"Erreurs spécifiques:",
					(error as any).properties.errors
				);
			}
			throw error;
		}
	}

	async saveDocument(userId: string, buffer: Buffer): Promise<string> {
		try {
			const containerClient =
				this.blobService.getContainerClient("business-plan");
			const blobName = `${userId}/${Date.now()}-business-plan.docx`;
			const blockBlobClient =
				containerClient.getBlockBlobClient(blobName);

			await blockBlobClient.uploadData(buffer);

			const expiryDate = new Date();
			expiryDate.setHours(expiryDate.getHours() + 24);

			const permissions = new BlobSASPermissions();
			permissions.read = true;

			const sasUrl = await blockBlobClient.generateSasUrl({
				permissions: permissions,
				expiresOn: expiryDate,
			});

			return sasUrl;
		} catch (error) {
			console.error("Erreur lors de la sauvegarde du document:", error);
			throw error;
		}
	}
}
