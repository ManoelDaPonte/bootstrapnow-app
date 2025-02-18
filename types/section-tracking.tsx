// types/section-tracking.ts
export interface DataSignature {
	analysisType: string;
	fieldName: string; // Ajout du fieldName
	signature: string;
	timestamp: string;
}

export interface StoredDataSignature {
	analysisType: string;
	fieldName: string; // Ajout du fieldName
	signature: string;
	timestamp: string;
}

export interface SectionMetadata {
	id: string;
	userId: string;
	sectionName: string;
	dataSignatures: DataSignature[];
	generatedContent: string;
	lastGenerated: Date;
}

export type StoredDataSignatures = StoredDataSignature[];
