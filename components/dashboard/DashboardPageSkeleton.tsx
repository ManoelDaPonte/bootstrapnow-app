// components/dashboard/DashboardPageSkeleton.tsx

import React from "react";

export default function DashboardPageSkeleton() {
	return (
		<div className="min-h-screen bg-background animate-pulse">
			<div className="max-w-3xl mx-auto py-10 px-6 space-y-10">
				{/* Titre et sous-titre */}
				<div className="text-center space-y-3">
					<div className="w-1/2 h-8 bg-gray-200 rounded mx-auto"></div>
					<div className="w-1/3 h-4 bg-gray-200 rounded mx-auto"></div>
				</div>

				{/* Liste des étapes (ActionCards) */}
				<div className="space-y-8 mt-8">
					{Array.from({ length: 3 }).map((_, i) => (
						<div
							key={i}
							className="p-4 bg-card rounded-lg shadow-md border border-border space-y-3"
						>
							<div className="h-5 w-1/4 bg-gray-200 rounded"></div>
							<div className="h-4 w-1/2 bg-gray-200 rounded"></div>
							<div className="h-4 w-2/3 bg-gray-200 rounded"></div>
							<div className="h-10 w-32 bg-gray-200 rounded mt-4"></div>
						</div>
					))}

					{/* Dernière section avec les outils */}
					<div className="p-4 bg-card rounded-lg shadow-md border border-border space-y-4">
						<div className="h-5 w-1/4 bg-gray-200 rounded"></div>
						<div className="h-4 w-1/2 bg-gray-200 rounded"></div>
						<div className="flex gap-2 mt-2">
							<div className="h-10 w-24 bg-gray-200 rounded"></div>
							<div className="h-10 w-24 bg-gray-200 rounded"></div>
							<div className="h-10 w-24 bg-gray-200 rounded"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
