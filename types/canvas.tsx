// types/canvas.ts

export interface CanvasCard {
	id: number;
	title: string;
	description: string;
}

export interface CanvasData {
	keyPartners: CanvasCard[];
	keyActivities: CanvasCard[];
	keyResources: CanvasCard[];
	valueProposition: CanvasCard[];
	customerRelationships: CanvasCard[];
	channels: CanvasCard[];
	customerSegments: CanvasCard[];
	costStructure: CanvasCard[];
	revenueStreams: CanvasCard[];
	lastAnalysis?: string;
	lastUpdated?: string;
}

export interface ModalState {
	open: boolean;
	category: string;
	card: CanvasCard;
}

// Types spécifiques pour la gestion du stockage
export type CanvasStorageData = {
	cards: CanvasData;
	version: number;
};

// Types pour les actions de mise à jour
export type CanvasCategory = keyof Omit<
	CanvasData,
	"lastAnalysis" | "lastUpdated"
>;

export type StorageKey = `canvas_${string}`;

// Type pour le contexte si nécessaire plus tard
export interface CanvasContextType {
	cards: CanvasData;
	handleSaveCard: (category: CanvasCategory, card: CanvasCard) => void;
	handleDeleteCard: (category: CanvasCategory, cardId: number) => void;
	loading: boolean;
}
