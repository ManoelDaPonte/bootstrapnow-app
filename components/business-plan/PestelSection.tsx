import React from "react";
import { PestelData, PestelCard } from "@/types/pestel";
import { PlusCircle } from "lucide-react";

type PestelCategory = keyof Omit<PestelData, "lastAnalysis" | "lastUpdated">;

interface PestelSectionProps {
	category: PestelCategory;
	title: string;
	cards: PestelCard[];
	onAddCard: (category: PestelCategory) => void;
	onEditCard: (category: PestelCategory, card: PestelCard) => void;
}

// Style mapping adapté pour une meilleure cohérence avec le Canvas et Marketing Mix
const SECTION_STYLES = {
	political: "bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/10",
	economic: "bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/10",
	social: "bg-orange-500/5 hover:bg-orange-500/10 border-orange-500/10",
	technological:
		"bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/10",
	environmental: "bg-pink-500/5 hover:bg-pink-500/10 border-pink-500/10",
	legal: "bg-indigo-500/5 hover:bg-indigo-500/10 border-indigo-500/10",
};

const HEADER_STYLES = {
	political: "text-blue-500/70 dark:text-blue-400",
	economic: "text-emerald-500/70 dark:text-emerald-400",
	social: "text-orange-500/70 dark:text-orange-400",
	technological: "text-purple-500/70 dark:text-purple-400",
	environmental: "text-pink-500/70 dark:text-pink-400",
	legal: "text-indigo-500/70 dark:text-indigo-400",
};

export const PestelSection: React.FC<PestelSectionProps> = ({
	category,
	title,
	cards = [],
	onAddCard,
	onEditCard,
}) => {
	return (
		<div
			className={`h-96 ${SECTION_STYLES[category]} flex flex-col p-4 border rounded-xl`}
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

export default PestelSection;
