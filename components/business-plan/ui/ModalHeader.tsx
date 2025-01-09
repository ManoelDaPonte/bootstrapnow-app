// components/ui/ModalHeader.tsx
"use client";

import React from "react";
import ActionButton from "./ActionButton";
import { FaTimes, FaCheckCircle, FaTrashAlt } from "react-icons/fa";

interface ModalHeaderProps {
	closeModal: () => void;
	saveCard: () => void;
	deleteCard?: () => void;
	isEditing: boolean;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
	closeModal,
	saveCard,
	deleteCard,
	isEditing,
}) => {
	return (
		<>
			{/* Bouton fermer */}
			<ActionButton
				icon={<FaTimes size={20} />}
				onClick={closeModal}
				color="gray"
				hoverColor="gray"
				ariaLabel="Fermer la modal"
			/>

			{/* Bouton valider */}
			<ActionButton
				icon={<FaCheckCircle size={20} />}
				onClick={saveCard}
				color="green"
				hoverColor="green"
				ariaLabel="Enregistrer les modifications"
			/>

			{/* Bouton supprimer (si en mode édition) */}
			{isEditing && deleteCard && (
				<ActionButton
					icon={<FaTrashAlt size={20} />}
					onClick={deleteCard}
					color="red"
					hoverColor="red"
					ariaLabel="Supprimer la carte"
				/>
			)}
		</>
	);
};

export default ModalHeader;
