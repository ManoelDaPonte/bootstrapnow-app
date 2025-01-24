"use client";

import CardCenter from "@/components/CardCenter";
import { XCircle } from "lucide-react";

export default function CanceledPage() {
	return (
		<CardCenter
			title="Paiement Annulé"
			description="Vous pouvez réessayer à tout moment. Votre transaction n’a pas été finalisée."
			buttonText="Retour à votre abonnement"
			buttonHref="/abonnement"
			icon={XCircle}
			iconColor="text-black-600"
		/>
	);
}
