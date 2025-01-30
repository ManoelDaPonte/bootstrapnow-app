import React from "react";
import { MarketingMixCard, MarketingMixData } from "@/types/marketing-mix";
import {
	MARKETING_MIX_COLORS,
	MARKETING_MIX_HEADERS,
} from "@/lib/business-plan/config/marketing-mix";

type MarketingMixCategory = keyof Omit<
	MarketingMixData,
	"lastAnalysis" | "lastUpdated"
>;

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
}

export const MarketingMixSection: React.FC<MarketingMixSectionProps> = ({
	category,
	title,
	description,
	cards = [],
	onAddCard,
	onEditCard,
}) => {
	return (
		<div
			className={`flex flex-col h-full p-6 border rounded-xl overflow-hidden ${MARKETING_MIX_COLORS[category]} transition-all duration-200`}
		>
			{/* En-tête fixe */}
			<div className="flex-none">
				<div className="flex justify-between items-center mb-4">
					<h3
						className={`text-lg font-bold ${MARKETING_MIX_HEADERS[category].color}`}
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
										className={`${MARKETING_MIX_HEADERS[category].color} opacity-0 group-hover:opacity-100 transition-opacity text-sm`}
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
