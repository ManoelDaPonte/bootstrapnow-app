import React from "react";
import { CanvasCard, CanvasData } from "@/types/canvas";
import { CanvasSection } from "@/components/business-plan/canvas/CanvasSection";
import {
	CANVAS_DESCRIPTIONS,
	CANVAS_HEADERS,
} from "@/lib/business-plan/config/canvas";

type CanvasCategory = keyof Omit<CanvasData, "lastAnalysis" | "lastUpdated">;

interface BusinessModelCanvasProps {
	cards: CanvasData;
	onAddCard: (category: CanvasCategory) => void;
	onEditCard: (category: CanvasCategory, card: CanvasCard) => void;
}

const BusinessModelCanvas: React.FC<BusinessModelCanvasProps> = ({
	cards,
	onAddCard,
	onEditCard,
}) => {
	return (
		<div className="grid grid-cols-5 gap-4 w-full">
			{/* Top Row - Main content */}
			<div className="col-span-5 grid grid-cols-5 gap-4 h-[32rem]">
				{/* Key Partners */}
				<div className="col-span-1 h-full">
					<CanvasSection
						category="keyPartners"
						title={CANVAS_HEADERS.keyPartners.title}
						description={CANVAS_DESCRIPTIONS.keyPartners}
						cards={cards.keyPartners}
						onAddCard={onAddCard}
						onEditCard={onEditCard}
					/>
				</div>

				{/* Key Activities & Resources */}
				<div className="col-span-1 grid grid-rows-2 gap-4 h-full">
					<CanvasSection
						category="keyActivities"
						title={CANVAS_HEADERS.keyActivities.title}
						description={CANVAS_DESCRIPTIONS.keyActivities}
						cards={cards.keyActivities}
						onAddCard={onAddCard}
						onEditCard={onEditCard}
					/>
					<CanvasSection
						category="keyResources"
						title={CANVAS_HEADERS.keyResources.title}
						description={CANVAS_DESCRIPTIONS.keyResources}
						cards={cards.keyResources}
						onAddCard={onAddCard}
						onEditCard={onEditCard}
					/>
				</div>

				{/* Value Proposition */}
				<div className="col-span-1 h-full">
					<CanvasSection
						category="valueProposition"
						title={CANVAS_HEADERS.valueProposition.title}
						description={CANVAS_DESCRIPTIONS.valueProposition}
						cards={cards.valueProposition}
						onAddCard={onAddCard}
						onEditCard={onEditCard}
					/>
				</div>

				{/* Customer Relationships & Channels */}
				<div className="col-span-1 grid grid-rows-2 gap-4 h-full">
					<CanvasSection
						category="customerRelationships"
						title={CANVAS_HEADERS.customerRelationships.title}
						description={CANVAS_DESCRIPTIONS.customerRelationships}
						cards={cards.customerRelationships}
						onAddCard={onAddCard}
						onEditCard={onEditCard}
					/>
					<CanvasSection
						category="channels"
						title={CANVAS_HEADERS.channels.title}
						description={CANVAS_DESCRIPTIONS.channels}
						cards={cards.channels}
						onAddCard={onAddCard}
						onEditCard={onEditCard}
					/>
				</div>

				{/* Customer Segments */}
				<div className="col-span-1 h-full">
					<CanvasSection
						category="customerSegments"
						title={CANVAS_HEADERS.customerSegments.title}
						description={CANVAS_DESCRIPTIONS.customerSegments}
						cards={cards.customerSegments}
						onAddCard={onAddCard}
						onEditCard={onEditCard}
					/>
				</div>
			</div>

			{/* Bottom Row - Cost & Revenue */}
			<div className="col-span-5 grid grid-cols-2 gap-4 h-64">
				{/* Cost Structure */}
				<div className="h-full">
					<CanvasSection
						category="costStructure"
						title={CANVAS_HEADERS.costStructure.title}
						description={CANVAS_DESCRIPTIONS.costStructure}
						cards={cards.costStructure}
						onAddCard={onAddCard}
						onEditCard={onEditCard}
					/>
				</div>

				{/* Revenue Streams */}
				<div className="h-full">
					<CanvasSection
						category="revenueStreams"
						title={CANVAS_HEADERS.revenueStreams.title}
						description={CANVAS_DESCRIPTIONS.revenueStreams}
						cards={cards.revenueStreams}
						onAddCard={onAddCard}
						onEditCard={onEditCard}
					/>
				</div>
			</div>
		</div>
	);
};

export default BusinessModelCanvas;
