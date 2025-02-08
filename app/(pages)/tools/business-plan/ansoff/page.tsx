"use client";
import React, { useState } from "react";
import { AnsoffCard, ModalState, AnsoffCategory } from "@/types/ansoff";
import { useAnsoffData } from "@/lib/business-plan/hooks/ansoff/useAnsoffData";
import { calculateProgress } from "@/lib/business-plan/hooks/ansoff/storage-ansoff";
import { Header } from "@/components/business-plan/shared/Header";
import { CardModal } from "@/components/business-plan/shared/CardModal";
import { AnsoffSection } from "@/components/business-plan/AnsoffSection";
import QASection from "@/components/business-plan/shared/QASection";
import {
	ANSOFF_QA_DATA,
	ANSOFF_HEADERS,
	ANSOFF_SECTION_ORDER,
	ANSOFF_MODAL_DETAILED_DESCRIPTIONS,
} from "@/lib/business-plan/config/ansoff";
import { ModalProps } from "@/types/shared/card-modal";

export default function AnsoffMatrix() {
	const {
		cards,
		qaResponses,
		handleSaveCard,
		handleDeleteCard,
		handleQAResponseChange,
		handleQAResponseSave,
		isLoading,
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
				title="Matrice Ansoff"
				progress={calculateProgress(cards)}
			/>

			<div className="flex-1 p-6 space-y-12 max-w-[1600px] mx-auto w-full">
				<div className="relative">
					{/* Product Type Label (Top) */}
					<div className="absolute -top-8 left-1/2 -translate-x-1/2 w-full flex flex-col items-center">
						<span className="text-sm font-medium text-muted-foreground">
							Produit
						</span>
						<div className="flex w-full justify-between px-40 mt-2">
							<span className="text-xs font-medium text-muted-foreground">
								Existant
							</span>
							<span className="text-xs font-medium text-muted-foreground">
								Nouveau
							</span>
						</div>
					</div>

					{/* Market Type Label (Left) */}
					<div className="absolute -left-8 top-1/2 -translate-y-1/2 flex items-center">
						<span className="text-sm font-medium text-muted-foreground -rotate-90 whitespace-nowrap">
							Marché
						</span>
						<div className="flex flex-col justify-between h-[32rem] -ml-2">
							<span className="text-xs font-medium text-muted-foreground -rotate-90 whitespace-nowrap translate-y-20">
								Existant
							</span>
							<span className="text-xs font-medium text-muted-foreground -rotate-90 whitespace-nowrap -translate-y-20">
								Nouveau
							</span>
						</div>
					</div>

					{/* Matrix Content */}
					<div className="mt-8 ml-12">
						<div className="grid grid-cols-2 gap-6">
							{ANSOFF_SECTION_ORDER.map((category) => (
								<div key={category} className="h-64">
									<AnsoffSection
										category={category}
										title={ANSOFF_HEADERS[category].title}
										cards={cards[category] || []}
										onAddCard={handleAddCard}
										onEditCard={handleEditCard}
									/>
								</div>
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
