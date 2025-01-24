import React from "react";
import { MarketingMixCard, MarketingMixData } from "@/types/marketing-mix";

type MarketingMixCategory = keyof Omit<MarketingMixData, "lastUpdated">;

// Définition des couleurs et styles pour chaque section
const SECTION_STYLES = {
	product: "bg-blue-50 border-blue-200 hover:bg-blue-100",
	price: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
	place: "bg-purple-50 border-purple-200 hover:bg-purple-100",
	promotion: "bg-orange-50 border-orange-200 hover:bg-orange-100",
	people: "bg-red-50 border-red-200 hover:bg-red-100",
	process: "bg-cyan-50 border-cyan-200 hover:bg-cyan-100",
	physical_evidence: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
} as const;

interface MarketingMixSectionProps {
	category: MarketingMixCategory;
	title: string;
	description: string;
	cards: MarketingMixCard[];
	onAddCard: (category: MarketingMixCategory) => void;
	onEditCard: (
		category: MarketingMixCategory,
		card: MarketingMixCard
	) => void;
	headerColor: string;
}

export const MarketingMixSection: React.FC<MarketingMixSectionProps> = ({
	category,
	title,
	description,
	cards = [],
	onAddCard,
	onEditCard,
	headerColor,
}) => {
	return (
		<div
			className={`flex flex-col h-full p-6 border rounded-xl overflow-hidden ${SECTION_STYLES[category]} transition-all duration-200`}
		>
			{/* En-tête fixe */}
			<div className="flex-none">
				<div className="flex justify-between items-center mb-4">
					<h3 className={`text-lg font-bold ${headerColor}`}>
						{title}
					</h3>
					<button
						onClick={() => onAddCard(category)}
						className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center gap-1 text-sm font-medium shadow-sm"
					>
						+ Ajouter
					</button>
				</div>
				<p className="text-sm text-gray-600 mb-4 line-clamp-2">
					{description}
				</p>
			</div>

			{/* Conteneur des cartes avec défilement */}
			<div className="flex-1 min-h-0 relative">
				<div className="absolute inset-0 overflow-y-auto pr-2">
					<div className="space-y-3">
						{cards.map((card) => (
							<div
								key={card.id}
								onClick={() => onEditCard(category, card)}
								className="group p-4 border bg-white/90 backdrop-blur-sm rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
							>
								<div className="flex items-start gap-3">
									<div className="flex-1">
										<h4 className="font-medium text-gray-800 mb-1">
											{card.title}
										</h4>
										<p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
											{card.description}
										</p>
									</div>
									<span
										className={`${headerColor} opacity-0 group-hover:opacity-100 transition-opacity text-sm`}
									>
										➜
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MarketingMixSection;
