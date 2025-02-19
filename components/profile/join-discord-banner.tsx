import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Users, Sparkles } from "lucide-react";

type JoinDiscordBannerProps = {
	discordInviteUrl: string;
};

export default function JoinDiscordBanner({
	discordInviteUrl,
}: JoinDiscordBannerProps) {
	return (
		<div className="relative group">
			{/* Conteneur principal avec effet de survol */}
			<div className="relative rounded-lg overflow-hidden transition-all duration-300 transform group-hover:scale-[1.02]">
				{/* Arrière-plan avec dégradé */}
				<div className="relative flex flex-col md:flex-row items-center justify-between p-8 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600">
					{/* Section de contenu gauche */}
					<div className="relative z-10 space-y-4 max-w-lg">
						<div className="flex items-center space-x-2">
							<Sparkles className="w-5 h-5 text-indigo-200" />
							<h3 className="font-bold text-2xl text-white">
								Rejoignez notre communauté Discord !
							</h3>
						</div>

						<div className="space-y-4">
							<p className="text-indigo-100">
								Échangez avec d&apos;autres entrepreneurs et
								partagez vos expériences.
							</p>

							<div className="flex flex-wrap gap-4 text-sm text-indigo-100">
								<div className="flex items-center gap-2">
									<Users className="w-4 h-4" />
									<span>500+ membres actifs</span>
								</div>
								<div className="flex items-center gap-2">
									<MessageCircle className="w-4 h-4" />
									<span>Discussions enrichissantes</span>
								</div>
							</div>
						</div>

						<Link
							href={discordInviteUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg 
                         transition-all duration-300 hover:bg-indigo-100 hover:shadow-lg 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							<span>Rejoindre Discord</span>
							<svg
								className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
							</svg>
						</Link>
					</div>

					{/* Section image droite */}
					<div className="hidden md:block relative w-64 h-64">
						<div className="absolute inset-0 bg-gradient-to-l from-transparent to-indigo-600/50" />
						<Image
							src="/discord/discord_presentation.jpg"
							alt="Discord Community"
							fill
							className="object-cover rounded-lg"
							sizes="(max-width: 768px) 100vw, 256px"
						/>
					</div>
				</div>

				{/* Effet de lueur sur le hover */}
				<div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			</div>
		</div>
	);
}
