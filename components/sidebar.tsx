"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
	LayoutDashboard,
	Wrench,
	FileText,
	Lightbulb,
	User,
	HelpCircle,
	CreditCard,
	LockKeyhole,
} from "lucide-react";
import { useUserMetadata } from "@/context/userMetadataProvider";

const navItems = [
	{ href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
	{ href: "/tools/business-plan", label: "Business Plan", icon: FileText },

	{
		href: "/tools/search-hunter",
		label: "Search-Hunter",
		icon: Lightbulb,
		requiresSubscription: true,
	},
	{
		href: "/tools/market-tester",
		label: "Market-Tester",
		icon: Wrench,
		requiresSubscription: true,
	},
	{ href: "/abonnement", label: "Abonnement", icon: CreditCard },
	{ href: "/profile", label: "Profil", icon: User },
	{ href: "/aide", label: "Aide", icon: HelpCircle },
];

export default function Sidebar() {
	const pathname = usePathname();
	const { metadata } = useUserMetadata();

	// Vérifiez si l'utilisateur a un plan payant
	const isPaidUser = metadata?.plan && metadata.plan !== "free";

	return (
		<aside className="hidden md:flex md:flex-col w-64 border-r border-border bg-background fixed left-0 top-0 h-screen z-50">
			<div className="flex flex-col h-full overflow-y-auto p-4">
				<div className="flex items-center space-x-2 px-2 pb-4 border-b border-border">
					<Image
						src="/logo/logo_bootstrapnow.png"
						alt="logo"
						width={40}
						height={0}
					/>
					<span className="font-bold text-xl">BootstrapNow</span>
				</div>
				<nav className="mt-4 flex-1 space-y-1">
					{navItems.map((item) => {
						const Icon = item.icon;
						const isActive = pathname.startsWith(item.href);
						const showLock =
							item.requiresSubscription && !isPaidUser;

						return (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									"flex items-center justify-between rounded-md px-2 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
									isActive
										? "bg-accent text-accent-foreground"
										: "text-foreground"
								)}
							>
								<div className="flex items-center space-x-2">
									<Icon className="h-4 w-4" />
									<span>{item.label}</span>
								</div>
								{showLock && (
									<LockKeyhole className="h-4 w-4" />
								)}
							</Link>
						);
					})}
				</nav>
			</div>
		</aside>
	);
}
