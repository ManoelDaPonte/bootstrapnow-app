import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	// DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

interface TokenConfirmationDialogProps {
	isOpen: boolean;
	onConfirm: () => void;
	onCancel: () => void;
	availableTokens: number;
}

const TokenConfirmationDialog = ({
	isOpen,
	onConfirm,
	onCancel,
	availableTokens,
}: TokenConfirmationDialogProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onCancel}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Coins className="w-5 h-5" />
						Confirmation de génération
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4 pt-4">
					<div className="text-sm text-muted-foreground">
						La génération d&apos;un business plan consomme 1 token.
						Vous avez actuellement {availableTokens} token
						{availableTokens > 1 ? "s" : ""} disponible
						{availableTokens > 1 ? "s" : ""}.
					</div>

					<div className="text-sm">
						Êtes-vous sûr de vouloir générer votre business plan
						maintenant ?
					</div>
				</div>

				<DialogFooter className="flex items-center justify-end gap-2 pt-4">
					<Button variant="outline" onClick={onCancel}>
						Annuler
					</Button>
					<Button
						onClick={onConfirm}
						disabled={availableTokens < 1}
						className="bg-primary text-primary-foreground hover:bg-primary/90"
					>
						Confirmer
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
export default TokenConfirmationDialog;
