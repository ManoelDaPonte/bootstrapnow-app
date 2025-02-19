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

	private convertMarkdownToOpenXML(text: string): string {
		// Remplacer les marqueurs de gras (**texte**) par des balises OpenXML
		return text.replace(
			/\*\*(.*?)\*\*/g,
			"<w:r><w:rPr><w:b/></w:rPr><w:t>$1</w:t></w:r>"
		);
	}

	async generateDocument(sections: Record<string, string>): Promise<Buffer> {
		try {
			const template = await this.loadTemplate();
			console.log("Template chargé");

			const zip = new PizZip(template);
			console.log("ZIP créé");

			// Obtenir les placeholders
			const placeholders = mapPlaceholders(generalInfo, marketTrendsData);

			// Appliquer les remplacements aux sections
			const processedSections: Record<string, string> = {};
			for (const [key, content] of Object.entries(sections)) {
				processedSections[key] = replacePlaceholders(
					content,
					placeholders
				);
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
				parser: (tag: string) => ({
					get: (scope: any) => {
						const value = scope[tag] || "";
						return value.toString().replace(/\r?\n/g, "\n");
					},
				}),
			});

			try {
				await doc.renderAsync(templateData);
				console.log("Rendu effectué avec succès");
			} catch (error) {
				console.error("Erreur lors du rendu:", error);
				throw error;
			}

			// Générer le document final
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
