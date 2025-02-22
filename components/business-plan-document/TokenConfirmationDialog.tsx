import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
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
		<Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Coins className="h-5 w-5" />
						Confirmation de génération
					</DialogTitle>
					<DialogDescription className="space-y-2 pt-2">
						<p>
							Cette génération de business plan utilisera 1 token.
						</p>
						<p className="font-medium text-foreground">
							Tokens disponibles : {availableTokens}{" "}
							{availableTokens > 1 ? "tokens" : "token"}
						</p>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="flex-row justify-center gap-2 sm:justify-center">
					<Button variant="outline" onClick={onCancel}>
						Annuler
					</Button>
					<Button onClick={onConfirm}>Confirmer la génération</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default TokenConfirmationDialog;
