// types/openai/analysis.ts
export interface FormattedSection {
	[key: string]: string;
}

export interface FormattedQA {
	[key: string]: string;
}

export interface FormattedAnalysis {
	data: any;
	qa?: Record<string, any>;
	formatted_sections?: FormattedSection;
	formatted_qa?: FormattedQA;
	formatted_text?: string;
}

export interface FormattedAnalyses {
	[key: string]: FormattedAnalysis;
}
