// lib/openai/formatters/analyzers/competitors.ts
import { CompetitorsAnalysisData } from "@/types/openai/analyzers";
export function format_competitors(data: any): CompetitorsAnalysisData {
	const competitors = data?.competitors?.data || [];

	if (competitors.length === 0) {
		return {
			formatted_sections: {},
			formatted_text: "",
			data: {
				competitors: [],
				average_price: 0,
				average_value: 0,
				market_zones: [],
				market_segments: [],
				market_strategies: [],
			},
		};
	}

	// Séparation entre votre entreprise et les concurrents
	const my_company = competitors.find((comp: any) => comp.isMyCompany);
	const other_competitors = competitors.filter(
		(comp: any) => !comp.isMyCompany
	);

	// Calcul des moyennes du marché
	const avg_price =
		competitors.reduce((sum: number, comp: any) => sum + comp.prix, 0) /
		competitors.length;
	const avg_value =
		competitors.reduce(
			(sum: number, comp: any) => sum + comp.valeurPercue,
			0
		) / competitors.length;

	// Création des sections formatées
	const formatted_sections = {
		my_company: my_company
			? `Votre Positionnement :
  
  Nom : ${my_company.nom}
  Prix : ${my_company.prix} €
  Solution : ${my_company.solution}
  Stratégie : ${my_company.strategie}
  Zone géographique : ${my_company.zoneGeographique}
  Ciblage client : ${my_company.ciblageClient}
  
  Forces principales : ${my_company.forces}
  Faiblesses identifiées : ${my_company.faiblesses}
  
  Valeur perçue : ${my_company.valeurPercue}/100
  Impact sur le marché :
  - Direct : ${my_company.impactDirect}
  - Indirect : ${my_company.impactIndirect}`
			: "Aucune donnée sur votre entreprise",

		comparative_analysis: my_company
			? `
  Positionnement Prix :
  - Votre prix (${my_company.prix} €) est ${
					my_company.prix < avg_price ? "inférieur" : "supérieur"
			  } à la moyenne du marché (${avg_price.toFixed(2)} €)
  
  Positionnement Valeur :
  - Votre valeur perçue (${my_company.valeurPercue}/100) est ${
					my_company.valeurPercue < avg_value
						? "inférieure"
						: "supérieure"
			  } à la moyenne (${avg_value.toFixed(1)}/100)`
			: "Analyse comparative non disponible",

		competitors_analysis: other_competitors
			.map(
				(competitor: any) => `
  ${competitor.nom} :
  - Prix : ${competitor.prix} €
  - Solution : ${competitor.solution}
  - Stratégie : ${competitor.strategie}
  - Zone : ${competitor.zoneGeographique}
  - Cible : ${competitor.ciblageClient}
  
  Forces : ${competitor.forces}
  Faiblesses : ${competitor.faiblesses}
  
  Valeur perçue : ${competitor.valeurPercue}/100
  Impact sur le marché :
  - Direct : ${competitor.impactDirect}
  - Indirect : ${competitor.impactIndirect}`
			)
			.join("\n\n"),

		strategic_analysis: (() => {
			const zones = new Set(
				competitors.map((comp: any) => comp.zoneGeographique)
			);
			const segments = new Set(
				competitors.map((comp: any) => comp.ciblageClient)
			);
			const strategies = new Set(
				competitors.map((comp: any) => comp.strategie)
			);

			const analysis = [
				"Analyse Stratégique :",
				`\nCouverture géographique : ${Array.from(zones).join(", ")}`,
				`Segments clients visés : ${Array.from(segments).join(", ")}`,
				`Stratégies identifiées : ${Array.from(strategies).join(", ")}`,
			];

			if (my_company) {
				const price_gaps = other_competitors.map(
					(comp: any) => comp.prix - my_company.prix
				);
				const avg_price_gap =
					price_gaps.reduce((a: any, b: any) => a + b, 0) /
					price_gaps.length;

				analysis.push(`\nPositionnement stratégique :
  - Écart de prix moyen avec les concurrents : ${avg_price_gap.toFixed(2)} €
  - Zone de chalandise : ${my_company.zoneGeographique}
  - Segment principal : ${my_company.ciblageClient}`);
			}

			return analysis.join("\n");
		})(),
	};

	// Texte complet
	const complete_text = Object.values(formatted_sections).join("\n\n");

	return {
		data: {
			competitors,
			average_price: avg_price,
			average_value: avg_value,
			market_zones: Array.from(
				new Set(competitors.map((comp: any) => comp.zoneGeographique))
			),
			market_segments: Array.from(
				new Set(competitors.map((comp: any) => comp.ciblageClient))
			),
			market_strategies: Array.from(
				new Set(competitors.map((comp: any) => comp.strategie))
			),
		},
		formatted_sections,
		formatted_text: complete_text,
	};
}
