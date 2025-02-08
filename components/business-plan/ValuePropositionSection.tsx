import React from "react";
import { PlusCircle } from "lucide-react";
import {
	ValuePropositionCard,
	ValuePropositionCategory,
} from "@/types/value-proposition";

// Style mapping pour les différentes sections
const SECTION_STYLES = {
	customerJobs: "bg-blue-500/5 hover:bg-blue-500/10",
	pains: "bg-red-500/5 hover:bg-red-500/10",
	gains: "bg-emerald-500/5 hover:bg-emerald-500/10",
	products: "bg-purple-500/5 hover:bg-purple-500/10",
	painRelievers: "bg-orange-500/5 hover:bg-orange-500/10",
	gainCreators: "bg-indigo-500/5 hover:bg-indigo-500/10",
};

const HEADER_STYLES = {
	customerJobs: "text-blue-500/70 dark:text-blue-400",
	pains: "text-red-500/70 dark:text-red-400",
	gains: "text-emerald-500/70 dark:text-emerald-400",
	products: "text-purple-500/70 dark:text-purple-400",
	painRelievers: "text-orange-500/70 dark:text-orange-400",
	gainCreators: "text-indigo-500/70 dark:text-indigo-400",
};

interface ValuePropositionSectionProps {
	title: string;
	items: ValuePropositionCard[];
	onAddCard: (category: ValuePropositionCategory) => void;
	onEditCard: (
		category: ValuePropositionCategory,
		card: ValuePropositionCard
	) => void;
	onDeleteItem: (category: ValuePropositionCategory, id: number) => void;
	className: string;
	sectionKey: ValuePropositionCategory;
}

export const ValuePropositionSection: React.FC<
	ValuePropositionSectionProps
> = ({ title, items, onAddCard, onEditCard, className, sectionKey }) => {
	return (
		<div
			className={`p-4 relative group transition-all duration-200 ${className} ${SECTION_STYLES[sectionKey]}`}
		>
			<div className="flex items-center justify-between mb-4">
				<h3
					className={`text-sm font-semibold ${HEADER_STYLES[sectionKey]}`}
				>
					{title}
				</h3>
				<button
					onClick={() => onAddCard(sectionKey)}
					className="text-muted-foreground hover:text-foreground transition-colors duration-200"
					title="Ajouter un élément"
				>
					<PlusCircle size={20} />
				</button>
			</div>

			{/* Cards Container */}
			<div className="space-y-2 overflow-y-auto max-h-[calc(100%-2rem)]">
				{items.map((item) => (
					<div
						key={item.id}
						onClick={() => onEditCard(sectionKey, item)}
						className="group px-3 py-2 border border-border/50 bg-background/50 
                                 hover:bg-background rounded-lg transition-all duration-200 
                                 cursor-pointer hover:shadow-sm"
					>
						<h4
							className="font-medium text-sm text-foreground/80 group-hover:text-foreground 
                                   transition-colors duration-200 line-clamp-1"
						>
							{item.title}
						</h4>
						{item.description && (
							<p className="mt-1 text-xs text-muted-foreground line-clamp-2">
								{item.description}
							</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
};
