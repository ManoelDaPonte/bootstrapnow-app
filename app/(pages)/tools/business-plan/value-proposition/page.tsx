"use client";
import React, { useState } from "react";
import { useValuePropositionData } from "@/lib/business-plan/hooks/value-proposition/useValuePropositionData";
import { calculateProgress } from "@/lib/business-plan/hooks/value-proposition/storage-value-proposition";
import { Header } from "@/components/business-plan/shared/Header";
import { ValuePropositionSection } from "@/components/business-plan/ValuePropositionSection";
import { CardModal } from "@/components/business-plan/shared/CardModal";
import QASection from "@/components/business-plan/shared/QASection";
import {
	ValuePropositionCategory,
	ValuePropositionCard,
	ModalState,
} from "@/types/value-proposition";
import { ModalProps } from "@/types/shared/card-modal";
import {
	VALUE_PROPOSITION_SECTIONS,
	VALUE_PROPOSITION_QA_DATA,
	VALUE_PROPOSITION_MODAL_DETAILED_DESCRIPTIONS,
} from "@/lib/business-plan/config/value-proposition";

const ValuePropositionCanvas: React.FC = () => {
	const {
		cards: data,
		qaResponses,
		handleSaveItem,
		handleUpdateItem,
		handleDeleteItem,
		handleQAResponseChange,
		handleQAResponseSave,
		isLoading,
	} = useValuePropositionData();

	const [modalState, setModalState] = useState<ModalState>({
		open: false,
		category: "",
		card: { id: 0, title: "", description: "", content: "" },
	});
	const [error, setError] = useState(false);

	const handleAddCard = (category: ValuePropositionCategory) => {
		setModalState({
			open: true,
			category,
			card: { id: 0, title: "", description: "", content: "" },
		});
		setError(false);
	};

	const handleEditCard = (
		category: ValuePropositionCategory,
		card: ValuePropositionCard
	) => {
		setModalState({ open: true, category, card });
		setError(false);
	};

	const handleModalSave = () => {
		const { category, card } = modalState;
		if (!card.title || !card.description) {
			setError(true);
			return;
		}

		// Si la carte a un ID, c'est une mise à jour
		if (card.id) {
			handleUpdateItem(
				category as ValuePropositionCategory,
				card.id,
				card.title,
				card.description
			);
		} else {
			// Sinon, c'est une nouvelle carte
			handleSaveItem(
				category as ValuePropositionCategory,
				card.title,
				card.description
			);
		}

		setModalState({
			open: false,
			category: "",
			card: { id: 0, title: "", description: "", content: "" },
		});
	};

	const handleModalDelete = () => {
		const { category, card } = modalState;
		handleDeleteItem(category as ValuePropositionCategory, card.id);
		setModalState({
			open: false,
			category: "",
			card: { id: 0, title: "", description: "", content: "" },
		});
	};

	const modalProps: ModalProps<ValuePropositionCard> = {
		isOpen: modalState.open,
		card: modalState.card,
		onClose: () =>
			setModalState({
				open: false,
				category: "",
				card: { id: 0, title: "", description: "", content: "" },
			}),
		onSave: handleModalSave,
		onDelete: handleModalDelete,
		error,
		isNew: !modalState.card.id,
		onChange: (e) =>
			setModalState((prev) => ({
				...prev,
				card: {
					...prev.card,
					[e.target.name]: e.target.value,
					content: e.target.value,
				},
			})),
		modalTitle: `${
			VALUE_PROPOSITION_SECTIONS[
				modalState.category as ValuePropositionCategory
			]?.title || ""
		} - ${
			modalState.card.id ? "Modifier l'élément" : "Ajouter un élément"
		}`,
		titlePlaceholder: "Entrez le titre...",
		descriptionPlaceholder: "Entrez la description...",
		categoryDescription: modalState.category
			? VALUE_PROPOSITION_MODAL_DETAILED_DESCRIPTIONS[
					modalState.category as ValuePropositionCategory
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

	const renderSection = (
		category: ValuePropositionCategory,
		className: string = ""
	) => (
		<ValuePropositionSection
			title={VALUE_PROPOSITION_SECTIONS[category].title}
			items={data[category]}
			onAddCard={handleAddCard}
			onEditCard={handleEditCard}
			onDeleteItem={handleDeleteItem}
			className={`${className} ${VALUE_PROPOSITION_SECTIONS[category].color}`}
			sectionKey={category}
		/>
	);

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<Header
				title="Value Proposition"
				progress={calculateProgress(data)}
			/>

			<div className="flex-1 p-6 space-y-12 max-w-[1600px] mx-auto w-full">
				<div className="flex flex-col lg:flex-row justify-center items-center gap-8">
					{/* Customer Segment Circle */}
					<div className="lg:w-1/2 relative aspect-square">
						<div className="absolute inset-0 rounded-full border-2 border-blue-500/30">
							<div className="h-full flex flex-col">
								{renderSection("customerJobs", "flex-1")}
								<div className="flex flex-1">
									{renderSection("pains", "flex-1")}
									{renderSection("gains", "flex-1")}
								</div>
							</div>
						</div>
					</div>

					{/* Value Proposition Square */}
					<div className="lg:w-1/2 relative aspect-square">
						<div className="absolute inset-0 border-2 border-emerald-500/30">
							<div className="h-full flex flex-col">
								{renderSection("products", "flex-1")}
								<div className="flex flex-1">
									{renderSection("painRelievers", "flex-1")}
									{renderSection("gainCreators", "flex-1")}
								</div>
							</div>
						</div>
					</div>
				</div>

				<QASection
					data={VALUE_PROPOSITION_QA_DATA}
					responses={qaResponses}
					onResponseChange={handleQAResponseChange}
					onResponseSave={handleQAResponseSave}
				/>
			</div>

			<CardModal<ValuePropositionCard> {...modalProps} />
		</div>
	);
};

export default ValuePropositionCanvas;
