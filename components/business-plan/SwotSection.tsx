import React from "react";
import { SwotCard, SwotData } from "@/types/swot";
import { PlusCircle } from "lucide-react";

type SwotCategory = keyof Omit<SwotData, "lastAnalysis" | "lastUpdated">;

// Style mapping adapté pour une meilleure cohérence avec les autres sections
const SECTION_STYLES = {
	strengths: "bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/10",
	weaknesses: "bg-red-500/5 hover:bg-red-500/10 border-red-500/10",
	opportunities: "bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/10",
	threats: "bg-orange-500/5 hover:bg-orange-500/10 border-orange-500/10",
};

const HEADER_STYLES = {
	strengths: "text-emerald-500/70 dark:text-emerald-400",
	weaknesses: "text-red-500/70 dark:text-red-400",
	opportunities: "text-blue-500/70 dark:text-blue-400",
	threats: "text-orange-500/70 dark:text-orange-400",
};

interface SwotSectionProps {
	category: SwotCategory;
	title: string;
	cards: SwotCard[];
	onAddCard: (category: SwotCategory) => void;
	onEditCard: (category: SwotCategory, card: SwotCard) => void;
}

export const SwotSection: React.FC<SwotSectionProps> = ({
	category,
	title,
	cards = [],
	onAddCard,
	onEditCard,
}) => {
	return (
		<div
			className={`h-full ${SECTION_STYLES[category]} flex flex-col p-4 border rounded-xl`}
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
			<div className="flex-1 overflow-hidden">
				<div className="h-full overflow-y-auto space-y-2 pr-2">
					{cards.map((card) => (
						<div
							key={card.id}
							onClick={() => onEditCard(category, card)}
							className="group px-3 py-2 border border-border/50 bg-background/50 
                                     hover:bg-background rounded-lg transition-all duration-200 
                                     cursor-pointer hover:shadow-sm"
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
