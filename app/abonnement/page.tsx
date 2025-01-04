"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import PricingSection from "@/components/abonnement/pricing";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useUserMetadata } from "@/context/userMetadataProvider";
import Cancellation from "@/components/abonnement/cancellation";
import AbonnementSkeleton from "@/components/abonnement/AbonnementSkeleton";

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

	// On récupère le tier dans les metadata
	const tier = (metadata && metadata.tier) || "free";
	const isFreeTier = tier === "free";

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-6xl mx-auto py-10 px-6 space-y-10">
				<div className="text-center space-y-3">
					<h1 className="text-3xl font-bold">Mon abonnement</h1>
					<p className="text-muted-foreground text-sm">
						Gérez ou améliorez votre abonnement ci-dessous.
					</p>
				</div>

				{isFreeTier ? (
					<div className="border border-border bg-card p-4 rounded-md">
						<h2 className="font-semibold text-lg">
							État actuel : Offre gratuite
						</h2>
						<p className="text-sm text-muted-foreground mt-1">
							Vous profitez actuellement de notre offre gratuite.
							Améliorez votre expérience en souscrivant à une de
							nos formules payantes ci-dessous.
						</p>
					</div>
				) : (
					<div className="border border-border bg-card p-4 rounded-md">
						<h2 className="font-semibold text-lg">
							État actuel : Offre {tier}
						</h2>
						<p className="text-sm text-muted-foreground mt-1">
							Merci de votre soutien ! Vous bénéficiez d’une offre
							payante. Consultez ou modifiez votre abonnement
							ci-dessous.
						</p>
					</div>
				)}

				<div className="border border-border bg-card p-4 rounded-md flex items-start space-x-4">
					<AlertTriangle className="text-orange-500 h-6 w-6 mt-1" />
					<div>
						<h2 className="font-semibold text-lg">Attention</h2>
						<p className="text-sm text-muted-foreground">
							Les produits Search-Hunter et Market-Tester ne sont
							pas encore finalisés. Veuillez en tenir compte avant
							de passer au paiement.
						</p>
					</div>
				</div>

				{isFreeTier ? (
					<PricingSection />
				) : (
					<Cancellation
						subscriptionId={metadata?.subscription_id} // Assurez-vous que cela provient de vos métadonnées Auth0
						userId={user.sub!} // L'ID utilisateur actuel
					/>
				)}
			</div>
		</div>
	);
}
