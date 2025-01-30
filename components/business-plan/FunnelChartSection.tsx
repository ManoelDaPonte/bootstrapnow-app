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
	FunnelSection,
	FunnelCard,
	FunnelChartProps,
} from "@/types/funnel-chart";
import { FUNNEL_SECTION_INFO } from "@/lib/business-plan/config/funnel-chart";

const FunnelChart: React.FC<FunnelChartProps> = ({
	sections,
	onSizeChange,
	onAddCard,
	onEditCard,
}) => {
	const MIN_SIZE = 30;

	return (
		<div className="max-w-4xl mx-auto p-4 space-y-4 w-full">
			<div className="space-y-4">
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
							className={`p-4 rounded-lg border border-gray-200 shadow-sm bg-gradient-to-r ${section.color}`}
						>
							<div className="space-y-4 mb-4">
								<div className="flex justify-between items-center">
									<div className="flex items-center space-x-2">
										<h3 className="text-lg font-semibold text-gray-800">
											{section.title}
										</h3>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger>
													<Info className="h-4 w-4 text-gray-500" />
												</TooltipTrigger>
												<TooltipContent>
													<p className="max-w-xs">
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
										className="bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-white transition-colors duration-200 flex items-center gap-1 text-sm font-medium shadow-sm"
									>
										<Plus className="h-4 w-4" />
										Ajouter
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
								/>
							</div>

							<div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto pr-2">
								{section.cards.map((card) => (
									<div
										key={card.id}
										onClick={() =>
											onEditCard(section.id, card)
										}
										className="p-3 bg-white/90 backdrop-blur-sm border rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
									>
										<h4 className="font-semibold text-gray-800 mb-2">
											{card.title}
										</h4>
										<p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
											{card.description}
										</p>
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
