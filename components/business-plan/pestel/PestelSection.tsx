// components/business-plan/pestel/PestelSection.tsx
import React from "react";
import { PestelCard } from "@/types/pestel";

const PESTEL_COLORS = {
	political: "bg-purple-50 border-purple-200 hover:bg-purple-100",
	economic: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
	social: "bg-blue-50 border-blue-200 hover:bg-blue-100",
	technological: "bg-orange-50 border-orange-200 hover:bg-orange-100",
	environmental: "bg-green-50 border-green-200 hover:bg-green-100",
	legal: "bg-red-50 border-red-200 hover:bg-red-100",
};

const PESTEL_HEADERS = {
	political: { title: "Politique", color: "text-purple-700" },
	economic: { title: "Économique", color: "text-emerald-700" },
	social: { title: "Social", color: "text-blue-700" },
	technological: { title: "Technologique", color: "text-orange-700" },
	environmental: { title: "Environnemental", color: "text-green-700" },
	legal: { title: "Légal", color: "text-red-700" },
};

interface PestelSectionProps {
	category: keyof typeof PESTEL_COLORS;
	title: string;
	description: string;
	cards: any[];
	onAddCard: (category: keyof typeof PESTEL_COLORS) => void;
	onEditCard: (category: keyof typeof PESTEL_COLORS, card: any) => void;
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
						className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center gap-1 text-sm font-medium shadow-sm"
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
							className="py-3 px-4 border bg-white rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
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

export default PestelSection;
