// lib/business-plan/config/twelve-months.ts
import { ProfitLossData } from "@/types/12-months";

export const months = Array.from({ length: 12 }, (_, i) => `M${i + 1}`);

export const INITIAL_PROFIT_LOSS_DATA: ProfitLossData = {
	revenue: [
		{
			id: "rev1",
			category: "Product Sales",
			...Object.fromEntries(months.map((m) => [m, 10000])),
		},
		{
			id: "rev2",
			category: "Service Revenue",
			...Object.fromEntries(months.map((m) => [m, 5000])),
		},
	],
	expenses: [
		{
			id: "exp1",
			category: "Operating Expenses",
			...Object.fromEntries(months.map((m) => [m, 8000])),
		},
		{
			id: "exp2",
			category: "Marketing",
			...Object.fromEntries(months.map((m) => [m, 2000])),
		},
	],
};
