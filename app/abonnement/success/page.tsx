"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
	const searchParams = useSearchParams();
	const sessionId = searchParams.get("session_id");

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
			<h1 className="text-3xl font-bold text-green-700">
				Paiement réussi !
			</h1>
			<p className="mt-4 text-gray-700">
				Merci pour votre abonnement. Votre transaction est terminée.
			</p>
			{sessionId && (
				<p className="mt-2 text-sm text-gray-500">
					ID de session :{" "}
					<span className="font-mono">{sessionId}</span>
				</p>
			)}
			<button
				onClick={() => (window.location.href = "/abonnement")}
				className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
			>
				Retour à votre abonnement
			</button>
		</div>
	);
}
