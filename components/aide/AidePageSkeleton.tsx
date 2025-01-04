// components/aide/AidePageSkeleton.tsx

import React from "react";

export default function AidePageSkeleton() {
	return (
		<div className="min-h-screen bg-background animate-pulse">
			<div className="max-w-3xl mx-auto py-10 px-6 space-y-10">
				{/* Titre et sous-titre */}
				<div className="text-center space-y-3">
					<div className="w-1/2 h-8 bg-gray-200 rounded mx-auto"></div>
					<div className="w-1/3 h-4 bg-gray-200 rounded mx-auto"></div>
				</div>

				{/* Section FAQ */}
				<div className="space-y-4">
					<div className="h-5 w-1/4 bg-gray-200 rounded"></div>
					<div className="h-4 w-1/2 bg-gray-200 rounded"></div>
					{/* Imitation de plusieurs items d'accordion */}
					<div className="space-y-2">
						{Array.from({ length: 3 }).map((_, i) => (
							<div
								key={i}
								className="w-full border rounded-lg overflow-hidden bg-card p-4 space-y-2"
							>
								<div className="h-4 bg-gray-200 rounded w-1/2"></div>
								<div className="h-4 bg-gray-200 rounded w-3/4"></div>
								<div className="h-4 bg-gray-200 rounded w-2/3"></div>
							</div>
						))}
					</div>
				</div>

				{/* Section Support & Communauté */}
				<div className="space-y-4">
					<div className="h-5 w-1/3 bg-gray-200 rounded"></div>
					<div className="h-4 w-1/2 bg-gray-200 rounded"></div>
					{/* Liste de contacts */}
					<div className="space-y-2 ml-6">
						<div className="h-4 w-1/3 bg-gray-200 rounded"></div>
						<div className="h-4 w-1/2 bg-gray-200 rounded"></div>
						<div className="h-4 w-1/4 bg-gray-200 rounded"></div>
					</div>
				</div>

				{/* Section Ressources */}
				<div className="space-y-4">
					<div className="h-5 w-1/3 bg-gray-200 rounded"></div>
					<div className="h-4 w-1/2 bg-gray-200 rounded"></div>
					{/* Liste de ressources */}
					<div className="ml-6 space-y-2">
						{Array.from({ length: 3 }).map((_, i) => (
							<div
								key={i}
								className="h-4 w-1/3 bg-gray-200 rounded"
							></div>
						))}
					</div>
				</div>

				<div className="text-center">
					<div className="h-4 w-2/3 bg-gray-200 rounded mx-auto"></div>
					<div className="h-10 w-32 bg-gray-200 rounded mx-auto mt-4"></div>
				</div>
			</div>
		</div>
	);
}
