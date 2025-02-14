// lib/openai/generators/testAnalyzersClient.ts
export async function testAllAnalyzers(auth0Id: string) {
	try {
		console.log("=== DÉBUT DU TEST DES ANALYZERS ===\n");

		const response = await fetch("/api/openai/test-analyzers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ auth0Id }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const { results } = await response.json();

		// Logger les résultats
		results.forEach((result: any) => {
			console.log(`\n=== ${result.type.toUpperCase()} ===`);
			console.log("\nFormatted Text:");
			console.log("------------------------");
			console.log(result.formatted_text);
			console.log("------------------------");

			console.log("\nStatistiques:");
			console.log(
				JSON.stringify(
					{
						hasSections: result.hasSections,
						hasQA: result.hasQA,
						textLength: result.textLength,
						sectionsCount: result.sectionsCount,
						qaCount: result.qaCount,
					},
					null,
					2
				)
			);

			if (result.sections.length > 0) {
				console.log("\nSections disponibles:");
				result.sections.forEach((section: string) => {
					console.log(`- ${section}`);
				});
			}

			if (result.qa.length > 0) {
				console.log("\nQA disponibles:");
				result.qa.forEach((qa: string) => {
					console.log(`- ${qa}`);
				});
			}
		});

		console.log("\n=== FIN DU TEST DES ANALYZERS ===");

		return results;
	} catch (error) {
		console.error("Erreur lors du test des analyzers:", error);
		throw error;
	}
}
