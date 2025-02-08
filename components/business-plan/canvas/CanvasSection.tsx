import React from "react";
import { CanvasData, CanvasCard } from "@/types/canvas";
import { PlusCircle } from "lucide-react";

type CanvasCategory = keyof Omit<CanvasData, "lastAnalysis" | "lastUpdated">;

interface CanvasSectionProps {
	category: CanvasCategory;
	title: string;
	description: string;
	cards: CanvasCard[];
	onAddCard: (category: CanvasCategory) => void;
	onEditCard: (category: CanvasCategory, card: CanvasCard) => void;
}

// Style mapping adapté pour le mode sombre
const SECTION_STYLES = {
	keyPartners: "bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/10",
	keyActivities:
		"bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/10",
	keyResources: "bg-orange-500/5 hover:bg-orange-500/10 border-orange-500/10",
	valueProposition:
		"bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/10",
	customerRelationships:
		"bg-pink-500/5 hover:bg-pink-500/10 border-pink-500/10",
	channels: "bg-indigo-500/5 hover:bg-indigo-500/10 border-indigo-500/10",
	customerSegments: "bg-rose-500/5 hover:bg-rose-500/10 border-rose-500/10",
	costStructure: "bg-red-500/5 hover:bg-red-500/10 border-red-500/10",
	revenueStreams: "bg-green-500/5 hover:bg-green-500/10 border-green-500/10",
};

const HEADER_STYLES = {
	keyPartners: "text-blue-500/70 dark:text-blue-400",
	keyActivities: "text-emerald-500/70 dark:text-emerald-400",
	keyResources: "text-orange-500/70 dark:text-orange-400",
	valueProposition: "text-purple-500/70 dark:text-purple-400",
	customerRelationships: "text-pink-500/70 dark:text-pink-400",
	channels: "text-indigo-500/70 dark:text-indigo-400",
	customerSegments: "text-rose-500/70 dark:text-rose-400",
	costStructure: "text-red-500/70 dark:text-red-400",
	revenueStreams: "text-green-500/70 dark:text-green-400",
};

export const CanvasSection: React.FC<CanvasSectionProps> = ({
	category,
	title,
	cards,
	onAddCard,
	onEditCard,
}) => {
	return (
		<div
			className={`flex flex-col h-full p-4 border rounded-xl overflow-hidden ${SECTION_STYLES[category]} transition-all duration-200`}
		>
			{/* Header Section */}
			<div className="flex-none flex justify-between items-center mb-4">
				<h3
					className={`text-lg font-semibold ${HEADER_STYLES[category]}`}
				>
					{title}
				</h3>
				<button
					onClick={() => onAddCard(category)}
					className="text-muted-foreground hover:text-foreground transition-colors duration-200"
					title="Ajouter un élément"
				>
					<PlusCircle size={20} />
				</button>
			</div>

			{/* Cards Container */}
			<div className="flex-1 min-h-0 relative">
				<div className="absolute inset-0 overflow-y-auto space-y-2 pr-2">
					{cards.map((card) => (
						<div
							key={card.id}
							onClick={() => onEditCard(category, card)}
							className="group px-3 py-2 border border-border/50 bg-background/50 
                       hover:bg-background rounded-lg transition-all duration-200 
                       cursor-pointer hover:shadow-sm max-h-20 overflow-hidden"
						>
							<h4
								className="font-medium text-sm text-foreground/80 group-hover:text-foreground 
                         transition-colors duration-200 line-clamp-1"
							>
								{card.title}
							</h4>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CanvasSection;
