"use client";
import React, { useState, useMemo, useEffect } from "react";
import _ from "lodash";
import {
	FunnelSection,
	FunnelCard,
	EditingCard,
	FunnelSectionId,
	FUNNEL_SECTIONS_CONFIG,
} from "@/types/funnel-chart";
import { useFunnelChartData } from "@/lib/business-plan/hooks/funnel-chart/useFunnelChartData";
import { calculateProgress } from "@/lib/business-plan/hooks/funnel-chart/storage-funnel-chart";
import { Header } from "@/components/business-plan/shared/Header";
import { CardModal } from "@/components/business-plan/shared/CardModal";
import FunnelChart from "@/components/business-plan/FunnelChartSection";
import QASection from "@/components/business-plan/shared/QASection";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
	const {
		sections,
		qaResponses,
		isLoading,
		handleUpdateSections,
		handleQAResponseChange,
		handleQAResponseSave,
	} = useFunnelChartData();

	const [editingCard, setEditingCard] = useState<EditingCard>(null);
	const [error, setError] = useState<string | null>(null);
	const [localSections, setLocalSections] = useState(sections);

	// Mise à jour des sections locales quand les sections DB changent
	useEffect(() => {
		setLocalSections(sections);
	}, [sections]);

	const debouncedUpdateSections = useMemo(
		() => createDebouncedUpdate(handleUpdateSections),
		[handleUpdateSections]
	);

	const handleAddCard = (sectionId: FunnelSectionId) => {
		const newCard: FunnelCard = {
			id: Date.now(),
			title: "",
			description: "",
		};
		setEditingCard({ sectionId, card: newCard });
		setError(null);
	};

	const handleEditCard = (sectionId: FunnelSectionId, card: FunnelCard) => {
		setEditingCard({ sectionId, card: { ...card } });
		setError(null);
	};

	const handleModalSave = async () => {
		if (!editingCard) return;

		if (
			!editingCard.card.title?.trim() ||
			!editingCard.card.description?.trim()
		) {
			setError("Le titre et la description sont requis");
			return;
		}

		try {
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

			await handleUpdateSections(newSections);
			setEditingCard(null);
			setError(null);
		} catch (err) {
			setError("Erreur lors de la sauvegarde de la carte");
			console.error("Erreur de sauvegarde:", err);
		}
	};

	const handleModalDelete = async () => {
		if (!editingCard) return;

		try {
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

			await handleUpdateSections(newSections);
			setEditingCard(null);
			setError(null);
		} catch (err) {
			setError("Erreur lors de la suppression de la carte");
			console.error("Erreur de suppression:", err);
		}
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
			setError(null);
		},
		onSave: handleModalSave,
		onDelete: handleModalDelete,
		error: error !== null,
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
		modalTitle: editingCard
			? `${
					FUNNEL_SECTIONS_CONFIG.DEFAULT_SECTIONS.find(
						(s) => s.id === editingCard.sectionId
					)?.title || ""
			  } - ${
					editingCard.card.id
						? "Modifier la carte"
						: "Ajouter une carte"
			  }`
			: "",
		titlePlaceholder: "Entrez le titre...",
		descriptionPlaceholder: "Entrez la description...",
		categoryDescription: editingCard
			? FUNNEL_MODAL_DETAILED_DESCRIPTIONS[editingCard.sectionId]
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
				title="Entonnoir de conversion"
				progress={calculateProgress(sections, qaResponses)}
			/>

			{error && (
				<Alert variant="destructive" className="mx-6 mt-4">
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			<div className="flex-1">
				<FunnelChart
					sections={localSections}
					onSizeChange={handleSizeChange}
					onAddCard={handleAddCard}
					onEditCard={handleEditCard}
				/>

				<div className="p-6">
					<QASection
						data={FUNNEL_QA_DATA}
						responses={qaResponses}
						onResponseChange={handleQAResponseChange}
						onResponseSave={handleQAResponseSave}
					/>
				</div>
			</div>

			<CardModal<FunnelCard> {...modalProps} />
		</div>
	);
}
