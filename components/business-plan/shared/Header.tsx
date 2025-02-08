import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { HeaderProps } from "@/types/shared/header";

interface ExtendedHeaderProps extends HeaderProps {
	rightContent?: React.ReactNode;
}

export const Header: React.FC<ExtendedHeaderProps> = ({
	title,
	progress,
	rightContent,
}) => {
	const { user } = useUser();

	return (
		<div className="sticky top-0 z-40 w-full border-b bg-background">
			<div className="max-w-full mx-auto">
				<div className="flex items-center justify-between p-4">
					{/* Section gauche avec le titre */}
					<div className="flex items-center gap-4">
						<Link
							href="/tools/business-plan/"
							className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 transition-colors duration-200"
						>
							<ChevronLeft
								size={20}
								className="text-secondary-foreground"
							/>
						</Link>
						<h1 className="text-2xl font-bold text-foreground">
							{title}
						</h1>
					</div>

					{/* Section centrale avec la progression */}
					<div className="flex items-center gap-6 mr-16">
						<div className="flex items-center gap-2 text-sm">
							<div className="w-24 bg-secondary rounded-full h-2">
								<div
									className="bg-primary h-2 rounded-full transition-all duration-300"
									style={{ width: `${progress}%` }}
								/>
							</div>
							<span className="text-muted-foreground">
								{progress}%
							</span>
						</div>

						{/* Statut de synchronisation */}
						{user ? (
							<span className="text-sm text-primary flex items-center gap-1">
								<div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
								Synchronisé
							</span>
						) : (
							<span className="text-sm text-muted-foreground">
								Mode local
							</span>
						)}

						{/* Contenu supplémentaire à droite */}
						{rightContent && (
							<div className="flex items-center">
								{rightContent}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
