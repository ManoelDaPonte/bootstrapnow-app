// lib/openai/generators/pathExplorer.ts

function formatPath(path: string[], value: any): string {
	return `${path.join(".")} = ${
		typeof value === "object"
			? Array.isArray(value)
				? `Array(${value.length})`
				: "Object"
			: value
	}`;
}

function exploreStructure(obj: any, path: string[] = []): string[] {
	const paths: string[] = [];

	if (!obj) return paths;

	// Explore les données brutes (data et qa)
	if (obj.data) {
		Object.entries(obj.data).forEach(([key, value]) => {
			paths.push(formatPath([...path, "data", key], value));
		});
	}

	if (obj.qa) {
		Object.entries(obj.qa).forEach(([key, value]) => {
			paths.push(formatPath([...path, "qa", key], value));
		});
	}

	// Explore les données formatées
	if (obj.formatted_sections) {
		Object.entries(obj.formatted_sections).forEach(([key, value]) => {
			paths.push(formatPath([...path, "formatted_sections", key], value));
		});
	}

	if (obj.formatted_qa) {
		Object.entries(obj.formatted_qa).forEach(([key, value]) => {
			paths.push(formatPath([...path, "formatted_qa", key], value));
		});
	}

	if (obj.formatted_text) {
		paths.push(formatPath([...path, "formatted_text"], obj.formatted_text));
	}

	return paths;
}

export async function exploreAnalyses(auth0Id: string) {
	try {
		console.log("=== EXPLORATION DES CHEMINS D'ANALYSE ===\n");

		const response = await fetch("/api/openai/test-analyzers", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ auth0Id }),
		});

		if (!response.ok)
			throw new Error(`HTTP error! status: ${response.status}`);

		const { results } = await response.json();

		results.forEach((result: any) => {
			console.log(`\n=== ${result.type.toUpperCase()} ===`);
			console.log("\nChemins disponibles :");
			console.log("------------------------");

			const paths = exploreStructure(result, [result.type]);
			paths.forEach((path) => console.log(path));

			console.log("------------------------");
		});

		console.log("\n=== FIN DE L'EXPLORATION ===");
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exploration des analyses:", error);
		throw error;
	}
}

// Utilisation:
// await exploreAnalyses("auth0|6751e0b17016716a3ef71a0c");
