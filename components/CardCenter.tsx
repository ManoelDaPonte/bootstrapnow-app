"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type CardCenterProps = {
	title: string; // Titre de la carte
	description: string; // Description affichée sous le titre
	buttonText: string; // Texte du bouton
	buttonHref: string; // Lien vers lequel le bouton redirige
	icon?: LucideIcon; // Icône optionnelle au-dessus du titre
	iconColor?: string; // Couleur de l'icône
};

export default function CardCenter({
	title,
	description,
	buttonText,
	buttonHref,
	icon: Icon,
	iconColor = "text-gray-500",
}: CardCenterProps) {
	return (
		<div className="relative w-full h-screen overflow-hidden bg-background text-foreground">
			<div className="absolute inset-0 flex items-center justify-center px-4">
				{/* Carte centrée */}
				<div className="bg-card p-6 rounded-md shadow max-w-md w-full text-center">
					{Icon && (
						<Icon
							className={cn(iconColor, "w-8 h-8 mx-auto mb-4")}
						/>
					)}
					<h1 className="text-2xl font-bold mb-2">{title}</h1>
					<p className="text-muted-foreground text-sm mb-4">
						{description}
					</p>
					<Link
						href={buttonHref}
						className="inline-block px-6 py-3 rounded-md text-sm bg-[hsl(var(--primary))] 
              hover:opacity-90 transition font-medium text-primary-foreground"
					>
						{buttonText}
					</Link>
				</div>
			</div>
		</div>
	);
}
