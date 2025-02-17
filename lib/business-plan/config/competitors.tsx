// lib/business-plan/config/competitors.ts
import { LatLngExpression } from "leaflet";
import { CompetitorEntry } from "@/types/competitors";

export const INITIAL_COMPETITORS: CompetitorEntry[] = [
	{
		id: "my_company",
		nom: "Mon Entreprise",
		solution: "Produit Exceptionnel",
		prix: 100,
		valeurPercue: 95,
		strategie: "Premium",
		zoneGeographique: "Dijon",
		ciblageClient: "Grandes entreprises",
		forces: "Qualité supérieure",
		faiblesses: "Prix élevé",
		impactDirect: "Très élevé",
		impactIndirect: "Élevé",
		isMyCompany: true,
	},
];

export const FIELD_LABELS = {
	nom: "Nom",
	solution: "Solution/produit",
	prix: "Prix",
	valeurPercue: "Valeur perçue",
	strategie: "Stratégie",
	zoneGeographique: "Zone géographique",
	ciblageClient: "Ciblage client",
	forces: "Forces",
	faiblesses: "Faiblesses",
	impactDirect: "Impact direct",
	impactIndirect: "Impact indirect",
} as const;

export const zoneCoordinates: { [key: string]: LatLngExpression } = {
	France: [46.603354, 1.888334], // Coordonnées pour la France
	Paris: [48.8566, 2.3522], // Coordonnées pour Paris
	Lyon: [45.75, 4.85], // Coordonnées pour Lyon
	Marseille: [43.2965, 5.3698], // Coordonnées pour Marseille
	Bordeaux: [44.8378, -0.5792], // Coordonnées pour Bordeaux
	Dijon: [47.322, 5.0415], // Coordonnées pour Dijon
	Toulouse: [43.6047, 1.4442], // Coordonnées pour Toulouse
	Lille: [50.6292, 3.0573], // Coordonnées pour Lille
	Nantes: [47.2184, -1.5536], // Coordonnées pour Nantes
	Strasbourg: [48.5734, 7.7521], // Coordonnées pour Strasbourg
	Rennes: [48.1173, -1.6778], // Coordonnées pour Rennes
	Nice: [43.7102, 7.262], // Coordonnées pour Nice
	Montpellier: [43.6117, 3.8777], // Coordonnées pour Montpellier
	LeHavre: [49.4944, 0.1079], // Coordonnées pour Le Havre
	AixEnProvence: [43.529742, 5.447427], // Coordonnées pour Aix-en-Provence
	Grenoble: [45.1885, 5.7245], // Coordonnées pour Grenoble
	ClermontFerrand: [45.7772, 3.087], // Coordonnées pour Clermont-Ferrand
	Perpignan: [42.6984, 2.8957], // Coordonnées pour Perpignan
	Angers: [47.4784, -0.5632], // Coordonnées pour Angers
	Caen: [49.4144, -0.6963], // Coordonnées pour Caen
	Tours: [47.3433, 0.6981], // Coordonnées pour Tours
	Nimes: [43.8367, 4.3601], // Coordonnées pour Nîmes
	LaRochelle: [46.1603, -1.1511], // Coordonnées pour La Rochelle
	Reims: [49.2583, 4.0317], // Coordonnées pour Reims
	LeMans: [48.0061, 0.1996], // Coordonnées pour Le Mans
	Valence: [44.9333, 4.8833], // Coordonnées pour Valence
	Metz: [49.1193, 6.1757], // Coordonnées pour Metz
	Nancy: [48.6921, 6.1844], // Coordonnées pour Nancy
	Rouen: [49.4431, 1.0993], // Coordonnées pour Rouen
	Mulhouse: [47.7508, 7.3359], // Coordonnées pour Mulhouse
	Troyes: [48.2974, 4.0744], // Coordonnées pour Troyes
	Amiens: [49.8941, 2.302], // Coordonnées pour Amiens
	BoulogneSurMer: [50.7256, 1.6016], // Coordonnées pour Boulogne-sur-Mer
};
