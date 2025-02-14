// types/openai/mapping.ts

// Interface de base pour les données d'analyse
export interface AnalysisData {
	data: any;
	qa_responses?: Record<string, string>;
}

// Interface pour le résultat du mapping
export interface MappingResult {
	[key: string]: AnalysisData;
}

// Interface pour le mapping des champs
export interface FieldMapping {
	data?: Record<string, string>;
	qa_responses?: Record<string, string>;
	[key: string]: Record<string, string> | undefined; // Modifié pour permettre undefined
}

// Interface pour tous les mappings
export interface FieldMappings {
	[key: string]: FieldMapping;
}
