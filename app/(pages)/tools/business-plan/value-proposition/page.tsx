//app/%28pages%29/tools/business-plan/value-proposition/page.tsx

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
import { QAResponses } from "@/types/shared/qa-section";
import { ModalProps } from "@/types/shared/card-modal";
import {
	VALUE_PROPOSITION_SECTIONS,
	CUSTOMER_SEGMENT_SECTIONS,
	VALUE_PROPOSITION_SECTIONS_ORDER,
	VALUE_PROPOSITION_QA_DATA,
	VALUE_PROPOSITION_MODAL_DETAILED_DESCRIPTIONS,
} from "@/lib/business-plan/config/value-proposition";

const ValuePropositionCanvas: React.FC = () => {
	const {
		data,
		isLoading,
		handleSaveItem,
		handleUpdateItem,
		handleDeleteItem,
	} = useValuePropositionData();
	const [qaResponses, setQAResponses] = useState<QAResponses>({});
	const [modalState, setModalState] = useState<ModalState>({
		open: false,
		category: "",
		card: { id: 0, title: "", description: "", content: "" },
	});
	const [error, setError] = useState(false);

	const handleQAResponseChange = (categoryId: string, response: string) => {
		setQAResponses((prev) => ({
			...prev,
			[categoryId]: response,
		}));
	};

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

		handleSaveItem(
			category as ValuePropositionCategory,
			card.title,
			card.description
		);
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
		modalTitle: modalState.card.id
			? "Modifier l'élément"
			: "Nouvel élément",
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
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-gray-600">Chargement...</div>
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
			onAddCard={handleAddCard} // Changé de onAddItem
			onEditCard={handleEditCard} // Ajouté
			onDeleteItem={handleDeleteItem}
			className={`${className} ${VALUE_PROPOSITION_SECTIONS[category].color}`}
			sectionKey={category}
		/>
	);

	return (
		<div className="min-h-screen flex flex-col">
			<Header
				title="Value Proposition"
				progress={calculateProgress(data)}
			/>

			<div className="flex-1 flex flex-col items-center justify-center p-8">
				<div className="max-w-6xl w-full">
					<div className="relative flex flex-col lg:flex-row justify-center gap-4">
						{/* Customer Segment (Circle) */}
						<div className="lg:w-1/2 relative">
							<div className="aspect-square rounded-full border-4 border-blue-500 p-2 bg-blue-50">
								<div className="h-full flex flex-col">
									{renderSection(
										"customerJobs",
										"flex-1 border-b-2"
									)}
									<div className="flex flex-1">
										{renderSection(
											"pains",
											"flex-1 border-r-2"
										)}
										{renderSection("gains", "flex-1")}
									</div>
								</div>
							</div>
						</div>

						{/* Value Proposition (Square) */}
						<div className="lg:w-1/2 relative">
							<div className="aspect-square border-4 border-green-500 p-2 bg-green-50">
								<div className="h-full flex flex-col">
									{renderSection(
										"products",
										"flex-1 border-b-2"
									)}
									<div className="flex flex-1">
										{renderSection(
											"painRelievers",
											"flex-1 border-r-2"
										)}
										{renderSection(
											"gainCreators",
											"flex-1"
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					<QASection
						data={VALUE_PROPOSITION_QA_DATA}
						responses={qaResponses}
						onResponseChange={handleQAResponseChange}
						className="mt-8"
					/>
					<CardModal<ValuePropositionCard> {...modalProps} />
				</div>
			</div>
		</div>
	);
};

export default ValuePropositionCanvas;
