"use client";
import React, { useState, useMemo, useEffect } from "react";
import _ from "lodash";
import {
	FunnelSection,
	FunnelCard,
	EditingCard,
	FunnelSectionId,
} from "@/types/funnel-chart";
import { useFunnelChartData } from "@/lib/business-plan/hooks/funnel-chart/useFunnelChartData";
import { calculateProgress } from "@/lib/business-plan/hooks/funnel-chart/storage-funnel-chart";
import { Header } from "@/components/business-plan/shared/Header";
import { CardModal } from "@/components/business-plan/shared/CardModal";
import FunnelChart from "@/components/business-plan/FunnelChartSection";
import QASection from "@/components/business-plan/shared/QASection";
import { QAResponses } from "@/types/shared/qa-section";
import { ModalProps } from "@/types/shared/card-modal";
import {
	FUNNEL_MODAL_DETAILED_DESCRIPTIONS,
	FUNNEL_QA_DATA,
} from "@/lib/business-plan/config/funnel-chart";

const createDebouncedUpdate = (updateFn: (sections: FunnelSection[]) => void) =>
	_.debounce((newSections: FunnelSection[]) => {
		updateFn(newSections);
	}, 500);

export default function FunnelChartPage() {
	const { sections, handleUpdateSections } = useFunnelChartData();
	const [qaResponses, setQAResponses] = useState<QAResponses>({});
	const [editingCard, setEditingCard] = useState<EditingCard>(null);
	const [error, setError] = useState(false);
	const [localSections, setLocalSections] = useState(sections);

	// Update local sections when DB sections change
	useEffect(() => {
		setLocalSections(sections);
	}, [sections]);

	const debouncedUpdateSections = useMemo(
		() => createDebouncedUpdate(handleUpdateSections),
		[handleUpdateSections]
	);

	const handleQAResponseChange = (categoryId: string, response: string) => {
		setQAResponses((prev) => ({
			...prev,
			[categoryId]: response,
		}));
	};

	const handleAddCard = (sectionId: FunnelSectionId) => {
		const newCard: FunnelCard = {
			id: Date.now(), // ou bien Math.random(), comme dans les autres pages
			title: "",
			description: "",
		};
		setEditingCard({ sectionId, card: newCard });
		setError(false);
	};

	const handleEditCard = (sectionId: FunnelSectionId, card: FunnelCard) => {
		setEditingCard({ sectionId, card: { ...card } });
		setError(false);
	};

	const handleModalSave = () => {
		if (!editingCard) return;

		if (!editingCard.card.title || !editingCard.card.description) {
			setError(true);
			return;
		}

		const newSections = sections.map((section) => {
			if (section.id === editingCard.sectionId) {
				const existingCardIndex = section.cards.findIndex(
					(c) => c.id === editingCard.card.id
				);
				if (existingCardIndex >= 0) {
					const newCards = [...section.cards];
					newCards[existingCardIndex] = editingCard.card;
					return { ...section, cards: newCards };
				} else {
					return {
						...section,
						cards: [...section.cards, editingCard.card],
					};
				}
			}
			return section;
		});

		handleUpdateSections(newSections);
		setEditingCard(null);
		setError(false);
	};

	const handleModalDelete = () => {
		if (!editingCard) return;

		const newSections = sections.map((section) => {
			if (section.id === editingCard.sectionId) {
				return {
					...section,
					cards: section.cards.filter(
						(c) => c.id !== editingCard.card.id
					),
				};
			}
			return section;
		});

		handleUpdateSections(newSections);
		setEditingCard(null);
		setError(false);
	};

	const handleSizeChange = (sectionId: number, newSize: number) => {
		const newSections = [...localSections];
		const sectionIndex = newSections.findIndex((s) => s.id === sectionId);

		const MIN_SIZE = 30;
		newSize = Math.max(newSize, MIN_SIZE);
		if (sectionIndex > 0) {
			newSize = Math.min(newSize, newSections[sectionIndex - 1].size);
		}

		newSections[sectionIndex].size = newSize;
		for (let i = sectionIndex + 1; i < newSections.length; i++) {
			newSections[i].size = Math.min(newSections[i].size, newSize);
		}

		setLocalSections(newSections);
		debouncedUpdateSections(newSections);
	};

	const modalProps: ModalProps<FunnelCard> = {
		isOpen: !!editingCard,
		card: editingCard?.card || { id: 0, title: "", description: "" },
		onClose: () => {
			setEditingCard(null);
			setError(false);
		},
		onSave: handleModalSave,
		onDelete: handleModalDelete,
		error,
		isNew: editingCard ? !editingCard.card.id : true,
		onChange: (e) => {
			if (editingCard) {
				setEditingCard({
					...editingCard,
					card: {
						...editingCard.card,
						[e.target.name]: e.target.value,
					},
				});
			}
		},
		modalTitle: editingCard?.card.id
			? "Modifier l'élément"
			: "Nouvel élément",
		titlePlaceholder: "Entrez le titre...",
		descriptionPlaceholder: "Entrez la description...",
		categoryDescription: editingCard
			? FUNNEL_MODAL_DETAILED_DESCRIPTIONS[editingCard.sectionId]
			: undefined,
	};

	return (
		<div className="flex flex-col h-screen">
			<Header
				title="Funnel Chart"
				progress={calculateProgress(sections)}
			/>

			<FunnelChart
				sections={localSections}
				onSizeChange={handleSizeChange}
				onAddCard={handleAddCard}
				onEditCard={handleEditCard}
			/>

			<QASection
				data={FUNNEL_QA_DATA}
				responses={qaResponses}
				onResponseChange={handleQAResponseChange}
			/>

			<CardModal<FunnelCard> {...modalProps} />
		</div>
	);
}
