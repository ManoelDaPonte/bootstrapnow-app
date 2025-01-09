export default function Home() {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				fontSize: "2rem",
			}}
		>
			Home
		</div>
	);
}

// // app/tools/business-plan/marketingmix/page.tsx
// "use client";

// import React, { useState } from "react";
// import {
// 	marketingMixSections,
// 	marketingMixShortDescriptions,
// 	marketingMixDetailedDescriptions,
// } from "@/lib/config/configMarketingMix";
// import { Card, ModalState } from "@/lib/config/types";
// import SectionCard from "@/components/business-plan/ui/SectionCard";
// import ModalForm from "@/components/business-plan/ui/ModalForm";

// const MarketingMix: React.FC = () => {
// 	// Initialiser les clés de `cards` dynamiquement à partir de `marketingMixSections`
// 	const initialCards: Record<string, Card[]> = marketingMixSections.reduce(
// 		(acc, section) => {
// 			acc[section.id] = [];
// 			return acc;
// 		},
// 		{} as Record<string, Card[]>
// 	);

// 	// État pour stocker les cartes par section
// 	const [cards, setCards] = useState<Record<string, Card[]>>(initialCards);

// 	// État pour la modale
// 	const [modalState, setModalState] = useState<ModalState>({
// 		open: false,
// 		sectionId: null,
// 		selectedCard: null,
// 		mode: "add", // Valeur par défaut
// 	});

// 	// États pour les champs du formulaire
// 	const [newTitle, setNewTitle] = useState("");
// 	const [newDescription, setNewDescription] = useState("");

// 	// État pour les erreurs de formulaire
// 	const [formError, setFormError] = useState(false);

// 	/**
// 	 * Ouvre la modale pour ajouter ou éditer une carte
// 	 */
// 	const openModal = (
// 		sectionId: string,
// 		card: Card | null = null,
// 		mode: "edit" | "add" = "add" // Définit le mode par défaut
// 	) => {
// 		setModalState({
// 			open: true,
// 			sectionId,
// 			selectedCard: card,
// 			mode,
// 		});
// 		setNewTitle(card?.title || "");
// 		setNewDescription(card?.description || "");
// 		setFormError(false);
// 	};

// 	/**
// 	 * Ferme la modale et réinitialise les états
// 	 */
// 	const closeModal = () => {
// 		setModalState({
// 			open: false,
// 			sectionId: null,
// 			selectedCard: null,
// 			mode: "add",
// 		});
// 		setNewTitle("");
// 		setNewDescription("");
// 		setFormError(false);
// 	};

// 	/**
// 	 * Sauvegarde une carte (création ou édition)
// 	 */
// 	const saveCard = () => {
// 		if (!newTitle.trim() || !newDescription.trim()) {
// 			setFormError(true);
// 			return;
// 		}

// 		const { sectionId, selectedCard, mode } = modalState;
// 		if (!sectionId) return;

// 		if (mode === "edit" && selectedCard && "id" in selectedCard) {
// 			// Édition d'une carte existante
// 			setCards((prev) => ({
// 				...prev,
// 				[sectionId]: prev[sectionId].map((card) =>
// 					card.id === selectedCard.id
// 						? {
// 								...card,
// 								title: newTitle,
// 								description: newDescription,
// 						  }
// 						: card
// 				),
// 			}));
// 		} else {
// 			// Création d'une nouvelle carte
// 			const newCard: Card = {
// 				id: Date.now().toString(),
// 				title: newTitle,
// 				description: newDescription,
// 			};
// 			setCards((prev) => ({
// 				...prev,
// 				[sectionId]: [newCard, ...prev[sectionId]],
// 			}));
// 		}

// 		closeModal();
// 	};

// 	/**
// 	 * Supprime une carte
// 	 */
// 	const deleteCard = () => {
// 		const { sectionId, selectedCard } = modalState;
// 		if (!sectionId || !selectedCard) return;

// 		if (
// 			window.confirm("Êtes-vous sûr de vouloir supprimer cette carte ?")
// 		) {
// 			setCards((prev) => ({
// 				...prev,
// 				[sectionId]: prev[sectionId].filter(
// 					(card) => card.id !== selectedCard.id
// 				),
// 			}));
// 			closeModal();
// 		}
// 	};

// 	return (
// 		<div className="w-full min-h-screen p-4 text-black">
// 			<h1 className="text-3xl font-bold mb-6 text-center">
// 				Marketing Mix
// 			</h1>

// 			{/* GRID responsive */}
// 			<div
// 				className={`
//           grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
//           ${modalState.open ? "blur-sm pointer-events-none" : ""}
//         `}
// 			>
// 				{marketingMixSections.map((section) => (
// 					<SectionCard
// 						key={section.id}
// 						section={section}
// 						shortDescription={
// 							marketingMixShortDescriptions[section.id]
// 						}
// 						onClick={() => openModal(section.id)} // Ouvrir en mode "add"
// 						cardList={cards[section.id] || []} // Assurer que `cardList` est toujours un tableau
// 						onEdit={(card) => openModal(section.id, card, "edit")}
// 						onDelete={(card) => openModal(section.id, card, "edit")}
// 					/>
// 				))}
// 			</div>

// 			{/* Modal */}
// 			<ModalForm
// 				modalState={modalState}
// 				closeModal={closeModal}
// 				saveCard={saveCard}
// 				deleteCard={modalState.selectedCard ? deleteCard : undefined}
// 				titleValue={newTitle}
// 				descriptionValue={newDescription}
// 				setTitle={setNewTitle}
// 				setDescription={setNewDescription}
// 				formError={formError}
// 				detailedDescription={
// 					modalState.mode === "info" && modalState.sectionId
// 						? marketingMixDetailedDescriptions[modalState.sectionId]
// 						: undefined
// 				}
// 			/>
// 		</div>
// 	);
// };

// export default MarketingMix;
