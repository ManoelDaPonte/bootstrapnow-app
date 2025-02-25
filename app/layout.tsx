// app/layout.tsx
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "@/components/theme-provider";
import { UserMetadataProvider } from "@/context/userMetadataProvider";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
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
							{children}
							<Toaster />
						</ThemeProvider>
					</UserMetadataProvider>
				</UserProvider>
			</body>
		</html>
	);
}
