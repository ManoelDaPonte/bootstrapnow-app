// app/(dashboard)/layout.tsx
import "./globals.css"; // si nécessaire
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "@/components/theme-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMetadataProvider } from "@/context/userMetadataProvider";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

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
							<div className="flex h-screen">
								{" "}
								{/* Container principal */}
								{/* Sidebar avec une largeur fixe */}
								<aside className="w-64 flex-shrink-0">
									<Sidebar />
								</aside>
								{/* Container du contenu principal avec sa propre zone de scroll */}
								<div className="flex-1 flex flex-col min-w-0">
									{" "}
									{/* min-w-0 est crucial ici */}
									<Header />
									<main className="flex-1 relative overflow-y-auto">
										{" "}
										{/* overflow-y-auto pour le scroll vertical */}
										{children}
									</main>
									<ThemeToggle />
									<TailwindIndicator />
								</div>
							</div>
						</ThemeProvider>
					</UserMetadataProvider>
				</UserProvider>
			</body>
		</html>
	);
}
