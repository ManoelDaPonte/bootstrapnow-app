"use client";
import React, { useState } from "react";
import {
	AnsoffCard,
	ModalState,
	AnsoffData,
	AnsoffCategory,
} from "@/types/ansoff";
import { useAnsoffData } from "@/lib/business-plan/hooks/ansoff/useAnsoffData";
import { calculateProgress } from "@/lib/business-plan/hooks/ansoff/storage-ansoff";
import { Header } from "@/components/business-plan/shared/Header";
import { CardModal } from "@/components/business-plan/shared/CardModal";
import { AnsoffSection } from "@/components/business-plan/AnsoffSection";
import QASection from "@/components/business-plan/shared/QASection";
import {
	ANSOFF_QA_DATA,
	ANSOFF_DESCRIPTIONS,
	ANSOFF_HEADERS,
	ANSOFF_SECTION_ORDER,
	ANSOFF_MODAL_DETAILED_DESCRIPTIONS,
} from "@/lib/business-plan/config/ansoff";
import { QAResponses } from "@/types/shared/qa-section";
import { ModalProps } from "@/types/shared/card-modal";

export default function AnsoffMatrix() {
	const {
		cards,
		qaResponses,
		handleSaveCard,
		handleDeleteCard,
		handleQAResponseChange,
		handleQAResponseSave,
	} = useAnsoffData();
	const [modalState, setModalState] = useState<ModalState>({
		open: false,
		category: "",
		card: { id: 0, title: "", description: "" },
	});
	const [error, setError] = useState(false);

	const handleAddCard = (category: AnsoffCategory) => {
		setModalState({
			open: true,
			category,
			card: { id: 0, title: "", description: "" },
		});
		setError(false);
	};

	const handleEditCard = (category: AnsoffCategory, card: AnsoffCard) => {
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
			handleSaveCard(category as AnsoffCategory, card);
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
			handleDeleteCard(category as AnsoffCategory, card.id);
		}
		setModalState({
			open: false,
			category: "",
			card: { id: 0, title: "", description: "" },
		});
	};

	const modalProps: ModalProps<AnsoffCard> = {
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
			? "Modifier la stratégie"
			: "Nouvelle stratégie",
		titlePlaceholder: "Entrez le titre de votre stratégie...",
		descriptionPlaceholder: "Décrivez votre stratégie...",
		categoryDescription: modalState.category
			? ANSOFF_MODAL_DETAILED_DESCRIPTIONS[
					modalState.category as AnsoffCategory
			  ]
			: undefined,
	};

	return (
		<div className="flex flex-col h-screen">
			<Header
				title="Matrice Ansoff"
				progress={calculateProgress(cards)}
			/>

			<div className="flex-1 max-w-7xl mx-auto w-full p-6">
				<div className="relative flex flex-col h-full">
					{/* Product Type Label (Top) */}
					<div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
						<span className="text-sm font-medium text-gray-600">
							Produit
						</span>
						<div className="flex gap-64 mt-2">
							<span className="text-xs font-medium text-gray-600">
								Existant
							</span>
							<span className="text-xs font-medium text-gray-600">
								Nouveau
							</span>
						</div>
					</div>

					{/* Market Type Label (Left) */}
					<div className="absolute top-1/2 -translate-y-1/2 flex items-center">
						<span className="text-sm font-medium text-gray-600 -rotate-90 whitespace-nowrap">
							Marché
						</span>
						<div className="flex flex-col gap-64">
							<span className="text-xs font-medium text-gray-600 -rotate-90 whitespace-nowrap">
								Existant
							</span>
							<span className="text-xs font-medium text-gray-600 -rotate-90 whitespace-nowrap">
								Nouveau
							</span>
						</div>
					</div>

					{/* Matrix Content */}
					<div className="flex-1 mt-12 ml-24">
						<div className="grid grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
							{ANSOFF_SECTION_ORDER.map((category) => (
								<AnsoffSection
									key={category}
									category={category}
									title={ANSOFF_HEADERS[category].title}
									description={ANSOFF_DESCRIPTIONS[category]}
									cards={cards[category]}
									onAddCard={handleAddCard}
									onEditCard={handleEditCard}
								/>
							))}
						</div>
					</div>
				</div>

				<QASection
					data={ANSOFF_QA_DATA}
					responses={qaResponses}
					onResponseChange={handleQAResponseChange}
					onResponseSave={handleQAResponseSave}
				/>
			</div>

			<CardModal<AnsoffCard> {...modalProps} />
		</div>
	);
}
