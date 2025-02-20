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
	const { user, error, isLoading } = useUser();
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (process.env.NODE_ENV === "production") {
			const originalFetch = window.fetch;
			window.fetch = function (...args) {
				const [url] = args;
				if (
					typeof url === "string" &&
					url.includes("/api/auth/logout")
				) {
					console.log("Logout request detected", {
						stack: new Error().stack,
						args,
					});
				}
				return originalFetch.apply(this, args);
			};
		}
	}, []);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted || isLoading) {
		return <div className="fixed top-4 right-4 w-9 h-9" />;
	}

	const handleTriggerClick = (e: React.MouseEvent) => {
		if (process.env.NODE_ENV === "production") {
			console.log("Trigger clicked", {
				type: e.type,
				target: e.target,
				currentTarget: e.currentTarget,
				defaultPrevented: e.defaultPrevented,
			});
		}
		e.preventDefault();
		e.stopPropagation();
		setIsOpen(!isOpen);
	};

	return (
		<header className="fixed top-4 right-4 z-50">
			{user && (
				<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
					<DropdownMenuTrigger asChild>
						<button
							type="button"
							className="flex items-center focus:outline-none"
							onClick={handleTriggerClick}
						>
							<Image
								src={user.picture ?? "/default-avatar.png"}
								alt={user.name ?? "Utilisateur"}
								width={36}
								height={36}
								className="rounded-full"
								priority
							/>
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-48"
						align="end"
						onCloseAutoFocus={(e) => {
							e.preventDefault();
						}}
					>
						<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
							<Link
								href="/profile"
								className="flex items-center gap-2 w-full"
								onClick={(e) => e.stopPropagation()}
							>
								<Settings className="h-4 w-4" />
								<span>Paramètres</span>
							</Link>
						</DropdownMenuItem>

						<DropdownMenuSeparator />

						<DropdownMenuItem
							onSelect={(e) => {
								e.preventDefault();
								setTheme(theme === "light" ? "dark" : "light");
							}}
							className="flex items-center gap-2"
						>
							<Sun className="h-4 w-4 dark:hidden" />
							<Moon className="h-4 w-4 hidden dark:block" />
							<span>Changer le thème</span>
						</DropdownMenuItem>

						<DropdownMenuSeparator />

						<DropdownMenuItem
							onSelect={(e) => e.preventDefault()}
							className="text-destructive"
						>
							<Link
								href="/api/auth/logout"
								className="flex items-center gap-2 w-full"
								onClick={(e) => e.stopPropagation()}
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
