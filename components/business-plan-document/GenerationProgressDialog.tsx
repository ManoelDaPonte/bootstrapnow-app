import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { GenerationStep } from "@/lib/openai/hooks/useBusinessPlanGenerator";

interface GenerationProgressDialogProps {
	isOpen: boolean;
	steps: GenerationStep[];
}

const GenerationProgressDialog: React.FC<GenerationProgressDialogProps> = ({
	isOpen,
	steps,
}) => {
	const completedSteps = steps.filter((s) => s.status === "completed").length;
	const progress = (completedSteps / steps.length) * 100;

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
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Génération du Business Plan</DialogTitle>
				</DialogHeader>

				<div className="py-6">
					<div className="space-y-4">
						<div className="flex items-center justify-between text-sm">
							<span className="text-muted-foreground">
								Progression globale
							</span>
							<span className="font-medium">
								{Math.round(progress)}%
							</span>
						</div>

						<Progress value={progress} className="h-2" />

						<div className="mt-6 space-y-2">
							{steps.map((step) => (
								<div
									key={step.id}
									className={`flex items-center gap-3 p-3 rounded-lg border transition-colors
                    ${
						step.status === "in-progress"
							? "bg-primary/5 border-primary/20"
							: step.status === "completed"
							? "bg-muted"
							: "bg-card"
					}`}
								>
									{getStepIcon(step.status)}

									<div className="flex-1 flex items-center justify-between">
										<span
											className={`
                      ${
							step.status === "completed"
								? "text-muted-foreground"
								: step.status === "in-progress"
								? "font-medium"
								: ""
						}`}
										>
											{step.label}
										</span>

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
