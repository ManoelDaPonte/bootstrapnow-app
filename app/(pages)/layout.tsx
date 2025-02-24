// app/(dashboard)/layout.tsx
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeToggle } from "@/components/theme-toggle";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex h-screen">
			{/* Sidebar */}
			<aside className="w-64 flex-shrink-0 h-full">
				<Sidebar />
			</aside>

			{/* Main content area */}
			<div className="flex-1 flex flex-col min-w-0">
				<div className="sticky top-0 z-10 bg-background">
					<Header />
				</div>
				<main className="flex-1 overflow-y-auto">{children}</main>
			</div>

			{/* Utilities positioned absolutely */}
			<div className="absolute bottom-4 right-4 flex items-center gap-4">
				<ThemeToggle />
				<TailwindIndicator />
			</div>
		</div>
	);
}
