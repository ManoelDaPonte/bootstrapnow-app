// lib/business-plan-document/markdownProcessor.ts

interface TextSegment {
	text: string;
	style?: {
		bold?: boolean;
		heading?: number;
		underline?: boolean;
		italic?: boolean;
	};
}

/**
 * Nettoie le texte des retours à la ligne superflus et du formatage Markdown
 */
export function cleanMarkdownText(text: string): string {
	if (!text) return "";

	return (
		text
			// Supprimer les # pour les titres
			.replace(/^#+ /gm, "")
			// Supprimer les ** pour le gras
			.replace(/\*\*/g, "")
			// Supprimer les * pour l'italique
			.replace(/\*/g, "")
			// Préserver les sauts de ligne mais supprimer les lignes vides excessives
			.replace(/\n{3,}/g, "\n\n")
			// Supprimer les espaces en début et fin de ligne
			.split("\n")
			.map((line) => line.trim())
			.join("\n")
			.trim()
	);
}

/**
 * Convertit les segments en texte formaté pour Docxtemplater
 */
export function convertSegmentsToDocxTemplates(
	segments: TextSegment[]
): string {
	return segments
		.map((segment) => {
			const text = segment.text.trim();
			if (!text) return "";

			if (!segment.style) {
				return text;
			}

			if (segment.style.heading) {
				return `{{%heading${segment.style.heading} ${text}}}`;
			}

			if (segment.style.bold) {
				return `{{%bold ${text}}}`;
			}

			return text;
		})
		.join(" ");
}

/**
 * Configure les modules et options Docxtemplater
 */
export function configureDocxTemplater(zip: any) {
	return {
		paragraphLoop: true,
		linebreaks: true, // Activer la gestion des retours à la ligne
		delimiters: {
			start: "{{",
			end: "}}",
		},
		nullGetter() {
			return "";
		},
		parser: (tag: string) => {
			const trimmedTag = tag.trim();

			if (trimmedTag.startsWith("%heading")) {
				const level = parseInt(trimmedTag.charAt(8));
				const content = trimmedTag.slice(10);
				return {
					get: () => ({
						type: "paragraph",
						style: `Heading${level}`,
						text: content,
					}),
				};
			}

			if (trimmedTag.startsWith("%bold")) {
				const content = trimmedTag.slice(6);
				return {
					get: () => ({
						type: "run",
						bold: true,
						text: content,
					}),
				};
			}

			return {
				get: function (scope: any) {
					const value = scope[tag] || "";
					return cleanMarkdownText(value);
				},
			};
		},
	};
}
