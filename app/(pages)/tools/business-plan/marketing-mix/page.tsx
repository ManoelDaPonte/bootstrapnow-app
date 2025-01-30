"use client";
import React, { useState } from "react";
import { MarketingMixCard, ModalState } from "@/types/marketing-mix";
import { useMarketingMixData } from "@/lib/business-plan/hooks/marketing-mix/useMarketingMixData";
import { calculateProgress } from "@/lib/business-plan/hooks/marketing-mix/storage-marketing-mix";
import { Header } from "@/components/business-plan/shared/Header";
import { CardModal } from "@/components/business-plan/shared/CardModal";
import { MarketingMixSection } from "@/components/business-plan/MarketingMixSection";
import QASection from "@/components/business-plan/shared/QASection";
import { QAResponses } from "@/types/shared/qa-section";
import { ModalProps } from "@/types/shared/card-modal";
import {
	MARKETING_MIX_DESCRIPTIONS,
	MARKETING_MIX_HEADERS,
	MARKETING_MIX_SECTION_ORDER,
	MARKETING_MIX_MODAL_DETAILED_DESCRIPTIONS,
	MARKETING_MIX_QA_DATA,
} from "@/lib/business-plan/config/marketing-mix";

type MarketingMixCategory = keyof typeof MARKETING_MIX_HEADERS;

export default function MarketingMixMatrix() {
	const { cards, handleSaveCard, handleDeleteCard } = useMarketingMixData();
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

	const handleAddCard = (category: MarketingMixCategory) => {
		setModalState({
			open: true,
			category,
			card: { id: 0, title: "", description: "" },
		});
		setError(false);
	};

	const handleEditCard = (
		category: MarketingMixCategory,
		card: MarketingMixCard
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

		handleSaveCard(category as MarketingMixCategory, card);
		setModalState({
			open: false,
			category: "",
			card: { id: 0, title: "", description: "" },
		});
	};

	const handleModalDelete = () => {
		const { category, card } = modalState;
		handleDeleteCard(category as MarketingMixCategory, card.id);
		setModalState({
			open: false,
			category: "",
			card: { id: 0, title: "", description: "" },
		});
	};

	const modalProps: ModalProps<MarketingMixCard> = {
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
			? MARKETING_MIX_MODAL_DETAILED_DESCRIPTIONS[
					modalState.category as MarketingMixCategory
			  ]
			: undefined,
	};

	return (
		<div className="flex flex-col h-screen bg-gray-50">
			<Header title="Mix Marketing" progress={calculateProgress(cards)} />

			{/* Contenu principal avec grille adaptative */}
			<div className="flex-1 max-w-[1920px] mx-auto p-6 overflow-y-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{MARKETING_MIX_SECTION_ORDER.map((category) => (
						<div key={category} className="h-[600px]">
							<MarketingMixSection
								category={category}
								title={MARKETING_MIX_HEADERS[category].title}
								description={
									MARKETING_MIX_DESCRIPTIONS[category]
								}
								cards={cards[category] || []}
								onAddCard={handleAddCard}
								onEditCard={handleEditCard}
							/>
						</div>
					))}
				</div>

				<QASection
					data={MARKETING_MIX_QA_DATA}
					responses={qaResponses}
					onResponseChange={handleQAResponseChange}
				/>
			</div>

			<CardModal<MarketingMixCard> {...modalProps} />
		</div>
	);
}
