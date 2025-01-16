"use client";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
	return (
		<div className="max-w-md mx-auto mt-16 p-4">
			<div className="border border-border bg-white p-6 rounded-md shadow-lg text-center">
				<CheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />
				<h1 className="text-3xl font-bold text-green-700">
					Paiement réussi !
				</h1>
				<p className="mt-4 text-gray-700">
					Merci pour votre abonnement. Votre transaction est terminée.
				</p>

				<Link
					href="/abonnement"
					className="inline-block mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
				>
					Retour à votre abonnement
				</Link>
			</div>
		</div>
	);
}
