// components/business-plan/swot/SwotSection.tsx
import React from "react";
import { SwotCard, SwotData } from "@/types/swot";

type SwotCategory = keyof Omit<SwotData, "lastAnalysis" | "lastUpdated">;

// Définition des couleurs SWOT traditionnelles
const SWOT_COLORS = {
	strengths: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
	weaknesses: "bg-red-50 border-red-200 hover:bg-red-100",
	opportunities: "bg-blue-50 border-blue-200 hover:bg-blue-100",
	threats: "bg-orange-50 border-orange-200 hover:bg-orange-100",
};

const SWOT_HEADERS = {
	strengths: { title: "Forces", color: "text-emerald-700" },
	weaknesses: { title: "Faiblesses", color: "text-red-700" },
	opportunities: { title: "Opportunités", color: "text-blue-700" },
	threats: { title: "Menaces", color: "text-orange-700" },
};

interface SwotSectionProps {
	category: SwotCategory;
	title: string;
	description: string;
	cards: SwotCard[];
	onAddCard: (category: SwotCategory) => void;
	onEditCard: (category: SwotCategory, card: SwotCard) => void;
}

export const SwotSection: React.FC<SwotSectionProps> = ({
	category,
	title,
	description,
	cards,
	onAddCard,
	onEditCard,
}) => {
	return (
		<div
			className={`flex flex-col h-full p-6 border rounded-xl overflow-hidden ${SWOT_COLORS[category]} transition-all duration-200`}
		>
			{/* En-tête fixe */}
			<div className="flex-none">
				<div className="flex justify-between items-center mb-4">
					<h3
						className={`text-xl font-bold ${SWOT_HEADERS[category].color}`}
					>
						{title}
					</h3>
					<button
						onClick={() => onAddCard(category)}
						className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center gap-1 text-sm font-medium shadow-sm"
					>
						+ Ajouter
					</button>
				</div>
				{/* <p className="text-sm text-gray-600 mb-4">{description}</p> */}
			</div>

			{/* Conteneur des cartes avec défilement */}
			<div className="flex-1 min-h-0 relative">
				<div className="absolute inset-0 overflow-y-auto pr-2">
					<div className="space-y-3">
						{cards.map((card) => (
							<div
								key={card.id}
								onClick={() => onEditCard(category, card)}
								className="p-3 border bg-white rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer flex items-start gap-4"
							>
								<h4 className="flex-none font-semibold text-gray-800 w-1/3">
									{card.title}
								</h4>
								<p className="text-sm text-gray-600 leading-relaxed line-clamp-2 flex-1">
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
export default SwotSection;
