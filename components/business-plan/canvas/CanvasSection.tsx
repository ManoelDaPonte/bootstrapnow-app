// components/business-plan/canvas/CanvasSection.tsx
import React from "react";
import { CanvasData, CanvasCard } from "@/types/canvas";

// Type pour les catégories du Canvas, excluant lastAnalysis et lastUpdated
type CanvasCategory = keyof Omit<CanvasData, "lastAnalysis" | "lastUpdated">;

// Type pour les couleurs de chaque section
const CANVAS_COLORS = {
	keyPartners: "bg-purple-50 border-purple-200 hover:bg-purple-100",
	keyActivities: "bg-blue-50 border-blue-200 hover:bg-blue-100",
	keyResources: "bg-green-50 border-green-200 hover:bg-green-100",
	valueProposition: "bg-red-50 border-red-200 hover:bg-red-100",
	customerRelationships: "bg-orange-50 border-orange-200 hover:bg-orange-100",
	channels: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
	customerSegments: "bg-pink-50 border-pink-200 hover:bg-pink-100",
	costStructure: "bg-gray-50 border-gray-200 hover:bg-gray-100",
	revenueStreams: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
} as const;

// Type pour les en-têtes de sections
const CANVAS_HEADERS = {
	keyPartners: { title: "Partenaires clés", color: "text-purple-700" },
	keyActivities: { title: "Activités clés", color: "text-blue-700" },
	keyResources: { title: "Ressources clés", color: "text-green-700" },
	valueProposition: { title: "Proposition de valeur", color: "text-red-700" },
	customerRelationships: {
		title: "Relations clients",
		color: "text-orange-700",
	},
	channels: { title: "Canaux", color: "text-yellow-700" },
	customerSegments: { title: "Segments clients", color: "text-pink-700" },
	costStructure: { title: "Structure de coûts", color: "text-gray-700" },
	revenueStreams: { title: "Flux de revenus", color: "text-emerald-700" },
} as const;

// Interface pour les props du composant
interface CanvasSectionProps {
	category: CanvasCategory;
	title: string;
	description: string;
	cards: CanvasCard[];
	onAddCard: (category: CanvasCategory) => void;
	onEditCard: (category: CanvasCategory, card: CanvasCard) => void;
}

export const CanvasSection: React.FC<CanvasSectionProps> = ({
	category,
	title,
	description,
	cards,
	onAddCard,
	onEditCard,
}) => {
	return (
		<div
			className={`flex flex-col h-full p-6 border rounded-xl overflow-hidden ${CANVAS_COLORS[category]} transition-all duration-200`}
		>
			{/* En-tête fixe */}
			<div className="flex-none">
				<div className="flex justify-between items-center mb-4">
					<h3
						className={`text-xl font-bold ${CANVAS_HEADERS[category].color}`}
					>
						{title}
					</h3>
					<button
						onClick={() => onAddCard(category)}
						className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center gap-1 text-sm font-medium shadow-sm"
					>
						+ Ajouter
					</button>
				</div>
				<p className="text-sm text-gray-600 mb-4">{description}</p>
			</div>

			{/* Conteneur des cartes avec défilement */}
			<div className="flex-1 min-h-0 relative">
				<div className="absolute inset-0 overflow-y-auto pr-2">
					<div className="space-y-3">
						{cards.map((card) => (
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

export default CanvasSection;
