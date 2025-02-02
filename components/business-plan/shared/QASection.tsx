//component/business-plan/shared/QASection.tsx

import React from "react";
import { Card } from "@/components/ui/card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { QAData, QAResponses } from "@/types/shared/qa-section";
import { useState } from "react";

interface QASectionProps {
	data: QAData;
	responses: QAResponses;
	onResponseChange?: (categoryId: string, response: string) => void;
	onResponseSave?: (categoryId: string, response: string) => void; // Renommé pour plus de clarté
	className?: string;
}

const QASection: React.FC<QASectionProps> = ({
	data,
	responses,
	onResponseChange,
	onResponseSave,
	className = "",
}) => {
	const { sectionTitle, categories } = data;

	// État local pour tracker les modifications
	const [editedResponses, setEditedResponses] = useState<QAResponses>({});

	const handleResponseChange = (categoryId: string, value: string) => {
		setEditedResponses((prev) => ({
			...prev,
			[categoryId]: value,
		}));
		onResponseChange?.(categoryId, value);
	};

	const handleBlur = (categoryId: string, value: string) => {
		// Vérifie si la valeur a été modifiée avant de sauvegarder
		if (editedResponses[categoryId] !== undefined) {
			onResponseSave?.(categoryId, value);
			// Réinitialise l'état local après la sauvegarde
			setEditedResponses((prev) => {
				const newState = { ...prev };
				delete newState[categoryId];
				return newState;
			});
		}
	};
	return (
		<div className={` w-full  py-8 ${className}`}>
			<h2 className="text-2xl font-bold mb-6">{sectionTitle}</h2>
			<div className="grid gap-6">
				{categories.map((category) => (
					<Card key={category.id} className="p-6">
						<h3 className="text-xl font-semibold mb-4 text-primary">
							{category.title}
						</h3>
						<div className="space-y-6">
							<div className="bg-muted p-4 rounded-lg">
								<p className="font-medium text-foreground">
									{category.question}
								</p>
							</div>

							<div className="space-y-2">
								<Label htmlFor={`response-${category.id}`}>
									Votre réponse
								</Label>
								<Textarea
									id={`response-${category.id}`}
									placeholder="Saisissez votre réponse ici..."
									className="min-h-[150px] resize-y"
									value={responses[category.id] || ""}
									onChange={(e) =>
										handleResponseChange(
											category.id,
											e.target.value
										)
									}
									onBlur={(e) =>
										handleBlur(category.id, e.target.value)
									}
								/>
							</div>

							{category.examples.length > 0 && (
								<Accordion
									type="single"
									collapsible
									className="w-full"
								>
									<AccordionItem value="examples">
										<AccordionTrigger className="text-sm hover:no-underline">
											<span className="hover:underline">
												Voir des exemples de réponses
											</span>
										</AccordionTrigger>
										<AccordionContent>
											<ul className="space-y-3 text-sm text-muted-foreground pt-2">
												{category.examples.map(
													(example, i) => (
														<li
															key={i}
															className="flex gap-2"
														>
															<span className="text-primary">
																•
															</span>
															<span>
																{example}
															</span>
														</li>
													)
												)}
											</ul>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							)}
						</div>
					</Card>
				))}
			</div>
		</div>
	);
};

export default QASection;
