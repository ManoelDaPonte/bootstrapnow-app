import * as React from "react";
import { cn } from "@/lib/utils";

interface CircleProgressRingProps {
	value: number; // pourcentage
	size?: number; // taille (diamètre) du cercle
	strokeWidth?: number;
	className?: string;
	/**
	 * colorStroke et colorTrack acceptent
	 * des classes Tailwind, ex: "text-[hsl(var(--primary))]"
	 * ou "text-[hsl(var(--chart-1))]"
	 */
	colorStroke?: string; // Couleur du tracé "actif"
	colorTrack?: string; // Couleur du fond (cercle inactif)
	showPercentage?: boolean;
}

export function CircleProgressRing({
	value,
	size = 64, // on passe de 48 à 64 pour avoir un cercle un peu plus grand
	strokeWidth = 8,
	className,
	colorStroke = "text-[hsl(var(--primary))]",
	colorTrack = "text-[hsl(var(--muted-foreground))]",
	showPercentage = true,
}: CircleProgressRingProps) {
	// Calcul du périmètre du cercle
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;

	// Offset calculé en fonction du pourcentage
	const offset = circumference - (value / 100) * circumference;

	return (
		<div
			className={cn(
				"relative flex items-center justify-center",
				className
			)}
		>
			<svg
				className="rotate-[-90deg]"
				width={size}
				height={size}
				role="progressbar"
				aria-valuenow={value}
				aria-valuemin={0}
				aria-valuemax={100}
			>
				{/* Cercle de "fond" */}
				<circle
					className={cn(colorTrack)}
					stroke="currentColor"
					fill="transparent"
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={0}
					r={radius}
					cx={size / 2}
					cy={size / 2}
				/>
				{/* Cercle "actif" */}
				<circle
					className={cn(
						"transition-all duration-300 ease-in-out",
						colorStroke
					)}
					stroke="currentColor"
					fill="transparent"
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="round"
					r={radius}
					cx={size / 2}
					cy={size / 2}
				/>
			</svg>

			{/* Affichage du pourcentage (optionnel) */}
			{showPercentage && (
				<span
					className={cn(
						"absolute select-none font-bold",
						// On peut jouer sur la taille/ombres de la font :
						"text-base drop-shadow-sm"
					)}
				>
					{value}%
				</span>
			)}
		</div>
	);
}
