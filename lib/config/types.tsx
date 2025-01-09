// lib/config/types.tsx

import { ReactElement, JSX } from "react";

/**
 * Interface pour une carte (Card)
 */
export interface Card {
	id: string;
	title: string;
	description: string;
}

/**
 * Interface pour l'état de la modale
 */
export interface ModalState {
	open: boolean;
	sectionId: string | null;
	selectedCard: Card | TeamMember | null; // Union de types
	mode?: "info" | "edit" | "add"; // Ajout de "add"
}

/**
 * Interface pour une section de description
 */
export interface DescriptionSection {
	header: string;
	content?: string;
	list?: string[] | JSX.Element[];
}

/**
 * Interface pour le contenu de la description
 */
export interface DescriptionContent {
	title: string;
	sections: DescriptionSection[];
}

/**
 * Interface pour la configuration d'une section
 */
export interface SectionConfig {
	id: string;
	title: string;
	icon: ReactElement;
	gridRow?: string; // Optionnel
	gridColumn?: string; // Optionnel
	className?: string; // Optionnel
	titleClass?: string; // Optionnel
}
/**
 * Interface pour un membre de l'équipe
 */
export interface TeamMember {
	id: string;
	name: string;
	role: string;
	skills: Record<string, string>;
}

/**
 * Interface pour une carte SWOT
 */
export interface SwotCard {
	id: string;
	title: string;
	description: string;
}

/**
 * Interface pour la configuration d'une section SWOT
 */
export interface SwotSectionConfig {
	id: string;
	title: string;
	icon: ReactElement;
	className?: string; // Optionnel
	titleClass?: string; // Optionnel
}

/**
 * Interface pour les descriptions courtes des sections SWOT
 */
export interface SwotDescriptions {
	[key: string]: string;
}
