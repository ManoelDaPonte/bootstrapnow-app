"use client";
import React, { useState } from "react";
import { CanvasCard, ModalState } from "@/types/canvas";
import { useCanvasData } from "@/lib/business-plan/hooks/canvas/useCanvasData";
import { calculateProgress } from "@/lib/business-plan/hooks/canvas/storage-canvas";
import { Header } from "@/components/business-plan/shared/Header";
import { CardModal } from "@/components/business-plan/shared/CardModal";
import { CanvasSection } from "@/components/business-plan/CanvasSection";
import QASection from "@/components/business-plan/shared/QASection";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Skeleton from "@/components/ui/Skeleton";
import { ModalProps } from "@/types/shared/card-modal";
import {
	CANVAS_DESCRIPTIONS,
	CANVAS_HEADERS,
	CANVAS_QA_DATA,
	CANVAS_MODAL_DETAILED_DESCRIPTIONS,
} from "@/lib/business-plan/config/canvas";

type CanvasCategory = keyof typeof CANVAS_HEADERS;

export default function BusinessModelCanvas() {
	const {
		cards,
		qaResponses,
		isLoading,
		handleSaveCard,
		handleDeleteCard,
		handleQAResponseChange,
		handleQAResponseSave,
	} = useCanvasData();

	const [modalState, setModalState] = useState<ModalState>({
		open: false,
		category: "",
		card: { id: 0, title: "", description: "" },
	});
	const [error, setError] = useState<string | null>(null);

	const handleAddCard = (category: CanvasCategory) => {
		setModalState({
			open: true,
			category,
			card: { id: 0, title: "", description: "" },
		});
		setError(null);
	};

	const handleEditCard = (category: CanvasCategory, card: CanvasCard) => {
		setModalState({ open: true, category, card });
		setError(null);
	};

	const handleModalSave = async () => {
		const { category, card } = modalState;
		if (!card.title?.trim() || !card.description?.trim()) {
			setError("Le titre et la description sont requis");
			return;
		}

		try {
			await handleSaveCard(category as CanvasCategory, card);
			setModalState({
				open: false,
				category: "",
				card: { id: 0, title: "", description: "" },
			});
			setError(null);
		} catch (err) {
			setError("Erreur lors de la sauvegarde de la carte");
			console.error("Erreur de sauvegarde:", err);
		}
	};

	const handleModalDelete = async () => {
		const { category, card } = modalState;
		try {
			await handleDeleteCard(category as CanvasCategory, card.id);
			setModalState({
				open: false,
				category: "",
				card: { id: 0, title: "", description: "" },
			});
			setError(null);
		} catch (err) {
			setError("Erreur lors de la suppression de la carte");
			console.error("Erreur de suppression:", err);
		}
	};

	const modalProps: ModalProps<CanvasCard> = {
		isOpen: modalState.open,
		card: modalState.card,
		onClose: () => {
			setModalState({
				open: false,
				category: "",
				card: { id: 0, title: "", description: "" },
			});
			setError(null);
		},
		onSave: handleModalSave,
		onDelete: handleModalDelete,
		error: error !== null,
		isNew: !modalState.card.id,
		onChange: (e) =>
			setModalState((prev) => ({
				...prev,
				card: { ...prev.card, [e.target.name]: e.target.value },
			})),
		modalTitle: modalState.card.id
			? "Modifier l'élément"
			: "Nouvel élément",
		titlePlaceholder: "Entrez le titre...",
		descriptionPlaceholder: "Entrez la description...",
		categoryDescription: modalState.category
			? CANVAS_MODAL_DETAILED_DESCRIPTIONS[
					modalState.category as CanvasCategory
			  ]
			: undefined,
	};

	if (isLoading) {
		return (
			<div className="flex flex-col h-screen">
				<Header title="Canvas Business Model" progress={0} />
				<div className="flex-1 max-w-8xl mx-auto w-full p-6">
					<div className="grid grid-cols-12 gap-4 h-full min-h-[600px]">
						{Array.from({ length: 9 }).map((_, i) => (
							<div
								key={i}
								className={`col-span-${i < 3 ? "3" : "2"}`}
							>
								<Skeleton className="w-full h-full" />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="flex flex-col h-screen">
			<Header
				title="Canvas Business Model"
				progress={calculateProgress(cards)}
			/>

			{error && (
				<Alert variant="destructive" className="mx-6 mt-4">
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			{/* Main Content */}
			<div className="flex-1 max-w-8xl mx-auto w-full p-6 overflow-auto">
				<div className="grid grid-cols-12 gap-4 h-full min-h-[600px]">
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

				<QASection
					data={CANVAS_QA_DATA}
					responses={qaResponses}
					onResponseChange={handleQAResponseChange}
					onResponseSave={handleQAResponseSave}
					className="mt-8"
				/>
			</div>

			<CardModal<CanvasCard> {...modalProps} />
		</div>
	);
}
