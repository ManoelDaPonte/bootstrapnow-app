// app/business-plan/canvas/page.tsx
"use client";
import React, { useState } from "react";
import { CanvasCard, ModalState } from "@/types/canvas";
import { useCanvasData } from "@/lib/business-plan/hooks/canvas/useCanvasData";
import { calculateProgress } from "@/lib/business-plan/hooks/canvas/storage-canvas";
import { Header } from "@/components/business-plan/shared/Header";
import { CardModal } from "@/components/business-plan/shared/CardModal";
import BusinessModelCanvas from "@/components/business-plan/canvas/BusinessModelCanvas";
import QASection from "@/components/business-plan/shared/QASection";
import { ModalProps } from "@/types/shared/card-modal";
import {
	// CANVAS_DESCRIPTIONS,
	CANVAS_HEADERS,
	CANVAS_QA_DATA,
	CANVAS_MODAL_DETAILED_DESCRIPTIONS,
} from "@/lib/business-plan/config/canvas";

type CanvasCategory = keyof typeof CANVAS_HEADERS;

export default function CanvasPage() {
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
		modalTitle: `${
			CANVAS_HEADERS[modalState.category as CanvasCategory]?.title || ""
		} - ${
			modalState.card.id ? "Modifier l'élément" : "Ajouter un élément"
		}`,
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
			<div className="flex items-center justify-center h-screen">
				<div className="text-lg">Chargement...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<Header
				title="Canvas Business Model"
				progress={calculateProgress(cards, qaResponses)}
			/>

			<div className="flex-1 p-6 space-y-12 max-w-[1600px] mx-auto w-full">
				<BusinessModelCanvas
					cards={cards}
					onAddCard={handleAddCard}
					onEditCard={handleEditCard}
				/>

				<QASection
					data={CANVAS_QA_DATA}
					responses={qaResponses}
					onResponseChange={handleQAResponseChange}
					onResponseSave={handleQAResponseSave}
				/>
			</div>

			<CardModal<CanvasCard> {...modalProps} />
		</div>
	);
}
