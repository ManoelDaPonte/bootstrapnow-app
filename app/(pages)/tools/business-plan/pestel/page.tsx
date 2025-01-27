// app/business-plan/pestel/page.tsx
"use client";
import React, { useState } from "react";
import PestelSection from "@/components/business-plan/pestel/PestelSection";
import PestelModal from "@/components/business-plan/pestel/PestelModal";
import { PestelCard, ModalState } from "@/types/pestel";
import { usePestelData } from "@/lib/hooks/business-plan/pestel/usePestelData";
import { calculateProgress } from "@/lib/hooks/business-plan/pestel/storage-pestel";
import { Header } from "@/components/business-plan/shared/Header";

const PESTEL_DESCRIPTIONS = {
	political:
		"Facteurs liés aux politiques gouvernementales et à la réglementation.",
	economic: "Variables économiques qui peuvent influencer votre marché.",
	social: "Tendances sociales et démographiques affectant votre activité.",
	technological:
		"Innovations et changements technologiques impactant votre secteur.",
	environmental: "Considérations environnementales et écologiques.",
	legal: "Cadre juridique et conformité réglementaire.",
} as const;

const PESTEL_HEADERS = {
	political: { title: "Politique", color: "text-purple-700" },
	economic: { title: "Économique", color: "text-emerald-700" },
	social: { title: "Social", color: "text-blue-700" },
	technological: { title: "Technologique", color: "text-orange-700" },
	environmental: { title: "Environnemental", color: "text-green-700" },
	legal: { title: "Légal", color: "text-red-700" },
} as const;

type PestelCategory = keyof typeof PESTEL_DESCRIPTIONS;

const sectionOrder: PestelCategory[] = [
	"political",
	"economic",
	"social",
	"technological",
	"environmental",
	"legal",
];

export default function PestelMatrix() {
	const { cards, handleSaveCard, handleDeleteCard } = usePestelData();

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

	return (
		<div className="flex flex-col h-screen">
			<Header title="PesteL" progress={calculateProgress(cards)} />

			<div className="flex-1 w-full p-6 overflow-y-auto">
				<div className="grid grid-cols-3 gap-6">
					{sectionOrder.map((category) => (
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
			</div>

			<PestelModal
				isOpen={modalState.open}
				card={modalState.card}
				onClose={() =>
					setModalState({
						open: false,
						category: "",
						card: { id: 0, title: "", description: "" },
					})
				}
				onSave={handleModalSave}
				onDelete={handleModalDelete}
				error={error}
				isNew={!modalState.card.id}
				onChange={(e) =>
					setModalState((prev) => ({
						...prev,
						card: { ...prev.card, [e.target.name]: e.target.value },
					}))
				}
			/>
		</div>
	);
}
