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
} from "lucide-react";

const navItems = [
	{ href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
	{ href: "/tools/search-hunter", label: "Search-Hunter", icon: Lightbulb },
	{ href: "/tools/market-tester", label: "Market-Tester", icon: Wrench },
	{ href: "/tools/business-plan", label: "Business Plan", icon: FileText },
	{ href: "/abonnement", label: "Abonnement", icon: CreditCard },
	{ href: "/profile", label: "Profil", icon: User },
	{ href: "/aide", label: "Aide", icon: HelpCircle },
];

export default function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="hidden md:flex md:flex-col w-64 border-r border-border bg-background p-4 sticky top-0 h-screen overflow-y-auto">
			<div className="flex items-center space-x-2 px-2 pb-4 border-b border-border">
				<Image
					src="/logo_bootstrapnow.svg"
					alt="logo"
					width={35}
					height={35}
				/>
				<span className="font-bold text-xl">BootstrapNow</span>
			</div>
			<nav className="mt-4 flex-1 space-y-1">
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive = pathname.startsWith(item.href);
					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"flex items-center space-x-2 rounded-md px-2 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
								isActive
									? "bg-accent text-accent-foreground"
									: "text-foreground"
							)}
						>
							<Icon className="h-4 w-4" />
							<span>{item.label}</span>
						</Link>
					);
				})}
			</nav>
		</aside>
	);
}
