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
			<body className="min-h-screen bg-background antialiased flex">
				<UserProvider>
					<UserMetadataProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="light"
							enableSystem={false}
						>
							<Sidebar />
							<div className="flex-1 flex flex-col">
								<Header />
								<main className="flex-1 container mx-auto p-4">
									{children}
								</main>
								<ThemeToggle />
								<TailwindIndicator />
							</div>
						</ThemeProvider>
					</UserMetadataProvider>
				</UserProvider>
			</body>
		</html>
	);
}
