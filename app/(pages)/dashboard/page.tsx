"use client";

import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useUserMetadata } from "@/context/userMetadataProvider";
import { ActionCard } from "@/components/ActionCard";
import DashboardPageSkeleton from "@/components/dashboard/DashboardPageSkeleton";

export default function DashboardPage() {
	const { user } = useUser();
	const { metadata, loading, error, fetchUserMetadata } = useUserMetadata();
	const [profileDone, setProfileDone] = useState(false);
	const [joinedDiscord, setJoinedDiscord] = useState(false);
	const [paidPlan, setPaidPlan] = useState(false);

	useEffect(() => {
		if (user && !metadata && !loading) {
			fetchUserMetadata(user.sub!);
		}
	}, [user, metadata, loading, fetchUserMetadata]);

	useEffect(() => {
		if (metadata) {
			const role = metadata.role || "inconnu";
			const plan = metadata.plan || "free";
			const joined = metadata.joined_discord || false;

			setProfileDone(role !== "inconnu");
			setJoinedDiscord(joined);
			setPaidPlan(plan !== "free");
		}
	}, [metadata]);

	if (loading || !user) {
		return <DashboardPageSkeleton />;
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-background">
				<p className="text-lg">Erreur : {error}</p>
			</div>
		);
	}

	async function handleJoinDiscord() {
		if (!user || !user.sub) return;

		// Mettre à jour les metadata
		const res = await fetch("/api/auth/user/update-metadata", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: user.sub,
				joined_discord: true,
			}),
		});

		// Même si la mise à jour échoue, on ouvre le lien Discord.
		// Mais idéalement, on pourrait vérifier le res.ok pour mettre à jour l'état.
		if (res.ok) {
			setJoinedDiscord(true);
			fetchUserMetadata(user.sub!); // Optionnel, pour être sûr que les meta soient à jour.
		}

		// Ouvrir le lien Discord dans un nouvel onglet
		if (process.env.NEXT_PUBLIC_DISCORD_LINK) {
			window.open(process.env.NEXT_PUBLIC_DISCORD_LINK, "_blank");
		}
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-3xl mx-auto py-10 px-6 space-y-10">
				<div className="text-center space-y-3">
					<h1 className="text-3xl font-bold">
						Bienvenue
						{user.nickname ?? user.name
							? `, ${user.nickname ?? user.name}`
							: ""}{" "}
						sur votre Tableau de bord
					</h1>
					<p className="text-muted-foreground text-sm">
						Ci-dessous, retrouvez les étapes essentielles pour tirer
						le meilleur parti de notre plateforme.
					</p>
				</div>

				<div className="space-y-8 mt-8">
					<ActionCard
						stepNumber={1}
						title="Définissez votre profil"
						description="Choisissez votre rôle et vos préférences pour personnaliser votre expérience."
						done={profileDone}
						buttonLabel={
							profileDone
								? "Modifier mon profil"
								: "Définir mon profil"
						}
						buttonHref="/profile"
					/>

					<ActionCard
						stepNumber={2}
						title="Rejoignez notre Discord"
						description="Échangez avec d'autres entrepreneurs et partagez vos expériences."
						done={joinedDiscord}
						buttonLabel="Rejoindre le Discord"
						onClick={handleJoinDiscord}
					/>
					<ActionCard
						stepNumber={3}
						title="Explorez nos outils"
						description="Lancez-vous et découvrez nos outils pour développer votre projet."
						done={false}
						buttons={[
							{
								label: "Business Plan",
								href: "/tools/business-plan",
							},
							{
								label: "SmartHunter",
								href: "/tools/smart-hunter",
							},
							{
								label: "Market Analytics",
								href: "/tools/market-tester",
							},
						]}
					/>
					<ActionCard
						stepNumber={4}
						title="Améliorez votre abonnement"
						description="Optez pour un plan payant et accédez à des fonctionnalités avancées."
						done={paidPlan}
						buttonLabel={
							paidPlan
								? "Gérer mon abonnement"
								: "Choisir un abonnement"
						}
						buttonHref="/abonnement"
					/>
				</div>
			</div>
		</div>
	);
}
