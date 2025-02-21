import React, { useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { GenerationStep } from "@/lib/openai/hooks/useBusinessPlanGenerator";

interface DetailedStep extends GenerationStep {
	weight: number;
	subSteps?: {
		section: string;
		status: "pending" | "in-progress" | "completed" | "error";
	}[];
}

interface GenerationProgressDialogProps {
	isOpen: boolean;
	steps: DetailedStep[];
	currentSection?: string;
	totalSections: number;
	completedSections: number;
}

const GenerationProgressDialog: React.FC<GenerationProgressDialogProps> = ({
	isOpen,
	steps,
	currentSection,
	totalSections,
	completedSections,
}) => {
	// Calculate weighted progress
	const calculateProgress = () => {
		let totalProgress = 0;
		const weights: {
			[key in
				| "init"
				| "db-fetch"
				| "sections"
				| "word"
				| "final"]: number;
		} = {
			init: 5, // 5% for initialization
			"db-fetch": 5, // 5% for data fetching
			sections: 80, // 80% for section generation
			word: 5, // 5% for Word doc generation
			final: 5, // 5% for finalization
		};

		steps.forEach((step) => {
			if (step.status === "completed") {
				if (step.id === "sections") {
					// Calculate section progress
					const sectionProgress =
						(completedSections / totalSections) * weights.sections;
					totalProgress += sectionProgress;
				} else {
					totalProgress +=
						weights[step.id as keyof typeof weights] || 0;
				}
			} else if (
				step.status === "in-progress" &&
				step.id === "sections"
			) {
				// Add partial progress for sections
				const sectionProgress =
					(completedSections / totalSections) * weights.sections;
				totalProgress += sectionProgress;
			}
		});

		return Math.min(Math.round(totalProgress), 100);
	};

	const progress = calculateProgress();

	const getStepIcon = (status: GenerationStep["status"]) => {
		switch (status) {
			case "pending":
				return (
					<div className="w-4 h-4 rounded-full border-2 border-muted-foreground/25" />
				);
			case "in-progress":
				return (
					<Loader2 className="w-4 h-4 animate-spin text-primary" />
				);
			case "completed":
				return <CheckCircle2 className="w-4 h-4 text-green-500" />;
			case "error":
				return <XCircle className="w-4 h-4 text-destructive" />;
		}
	};

	return (
		<Dialog open={isOpen}>
			<DialogContent className="sm:max-w-md" showCloseButton={false}>
				<DialogHeader>
					<DialogTitle>Génération du Business Plan</DialogTitle>
				</DialogHeader>

				<div className="py-6">
					<div className="space-y-4">
						<div className="flex items-center justify-between text-sm">
							<span className="text-muted-foreground">
								Progression globale
							</span>
							<span className="font-medium">{progress}%</span>
						</div>

						<Progress value={progress} className="h-2" />

						<div className="mt-6 space-y-2">
							{steps.map((step) => (
								<div
									key={step.id}
									className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
										step.status === "in-progress"
											? "bg-primary/5 border-primary/20"
											: step.status === "completed"
											? "bg-muted"
											: "bg-card"
									}`}
								>
									{getStepIcon(step.status)}

									<div className="flex-1 flex items-center justify-between">
										<div className="flex flex-col">
											<span
												className={
													step.status === "completed"
														? "text-muted-foreground"
														: step.status ===
														  "in-progress"
														? "font-medium"
														: ""
												}
											>
												{step.label}
											</span>

											{step.id === "sections" &&
												step.status ===
													"in-progress" && (
													<span className="text-xs text-muted-foreground">
														Section en cours :{" "}
														{currentSection} (
														{completedSections}/
														{totalSections})
													</span>
												)}
										</div>

										{step.status === "completed" && (
											<span className="text-sm text-muted-foreground">
												Terminé
											</span>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default GenerationProgressDialog;
