import React from "react";
import { Plus, Info } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	// FunnelSection,
	// FunnelCard,
	FunnelChartProps,
} from "@/types/funnel-chart";
import { FUNNEL_SECTION_INFO } from "@/lib/business-plan/config/funnel-chart";

// Style mapping pour les différentes sections de l'entonnoir
const FUNNEL_STYLES = {
	awareness: "from-blue-500/5 to-blue-500/10 border-blue-500/20",
	interest: "from-purple-500/5 to-purple-500/10 border-purple-500/20",
	consideration: "from-pink-500/5 to-pink-500/10 border-pink-500/20",
	evaluation: "from-orange-500/5 to-orange-500/10 border-orange-500/20",
	purchase: "from-emerald-500/5 to-emerald-500/10 border-emerald-500/20",
};

const HEADER_STYLES = {
	awareness: "text-blue-500/70 dark:text-blue-400",
	interest: "text-purple-500/70 dark:text-purple-400",
	consideration: "text-pink-500/70 dark:text-pink-400",
	evaluation: "text-orange-500/70 dark:text-orange-400",
	purchase: "text-emerald-500/70 dark:text-emerald-400",
};

const FunnelChart: React.FC<FunnelChartProps> = ({
	sections,
	onSizeChange,
	onAddCard,
	onEditCard,
}) => {
	const MIN_SIZE = 30;

	return (
		<div className="max-w-4xl mx-auto p-4 space-y-6 w-full">
			<div className="space-y-6">
				{sections.map((section, index) => (
					<div
						key={section.id}
						className="relative transition-all duration-300 ease-in-out"
						style={{
							width: `${section.size}%`,
							marginLeft: `${(100 - section.size) / 2}%`,
						}}
					>
						<div
							className={`p-4 rounded-xl border bg-gradient-to-r shadow-sm backdrop-blur-sm
							 ${FUNNEL_STYLES[section.id as unknown as keyof typeof FUNNEL_STYLES]}`}
						>
							<div className="space-y-4 mb-4">
								<div className="flex justify-between items-center">
									<div className="flex items-center gap-2">
										<h3
											className={`text-lg font-semibold ${
												HEADER_STYLES[
													section.id as unknown as keyof typeof HEADER_STYLES
												]
											}`}
										>
											{section.title}
										</h3>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger>
													<Info className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
												</TooltipTrigger>
												<TooltipContent>
													<p className="max-w-xs text-sm">
														{
															FUNNEL_SECTION_INFO[
																section.id as keyof typeof FUNNEL_SECTION_INFO
															]
														}
													</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
									<button
										onClick={() => onAddCard(section.id)}
										className="text-muted-foreground hover:text-foreground 
								 transition-colors duration-200"
										title="Ajouter un élément"
									>
										<Plus className="h-5 w-5" />
									</button>
								</div>
								<Slider
									defaultValue={[section.size]}
									min={MIN_SIZE}
									max={
										index === 0
											? 100
											: sections[index - 1].size
									}
									step={1}
									onValueChange={([value]) =>
										onSizeChange(section.id, value)
									}
									className="py-2"
								/>
							</div>

							<div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2">
								{section.cards.map((card) => (
									<div
										key={card.id}
										onClick={() =>
											onEditCard(section.id, card)
										}
										className="group px-3 py-2 bg-background/80 backdrop-blur-sm 
								 border border-border/50 rounded-lg hover:shadow-sm 
								 transition-all duration-200 cursor-pointer hover:bg-background"
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
				))}
			</div>
		</div>
	);
};

export default FunnelChart;
