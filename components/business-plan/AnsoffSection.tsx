import React from "react";
import { AnsoffCard, AnsoffData } from "@/types/ansoff";
import { PlusCircle } from "lucide-react";

type AnsoffCategory = keyof Omit<AnsoffData, "lastAnalysis" | "lastUpdated">;

interface AnsoffSectionProps {
	category: AnsoffCategory;
	title: string;
	cards: AnsoffCard[];
	onAddCard: (category: AnsoffCategory) => void;
	onEditCard: (category: AnsoffCategory, card: AnsoffCard) => void;
}

// Style mapping adapté aux catégories Ansoff
const SECTION_STYLES: Record<AnsoffCategory, string> = {
	penetration: "bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/10",
	development_product:
		"bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/10",
	development_market:
		"bg-orange-500/5 hover:bg-orange-500/10 border-orange-500/10",
	diversification:
		"bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/10",
};

const HEADER_STYLES: Record<AnsoffCategory, string> = {
	penetration: "text-blue-500/70 dark:text-blue-400",
	development_product: "text-emerald-500/70 dark:text-emerald-400",
	development_market: "text-orange-500/70 dark:text-orange-400",
	diversification: "text-purple-500/70 dark:text-purple-400",
};

export const AnsoffSection: React.FC<AnsoffSectionProps> = ({
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
