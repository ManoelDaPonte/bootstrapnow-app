import React from "react";
import { CanvasData, CanvasCard } from "@/types/canvas";
import {
	CANVAS_COLORS,
	CANVAS_HEADERS,
} from "@/lib/business-plan/config/canvas";

type CanvasCategory = keyof Omit<CanvasData, "lastAnalysis" | "lastUpdated">;

interface CanvasSectionProps {
	category: CanvasCategory;
	title: string;
	description: string;
	cards: CanvasCard[];
	onAddCard: (category: CanvasCategory) => void;
	onEditCard: (category: CanvasCategory, card: CanvasCard) => void;
}

export const CanvasSection: React.FC<CanvasSectionProps> = ({
	category,
	title,
	description,
	cards,
	onAddCard,
	onEditCard,
}) => {
	return (
		<div
			className={`flex flex-col h-full p-6 border rounded-xl overflow-hidden ${CANVAS_COLORS[category]} transition-all duration-200`}
		>
			{/* En-tête fixe */}
			<div className="flex-none">
				<div className="flex justify-between items-center mb-4">
					<h3
						className={`text-xl font-bold ${CANVAS_HEADERS[category].color}`}
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

			{/* Conteneur des cartes avec défilement */}
			<div className="flex-1 min-h-0 relative">
				<div className="absolute inset-0 overflow-y-auto pr-2">
					<div className="space-y-3">
						{cards.map((card) => (
							<div
								key={card.id}
								onClick={() => onEditCard(category, card)}
								className="p-3 border bg-white/80 backdrop-blur-sm rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
							>
								<h4 className="font-semibold text-gray-800 mb-2">
									{card.title}
								</h4>
								<p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
									{card.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
