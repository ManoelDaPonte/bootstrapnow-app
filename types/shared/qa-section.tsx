// types/shared/qa-section.ts

export interface QACategory {
	id: string;
	title: string;
	question: string;
	examples: string[];
}

export interface QAData {
	sectionTitle: string;
	categories: QACategory[];
}

export interface QAResponse {
	categoryId: string;
	response: string;
}

export interface QAResponses {
	[key: string]: string;
}
