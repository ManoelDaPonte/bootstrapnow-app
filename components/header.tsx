"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Image from "next/image";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";

export default function SaasHeader() {
	const { user } = useUser();

	return (
		// Positionnement fixe, en haut à droite, superposé au reste (z-50)
		<header className="fixed top-4 right-4 z-50">
			{user && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button className="flex items-center focus:outline-none">
							<Image
								src={user.picture ?? "/default-avatar.png"}
								alt={user.name ?? "Utilisateur"}
								width={36}
								height={36}
								className="rounded-full"
							/>
						</button>
					</DropdownMenuTrigger>
					{/**
					 *  Le DropdownMenuContent se place correctement grâce à Portals
					 *  ou un positionnement en absolute, selon votre implémentation.
					 */}
					<DropdownMenuContent className="w-48">
						<DropdownMenuItem asChild>
							<Link
								href="/profile"
								className="flex items-center gap-2"
							>
								<Settings className="h-4 w-4" />
								<span>Paramètres</span>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link
								href="/api/auth/logout"
								className="flex items-center gap-2 text-red-500"
							>
								<LogOut className="h-4 w-4" />
								<span>Se déconnecter</span>
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}

			{!user && (
				<Link
					href="/api/auth/login"
					className="text-sm font-medium underline"
				>
					Se connecter
				</Link>
			)}
		</header>
	);
}
