// types/profit-loss.ts
export interface ProfitLossEntry {
	id: string;
	category: string;
	"Year 1": number;
	"Year 2": number;
	"Year 3": number;
}

export interface ProfitLossData {
	revenue: ProfitLossEntry[];
	expenses: ProfitLossEntry[];
}
