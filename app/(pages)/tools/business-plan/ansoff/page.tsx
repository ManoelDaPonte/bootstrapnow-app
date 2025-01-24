"use client";
import React, { useState } from "react";
import { AnsoffCard, ModalState, AnsoffData } from "@/types/ansoff";
import { useAnsoffData } from "@/lib/hooks/business-plan/ansoff/useAnsoffData";
import { AnsoffSection } from "@/components/business-plan/ansoff/AnsoffSection";
import { AnsoffModal } from "@/components/business-plan/ansoff/AnsoffModal";
import { calculateProgress } from "@/lib/business-plan/ansoff/storage-ansoff";
import { Header } from "@/components/business-plan/shared/Header";

// Définition du type AnsoffCategory
type AnsoffCategory = keyof Omit<AnsoffData, "lastAnalysis" | "lastUpdated">;

const ANSOFF_DESCRIPTIONS = {
	penetration: "Vendre plus de produits existants aux marchés existants.",
	development_market: "Vendre des produits existants à de nouveaux marchés.",
	development_product: "Vendre de nouveaux produits aux marchés existants.",
	diversification: "Vendre de nouveaux produits à de nouveaux marchés.",
} as const;

const ANSOFF_HEADERS = {
	penetration: { title: "Pénétration du marché", color: "text-blue-700" },
	development_market: {
		title: "Développement du marché",
		color: "text-emerald-700",
	},
	development_product: {
		title: "Développement du produit",
		color: "text-orange-700",
	},
	diversification: { title: "Diversification", color: "text-purple-700" },
} as const;

export default function AnsoffMatrix() {
	const { cards, handleSaveCard, handleDeleteCard } = useAnsoffData();
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

	return (
		<div className="flex flex-col h-screen">
			<Header
				title="Matrice Ansoff"
				progress={calculateProgress(cards)}
			/>

			{/* Matrix Grid */}
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
						{/* Label Marché */}
						<span className="text-sm font-medium text-gray-600 -rotate-90 whitespace-nowrap">
							Marché
						</span>
						{/* Labels Existant/Nouveau */}
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
							<AnsoffSection
								category="penetration"
								title={ANSOFF_HEADERS.penetration.title}
								description={ANSOFF_DESCRIPTIONS.penetration}
								cards={cards.penetration}
								onAddCard={handleAddCard}
								onEditCard={handleEditCard}
							/>
							<AnsoffSection
								category="development_product"
								title={ANSOFF_HEADERS.development_product.title}
								description={
									ANSOFF_DESCRIPTIONS.development_product
								}
								cards={cards.development_product}
								onAddCard={handleAddCard}
								onEditCard={handleEditCard}
							/>
							<AnsoffSection
								category="development_market"
								title={ANSOFF_HEADERS.development_market.title}
								description={
									ANSOFF_DESCRIPTIONS.development_market
								}
								cards={cards.development_market}
								onAddCard={handleAddCard}
								onEditCard={handleEditCard}
							/>
							<AnsoffSection
								category="diversification"
								title={ANSOFF_HEADERS.diversification.title}
								description={
									ANSOFF_DESCRIPTIONS.diversification
								}
								cards={cards.diversification}
								onAddCard={handleAddCard}
								onEditCard={handleEditCard}
							/>
						</div>
					</div>
				</div>
			</div>

			<AnsoffModal
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
