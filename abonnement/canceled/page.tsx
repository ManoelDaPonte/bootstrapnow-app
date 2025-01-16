"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function CanceledPage() {
	return (
		<div className="max-w-md mx-auto mt-16 p-4">
			<div className="border border-border bg-card p-6 rounded-md shadow-lg text-center">
				<XCircle className="text-red-600 w-16 h-16 mx-auto" />
				<h1 className="text-3xl font-bold text-red-700 mt-4">
					Paiement annulé
				</h1>
				<p className="mt-4 text-gray-700">
					Vous pouvez réessayer à tout moment. Votre transaction n’a
					pas été finalisée.
				</p>
				<Link href="/abonnement">
					<Button className="mt-6" variant="default">
						Retour à votre abonnement
					</Button>
				</Link>
			</div>
		</div>
	);
}
