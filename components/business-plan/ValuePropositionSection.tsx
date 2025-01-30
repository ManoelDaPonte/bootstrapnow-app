import React from "react";
import { HelpCircle } from "lucide-react";
import {
	ValuePropositionCard,
	ValuePropositionCategory,
} from "@/types/value-proposition";
import { VALUE_PROPOSITION_TOOLTIPS } from "@/lib/business-plan/config/value-proposition";

interface ValuePropositionSectionProps {
	title: string;
	items: ValuePropositionCard[];
	onAddCard: (category: ValuePropositionCategory) => void;
	onEditCard: (
		category: ValuePropositionCategory,
		card: ValuePropositionCard
	) => void;
	onDeleteItem: (category: ValuePropositionCategory, id: number) => void; // Mise à jour ici
	className: string;
	sectionKey: ValuePropositionCategory;
}

export const ValuePropositionSection: React.FC<
	ValuePropositionSectionProps
> = ({
	title,
	items,
	onAddCard,
	onEditCard,
	onDeleteItem,
	className,
	sectionKey,
}) => {
	return (
		<div className={`p-3 relative group ${className}`}>
			<div className="flex items-center justify-between mb-2">
				<h3 className="text-sm font-semibold text-gray-800">{title}</h3>
				<div className="flex items-center gap-2">
					<button
						onClick={() => onAddCard(sectionKey)}
						className="bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-white transition-colors duration-200 flex items-center gap-1 text-sm font-medium shadow-sm"
					>
						+ Ajouter
					</button>
					<div className="relative">
						<HelpCircle
							size={16}
							className="text-gray-400 hover:text-gray-600 cursor-help"
						/>
						<div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-white/90 backdrop-blur-sm rounded shadow-lg text-xs text-gray-600 hidden group-hover:block z-10">
							{VALUE_PROPOSITION_TOOLTIPS[sectionKey]}
						</div>
					</div>
				</div>
			</div>

			{/* Liste des items */}
			<div className="space-y-2">
				{items.map((item) => (
					<div
						key={item.id}
						onClick={() => onEditCard(sectionKey, item)}
						className="p-3 border bg-white/90 backdrop-blur-sm rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
					>
						<h4 className="font-medium text-gray-800 mb-1">
							{item.title}
						</h4>
						<p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
							{item.description}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};
