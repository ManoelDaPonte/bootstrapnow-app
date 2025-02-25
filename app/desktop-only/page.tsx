// app/desktop-only/page.tsx
import React from "react";
import Link from "next/link";

export default function DesktopOnly() {
	return (
		<div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
			<div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 text-center">
				<h1 className="text-3xl font-bold text-blue-600 mb-6">
					Version Desktop Uniquement
				</h1>

				<div className="my-6">
					<svg
						className="w-24 h-24 mx-auto text-blue-500"
						fill="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
						<path d="M6 10h12v2H6z" />
					</svg>
				</div>

				<p className="text-lg mb-4">
					Notre application est conçue exclusivement pour les
					ordinateurs de bureau.
				</p>

				<p className="mb-8 text-gray-600">
					En raison de la complexité des fonctionnalités et des outils
					de business planning proposés, l&apos;expérience utilisateur
					est optimisée pour les écrans larges et ne peut pas être
					adaptée aux appareils mobiles.
				</p>

				<div className="flex flex-col space-y-4">
					<p className="font-semibold text-gray-800">
						Veuillez vous connecter depuis un ordinateur pour
						accéder à toutes les fonctionnalités.
					</p>

					<Link
						href="/"
						className="mx-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
					>
						Retour à l&apos;accueil
					</Link>
				</div>
			</div>
		</div>
	);
}
