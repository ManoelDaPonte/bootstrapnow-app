// types/12-months.ts
import { QAResponses } from "@/types/shared/qa-section";

// Type pour les mois
export type Month =
	| "Jan"
	| "Feb"
	| "Mar"
	| "Apr"
	| "May"
	| "Jun"
	| "Jul"
	| "Aug"
	| "Sep"
	| "Oct"
	| "Nov"
	| "Dec";

// Type pour une entrée de profit/perte avec index signature pour les mois
export interface ProfitLossEntry {
	id: string;
	category: string;
	[month: string]: string | number; // Pour permettre l'accès dynamique aux mois
}

export type ProfitLossSection = "revenue" | "expenses";

export interface ProfitLossData {
	revenue: ProfitLossEntry[];
	expenses: ProfitLossEntry[];
}

export interface MonthlyProjectionData {
	data: ProfitLossData;
	qaResponses: QAResponses;
}

export interface MonthlyProjectionResponse {
	data: ProfitLossData;
	qaResponses: QAResponses;
	timestamp?: string;
}

export interface SaveMonthlyProjectionRequest {
	data: ProfitLossData;
	qaResponses: QAResponses;
}

// Types pour les données du graphique
export interface ChartDataPoint {
	name: string;
	Revenue: number;
	Expenses: number;
	Profit: number;
}

// Types pour les tabs
export type TabValue = "overview" | "details";

// Types pour le CustomTooltip
export interface CustomTooltipProps {
	active?: boolean;
	payload?: Array<{
		value: number;
		name: string;
		color: string;
	}>;
	label?: string;
}

// Types pour les composants
export interface TableComponentProps {
	section: ProfitLossSection;
	data: ProfitLossEntry[];
	onUpdate: (
		section: ProfitLossSection,
		id: string,
		field: string,
		value: string | number
	) => void;
	onRemove: (section: ProfitLossSection, id: string) => void;
}

export interface NoDataCardProps {
	message: string;
	buttonText: string;
	onClick: () => void;
}

// Types pour les hooks et fonctions utilitaires
export interface UseProfitLossDataReturn {
	profitLossData: ProfitLossData;
	qaResponses: QAResponses;
	isLoading: boolean;
	isSaving: boolean;
	hasUnsavedChanges: boolean;
	handleUpdateData: (newData: ProfitLossData) => void;
	saveChanges: () => Promise<void>;
	handleQAResponseChange: (categoryId: string, response: string) => void;
	handleQAResponseSave: (
		categoryId: string,
		response: string
	) => Promise<void>;
}

// Type pour les mises à jour de données
export type UpdateRowFunction = (
	section: ProfitLossSection,
	id: string,
	field: string,
	value: string | number
) => void;

export type AddRowFunction = (section: ProfitLossSection) => void;

export type RemoveRowFunction = (
	section: ProfitLossSection,
	id: string
) => void;
