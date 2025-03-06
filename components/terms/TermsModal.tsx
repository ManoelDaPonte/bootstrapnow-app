"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
	CircleXIcon,
	LucideLoader,
	FileText,
	ExternalLink,
} from "lucide-react";
import { useTerms } from "@/context/termsContext";

export default function TermsModal() {
	const { hasAcceptedTerms, acceptTerms } = useTerms();
	const [isOpen, setIsOpen] = useState(false);
	const [agreed, setAgreed] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// URL du fichier PDF
	const pdfUrl = "/cgu.pdf";

	useEffect(() => {
		// Only show modal if user hasn't accepted terms
		setIsOpen(!hasAcceptedTerms);

		// Vérifier que le PDF est accessible
		const checkPdfExists = async () => {
			try {
				setLoading(true);
				const response = await fetch(pdfUrl, { method: "HEAD" });

				if (!response.ok) {
					throw new Error(`Failed to load terms: ${response.status}`);
				}

				setLoading(false);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to load terms"
				);
				setLoading(false);
			}
		};

		checkPdfExists();
	}, [hasAcceptedTerms]);

	const handleAccept = () => {
		if (agreed) {
			acceptTerms();
			setIsOpen(false);
		}
	};

	// Ouvrir le PDF dans un nouvel onglet
	const openPdfInNewTab = () => {
		window.open(pdfUrl, "_blank");
	};

	// This modal cannot be closed without accepting terms
	const preventClose = () => {
		// Do nothing - prevent closing
	};

	return (
		<Dialog open={isOpen} onOpenChange={preventClose}>
			<DialogContent
				className="sm:max-w-2xl max-h-[90vh]"
				showCloseButton={false}
			>
				<DialogHeader>
					<DialogTitle>
						Conditions Générales d&apos;Utilisation
					</DialogTitle>
					<DialogDescription>
						Veuillez lire et accepter nos conditions générales
						d&apos;utilisation pour continuer.
					</DialogDescription>
				</DialogHeader>

				{loading ? (
					<div className="flex items-center justify-center py-12">
						<LucideLoader className="h-8 w-8 animate-spin text-primary" />
						<span className="ml-2">Chargement des CGU...</span>
					</div>
				) : error ? (
					<div className="flex flex-col items-center justify-center py-12 text-center">
						<CircleXIcon className="h-12 w-12 text-red-500 mb-4" />
						<h3 className="font-semibold text-lg mb-2">
							Erreur de chargement
						</h3>
						<p className="text-muted-foreground">{error}</p>
						<p className="mt-4 text-sm">
							Veuillez rafraîchir la page pour réessayer.
						</p>
					</div>
				) : (
					<div className="flex flex-col items-center space-y-4">
						<div className="w-full h-[50vh] relative rounded-md border">
							<iframe
								src={`${pdfUrl}#toolbar=0&navpanes=0`}
								className="w-full h-full rounded-md"
								title="Conditions Générales d'Utilisation"
							/>
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={openPdfInNewTab}
							className="flex items-center gap-2"
						>
							<FileText size={16} />
							<span>Ouvrir en plein écran</span>
							<ExternalLink size={14} />
						</Button>
					</div>
				)}

				<DialogFooter className="flex-col sm:flex-row gap-4 sm:gap-0">
					<div className="flex items-center space-x-2">
						<Checkbox
							id="terms"
							checked={agreed}
							onCheckedChange={() => setAgreed(!agreed)}
							disabled={loading || !!error}
						/>
						<Label
							htmlFor="terms"
							className="text-sm font-medium cursor-pointer"
						>
							J&apos;ai lu et j&apos;accepte les conditions
							générales d&apos;utilisation
						</Label>
					</div>
					<Button
						onClick={handleAccept}
						disabled={!agreed || loading || !!error}
					>
						Accepter & Continuer
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
