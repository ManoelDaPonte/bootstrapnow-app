// lib/openai/config/section-order.ts

import {
	BUSINESS_PLAN_SECTIONS,
	BusinessPlanSection,
} from "@/types/business-plan-document/business-plan";

export const SECTION_ORDER = {
	// Utiliser directement les sections définies
	sections: BUSINESS_PLAN_SECTIONS,

	getIndex: (sectionName: string): number =>
		SECTION_ORDER.sections.indexOf(sectionName as BusinessPlanSection),

	getPreviousSections: (
		sectionName: string,
		count: number = 3
	): BusinessPlanSection[] => {
		const currentIndex = SECTION_ORDER.getIndex(sectionName);
		if (currentIndex === -1) return [];

		return Array.from({ length: count }, (_, i) => currentIndex - (i + 1))
			.filter((index) => index >= 0)
			.map((index) => SECTION_ORDER.sections[index]);
	},

	isPrecedingSection: (section1: string, section2: string): boolean => {
		const index1 = SECTION_ORDER.getIndex(section1);
		const index2 = SECTION_ORDER.getIndex(section2);
		return index1 < index2;
	},

	isValidSection: (section: string): section is BusinessPlanSection => {
		return BUSINESS_PLAN_SECTIONS.includes(section as BusinessPlanSection);
	},
};

// Utiliser le type BusinessPlanSection au lieu de redéfinir SectionName
export type { BusinessPlanSection as SectionName };
