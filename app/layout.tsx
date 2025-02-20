// app/(dashboard)/layout.tsx
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "@/components/theme-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMetadataProvider } from "@/context/userMetadataProvider";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr" suppressHydrationWarning>
			<head>
				<link rel="preconnect" href="https://rsms.me/" />
				<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
			</head>
			<body className="min-h-screen bg-background antialiased">
				<UserProvider>
					<UserMetadataProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="light"
							enableSystem={false}
						>
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
									<main className="flex-1 overflow-y-auto">
										{children}
									</main>
								</div>

								{/* Utilities positioned absolutely */}
								<div className="absolute bottom-4 right-4 flex items-center gap-4">
									<ThemeToggle />
									<TailwindIndicator />
								</div>
							</div>
							<Toaster />
						</ThemeProvider>
					</UserMetadataProvider>
				</UserProvider>
			</body>
		</html>
	);
}
