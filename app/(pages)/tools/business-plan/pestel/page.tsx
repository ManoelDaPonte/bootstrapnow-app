"use client";
import React, { useState } from "react";
import { PestelSection } from "@/components/business-plan/PestelSection";
import { PestelCard, ModalState } from "@/types/pestel";
import { usePestelData } from "@/lib/business-plan/hooks/pestel/usePestelData";
import { calculateProgress } from "@/lib/business-plan/hooks/pestel/storage-pestel";
import { Header } from "@/components/business-plan/shared/Header";
import { CardModal } from "@/components/business-plan/shared/CardModal";
import QASection from "@/components/business-plan/shared/QASection";
import { ModalProps } from "@/types/shared/card-modal";
import {
	PESTEL_HEADERS,
	PESTEL_SECTION_ORDER,
	PESTEL_MODAL_DETAILED_DESCRIPTIONS,
	PESTEL_QA_DATA,
} from "@/lib/business-plan/config/pestel";

type PestelCategory = keyof typeof PESTEL_HEADERS;

export default function PestelMatrix() {
	const {
		cards,
		qaResponses,
		handleSaveCard,
		handleDeleteCard,
		handleQAResponseChange,
		handleQAResponseSave,
		isLoading,
	} = usePestelData();

	const [modalState, setModalState] = useState<ModalState>({
		open: false,
		category: "",
		card: { id: 0, title: "", description: "" },
	});
	const [error, setError] = useState(false);

	const handleAddCard = (category: PestelCategory) => {
		setModalState({
			open: true,
			category,
			card: { id: 0, title: "", description: "" },
		});
		setError(false);
	};

	const handleEditCard = (category: PestelCategory, card: PestelCard) => {
		setModalState({ open: true, category, card });
		setError(false);
	};

	const handleModalSave = () => {
		const { category, card } = modalState;
		if (!card.title || !card.description) {
			setError(true);
			return;
		}

		handleSaveCard(category as PestelCategory, card);
		setModalState({
			open: false,
			category: "",
			card: { id: 0, title: "", description: "" },
		});
	};

	const handleModalDelete = () => {
		const { category, card } = modalState;
		handleDeleteCard(category as PestelCategory, card.id);
		setModalState({
			open: false,
			category: "",
			card: { id: 0, title: "", description: "" },
		});
	};

	const modalProps: ModalProps<PestelCard> = {
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
		modalTitle: `${
			PESTEL_HEADERS[modalState.category as PestelCategory]?.title || ""
		} - ${
			modalState.card.id ? "Modifier l'élément" : "Ajouter un élément"
		}`,
		titlePlaceholder: "Entrez le titre...",
		descriptionPlaceholder: "Entrez la description...",
		categoryDescription: modalState.category
			? PESTEL_MODAL_DETAILED_DESCRIPTIONS[
					modalState.category as PestelCategory
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
			<Header title="PESTEL" progress={calculateProgress(cards)} />

			<div className="flex-1 p-6 space-y-12 max-w-[1600px] mx-auto w-full">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{PESTEL_SECTION_ORDER.map((category) => (
						<PestelSection
							key={category}
							category={category}
							title={PESTEL_HEADERS[category].title}
							cards={cards[category] || []}
							onAddCard={handleAddCard}
							onEditCard={handleEditCard}
						/>
					))}
				</div>

				<QASection
					data={PESTEL_QA_DATA}
					responses={qaResponses}
					onResponseChange={handleQAResponseChange}
					onResponseSave={handleQAResponseSave}
				/>
			</div>

			<CardModal<PestelCard> {...modalProps} />
		</div>
	);
}
