// app/business-plan/funnel-chart/page.tsx
"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ChevronLeft } from "lucide-react";
import _ from "lodash";
import { FunnelChartModal } from "@/components/business-plan/funnel-chart/FunnelChartModal";
import { FunnelCard, EditingCard } from "@/types/funnel-chart";
import { useFunnelChartData } from "@/lib/hooks/business-plan/funnel-chart/useFunnelChartData";
import { calculateProgress } from "@/lib/business-plan/funnel-chart/storage-funnel-chart";
import FunnelChart from "@/components/business-plan/funnel-chart/FunnelChart";
import { Header } from "@/components/business-plan/shared/Header";

export default function FunnelChartPage() {
	const { user } = useUser();
	const { sections, handleUpdateSections } = useFunnelChartData();

	const [editingCard, setEditingCard] = useState<EditingCard>(null);
	const [error, setError] = useState(false);

	const handleAddCard = (sectionId: number) => {
		const newCard: FunnelCard = {
			id: crypto.randomUUID(),
			title: "",
			description: "",
		};
		setEditingCard({ sectionId, card: newCard });
	};

	const handleEditCard = (sectionId: number, card: FunnelCard) => {
		setEditingCard({ sectionId, card: { ...card } });
	};

	const handleModalClose = () => {
		setEditingCard(null);
		setError(false);
	};

	const handleModalSave = () => {
		if (!editingCard) return;

		if (
			!editingCard.card.title.trim() ||
			!editingCard.card.description.trim()
		) {
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
		handleModalClose();
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
		handleModalClose();
	};

	const [localSections, setLocalSections] = useState(sections);

	// Update local sections when DB sections change
	useEffect(() => {
		setLocalSections(sections);
	}, [sections]);

	const debouncedUpdateSections = useCallback(
		_.debounce((newSections) => {
			handleUpdateSections(newSections);
		}, 500),
		[]
	);

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

		// Update local state immediately
		setLocalSections(newSections);
		// Debounce the update to database
		debouncedUpdateSections(newSections);
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

			{editingCard && (
				<FunnelChartModal
					isOpen={!!editingCard}
					onClose={handleModalClose}
					card={editingCard.card}
					onSave={handleModalSave}
					onDelete={handleModalDelete}
					error={error}
					isNew={!editingCard.card.id}
					onChange={(e) => {
						setEditingCard({
							...editingCard,
							card: {
								...editingCard.card,
								[e.target.name]: e.target.value,
							},
						});
					}}
				/>
			)}
		</div>
	);
}
