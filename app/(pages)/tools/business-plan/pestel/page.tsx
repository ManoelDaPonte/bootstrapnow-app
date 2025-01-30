"use client";
import React, { useState } from "react";
import { PestelCard, ModalState } from "@/types/pestel";
import { usePestelData } from "@/lib/business-plan/hooks/pestel/usePestelData";
import { calculateProgress } from "@/lib/business-plan/hooks/pestel/storage-pestel";
import { Header } from "@/components/business-plan/shared/Header";
import { CardModal } from "@/components/business-plan/shared/CardModal";
import { PestelSection } from "@/components/business-plan/PestelSection";
import QASection from "@/components/business-plan/shared/QASection";
import { QAResponses } from "@/types/shared/qa-section";
import { ModalProps } from "@/types/shared/card-modal";
import {
	PESTEL_DESCRIPTIONS,
	PESTEL_HEADERS,
	PESTEL_SECTION_ORDER,
	PESTEL_MODAL_DETAILED_DESCRIPTIONS,
	PESTEL_QA_DATA,
} from "@/lib/business-plan/config/pestel";

type PestelCategory = keyof typeof PESTEL_HEADERS;

export default function PestelMatrix() {
	const { cards, handleSaveCard, handleDeleteCard } = usePestelData();
	const [qaResponses, setQAResponses] = useState<QAResponses>({});
	const [modalState, setModalState] = useState<ModalState>({
		open: false,
		category: "",
		card: { id: 0, title: "", description: "" },
	});
	const [error, setError] = useState(false);

	const handleQAResponseChange = (categoryId: string, response: string) => {
		setQAResponses((prev) => ({
			...prev,
			[categoryId]: response,
		}));
	};

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

		if (category) {
			handleSaveCard(category as PestelCategory, card);
		}
		setModalState({
			open: false,
			category: "",
			card: { id: 0, title: "", description: "" },
		});
	};

	const handleModalDelete = () => {
		const { category, card } = modalState;
		if (category) {
			handleDeleteCard(category as PestelCategory, card.id);
		}
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
		modalTitle: modalState.card.id
			? "Modifier l'élément"
			: "Nouvel élément",
		titlePlaceholder: "Entrez le titre...",
		descriptionPlaceholder: "Entrez la description...",
		categoryDescription: modalState.category
			? PESTEL_MODAL_DETAILED_DESCRIPTIONS[
					modalState.category as PestelCategory
			  ]
			: undefined,
	};

	return (
		<div className="flex flex-col h-screen">
			<Header title="PESTEL" progress={calculateProgress(cards)} />

			<div className="flex-1 w-full p-6 overflow-y-auto">
				<div className="grid grid-cols-3 gap-6">
					{PESTEL_SECTION_ORDER.map((category) => (
						<PestelSection
							key={category}
							category={category}
							title={PESTEL_HEADERS[category].title}
							description={PESTEL_DESCRIPTIONS[category]}
							cards={cards[category]}
							onAddCard={handleAddCard}
							onEditCard={handleEditCard}
						/>
					))}
				</div>

				<QASection
					data={PESTEL_QA_DATA}
					responses={qaResponses}
					onResponseChange={handleQAResponseChange}
				/>
			</div>

			<CardModal<PestelCard> {...modalProps} />
		</div>
	);
}
