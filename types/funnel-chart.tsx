// types/funnel-chart.ts
import { BaseCard } from "@/types/shared/card-modal";

// Type pour la carte en cours d'édition
export type EditingCard = {
	sectionId: FunnelSectionId;
	card: FunnelCard;
} | null;

// Types de base
export interface FunnelCard extends BaseCard {
	id: number;
	title: string;
	description: string;
}

// Utilisation d'un type littéral pour les IDs de section
export type FunnelSectionId = 1 | 2 | 3 | 4 | 5;

// Interface principale pour une section
export interface FunnelSection {
	id: FunnelSectionId;
	title: string;
	size: number;
	cards: FunnelCard[];
	color: string;
}

// Configuration et valeurs par défaut
export const FUNNEL_SECTIONS_CONFIG = {
	MIN_SIZE: 30,
	MAX_SIZE: 100,
	DEFAULT_SECTIONS: [
		{
			id: 1,
			title: "Visibilité",
			size: 100,
			cards: [],
			color: "from-blue-50 to-blue-100",
		},
		{
			id: 2,
			title: "Intérêt",
			size: 80,
			cards: [],
			color: "from-green-50 to-green-100",
		},
		{
			id: 3,
			title: "Considération",
			size: 60,
			cards: [],
			color: "from-yellow-50 to-yellow-100",
		},
		{
			id: 4,
			title: "Intention",
			size: 40,
			cards: [],
			color: "from-orange-50 to-orange-100",
		},
		{
			id: 5,
			title: "Achat",
			size: 30,
			cards: [],
			color: "from-red-50 to-red-100",
		},
	] as const,
} as const;

// Types pour les props du composant
export interface FunnelChartProps {
	sections: FunnelSection[];
	onSizeChange: (sectionId: FunnelSectionId, newSize: number) => void;
	onAddCard: (sectionId: FunnelSectionId) => void;
	onEditCard: (sectionId: FunnelSectionId, card: FunnelCard) => void;
}

// Types pour le stockage
// Type pour les descriptions détaillées des sections
export type FunnelModalDetailedDescriptions = {
	[K in FunnelSectionId]: {
		title: string;
		content: string;
		examples: string[];
	};
};

export interface FunnelStorageOperations {
	save: (sections: FunnelSection[]) => Promise<void>;
	load: () => Promise<FunnelSection[]>;
	clear: () => Promise<void>;
}
