import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Download, FileText } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Type pour une génération
interface Generation {
	id: string;
	createdAt: string;
	docxUrl?: string;
	status: "pending" | "generating" | "completed" | "error";
}

interface BusinessPlanHistoryProps {
	generations: Generation[];
	onDownload: (docxUrl: string) => void;
	isGenerating: boolean;
	progress: number;
	currentOperation?: string;
}

const BusinessPlanHistory = ({
	generations,
	onDownload,
	isGenerating,
	progress,
	currentOperation,
}: BusinessPlanHistoryProps) => {
	return (
		<Card className="w-full bg-card">
			<CardHeader>
				<CardTitle className="text-xl font-semibold">
					Historique des générations
				</CardTitle>
				<CardDescription>
					Retrouvez toutes vos générations de business plan
				</CardDescription>
			</CardHeader>
			<CardContent>
				{isGenerating && (
					<div className="mb-6 p-4 border rounded-lg bg-muted/30">
						<div className="flex items-center gap-3 mb-2">
							<Loader2 className="w-5 h-5 animate-spin text-primary" />
							<span className="font-medium">
								{currentOperation || "Génération en cours..."}
							</span>
						</div>
						<div className="w-full bg-muted rounded-full h-2">
							<div
								className="bg-primary h-2 rounded-full transition-all duration-300"
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
				)}

				<div className="space-y-3">
					{generations.map((gen) => (
						<div
							key={gen.id}
							className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
						>
							<div className="flex items-center gap-3">
								<FileText className="w-5 h-5 text-muted-foreground" />
								<div>
									<div className="font-medium">
										Business Plan
									</div>
									<div className="text-sm text-muted-foreground">
										{format(
											new Date(gen.createdAt),
											"d MMMM yyyy 'à' HH:mm",
											{ locale: fr }
										)}
									</div>
								</div>
							</div>

							{gen.status === "completed" && gen.docxUrl && (
								<Button
									variant="outline"
									size="sm"
									onClick={() => onDownload(gen.docxUrl!)}
									className="gap-2"
								>
									<Download className="w-4 h-4" />
									Télécharger
								</Button>
							)}

							{gen.status === "pending" && (
								<div className="flex items-center gap-2 text-muted-foreground">
									<Loader2 className="w-4 h-4 animate-spin" />
									En cours...
								</div>
							)}

							{gen.status === "error" && (
								<div className="text-destructive text-sm">
									Erreur de génération
								</div>
							)}
						</div>
					))}

					{generations.length === 0 && !isGenerating && (
						<div className="text-center py-8 text-muted-foreground">
							Aucune génération de business plan pour le moment
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default BusinessPlanHistory;
