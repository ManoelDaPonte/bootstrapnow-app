// app/business-plan/swot/page.tsx
"use client";
import React, { useState } from "react";
import { SwotSection } from "@/components/business-plan/SwotSection";
import { SwotCard, ModalState, SwotCategory } from "@/types/swot";
import { useSwotData } from "@/lib/business-plan/hooks/swot/useSwotData";
import { calculateProgress } from "@/lib/business-plan/hooks/swot/storage-swot";
import { Header } from "@/components/business-plan/shared/Header";
import { CardModal } from "@/components/business-plan/shared/CardModal";
import {
	SWOT_QA_DATA,
	// SWOT_DESCRIPTIONS,
	SWOT_HEADERS,
	SWOT_SECTION_ORDER,
	SWOT_MODAL_DETAILED_DESCRIPTIONS,
} from "@/lib/business-plan/config/swot";
import QASection from "@/components/business-plan/shared/QASection";
import { ModalProps } from "@/types/shared/card-modal";

export default function SwotMatrix() {
	const {
		cards,
		qaResponses,
		handleSaveCard,
		handleDeleteCard,
		handleQAResponseChange,
		handleQAResponseSave,
	} = useSwotData();

	const [modalState, setModalState] = useState<ModalState>({
		open: false,
		category: "",
		card: { id: 0, title: "", description: "" },
	});
	const [error, setError] = useState(false);
	const isLoading = cards === undefined || qaResponses === undefined;

	const handleAddCard = (category: SwotCategory) => {
		setModalState({
			open: true,
			category,
			card: { id: 0, title: "", description: "" },
		});
		setError(false);
	};

	const handleEditCard = (category: SwotCategory, card: SwotCard) => {
		setModalState({ open: true, category, card });
		setError(false);
	};

	const handleModalSave = () => {
		const { category, card } = modalState;
		if (!card.title || !card.description) {
			setError(true);
			return;
		}

		handleSaveCard(category as SwotCategory, card);

		setModalState({
			open: false,
			category: "",
			card: { id: 0, title: "", description: "" },
		});
	};
	const handleModalDelete = () => {
		const { category, card } = modalState;
		handleDeleteCard(category as SwotCategory, card.id);

		setModalState({
			open: false,
			category: "",
			card: { id: 0, title: "", description: "" },
		});
	};

	const modalProps: ModalProps<SwotCard> = {
		isOpen: modalState.open,
		card: modalState.card,
		onClose: () =>
			setModalState({
				open: false,
				category: "",
				card: { id: 0, title: "", description: "" },
			}),
		onSave: handleModalSave,
		onDelete: handleModalDelete,
		error,
		isNew: !modalState.card.id,
		onChange: (e) =>
			setModalState((prev) => ({
				...prev,
				card: { ...prev.card, [e.target.name]: e.target.value },
			})),
		modalTitle: modalState.card.id ? "Modifier la carte" : "Nouvelle carte",
		titlePlaceholder: "Entrez le titre de votre élément SWOT...",
		descriptionPlaceholder: "Décrivez cet élément SWOT...",
		categoryDescription: modalState.category
			? SWOT_MODAL_DETAILED_DESCRIPTIONS[
					modalState.category as SwotCategory
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
			<Header title="Matrice SWOT" progress={calculateProgress(cards)} />

			<div className="flex-1 p-6 space-y-12 max-w-[1600px] mx-auto w-full">
				<div className="grid grid-cols-2 gap-6">
					{SWOT_SECTION_ORDER.map((category) => (
						<div key={category} className="h-64">
							<SwotSection
								category={category}
								title={SWOT_HEADERS[category].title}
								cards={cards[category] || []}
								onAddCard={handleAddCard}
								onEditCard={handleEditCard}
							/>
						</div>
					))}
				</div>

				<QASection
					data={SWOT_QA_DATA}
					responses={qaResponses}
					onResponseChange={handleQAResponseChange}
					onResponseSave={handleQAResponseSave}
				/>
			</div>

			<CardModal<SwotCard> {...modalProps} />
		</div>
	);
}
