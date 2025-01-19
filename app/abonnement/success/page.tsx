"use client";

import CardCenter from "@/components/CardCenter";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
	return (
		<CardCenter
			title="Paiement Réussi !"
			description="Merci pour votre abonnement. Votre transaction est terminée."
			buttonText="Retour à votre abonnement"
			buttonHref="/abonnement"
			icon={CheckCircle}
			iconColor="text-black-600"
		/>
	);
}
