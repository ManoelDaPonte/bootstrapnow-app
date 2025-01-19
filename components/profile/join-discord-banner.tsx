"use client";

import Link from "next/link";
import Image from "next/image";

type JoinDiscordBannerProps = {
	discordInviteUrl: string;
};

export default function JoinDiscordBanner({
	discordInviteUrl,
}: JoinDiscordBannerProps) {
	return (
		<div className="relative rounded-md overflow-hidden shadow-lg">
			<div className="relative flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
				<div className="z-10">
					<h3 className="font-semibold text-xl">
						Rejoignez notre communauté Discord !
					</h3>
					<p className="text-sm mt-1">
						Échangez avec d’autres entrepreneurs et partagez vos
						expériences.
					</p>
					<Link
						href={discordInviteUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block mt-4 bg-white text-blue-600 font-semibold px-3 py-2 rounded hover:bg-gray-100 transition"
					>
						Rejoindre
					</Link>
				</div>
				<div className="absolute right-0 top-0 bottom-0 w-2/5 z-0 ">
					{/* Vous pouvez mettre une image plus large/largeur complète, ajuster le positionnement */}
					<Image
						src="/discord_presentation.jpg" // Remplacez par votre image
						alt="Discord Banner"
						fill
						className="object-cover"
					/>
				</div>
			</div>
		</div>
	);
}
