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
 * Nettoie le texte des retours à la ligne superflus
 */
function cleanupText(text: string): string {
	if (!text) return "";

	return (
		text
			// Remplacer les retours à la ligne multiples par un seul
			.replace(/\n{3,}/g, "\n\n")
			// Supprimer les espaces en début et fin de ligne
			.split("\n")
			.map((line) => line.trim())
			.join("\n")
			// Remplacer les retours à la ligne simples par des espaces
			// sauf s'ils sont précédés ou suivis d'un retour à la ligne
			.replace(/(?<!\n)\n(?!\n)/g, " ")
			// Supprimer les espaces multiples
			.replace(/\s+/g, " ")

			// Supprimer les # pour les titres
			.replace(/^#+ /gm, "")
			// Supprimer les ** pour le gras
			.replace(/\*\*/g, "")
			// Supprimer les * pour l'italique
			.replace(/\*/g, "")
	);
}

/**
 * Traite le texte Markdown et le convertit en segments formatés
 */
export function processMarkdownText(text: string): TextSegment[] {
	if (!text) return [];

	const segments: TextSegment[] = [];
	// Nettoyer d'abord le texte
	const cleanedText = cleanupText(text);
	// Diviser en paragraphes (séparés par des doubles retours à la ligne)
	const paragraphs = cleanedText.split(/\n\n+/);

	for (const paragraph of paragraphs) {
		if (!paragraph.trim()) {
			continue;
		}

		// Traiter les titres
		if (paragraph.startsWith("#")) {
			const match = paragraph.match(/^(#{1,6})\s*(.+)$/);
			if (match) {
				segments.push({
					text: match[2],
					style: { heading: match[1].length },
				});
				continue;
			}
		}

		// Traiter le texte du paragraphe
		let currentIndex = 0;
		const paragraphSegments: TextSegment[] = [];

		while (currentIndex < paragraph.length) {
			// Rechercher les marqueurs de style
			const boldStart = paragraph.indexOf("~b ", currentIndex);

			if (boldStart === -1) {
				// Ajouter le reste du texte sans formatage
				if (currentIndex < paragraph.length) {
					paragraphSegments.push({
						text: paragraph.slice(currentIndex).trim(),
					});
				}
				break;
			}

			// Ajouter le texte avant le marqueur de style
			if (boldStart > currentIndex) {
				paragraphSegments.push({
					text: paragraph.slice(currentIndex, boldStart).trim(),
				});
			}

			// Trouver la fin du texte en gras
			const textStart = boldStart + 3;
			const nextSpace = paragraph.indexOf(" ", textStart);
			const boldText =
				nextSpace === -1
					? paragraph.slice(textStart)
					: paragraph.slice(textStart, nextSpace);

			paragraphSegments.push({
				text: boldText.trim(),
				style: { bold: true },
			});

			currentIndex = nextSpace === -1 ? paragraph.length : nextSpace;
		}

		// Ajouter les segments du paragraphe
		segments.push(...paragraphSegments);

		// Ajouter un marqueur de fin de paragraphe
		segments.push({ text: "\n\n" });
	}

	// Enlever le dernier marqueur de paragraphe s'il existe
	if (segments.length > 0 && segments[segments.length - 1].text === "\n\n") {
		segments.pop();
	}

	return segments;
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
export function configureDocxTemplater(_zip: any) {
	return {
		paragraphLoop: true,
		linebreaks: false, // Désactiver la gestion automatique des retours à la ligne
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
					// Nettoyer les retours à la ligne dans les valeurs
					return value
						.toString()
						.replace(/\n/g, " ")
						.replace(/\s+/g, " ")
						.trim();
				},
			};
		},
	};
}
