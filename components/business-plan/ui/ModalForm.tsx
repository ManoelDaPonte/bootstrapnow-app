// components/business-plan/ui/ModalForm.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { ModalState, DescriptionContent } from "@/lib/config/types";
import InputField from "@/components/business-plan/ui/InputField";

interface ModalFormProps {
	modalState: ModalState;
	closeModal: () => void;
	saveCard: () => void;
	deleteCard?: () => void;
	titleValue: string;
	descriptionValue: string;
	setTitle: (value: string) => void;
	setDescription: (value: string) => void;
	formError: boolean;
	detailedDescription?: DescriptionContent;
}

const ModalForm: React.FC<ModalFormProps> = ({
	modalState,
	closeModal,
	saveCard,
	deleteCard,
	titleValue,
	descriptionValue,
	setTitle,
	setDescription,
	formError,
	detailedDescription,
}) => {
	const firstInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

	useEffect(() => {
		if (modalState.open) {
			firstInputRef.current?.focus();
		}
	}, [modalState.open]);

	const handleOutsideClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	return (
		<div
			onClick={handleOutsideClick}
			className={`fixed inset-0 flex items-center justify-center bg-black/40 z-50 ${
				modalState.open ? "block" : "hidden"
			}`}
			aria-modal="true"
			role="dialog"
			aria-labelledby="modal-title"
		>
			<div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative overflow-y-auto">
				{/* Titre de la Modale */}
				<h2 id="modal-title" className="text-xl font-bold mb-4">
					{modalState.mode === "info"
						? `Détails de ${modalState.sectionId?.toUpperCase()}`
						: modalState.selectedCard
						? "Éditer la Carte"
						: "Ajouter une Carte"}
				</h2>

				{/* Contenu de la Modale */}
				{modalState.mode === "info" && detailedDescription ? (
					<div>
						<h3 className="text-lg font-semibold mb-2">
							{detailedDescription.title}
						</h3>
						{detailedDescription.sections.map((section, index) => (
							<div key={index} className="mb-4">
								<h4 className="font-medium">
									{section.header}
								</h4>
								{section.content && (
									<p className="text-sm text-gray-700">
										{section.content}
									</p>
								)}
								{section.list && (
									<ul className="list-disc list-inside text-sm text-gray-700">
										{section.list.map((item, idx) => (
											<li key={idx}>{item}</li>
										))}
									</ul>
								)}
							</div>
						))}
					</div>
				) : (
					<div>
						<InputField
							id="title"
							label="Titre"
							value={titleValue}
							onChange={setTitle}
							placeholder="Entrez le titre"
							error={formError && !titleValue}
							ref={firstInputRef}
						/>

						<InputField
							id="description"
							label="Description"
							value={descriptionValue}
							onChange={setDescription}
							placeholder="Entrez la description"
							error={formError && !descriptionValue}
							type="textarea"
						/>
					</div>
				)}

				{/* Actions de la Modale */}
				<div className="flex justify-end gap-2 mt-6">
					{modalState.mode !== "info" && deleteCard && (
						<button
							onClick={deleteCard}
							className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
						>
							Supprimer
						</button>
					)}
					<button
						onClick={closeModal}
						className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
					>
						{modalState.mode === "info" ? "Fermer" : "Annuler"}
					</button>
					{modalState.mode !== "info" && (
						<button
							onClick={saveCard}
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						>
							Sauvegarder
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ModalForm;
