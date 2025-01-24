// app/business-plan/swot/page.tsx
"use client";
import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import SwotSection from "@/components/business-plan/swot/SwotSection";
import SwotModal from "@/components/business-plan/swot/SwotModal";
import { SwotCard, ModalState, SwotData } from "@/types/swot";
import { useSwotData } from "@/lib/hooks/business-plan/swot/useSwotData";
import { calculateProgress } from "@/lib/business-plan/swot/storage-swot";
import { Header } from "@/components/business-plan/shared/Header";

const SWOT_DESCRIPTIONS = {
	strengths:
		"Attributs et ressources internes qui soutiennent la réussite d'une stratégie.",
	weaknesses:
		"Facteurs internes qui pourraient entraver la réussite d'une stratégie.",
	opportunities:
		"Facteurs externes que l'organisation peut exploiter à son avantage.",
	threats:
		"Facteurs externes qui pourraient poser des défis ou des risques pour l'organisation.",
} as const;

export const SWOT_HEADERS = {
	strengths: { title: "Forces", color: "text-emerald-700" },
	weaknesses: { title: "Faiblesses", color: "text-red-700" },
	opportunities: { title: "Opportunités", color: "text-blue-700" },
	threats: { title: "Menaces", color: "text-orange-700" },
} as const;

type SwotCategory = keyof SwotData;

const sectionOrder: SwotCategory[] = [
	"strengths",
	"weaknesses",
	"threats",
	"opportunities",
];

export default function SwotMatrix() {
	const { user } = useUser();
	const { cards, handleSaveCard, handleDeleteCard } = useSwotData();

	const [modalState, setModalState] = useState<ModalState>({
		open: false,
		category: "",
		card: { id: 0, title: "", description: "" },
	});
	const [error, setError] = useState(false);
	type SwotCategory = keyof SwotData;

	const handleAddCard = (category: SwotCategory) => {
		setModalState({
			open: true,
			category,
			card: { id: 0, title: "", description: "" },
		});
		setError(false);
	};

	const handleEditCard = (category: SwotCategory, card: SwotCard) => {
		setModalState({ open: true, category, card });
		setError(false);
	};

	const handleModalSave = () => {
		const { category, card } = modalState;
		console.log("Save click on", category, card);
		if (!card.title || !card.description) {
			setError(true);
			return;
		}

		if (category !== "lastAnalysis" && category !== "lastUpdated") {
			handleSaveCard(
				category as
					| "strengths"
					| "weaknesses"
					| "opportunities"
					| "threats",
				card
			);
		}
		setModalState({
			open: false,
			category: "",
			card: { id: 0, title: "", description: "" },
		});
	};

	const handleModalDelete = () => {
		const { category, card } = modalState;
		if (category !== "lastAnalysis" && category !== "lastUpdated") {
			handleDeleteCard(
				category as
					| "strengths"
					| "weaknesses"
					| "opportunities"
					| "threats",
				card.id
			);
		}
		setModalState({
			open: false,
			category: "",
			card: { id: 0, title: "", description: "" },
		});
	};

	return (
		<div className="flex flex-col h-screen">
			<Header title="Matrice SWOT" progress={calculateProgress(cards)} />

			<div className="flex-1 max-w-7xl mx-auto w-full p-6">
				<div className="grid grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
					{sectionOrder.map((category) => {
						if (
							category === "lastAnalysis" ||
							category === "lastUpdated"
						)
							return null;
						const cardList = cards[category];
						return (
							<SwotSection
								key={category}
								category={category}
								title={SWOT_HEADERS[category].title}
								description={SWOT_DESCRIPTIONS[category]}
								cards={cardList}
								onAddCard={handleAddCard}
								onEditCard={handleEditCard}
							/>
						);
					})}
				</div>
			</div>

			<SwotModal
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
