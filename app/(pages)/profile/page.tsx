"use client";

import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useUserMetadata } from "@/context/userMetadataProvider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import RoleSelection from "@/components/profile/role-selection";
import NewsletterPreference from "@/components/profile/newsletter-preference";
import JoinDiscordBanner from "@/components/profile/join-discord-banner";
import ProfilePageSkeleton from "@/components/profile/ProfilePageSkeleton";
import axios from "axios";

export default function ProfilePage() {
	const { user } = useUser();
	const { metadata, loading, error, fetchUserMetadata, updateLocalMetadata } =
		useUserMetadata();

	const [role, setRole] = useState<
		"visionnaire" | "developpeur" | "marketeur" | "inconnu"
	>("inconnu");
	const [newsletter, setNewsletter] = useState(false);
	const [commercialMails, setCommercialMails] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (user && !metadata && !loading) {
			fetchUserMetadata(user.sub!);
		}
	}, [user, metadata, loading, fetchUserMetadata]);

	useEffect(() => {
		if (metadata) {
			const {
				role: savedRole,
				newsletter: savedNewsletter,
				commercialMails: savedCommercialMails,
			} = metadata;
			if (
				savedRole &&
				["visionnaire", "developpeur", "marketeur", "inconnu"].includes(
					savedRole
				)
			) {
				setRole(savedRole);
			}
			if (typeof savedNewsletter === "boolean") {
				setNewsletter(savedNewsletter);
			}
			if (typeof savedCommercialMails === "boolean") {
				setCommercialMails(savedCommercialMails);
			}
		}
	}, [metadata]);

	if (loading || !user) {
		return <ProfilePageSkeleton />;
	}

	if (error) {
		return <p>Erreur lors de la récupération de vos données : {error}</p>;
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!user) return;

		const updatedMetadata = {
			userId: user.sub,
			role: role,
			newsletter,
			commercialMails,
		};

		try {
			const res = await axios.post(
				"/api/auth/user/update-metadata",
				updatedMetadata
			);
			if (res.status === 200) {
				setMessage(
					"Vos préférences ont été sauvegardées avec succès !"
				);
				if (res.data.user && res.data.user.user_metadata) {
					updateLocalMetadata(res.data.user.user_metadata);
				}
			} else {
				setMessage("Erreur: " + (res.data?.error || "Inconnue"));
			}
		} catch (error: any) {
			setMessage(
				"Erreur: " + (error.response?.data?.error || error.message)
			);
		}
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-3xl mx-auto py-10 px-6 space-y-10">
				<div className="text-center space-y-3">
					<h1 className="text-3xl font-bold">Mon profil</h1>
					<p className="text-muted-foreground text-sm">
						Bonjour {user.nickname || user.name}, personnalisez
						votre expérience.
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="space-y-4 bg-card p-6 rounded-md shadow"
				>
					<RoleSelection role={role} setRole={setRole} />

					<NewsletterPreference
						newsletter={newsletter}
						setNewsletter={setNewsletter}
						commercialMails={commercialMails}
						setCommercialMails={setCommercialMails}
					/>

					<button
						type="submit"
						className={cn(
							buttonVariants({ variant: "default" }),
							"w-full sm:w-auto"
						)}
					>
						Sauvegarder
					</button>

					{message && (
						<div className="text-green-600 font-medium mt-2">
							{message}
						</div>
					)}
				</form>

				<JoinDiscordBanner
					discordInviteUrl={
						process.env.NEXT_PUBLIC_DISCORD_LINK || ""
					}
				/>
			</div>
		</div>
	);
}
