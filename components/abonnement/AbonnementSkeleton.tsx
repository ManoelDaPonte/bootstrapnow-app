// components/abonnement/AbonnementSkeleton.tsx
import React from "react";

export default function AbonnementSkeleton() {
	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-6xl mx-auto py-10 px-6 space-y-10 animate-pulse">
				<div className="text-center space-y-3">
					{/* Titre */}
					<div className="w-1/2 h-8 bg-gray-200 rounded mx-auto"></div>
					{/* Sous-titre */}
					<div className="w-1/3 h-4 bg-gray-200 rounded mx-auto"></div>
				</div>

				{/* Card de l'état de l'abonnement */}
				<div className="border border-border bg-card p-4 rounded-md space-y-2">
					<div className="h-5 bg-gray-200 rounded w-1/3"></div>
					<div className="h-4 bg-gray-200 rounded w-2/3"></div>
				</div>

				{/* Alerte */}
				<div className="border border-border bg-card p-4 rounded-md flex items-start space-x-4">
					<div className="h-6 w-6 bg-gray-200 rounded-full"></div>
					<div className="flex-1 space-y-2">
						<div className="h-5 bg-gray-200 rounded w-1/4"></div>
						<div className="h-4 bg-gray-200 rounded w-2/3"></div>
					</div>
				</div>

				{/* Section Pricing ou Cancellation */}
				{/* Si vous avez plusieurs blocs, imitez leur structure */}
				<div className="border border-border bg-card p-4 rounded-md space-y-4">
					<div className="h-5 bg-gray-200 rounded w-1/3"></div>
					<div className="h-4 bg-gray-200 rounded w-1/2"></div>
					<div className="h-4 bg-gray-200 rounded w-2/3"></div>
					<div className="h-4 bg-gray-200 rounded w-1/4"></div>
				</div>
			</div>
		</div>
	);
}
