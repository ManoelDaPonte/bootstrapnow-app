//components/abonnement/cancellation.tsx
"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CancellationProps = {
	subscriptionId: string;
	userId: string;
};

export default function Cancellation({
	subscriptionId,
	userId,
}: CancellationProps) {
	const [isCanceling, setIsCanceling] = useState(false);
	const [message, setMessage] = useState("");

	async function handleCancel() {
		setIsCanceling(true);
		setMessage("");

		try {
			const res = await fetch("/api/stripe/cancel-subscription", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ subscriptionId, userId }),
			});

			if (!res.ok) {
				const { error } = await res.json();
				setMessage(`Erreur : ${error}`);
				return;
			}

			const { message } = await res.json();
			setMessage(message);

			// Recharger complètement la page pour récupérer les nouvelles métadonnées
			window.location.reload();
		} catch (error: any) {
			setMessage(`Erreur : ${error.message}`);
		} finally {
			setIsCanceling(false);
		}
	}

	return (
		<div className="border border-border bg-card p-4 rounded-md space-y-4">
			<h2 className="font-semibold text-lg">Gérer mon abonnement</h2>
			<p className="text-sm text-muted-foreground">
				Vous avez un abonnement payant. Vous pouvez le résilier à tout
				moment.
			</p>
			<button
				onClick={handleCancel}
				className={cn(
					buttonVariants({ variant: "destructive" }),
					"w-full sm:w-auto"
				)}
				disabled={isCanceling}
			>
				{isCanceling
					? "Annulation en cours..."
					: "Annuler mon abonnement"}
			</button>
			{message && <p className="mt-4 text-sm text-red-700">{message}</p>}
		</div>
	);
}
