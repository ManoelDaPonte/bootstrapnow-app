// types/funnel.ts
export interface FunnelCard {
	id: string;
	title: string;
	description: string;
}

export interface FunnelSection {
	id: number;
	title: string;
	size: number;
	cards: FunnelCard[];
	color: string;
}

export type EditingCard = {
	sectionId: number;
	card: FunnelCard;
} | null;
