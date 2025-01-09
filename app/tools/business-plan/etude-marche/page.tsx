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

// // app/tools/business-plan/etude-marche/page.tsx
// "use client";

// import React, { useState } from "react";
// import {
// 	etudeMarcheSections,
// 	etudeMarcheShortDescriptions,
// 	etudeMarcheDetailedDescriptions,
// } from "@/lib/config/configEtudeMarche";
// import { TeamMember, ModalState, Card } from "@/lib/config/types";
// import SectionCard from "@/components/business-plan/ui/SectionCard";
// import ModalForm from "@/components/business-plan/ui/ModalForm";

// const EtudeMarche: React.FC = () => {
// 	// Initialiser les clés de `cards` dynamiquement à partir de `etudeMarcheSections`
// 	const initialCards: Record<string, TeamMember[]> =
// 		etudeMarcheSections.reduce((acc, section) => {
// 			acc[section.id] = [];
// 			return acc;
// 		}, {} as Record<string, TeamMember[]>);

// 	// État pour stocker les membres de l'équipe par section
// 	const [cards, setCards] =
// 		useState<Record<string, TeamMember[]>>(initialCards);

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

// 	/**
// 	 * Ouvre la modale pour ajouter ou éditer un membre
// 	 */
// 	const openModal = (sectionId: string, member: TeamMember | null = null) => {
// 		setModalState({
// 			open: true,
// 			sectionId,
// 			selectedCard: member
// 				? {
// 						id: member.id,
// 						title: member.name,
// 						description: member.role,
// 				  }
// 				: null,
// 		});
// 		setNewTitle(member?.name || "");
// 		setNewDescription(member?.role || "");
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
// 	 * Sauvegarde un membre (création ou édition)
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
// 			setCards((prev) => ({
// 				...prev,
// 				[sectionId]: prev[sectionId].map((member) =>
// 					member.id === selectedCard.id
// 						? { ...member, name: newTitle, role: newDescription }
// 						: member
// 				),
// 			}));
// 		} else {
// 			// Création
// 			const newMember: TeamMember = {
// 				id: Date.now().toString(),
// 				name: newTitle,
// 				role: newDescription,
// 				skills: {}, // Vous pouvez initialiser les compétences si nécessaire
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

// 	/**
// 	 * Exporter en CSV (si nécessaire)
// 	 */
// 	// Implémentez cette fonctionnalité si nécessaire

// 	return (
// 		<div className="w-full min-h-screen p-4 text-black">
// 			<h1 className="text-2xl font-bold mb-6">Étude de Marché</h1>

// 			{/* GRID responsive */}
// 			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// 				{etudeMarcheSections.map((section) => (
// 					<SectionCard
// 						key={section.id}
// 						section={section}
// 						shortDescription={
// 							etudeMarcheShortDescriptions[section.id]
// 						}
// 						onClick={() => openModal(section.id)}
// 						cardList={cards[section.id] || []} // Assurer que `cardList` est toujours un tableau
// 						onEdit={(member) => openModal(section.id, member)}
// 						onDelete={(member) => openModal(section.id, member)}
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
// 					modalState.sectionId
// 						? etudeMarcheDetailedDescriptions[modalState.sectionId]
// 						: undefined
// 				}
// 			/>
// 		</div>
// 	);
// };

// export default EtudeMarche;
