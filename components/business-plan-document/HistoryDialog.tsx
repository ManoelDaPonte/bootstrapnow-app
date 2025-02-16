import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Download, History, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
	Generation,
	Status,
} from "@/types/business-plan-document/business-plan";

interface HistoryDialogProps {
	generations: Generation[];
	onDownload: (docxUrl: string) => void;
	isLoading: boolean;
}

const StatusBadge = ({
	status,
	hasDocxUrl,
}: {
	status: Status;
	hasDocxUrl?: boolean;
}) => {
	// On ajuste les couleurs et labels en fonction du statut réel
	const getStatusConfig = (status: Status, hasDocxUrl?: boolean) => {
		if (status === "completed" && !hasDocxUrl) {
			return {
				color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
				label: "En cours de finalisation",
			};
		}

		const config = {
			pending: {
				color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
				label: "En attente",
			},
			generating: {
				color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
				label: "En cours",
			},
			completed: {
				color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
				label: "Terminé",
			},
			error: {
				color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500",
				label: "Erreur",
			},
		};

		return config[status];
	};

	const { color, label } = getStatusConfig(status, hasDocxUrl);

	return (
		<span
			className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${color}`}
		>
			{label}
		</span>
	);
};

const HistoryDialog = ({
	generations,
	onDownload,
	isLoading,
}: HistoryDialogProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="gap-2">
					<History className="h-4 w-4" />
					Historique
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Historique des Business Plans</DialogTitle>
				</DialogHeader>
				<div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
					{isLoading ? (
						<div className="flex items-center justify-center py-8">
							<Loader2 className="h-6 w-6 animate-spin text-primary" />
						</div>
					) : generations.length > 0 ? (
						<div className="space-y-3">
							{generations.map((generation) => (
								<div
									key={generation.id}
									className="flex flex-col gap-2 rounded-lg border p-3 transition-colors hover:bg-muted/50"
								>
									<div className="flex items-start justify-between">
										<div className="flex items-center gap-2">
											<Clock className="h-4 w-4 text-muted-foreground" />
											<span className="text-sm">
												{format(
													new Date(
														generation.createdAt
													),
													"d MMMM yyyy",
													{ locale: fr }
												)}
											</span>
										</div>
										<StatusBadge
											status={generation.status}
											hasDocxUrl={!!generation.docxUrl}
										/>
									</div>

									{generation.status === "completed" &&
										generation.docxUrl && (
											<div className="flex justify-end">
												<Button
													variant="outline"
													size="sm"
													onClick={() =>
														onDownload(
															generation.docxUrl!
														)
													}
													className="gap-2"
												>
													<Download className="h-4 w-4" />
													Télécharger
												</Button>
											</div>
										)}
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8 text-muted-foreground">
							Aucune génération trouvée
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default HistoryDialog;
