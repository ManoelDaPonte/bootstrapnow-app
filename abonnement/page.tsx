"use client";

import { useEffect } from "react";
import PricingSection from "@/components/abonnement/pricing";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useUserMetadata } from "@/context/userMetadataProvider";
import Cancellation from "@/components/abonnement/cancellation";
import AbonnementSkeleton from "@/components/abonnement/AbonnementSkeleton";
import NoticeBox from "@/components/abonnement/NoticeBox";

function getPlanLabel(plan: string) {
	switch (plan) {
		case "innovateur_monthly":
			return "Innovateur (Mensuel)";
		case "innovateur_yearly":
			return "Innovateur (Annuel)";
		case "visionnaire_monthly":
			return "Visionnaire (Mensuel)";
		case "visionnaire_yearly":
			return "Visionnaire (Annuel)";
		default:
			// plan = "free" ou tout autre
			return "Initiateur (Gratuit)";
	}
}

function CurrentPlanBox({ plan }: { plan: string; status: string }) {
	// Cas #1 : plan free -> box "Offre gratuite"
	if (plan === "free") {
		return (
			<div className="border border-border bg-card p-4 rounded-md">
				<h2 className="font-semibold text-lg">
					État actuel : Offre gratuite
				</h2>
				<p className="text-sm text-muted-foreground mt-1">
					Vous profitez actuellement de notre offre gratuite
					(Initiateur). Améliorez votre expérience en souscrivant à
					une de nos formules payantes ci-dessous.
				</p>
			</div>
		);
	}

	// Cas #3 : plan payant et status = "actif"
	return (
		<div className="border border-border bg-card p-4 rounded-md">
			<h2 className="font-semibold text-lg">
				État actuel : {getPlanLabel(plan)}
			</h2>
			<p className="text-sm text-muted-foreground mt-1">
				Merci de votre soutien ! Vous bénéficiez d’une offre payante.
				Consultez ou modifiez votre abonnement ci-dessous.
			</p>
		</div>
	);
}

export default function AbonnementPage() {
	const { user } = useUser();
	const { metadata, loading, error, fetchUserMetadata } = useUserMetadata();

	useEffect(() => {
		if (user && !metadata && !loading) {
			fetchUserMetadata(user.sub!);
		}
	}, [user, metadata, loading, fetchUserMetadata]);

	if (loading || !user) {
		return <AbonnementSkeleton />;
	}

	if (error) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<p className="text-muted-foreground">
					Erreur lors de la récupération de vos données : {error}
				</p>
			</div>
		);
	}

	// Lecture du plan & status
	const plan = metadata?.plan || "free";
	const status = metadata?.status || "actif";

	const isFreeOrCanceled = plan === "free";
	const hasPaidSubscription = plan !== "free";

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-6xl mx-auto py-10 px-6 space-y-10">
				{/* Titre */}
				<div className="text-center space-y-3">
					<h1 className="text-3xl font-bold">Mon abonnement</h1>
					<p className="text-muted-foreground text-sm">
						Gérez ou améliorez votre abonnement ci-dessous.
					</p>
				</div>

				{/* Box État actuel */}
				<CurrentPlanBox plan={plan} status={status} />

				{/* Avertissement Produits non finalisés */}
				<NoticeBox />

				{/* Choix d'affichage */}
				{isFreeOrCanceled ? (
					<PricingSection />
				) : hasPaidSubscription ? (
					<Cancellation
						subscriptionId={metadata?.subscription_id}
						userId={user.sub!}
					/>
				) : null}
			</div>
		</div>
	);
}
