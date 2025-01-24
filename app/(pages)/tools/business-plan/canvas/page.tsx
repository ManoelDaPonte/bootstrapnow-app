// app/business-plan/canvas/page.tsx
"use client";
import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CanvasSection from "@/components/business-plan/canvas/CanvasSection";
import CanvasModal from "@/components/business-plan/canvas/CanvasModal";
import { useCanvasData } from "@/lib/hooks/business-plan/canvas/useCanvasData";
import { calculateProgress } from "@/lib/business-plan/canvas/storage-canvas";
import { CanvasCard } from "@/types/canvas";
import { Header } from "@/components/business-plan/shared/Header";

const CANVAS_DESCRIPTIONS = {
	keyPartners:
		"Les partenaires et fournisseurs clés sans lesquels le modèle d'affaires ne peut pas fonctionner.",
	keyActivities:
		"Les activités les plus importantes qu'une entreprise doit réaliser pour que son modèle d'affaires fonctionne.",
	keyResources:
		"Les actifs les plus importants requis pour que le modèle d'affaires fonctionne.",
	valueProposition:
		"L'ensemble des produits et services qui créent de la valeur pour un segment de clientèle spécifique.",
	customerRelationships:
		"Les types de relations qu'une entreprise établit avec ses segments de clientèle spécifiques.",
	channels:
		"Comment une entreprise communique avec ses segments de clientèle et les atteint pour leur apporter une proposition de valeur.",
	customerSegments:
		"Les différents groupes de personnes ou d'organisations qu'une entreprise vise à atteindre et à servir.",
	costStructure:
		"Tous les coûts encourus pour mettre en œuvre le modèle d'affaires.",
	revenueStreams:
		"L'argent qu'une entreprise génère auprès de chaque segment de clientèle.",
} as const;

export const CANVAS_HEADERS = {
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

type CanvasCategory = keyof typeof CANVAS_HEADERS;

export default function BusinessModelCanvas() {
	const { user } = useUser();
	const { cards, handleSaveCard, handleDeleteCard } = useCanvasData();

	const [modalState, setModalState] = useState({
		open: false,
		category: "",
		card: { id: 0, title: "", description: "" },
	});
	const [error, setError] = useState(false);

	const handleAddCard = (category: CanvasCategory) => {
		setModalState({
			open: true,
			category,
			card: { id: 0, title: "", description: "" },
		});
		setError(false);
	};

	const handleEditCard = (category: CanvasCategory, card: CanvasCard) => {
		setModalState({ open: true, category, card });
		setError(false);
	};

	const handleModalSave = () => {
		const { category, card } = modalState;
		if (!card.title || !card.description) {
			setError(true);
			return;
		}

		handleSaveCard(category as CanvasCategory, card);
		setModalState({
			open: false,
			category: "",
			card: { id: 0, title: "", description: "" },
		});
	};

	const handleModalDelete = () => {
		const { category, card } = modalState;
		handleDeleteCard(category as CanvasCategory, card.id);
		setModalState({
			open: false,
			category: "",
			card: { id: 0, title: "", description: "" },
		});
	};

	return (
		<div className="flex flex-col h-screen">
			<Header
				title="Canvas Business Model"
				progress={calculateProgress(cards)}
			/>

			{/* Main Content */}
			<div className="flex-1 max-w-8xl mx-auto w-full p-6 overflow-auto">
				<div className="grid grid-cols-12 gap-4 h-full min-h-[600px]">
					{/* Première rangée */}
					<div className="col-span-3">
						<CanvasSection
							category="keyPartners"
							title={CANVAS_HEADERS.keyPartners.title}
							description={CANVAS_DESCRIPTIONS.keyPartners}
							cards={cards.keyPartners}
							onAddCard={handleAddCard}
							onEditCard={handleEditCard}
						/>
					</div>
					<div className="col-span-3">
						<div className="grid grid-rows-2 gap-4 h-full">
							<CanvasSection
								category="keyActivities"
								title={CANVAS_HEADERS.keyActivities.title}
								description={CANVAS_DESCRIPTIONS.keyActivities}
								cards={cards.keyActivities}
								onAddCard={handleAddCard}
								onEditCard={handleEditCard}
							/>
							<CanvasSection
								category="keyResources"
								title={CANVAS_HEADERS.keyResources.title}
								description={CANVAS_DESCRIPTIONS.keyResources}
								cards={cards.keyResources}
								onAddCard={handleAddCard}
								onEditCard={handleEditCard}
							/>
						</div>
					</div>
					<div className="col-span-2">
						<CanvasSection
							category="valueProposition"
							title={CANVAS_HEADERS.valueProposition.title}
							description={CANVAS_DESCRIPTIONS.valueProposition}
							cards={cards.valueProposition}
							onAddCard={handleAddCard}
							onEditCard={handleEditCard}
						/>
					</div>
					<div className="col-span-2">
						<div className="grid grid-rows-2 gap-4 h-full">
							<CanvasSection
								category="customerRelationships"
								title={
									CANVAS_HEADERS.customerRelationships.title
								}
								description={
									CANVAS_DESCRIPTIONS.customerRelationships
								}
								cards={cards.customerRelationships}
								onAddCard={handleAddCard}
								onEditCard={handleEditCard}
							/>
							<CanvasSection
								category="channels"
								title={CANVAS_HEADERS.channels.title}
								description={CANVAS_DESCRIPTIONS.channels}
								cards={cards.channels}
								onAddCard={handleAddCard}
								onEditCard={handleEditCard}
							/>
						</div>
					</div>
					<div className="col-span-2">
						<CanvasSection
							category="customerSegments"
							title={CANVAS_HEADERS.customerSegments.title}
							description={CANVAS_DESCRIPTIONS.customerSegments}
							cards={cards.customerSegments}
							onAddCard={handleAddCard}
							onEditCard={handleEditCard}
						/>
					</div>

					{/* Deuxième rangée (coûts et revenus) */}
					<div className="col-span-6">
						<CanvasSection
							category="costStructure"
							title={CANVAS_HEADERS.costStructure.title}
							description={CANVAS_DESCRIPTIONS.costStructure}
							cards={cards.costStructure}
							onAddCard={handleAddCard}
							onEditCard={handleEditCard}
						/>
					</div>
					<div className="col-span-6">
						<CanvasSection
							category="revenueStreams"
							title={CANVAS_HEADERS.revenueStreams.title}
							description={CANVAS_DESCRIPTIONS.revenueStreams}
							cards={cards.revenueStreams}
							onAddCard={handleAddCard}
							onEditCard={handleEditCard}
						/>
					</div>
				</div>
			</div>

			{/* Modal */}
			<CanvasModal
				isOpen={modalState.open}
				card={modalState.card}
				onClose={() =>
					setModalState({
						open: false,
						category: "",
						card: { id: 0, title: "", description: "" },
					})
				}
				onSave={handleModalSave}
				onDelete={handleModalDelete}
				error={error}
				isNew={!modalState.card.id}
				onChange={(e) =>
					setModalState((prev) => ({
						...prev,
						card: { ...prev.card, [e.target.name]: e.target.value },
					}))
				}
			/>
		</div>
	);
}
