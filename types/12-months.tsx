// types/12-months.ts

import { QAResponses } from "@/types/shared/qa-section";

export interface ProfitLossEntry {
	id: string;
	category: string;
	[month: string]: number | string;
}

export interface ProfitLossData {
	revenue: ProfitLossEntry[];
	expenses: ProfitLossEntry[];
}

export interface MonthlyProjectionData {
	data: ProfitLossData;
	qaResponses: QAResponses;
}

// Optionnel : vous pouvez aussi ajouter ces types utilitaires
export interface MonthlyProjectionResponse {
	data: ProfitLossData;
	qaResponses: QAResponses;
	timestamp?: string;
}

export interface SaveMonthlyProjectionRequest {
	data: ProfitLossData;
	qaResponses: QAResponses;
}
