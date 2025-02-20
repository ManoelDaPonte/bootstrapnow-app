"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Image from "next/image";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SaasHeader() {
	const { user, isLoading } = useUser();
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted || isLoading) {
		return <div className="h-[40px]" />;
	}

	return (
		<header className="fixed top-4 right-4 z-50">
			{user && (
				<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
					<DropdownMenuTrigger asChild>
						<button
							className="flex items-center focus:outline-none"
							onClick={(e) => {
								e.preventDefault();
								setIsOpen(!isOpen);
							}}
						>
							<Image
								src={user.picture ?? "/default-avatar.png"}
								alt={user.name ?? "Utilisateur"}
								width={36}
								height={36}
								className="rounded-full"
							/>
						</button>
					</DropdownMenuTrigger>
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

						<DropdownMenuSeparator />

						<DropdownMenuItem
							onClick={() =>
								setTheme(theme === "light" ? "dark" : "light")
							}
							className="flex items-center gap-2"
						>
							<Sun className="h-4 w-4 dark:hidden" />
							<Moon className="h-4 w-4 hidden dark:block" />
							<span>Changer le thème</span>
						</DropdownMenuItem>

						<DropdownMenuSeparator />

						<DropdownMenuItem asChild>
							<Link
								href="/api/auth/logout"
								className="flex items-center gap-2 text-destructive"
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
