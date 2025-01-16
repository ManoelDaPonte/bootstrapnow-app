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

// // app/tools/business-plan/value-proposition/page.tsx
// "use client";

// import React, { useState, useCallback } from "react";
// import {
// 	valuePropositionSections,
// 	valuePropositionDetailedDescriptions,
// 	descriptions,
// } from "@/lib/config/configValueProposition";
// import { Card, ModalState, DescriptionContent } from "@/lib/config/types";
// import CardItem from "@/components/business-plan/ui/CardItem";
// import ModalForm from "@/components/business-plan/ui/ModalForm";
// import { FaEdit, FaTrash, FaPlus, FaCheck } from "react-icons/fa";

// const ValuePropositionCanvas: React.FC = () => {
// 	// État pour stocker les cartes par catégorie
// 	const [sections, setSections] = useState<Record<string, Card[]>>({
// 		products: [],
// 		problem: [],
// 		valueCreation: [],
// 		gains: [],
// 		jobs: [],
// 		pains: [],
// 	});

// 	// État pour la modale
// 	const [modalState, setModalState] = useState<ModalState>({
// 		open: false,
// 		sectionId: null,
// 		selectedCard: null,
// 	});

// 	// États pour les champs du formulaire
// 	const [newTitle, setNewTitle] = useState("");
// 	const [newDescription, setNewDescription] = useState("");

// 	// État pour les erreurs de formulaire
// 	const [formError, setFormError] = useState(false);

// 	// État pour la vue de la barre latérale
// 	const [sidebarView, setSidebarView] = useState<"description" | "cards">(
// 		"description"
// 	);

// 	/**
// 	 * Ouvre la modale pour ajouter ou éditer une carte
// 	 * @param sectionId - ID de la section (products, problem, etc.)
// 	 * @param card - Carte existante à éditer (optionnel)
// 	 */
// 	const openModal = (sectionId: string, card: Card | null = null) => {
// 		setModalState({ open: true, sectionId, selectedCard: card });
// 		setNewTitle(card?.title || "");
// 		setNewDescription(card?.description || "");
// 		setFormError(false);
// 	};

// 	/**
// 	 * Ferme la modale et réinitialise les états
// 	 */
// 	const closeModal = () => {
// 		setModalState({ open: false, sectionId: null, selectedCard: null });
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

// 		const { sectionId, selectedCard } = modalState;
// 		if (!sectionId) return;

// 		if (selectedCard) {
// 			// Édition
// 			setSections((prev) => ({
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
// 			// Création
// 			const newCardData: Card = {
// 				id: Date.now().toString(),
// 				title: newTitle,
// 				description: newDescription,
// 			};
// 			setSections((prev) => ({
// 				...prev,
// 				[sectionId]: [newCardData, ...prev[sectionId]],
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

// 		setSections((prev) => ({
// 			...prev,
// 			[sectionId]: prev[sectionId].filter(
// 				(card) => card.id !== selectedCard.id
// 			),
// 		}));

// 		closeModal();
// 	};

// 	return (
// 		<div className="w-full min-h-screen p-4 bg-gray-100 text-black flex">
// 			{/* Canvas Principal */}
// 			<div className="flex-1">
// 				<h1 className="text-3xl font-bold mb-6 text-center">
// 					Canvas de Proposition de Valeur
// 				</h1>

// 				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// 					{/* Sections Carrées */}
// 					{valuePropositionSections
// 						.filter((section: { id: string }) =>
// 							["products", "problem", "valueCreation"].includes(
// 								section.id
// 							)
// 						)
// 						.map(
// 							(section: {
// 								id: string;
// 								className: string;
// 								icon: React.ReactNode;
// 								title: string;
// 								titleClass: string;
// 							}) => (
// 								<div
// 									key={section.id}
// 									className={`p-4 rounded-md shadow-md bg-white flex flex-col justify-between ${section.className}`}
// 								>
// 									{/* En-tête de la section */}
// 									<div className="flex items-center justify-between">
// 										<div className="flex items-center gap-2">
// 											<div className="text-2xl">
// 												{section.icon}
// 											</div>
// 											<span
// 												className={`text-xl font-semibold ${section.titleClass}`}
// 											>
// 												{section.title}
// 											</span>
// 										</div>
// 										<FaEdit
// 											className="text-gray-500 cursor-pointer"
// 											onClick={() =>
// 												openModal(section.id)
// 											}
// 										/>
// 									</div>

// 									{/* Liste des cartes */}
// 									<div className="mt-4 flex flex-col gap-2">
// 										{sections[section.id].map(
// 											(card: Card) => (
// 												<CardItem
// 													key={card.id}
// 													card={card}
// 													onEdit={() =>
// 														openModal(
// 															section.id,
// 															card
// 														)
// 													}
// 													onDelete={() =>
// 														openModal(
// 															section.id,
// 															card
// 														)
// 													}
// 												/>
// 											)
// 										)}

// 										{/* Bouton + Ajouter un élément */}
// 										<button
// 											className={`mt-2 flex items-center justify-center w-full h-10 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-100 transition`}
// 											onClick={() =>
// 												openModal(section.id)
// 											}
// 										>
// 											<FaPlus />
// 										</button>
// 									</div>
// 								</div>
// 							)
// 						)}

// 					{/* Sections Circulaires */}
// 					{valuePropositionSections
// 						.filter((section: { id: string }) =>
// 							["gains", "jobs", "pains"].includes(section.id)
// 						)
// 						.map(
// 							(section: {
// 								id: string;
// 								className: string;
// 								icon: React.ReactNode;
// 								title: string;
// 								titleClass: string;
// 							}) => (
// 								<div
// 									key={section.id}
// 									className={`p-4 rounded-full shadow-md bg-white flex flex-col justify-between items-center ${section.className}`}
// 								>
// 									{/* En-tête de la section */}
// 									<div className="flex items-center justify-center">
// 										<div className="text-2xl">
// 											{section.icon}
// 										</div>
// 										<span
// 											className={`text-xl font-semibold ml-2 ${section.titleClass}`}
// 										>
// 											{section.title}
// 										</span>
// 									</div>

// 									{/* Liste des cartes */}
// 									<div className="mt-4 flex flex-col gap-2">
// 										{sections[section.id].map(
// 											(card: Card) => (
// 												<CardItem
// 													key={card.id}
// 													card={card}
// 													onEdit={() =>
// 														openModal(
// 															section.id,
// 															card
// 														)
// 													}
// 													onDelete={() =>
// 														openModal(
// 															section.id,
// 															card
// 														)
// 													}
// 												/>
// 											)
// 										)}

// 										{/* Bouton + Ajouter un élément */}
// 										<button
// 											className={`mt-2 flex items-center justify-center w-full h-10 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-100 transition`}
// 											onClick={() =>
// 												openModal(section.id)
// 											}
// 										>
// 											<FaPlus />
// 										</button>
// 									</div>
// 								</div>
// 							)
// 						)}
// 				</div>
// 			</div>

// 			{/* Sidebar */}
// 			<div className="w-1/3 ml-6 bg-white p-4 rounded-md shadow-md">
// 				<div className="flex justify-between mb-4">
// 					<button
// 						onClick={() => setSidebarView("description")}
// 						className={`px-4 py-2 rounded-md ${
// 							sidebarView === "description"
// 								? "bg-blue-500 text-white"
// 								: "bg-gray-200 text-gray-700"
// 						}`}
// 					>
// 						Descriptions
// 					</button>
// 					<button
// 						onClick={() => setSidebarView("cards")}
// 						className={`px-4 py-2 rounded-md ${
// 							sidebarView === "cards"
// 								? "bg-blue-500 text-white"
// 								: "bg-gray-200 text-gray-700"
// 						}`}
// 					>
// 						Gérer les cartes
// 					</button>
// 				</div>

// 				{sidebarView === "description" ? (
// 					<div className="vp-description-view">
// 						{Object.entries(descriptions).map(([key, desc]) => (
// 							<div key={key} className="mb-4">
// 								<h3
// 									className={`text-lg font-semibold ${
// 										valuePropositionSections.find(
// 											(s) => s.id === key
// 										)?.titleClass
// 									}`}
// 								>
// 									{desc.title}
// 								</h3>
// 								<p className="text-gray-700">{desc.content}</p>
// 								<p className="text-gray-500 italic mt-2">
// 									{desc.example}
// 								</p>
// 							</div>
// 						))}
// 					</div>
// 				) : (
// 					<div className="vp-card-management">
// 						{valuePropositionSections.map((section) => (
// 							<div key={section.id} className="mb-6">
// 								<h4
// 									className={`text-xl font-semibold mb-2 ${section.titleClass}`}
// 								>
// 									{section.title}
// 								</h4>
// 								{sections[section.id].map((card) => (
// 									<div
// 										key={card.id}
// 										className="flex items-center justify-between bg-gray-100 p-2 rounded-md mb-2"
// 									>
// 										<div>
// 											<h5 className="font-semibold">
// 												{card.title || "Sans titre"}
// 											</h5>
// 											<p className="text-sm text-gray-600">
// 												{card.description ||
// 													"Pas de description."}
// 											</p>
// 										</div>
// 										<div className="flex gap-2">
// 											<FaEdit
// 												className="text-blue-500 cursor-pointer hover:text-blue-700"
// 												onClick={() =>
// 													openModal(section.id, card)
// 												}
// 											/>
// 											<FaTrash
// 												className="text-red-500 cursor-pointer hover:text-red-700"
// 												onClick={() =>
// 													openModal(section.id, card)
// 												}
// 											/>
// 										</div>
// 									</div>
// 								))}
// 								<button
// 									className="flex items-center justify-center w-full h-10 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-100 transition"
// 									onClick={() => openModal(section.id)}
// 								>
// 									<FaPlus />
// 								</button>
// 							</div>
// 						))}
// 					</div>
// 				)}
// 			</div>

// 			{/* Modal */}
// 			{modalState.open && (
// 				<ModalForm
// 					modalState={modalState}
// 					closeModal={closeModal}
// 					saveCard={saveCard}
// 					deleteCard={
// 						modalState.selectedCard ? deleteCard : undefined
// 					}
// 					titleValue={newTitle}
// 					descriptionValue={newDescription}
// 					setTitle={setNewTitle}
// 					setDescription={setNewDescription}
// 					formError={formError}
// 					detailedDescription={
// 						modalState.sectionId
// 							? valuePropositionDetailedDescriptions[
// 									modalState.sectionId
// 							  ]
// 							: undefined
// 					}
// 				/>
// 			)}
// 		</div>
// 	);
// };

// export default ValuePropositionCanvas;
