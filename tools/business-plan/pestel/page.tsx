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

// // app/tools/business-plan/pestel/page.tsx
// "use client";

// import React, { useState } from "react";
// import {
// 	pestelSections,
// 	pestelDetailedDescriptions,
// } from "@/lib/config/configPestel";
// import { TeamMember, ModalState } from "@/lib/config/types";
// import SectionCard from "@/components/business-plan/ui/SectionCard";
// import ModalForm from "@/components/business-plan/ui/ModalForm";

// const Pestel: React.FC = () => {
// 	// Initialiser les clés de `cards` dynamiquement à partir de `pestelSections`
// 	const initialCards: Record<string, TeamMember[]> = pestelSections.reduce(
// 		(acc, section) => {
// 			acc[section.id] = [];
// 			return acc;
// 		},
// 		{} as Record<string, TeamMember[]>
// 	);

// 	// État pour stocker les membres de l'équipe par section
// 	const [cards, setCards] =
// 		useState<Record<string, TeamMember[]>>(initialCards);

// 	// État pour la modale
// 	const [modalState, setModalState] = useState<ModalState>({
// 		open: false,
// 		sectionId: null,
// 		selectedCard: null,
// 		mode: "edit", // Valeur par défaut
// 	});

// 	// États pour les champs du formulaire
// 	const [newTitle, setNewTitle] = useState("");
// 	const [newDescription, setNewDescription] = useState("");

// 	// État pour les erreurs de formulaire
// 	const [formError, setFormError] = useState(false);

// 	/**
// 	 * Ouvre la modale pour ajouter ou éditer un membre ou afficher les détails de la section
// 	 */
// 	const openModal = (
// 		sectionId: string,
// 		member: TeamMember | null = null,
// 		mode: "edit" | "info" = "edit" // Définit le mode par défaut
// 	) => {
// 		setModalState({
// 			open: true,
// 			sectionId,
// 			selectedCard: member,
// 			mode,
// 		});
// 		setNewTitle(member?.name || "");
// 		setNewDescription(member?.role || "");
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
// 			mode: "edit",
// 		});
// 		setNewTitle("");
// 		setNewDescription("");
// 		setFormError(false);
// 	};

// 	/**
// 	 * Sauvegarde un membre (création ou édition)
// 	 */
// 	const saveCard = () => {
// 		if (!newTitle.trim() || !newDescription.trim()) {
// 			setFormError(true);
// 			return;
// 		}

// 		const { sectionId, selectedCard, mode } = modalState;
// 		if (!sectionId) return;

// 		if (mode === "edit" && selectedCard && "id" in selectedCard) {
// 			// Édition d'un membre existant
// 			setCards((prev) => ({
// 				...prev,
// 				[sectionId]: prev[sectionId].map((member) =>
// 					member.id === selectedCard.id
// 						? { ...member, name: newTitle, role: newDescription }
// 						: member
// 				),
// 			}));
// 		} else {
// 			// Création d'un nouveau membre
// 			const newMember: TeamMember = {
// 				id: Date.now().toString(),
// 				name: newTitle,
// 				role: newDescription,
// 				skills: {}, // Initialisez les compétences si nécessaire
// 			};
// 			setCards((prev) => ({
// 				...prev,
// 				[sectionId]: [newMember, ...prev[sectionId]],
// 			}));
// 		}

// 		closeModal();
// 	};

// 	/**
// 	 * Supprime un membre
// 	 */
// 	const deleteCard = () => {
// 		const { sectionId, selectedCard } = modalState;
// 		if (!sectionId || !selectedCard) return;

// 		if (window.confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
// 			setCards((prev) => ({
// 				...prev,
// 				[sectionId]: prev[sectionId].filter(
// 					(member) => member.id !== selectedCard.id
// 				),
// 			}));
// 			closeModal();
// 		}
// 	};

// 	return (
// 		<div className="w-full min-h-screen p-4 text-black">
// 			<h1 className="text-3xl font-bold mb-6 text-center">
// 				PESTEL Analysis
// 			</h1>

// 			{/* GRID responsive */}
// 			<div
// 				className={`
//           grid grid-rows-6 grid-cols-6 gap-4
//           ${modalState.open ? "blur-sm pointer-events-none" : ""}
//         `}
// 			>
// 				{pestelSections.map((section) => (
// 					<SectionCard
// 						key={section.id}
// 						section={section}
// 						shortDescription="" // Vous pouvez ajouter des descriptions courtes si nécessaire
// 						onClick={() => openModal(section.id, null, "info")} // Ouvrir pour info
// 						cardList={cards[section.id] || []} // Assurer que `cardList` est toujours un tableau
// 						onEdit={(member) =>
// 							openModal(section.id, member, "edit")
// 						}
// 						onDelete={(member) =>
// 							openModal(section.id, member, "edit")
// 						}
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
// 						? pestelDetailedDescriptions[modalState.sectionId]
// 						: undefined
// 				}
// 			/>
// 		</div>
// 	);
// };

// export default Pestel;
