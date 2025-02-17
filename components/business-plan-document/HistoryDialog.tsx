import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Download, History, Loader2 } from "lucide-react";
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
			className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${color}`}
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
	const formatCreatedAt = (date: string) => {
		const d = new Date(date);
		const formattedDate = format(d, "d MMMM yyyy 'à' HH:mm:ss", {
			locale: fr,
		});
		return formattedDate;
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="gap-2">
					<History className="h-4 w-4" />
					Historique
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle className="text-xl">
						Historique des Business Plans
					</DialogTitle>
				</DialogHeader>
				<div className="mt-6 max-h-[70vh] overflow-y-auto pr-2">
					{isLoading ? (
						<div className="flex items-center justify-center py-8">
							<Loader2 className="h-6 w-6 animate-spin text-primary" />
						</div>
					) : generations.length > 0 ? (
						<div className="space-y-4">
							{generations.map((generation) => (
								<div
									key={generation.id}
									className="group flex flex-col gap-3 rounded-lg border bg-card p-4 transition-all duration-200 hover:shadow-md dark:hover:shadow-none"
								>
									<div className="flex items-start justify-between">
										<div className="flex gap-3">
											<FileText className="mt-1 h-5 w-5 text-muted-foreground" />
											<div>
												<div className="font-medium text-foreground">
													Business Plan #
													{generation.id.slice(0, 8)}
												</div>
												<div className="mt-1 text-sm text-muted-foreground">
													Généré le{" "}
													{formatCreatedAt(
														generation.createdAt
													)}
												</div>
											</div>
										</div>
										<StatusBadge
											status={generation.status}
											hasDocxUrl={!!generation.docxUrl}
										/>
									</div>

									{generation.status === "completed" &&
										generation.docxUrl && (
											<div className="flex justify-end transition-opacity group-hover:opacity-100">
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
						<div className="flex flex-col items-center justify-center gap-4 py-12 text-center text-muted-foreground">
							<History className="h-12 w-12 opacity-20" />
							<div>
								<p className="font-medium">
									Aucune génération trouvée
								</p>
								<p className="text-sm">
									Générez votre premier business plan
								</p>
							</div>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default HistoryDialog;
