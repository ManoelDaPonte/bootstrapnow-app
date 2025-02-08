// lib/business-plan/config/profit-loss.ts
import { ProfitLossData } from "@/types/profit-loss";

export const INITIAL_PROFIT_LOSS_DATA: ProfitLossData = {
	revenue: [
		{
			id: "rev1",
			category: "Product Sales",
			"Year 1": 100000,
			"Year 2": 150000,
			"Year 3": 200000,
		},
		{
			id: "rev2",
			category: "Service Revenue",
			"Year 1": 50000,
			"Year 2": 75000,
			"Year 3": 100000,
		},
	],
	expenses: [
		{
			id: "exp1",
			category: "Operating Expenses",
			"Year 1": 80000,
			"Year 2": 100000,
			"Year 3": 120000,
		},
		{
			id: "exp2",
			category: "Marketing",
			"Year 1": 20000,
			"Year 2": 30000,
			"Year 3": 40000,
		},
	],
};
