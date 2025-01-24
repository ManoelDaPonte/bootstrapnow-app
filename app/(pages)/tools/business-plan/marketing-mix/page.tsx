// app/business-plan/marketing-mix/page.tsx
"use client";
import React, { useState } from "react";
import MarketingMixSection from "@/components/business-plan/marketing-mix/MarketingMixSection";
import MarketingMixModal from "@/components/business-plan/marketing-mix/MarketingMixModal";
import { MarketingMixCard, ModalState } from "@/types/marketing-mix";
import { useMarketingMixData } from "@/lib/hooks/business-plan/marketing-mix/useMarketingMixData";
import { calculateProgress } from "@/lib/business-plan/marketing-mix/storage-marketing-mix";
import { Header } from "@/components/business-plan/shared/Header";

const MARKETING_MIX_DESCRIPTIONS = {
	product: "Caractéristiques et avantages du produit ou service proposé.",
	price: "Stratégie de tarification et positionnement sur le marché.",
	place: "Canaux de distribution et accessibilité pour les clients.",
	promotion: "Stratégies de communication et actions marketing.",
	people: "Personnel, formation et service client.",
	process: "Processus de livraison et expérience client.",
	physical_evidence:
		"Environnement physique et preuves tangibles du service.",
} as const;

const MARKETING_MIX_HEADERS = {
	product: { title: "Produit", color: "text-blue-700" },
	price: { title: "Prix", color: "text-emerald-700" },
	place: { title: "Distribution", color: "text-purple-700" },
	promotion: { title: "Promotion", color: "text-orange-700" },
	people: { title: "Personnel", color: "text-red-700" },
	process: { title: "Processus", color: "text-cyan-700" },
	physical_evidence: { title: "Preuve Physique", color: "text-yellow-700" },
} as const;

type MarketingMixCategory = keyof typeof MARKETING_MIX_HEADERS;

const sectionOrder: MarketingMixCategory[] = [
	"product",
	"price",
	"place",
	"promotion",
	"people",
	"process",
	"physical_evidence",
];

export default function MarketingMixMatrix() {
	const { cards, handleSaveCard, handleDeleteCard } = useMarketingMixData();

	const [modalState, setModalState] = useState<ModalState>({
		open: false,
		category: "",
		card: { id: 0, title: "", description: "" },
	});
	const [error, setError] = useState(false);

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

	return (
		<div className="min-h-screen bg-gray-50">
			<Header title="Mix Marketing" progress={calculateProgress(cards)} />

			{/* Contenu principal avec grille adaptative */}
			<div className="max-w-[1920px] mx-auto p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{sectionOrder.map((category) => (
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
								headerColor={
									MARKETING_MIX_HEADERS[category].color
								}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Modal */}
			<MarketingMixModal
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
