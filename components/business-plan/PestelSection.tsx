import React from "react";
import { PestelData, PestelCard } from "@/types/pestel";
import {
	PESTEL_COLORS,
	PESTEL_HEADERS,
} from "@/lib/business-plan/config/pestel";

type PestelCategory = keyof Omit<PestelData, "lastAnalysis" | "lastUpdated">;

interface PestelSectionProps {
	category: PestelCategory;
	title: string;
	description: string;
	cards: PestelCard[];
	onAddCard: (category: PestelCategory) => void;
	onEditCard: (category: PestelCategory, card: PestelCard) => void;
}

export const PestelSection: React.FC<PestelSectionProps> = ({
	category,
	title,
	description,
	cards,
	onAddCard,
	onEditCard,
}) => {
	return (
		<div
			className={`flex flex-col h-[400px] min-h-[400px] p-6 border rounded-xl ${PESTEL_COLORS[category]} transition-all duration-200`}
		>
			{/* En-tête fixe */}
			<div className="flex-none">
				<div className="flex justify-between items-center mb-4">
					<h3
						className={`text-xl font-bold ${PESTEL_HEADERS[category].color}`}
					>
						{title}
					</h3>
					<button
						onClick={() => onAddCard(category)}
						className="bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-white transition-colors duration-200 flex items-center gap-1 text-sm font-medium shadow-sm"
					>
						+ Ajouter
					</button>
				</div>
				<p className="text-sm text-gray-600 mb-4">{description}</p>
			</div>

			{/* Conteneur des cartes avec défilement vertical */}
			<div className="flex-1 overflow-y-auto pr-2">
				<div className="space-y-3">
					{cards.map((card) => (
						<div
							key={card.id}
							onClick={() => onEditCard(category, card)}
							className="py-3 px-4 border bg-white/90 backdrop-blur-sm rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
						>
							<h4 className="font-semibold text-gray-800 mb-2">
								{card.title}
							</h4>
							<p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
								{card.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
