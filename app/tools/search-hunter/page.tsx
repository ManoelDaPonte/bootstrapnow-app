"use client";

import { useUserMetadata } from "@/context/userMetadataProvider";
import CardCenter from "@/components/CardCenter";
import { Lock } from "lucide-react";

export default function MarketTesterPage() {
	const { metadata, loading } = useUserMetadata();

	const isPaidUser = metadata?.plan && metadata.plan !== "free";

	if (loading) {
		// Écran de chargement avec un spinner
		return (
			<div className="flex items-center justify-center h-screen bg-background">
				<div className="w-12 h-12 border-4 border-[hsl(var(--primary))] border-t-transparent rounded-full animate-spin"></div>
			</div>
		);
	}

	if (!isPaidUser) {
		return (
			<CardCenter
				title="Accès Restreint"
				description="Cette fonctionnalité est réservée aux utilisateurs disposant d’un abonnement actif. Passez à un plan payant pour débloquer l’accès !"
				buttonText="Obtenir un abonnement"
				buttonHref="/abonnement"
				icon={Lock}
				iconColor="text-yellow-600"
			/>
		);
	}

	// Page normale si plan payant
	return (
		<div className="w-full min-h-screen p-8 bg-background text-foreground">
			<div className="max-w-4xl mx-auto space-y-4">
				<h1 className="text-3xl font-bold">Market-Tester</h1>
				<p>
					En developpemet. Revenez bientôt pour plus d’informations.
				</p>
			</div>
		</div>
	);
}
