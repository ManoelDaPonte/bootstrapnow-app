// components/profile/ProfilePageSkeleton.tsx

import React from "react";

export default function ProfilePageSkeleton() {
	return (
		<div className="min-h-screen bg-background animate-pulse">
			<div className="max-w-3xl mx-auto py-10 px-6 space-y-10">
				<div className="text-center space-y-3">
					<div className="w-1/2 h-8 bg-gray-200 rounded mx-auto"></div>
					<div className="w-1/3 h-4 bg-gray-200 rounded mx-auto"></div>
				</div>

				{/* Formulaire */}
				<div className="space-y-4 bg-card p-6 rounded-md shadow">
					{/* Sélection du rôle */}
					<div className="h-5 w-1/4 bg-gray-200 rounded"></div>
					{/* Un groupe de radio ou select => on imite par des lignes */}
					<div className="space-y-2 mt-2">
						<div className="h-4 w-1/3 bg-gray-200 rounded"></div>
						<div className="h-4 w-1/3 bg-gray-200 rounded"></div>
						<div className="h-4 w-1/3 bg-gray-200 rounded"></div>
					</div>

					{/* Newsletter */}
					<div className="h-5 w-1/3 bg-gray-200 rounded mt-4"></div>
					<div className="space-y-2 mt-2">
						<div className="h-4 w-1/2 bg-gray-200 rounded"></div>
						<div className="h-4 w-1/2 bg-gray-200 rounded"></div>
					</div>

					{/* Bouton sauvegarder */}
					<div className="h-10 w-32 bg-gray-200 rounded mt-4"></div>
				</div>

				{/* JoinDiscordBanner Skeleton */}
				<div className="bg-card p-6 rounded-md shadow space-y-4">
					<div className="h-5 w-1/3 bg-gray-200 rounded"></div>
					<div className="h-4 w-1/2 bg-gray-200 rounded"></div>
					<div className="h-10 w-32 bg-gray-200 rounded"></div>
				</div>
			</div>
		</div>
	);
}
