export interface ProfitLossEntry {
	id: string;
	category: string;
	[month: string]: number | string;
}

export interface ProfitLossData {
	revenue: ProfitLossEntry[];
	expenses: ProfitLossEntry[];
}
