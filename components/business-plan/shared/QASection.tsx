import React, { useState } from "react";
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

interface QASectionProps {
	data: QAData;
	responses: QAResponses;
	onResponseChange?: (categoryId: string, response: string) => void;
	onResponseSave?: (categoryId: string, response: string) => void;
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
	const [editedResponses, setEditedResponses] = useState<QAResponses>({});

	const handleResponseChange = (categoryId: string, value: string) => {
		setEditedResponses((prev) => ({
			...prev,
			[categoryId]: value,
		}));
		onResponseChange?.(categoryId, value);
	};

	const handleBlur = (categoryId: string, value: string) => {
		if (editedResponses[categoryId] !== undefined) {
			onResponseSave?.(categoryId, value);
			setEditedResponses((prev) => {
				const newState = { ...prev };
				delete newState[categoryId];
				return newState;
			});
		}
	};

	return (
		<div className={`w-full py-8 ${className}`}>
			<h2 className="text-2xl font-bold mb-6 text-foreground">
				{sectionTitle}
			</h2>
			<div className="grid gap-6">
				{categories.map((category) => (
					<Card
						key={category.id}
						className="p-6 border border-border bg-card hover:shadow-md transition-shadow duration-200"
					>
						<h3 className="text-xl font-semibold mb-4 text-primary">
							{category.title}
						</h3>
						<div className="space-y-6">
							<div className="bg-muted p-4 rounded-lg border border-border/50">
								<p className="font-medium text-foreground/90">
									{category.question}
								</p>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor={`response-${category.id}`}
									className="text-foreground/80"
								>
									Votre réponse
								</Label>
								<Textarea
									id={`response-${category.id}`}
									placeholder="Saisissez votre réponse ici..."
									className="min-h-[150px] resize-y bg-background border-input focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
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
									className="w-full border-muted"
								>
									<AccordionItem
										value="examples"
										className="border-b border-border/50"
									>
										<AccordionTrigger className="text-sm hover:no-underline py-4">
											<span className="hover:underline text-primary/90">
												Voir des exemples de réponses
											</span>
										</AccordionTrigger>
										<AccordionContent className="pt-2 pb-4">
											<ul className="space-y-3 text-sm text-muted-foreground">
												{category.examples.map(
													(example, i) => (
														<li
															key={i}
															className="flex gap-2 items-start"
														>
															<span className="text-primary flex-shrink-0 mt-1">
																•
															</span>
															<span className="text-foreground/80">
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
