// lib/business-plan-document/documentGenerator.ts
import { BlobServiceClient, BlobSASPermissions } from "@azure/storage-blob";
import { readFileSync } from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

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

	async generateDocument(sections: Record<string, string>): Promise<Buffer> {
		try {
			const template = await this.loadTemplate();
			console.log("Template chargé");

			const zip = new PizZip(template);
			console.log("ZIP créé");

			console.log("Sections à remplacer:", {
				ES_Overview: sections.ES_Overview,
				// autres sections...
			});

			// Ajouter des options plus robustes pour Docxtemplater
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
						let value = scope[tag] || "";
						// Nettoyer la valeur si nécessaire
						return value.toString().replace(/\r?\n/g, "\n");
					},
				}),
			});

			console.log("Données à insérer:", sections);

			// Préparation des données
			const templateData: Record<string, string> = {};
			for (const [key, value] of Object.entries(sections)) {
				// S'assurer que les valeurs sont des chaînes
				templateData[key] = value ? value.toString() : "";
			}

			try {
				// Remplacer setData + render par renderAsync
				await doc.renderAsync(templateData); // <-- Changement ici
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
			if (
				error instanceof Error &&
				(error as any).properties &&
				(error as any).properties.errors
			) {
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
