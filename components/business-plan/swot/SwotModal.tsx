import React from "react";
import { SwotCard } from "@/types/swot";
import { X } from "lucide-react";

interface SwotModalProps {
	isOpen: boolean;
	onClose: () => void;
	card: SwotCard;
	onSave: () => void;
	onDelete: () => void;
	error: boolean;
	isNew?: boolean; // Nouvelle prop
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
}
export const SwotModal: React.FC<SwotModalProps> = ({
	isOpen,
	onClose,
	card,
	onSave,
	onDelete,
	error,
	onChange,
	isNew,
}) => {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 opacity-100 m-4"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="flex justify-between items-center p-6 border-b">
					<h2 className="text-xl font-semibold text-gray-800">
						{card.id ? "Modifier la carte" : "Nouvelle carte"}
					</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
					>
						<X size={20} />
					</button>
				</div>

				{/* Content */}
				<div className="p-6 space-y-6">
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700">
							Titre
						</label>
						<input
							type="text"
							name="title"
							value={card.title}
							onChange={onChange}
							className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
							placeholder="Entrez un titre..."
						/>
					</div>

					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700">
							Description
						</label>
						<textarea
							name="description"
							value={card.description}
							onChange={onChange}
							rows={4}
							className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
							placeholder="Entrez une description..."
						/>
					</div>

					{error && (
						<div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg flex items-start space-x-2">
							<svg
								className="w-5 h-5 flex-shrink-0 mt-0.5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<p className="text-sm">
								Tous les champs sont requis.
							</p>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="flex justify-end items-center gap-3 px-6 py-4 bg-gray-50 rounded-b-xl border-t">
					{!isNew && (
						<button
							onClick={onDelete}
							className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
						>
							Supprimer
						</button>
					)}
					<button
						onClick={onClose}
						className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
					>
						Annuler
					</button>
					<button
						onClick={onSave}
						className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
					>
						Sauvegarder
					</button>
				</div>
			</div>
		</div>
	);
};

export default SwotModal;
