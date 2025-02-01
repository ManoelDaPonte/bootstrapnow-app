// types/startup-expenses.ts

// Types de base
export interface FinancialEntry {
	id: string;
	name: string;
	amount: number;
	type: string;
	category?: string;
}

export interface CategoryDefinition {
	id: string;
	name: string;
	color: string;
}

export interface Risk {
	category: string;
	probability: number;
	impact: number;
	mitigation: string;
}

// Structure des données financières
export interface FinancialData {
	capital: {
		investors: FinancialEntry[];
		loans: FinancialEntry[];
	};
	expenses: {
		categories: FinancialEntry[];
	};
	revenue: number;
	projections: {
		year1: number;
		year2: number;
		year3: number;
	};
	risks: Risk[];
	categoryDefinitions: {
		investors: CategoryDefinition[];
		loans: CategoryDefinition[];
		expenses: CategoryDefinition[];
	};
}

// Props pour les composants
export interface OverviewProps {
	data: FinancialData;
}

export interface DetailsProps {
	data: FinancialData;
	onUpdate: (
		section: keyof FinancialData["capital"] | "expenses",
		id: string,
		field: keyof FinancialEntry,
		value: string | number
	) => void;
	onAdd: (section: keyof FinancialData["capital"] | "expenses") => void;
	onRemove: (
		section: keyof FinancialData["capital"] | "expenses",
		id: string
	) => void;
}
export interface RiskAssessmentProps {
	risks: Risk[];
	onUpdate: (
		index: number,
		field: keyof Risk,
		value: string | number
	) => void;
	onAdd: (risk: Risk) => void;
	onRemove: (index: number) => void;
}
