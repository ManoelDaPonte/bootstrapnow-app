"use client";

export default function CanceledPage() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
			<h1 className="text-3xl font-bold text-red-700">Paiement annulé</h1>
			<p className="mt-4 text-gray-700">
				Vous pouvez réessayer à tout moment. Votre transaction n’a pas
				été finalisée.
			</p>
			<button
				onClick={() => (window.location.href = "/abonnement")}
				className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
			>
				Retour à votre abonnement
			</button>
		</div>
	);
}
