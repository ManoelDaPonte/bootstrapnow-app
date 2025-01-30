// components/business-plan/shared/CardModal.tsx
import React from "react";
import { X } from "lucide-react";
import { ModalProps, BaseCard } from "@/types/shared/card-modal";
import { cn } from "@/lib/utils";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export function CardModal<T extends BaseCard>({
	isOpen,
	onClose,
	card,
	onSave,
	onDelete,
	error,
	onChange,
	isNew = false,
	modalTitle,
	titlePlaceholder = "Entrez un titre...",
	descriptionPlaceholder = "Entrez une description...",
	categoryDescription,
}: ModalProps<T>) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-background/80 backdrop-blur-sm flex justify-center items-center z-50"
			onClick={onClose}
		>
			<div
				className="bg-card rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100 opacity-100 m-4 flex flex-col max-h-[90vh]" // Ajout du flex et max-h
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="flex justify-between items-center p-6 border-b shrink-0">
					{" "}
					{/* Ajout de shrink-0 */}
					<h2 className="text-xl font-semibold">
						{modalTitle ||
							(isNew ? "Nouvelle carte" : "Modifier la carte")}
					</h2>
					<button
						onClick={onClose}
						className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded-full"
					>
						<X size={20} />
					</button>
				</div>

				{/* Content */}
				<div className="p-6 overflow-y-auto flex-1">
					{" "}
					{/* Ajout de overflow-y-auto et flex-1 */}
					<div className="space-y-6">
						{categoryDescription && (
							<Accordion
								type="single"
								collapsible
								className="w-full"
							>
								<AccordionItem value="help">
									<AccordionTrigger className="text-sm text-muted-foreground hover:no-underline">
										<div className="flex items-center gap-2">
											<svg
												className="w-5 h-5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											<span className="hover:underline">
												Comment remplir cette section ?
											</span>
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<div className="space-y-4 pt-2">
											<p className="text-sm text-muted-foreground">
												{categoryDescription.content}
											</p>

											<div className="space-y-2">
												<h4 className="text-sm font-medium">
													Exemples :
												</h4>
												<ul className="space-y-2">
													{categoryDescription.examples.map(
														(example, index) => {
															const [
																title,
																description,
															] =
																example.split(
																	":**"
																);
															return (
																<li
																	key={index}
																	className="text-sm"
																>
																	<span className="font-medium text-primary">
																		{title}:
																	</span>
																	{
																		description
																	}
																</li>
															);
														}
													)}
												</ul>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						)}
					</div>
					<div className="p-6 space-y-6">
						<div className="space-y-2">
							<label className="block text-sm font-medium">
								Titre
							</label>
							<input
								type="text"
								name="title"
								value={card.title}
								onChange={onChange}
								className={cn(
									"w-full px-4 py-2.5 border rounded-lg",
									"focus:ring-2 focus:ring-primary focus:border-primary",
									"transition-colors bg-background"
								)}
								placeholder={titlePlaceholder}
							/>
						</div>

						<div className="space-y-2">
							<label className="block text-sm font-medium">
								Description
							</label>
							<textarea
								name="description"
								value={card.description}
								onChange={onChange}
								rows={4}
								className={cn(
									"w-full px-4 py-2.5 border rounded-lg",
									"focus:ring-2 focus:ring-primary focus:border-primary",
									"transition-colors resize-none bg-background"
								)}
								placeholder={descriptionPlaceholder}
							/>
						</div>

						{error && (
							<div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg flex items-start space-x-2">
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
				</div>

				{/* Footer */}
				<div className="flex justify-end items-center gap-3 px-6 py-4 bg-muted rounded-b-xl border-t shrink-0">
					{!isNew && (
						<button
							onClick={onDelete}
							className="px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
						>
							Supprimer
						</button>
					)}
					<button
						onClick={onClose}
						className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted-foreground/10 rounded-lg transition-colors"
					>
						Annuler
					</button>
					<button
						onClick={onSave}
						className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors"
					>
						Sauvegarder
					</button>
				</div>
			</div>
		</div>
	);
}
