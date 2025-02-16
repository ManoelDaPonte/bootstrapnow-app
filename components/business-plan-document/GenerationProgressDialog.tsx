import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface GenerationStep {
	section: string;
	status: "pending" | "generating" | "completed" | "error";
	error?: string;
}

interface GenerationProgressDialogProps {
	isOpen: boolean;
	onClose: () => void;
	steps: GenerationStep[];
	currentStep?: string;
}

const GenerationProgressDialog = ({
	isOpen,
	onClose,
	steps,
	currentStep,
}: GenerationProgressDialogProps) => {
	const completedSteps = steps.filter((s) => s.status === "completed").length;
	const progress = (completedSteps / steps.length) * 100;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Génération du Business Plan</DialogTitle>
				</DialogHeader>

				<div className="py-6">
					<div className="space-y-4">
						<div className="flex items-center justify-between text-sm text-muted-foreground">
							<span>Progression globale</span>
							<span>{Math.round(progress)}%</span>
						</div>

						<Progress value={progress} className="h-2" />

						<div className="space-y-3 mt-6">
							{steps.map((step) => (
								<div
									key={step.section}
									className="flex items-center gap-3 p-3 rounded-lg border bg-card"
								>
									{step.status === "pending" && (
										<div className="w-5 h-5 rounded-full border-2 border-muted" />
									)}

									{step.status === "generating" && (
										<Loader2 className="w-5 h-5 text-primary animate-spin" />
									)}

									{step.status === "completed" && (
										<CheckCircle2 className="w-5 h-5 text-green-500" />
									)}

									{step.status === "error" && (
										<XCircle className="w-5 h-5 text-destructive" />
									)}

									<div className="flex-1">
										<div className="font-medium">
											{step.section}
										</div>
										{step.error && (
											<div className="text-sm text-destructive mt-1">
												{step.error}
											</div>
										)}
									</div>

									{step.status === "completed" && (
										<span className="text-sm text-muted-foreground">
											Terminé
										</span>
									)}
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
