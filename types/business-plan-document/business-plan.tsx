// types/business-plan.ts
export type Status = "pending" | "generating" | "completed" | "error";

export const BUSINESS_PLAN_SECTIONS = [
	"ES_Overview",
	// autres sections...
] as const;

export type BusinessPlanSection = (typeof BUSINESS_PLAN_SECTIONS)[number];

export interface SectionStatus {
	section: BusinessPlanSection;
	status: Status;
	content?: string;
	error?: string;
}

export interface GenerationState {
	status: "idle" | "generating" | "completed" | "error";
	sections: SectionStatus[];
	currentSection?: BusinessPlanSection;
}

export interface Generation {
	id: string;
	createdAt: string;
	docxUrl?: string;
	status: Status;
}

export interface GenerationStep {
	id: string;
	label: string;
	status: "pending" | "in-progress" | "completed" | "error";
}
