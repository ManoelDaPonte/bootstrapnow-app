import React from "react";
import { AnsoffCard, AnsoffData } from "@/types/ansoff";

type AnsoffCategory = keyof Omit<AnsoffData, "lastAnalysis" | "lastUpdated">;

const ANSOFF_COLORS = {
	penetration: "bg-blue-50 border-blue-200 hover:bg-blue-100",
	development_market: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
	development_product: "bg-orange-50 border-orange-200 hover:bg-orange-100",
	diversification: "bg-purple-50 border-purple-200 hover:bg-purple-100",
};

const ANSOFF_HEADERS = {
	penetration: { title: "Pénétration du marché", color: "text-blue-700" },
	development_market: {
		title: "Développement du marché",
		color: "text-emerald-700",
	},
	development_product: {
		title: "Développement produit",
		color: "text-orange-700",
	},
	diversification: { title: "Diversification", color: "text-purple-700" },
};

interface AnsoffSectionProps {
	category: AnsoffCategory;
	title: string;
	description: string;
	cards: AnsoffCard[];
	onAddCard: (category: AnsoffCategory) => void;
	onEditCard: (category: AnsoffCategory, card: AnsoffCard) => void;
}

export const AnsoffSection: React.FC<AnsoffSectionProps> = ({
	category,
	title,
	description,
	cards,
	onAddCard,
	onEditCard,
}) => {
	return (
		<div
			className={`flex flex-col h-full p-6 border rounded-xl ${ANSOFF_COLORS[category]} transition-all duration-200`}
		>
			{/* En-tête fixe */}
			<div className="flex-none">
				<div className="flex justify-between items-center mb-4">
					<h3
						className={`text-xl font-bold ${ANSOFF_HEADERS[category].color}`}
					>
						{title}
					</h3>
					<button
						onClick={() => onAddCard(category)}
						className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center gap-1 text-sm font-medium shadow-sm"
					>
						+ Stratégie
					</button>
				</div>
				<p className="text-sm text-gray-600 mb-4">{description}</p>
			</div>

			{/* Conteneur des cartes avec défilement */}
			<div className="flex-1 min-h-0 relative">
				<div className="absolute inset-0 overflow-y-auto pr-2">
					<div className="space-y-3">
						{cards &&
							cards.map((card) => (
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

export default AnsoffSection;
