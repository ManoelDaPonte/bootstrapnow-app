// componant/abonnement/token-section.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { siteConfig } from "@/lib/config";

interface TokenSectionProps {
	tokens?: number;
	userId: string;
	customerStripeId?: string;
	isInnovateur: boolean;
}

const TokenSection = ({
	tokens = 0,
	userId,
	customerStripeId,
	isInnovateur,
}: TokenSectionProps) => {
	const handlePurchaseTokens = async (priceId: string | undefined) => {
		try {
			if (!customerStripeId || !priceId) {
				toast({
					title: "Erreur",
					description: "Une erreur est survenue. Veuillez réessayer.",
					variant: "destructive",
				});
				return;
			}

			const response = await axios.post(
				"/api/stripe/create-checkout-session",
				{
					priceId,
					customerId: customerStripeId,
					userId,
					isTokenPurchase: true,
				}
			);

			if (response.data.url) {
				window.location.href = response.data.url;
			}
		} catch (_error) {
			toast({
				title: "Erreur",
				description:
					"Une erreur est survenue lors de l'achat des tokens.",
				variant: "destructive",
			});
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Tokens de génération</h2>
				<div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
					<Coins className="w-5 h-5 text-primary" />
					<span className="font-semibold">
						{tokens} tokens disponibles
					</span>
				</div>
			</div>

			{isInnovateur && (
				<div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
					<AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
					<div>
						<p className="font-medium">
							Recharge mensuelle de tokens incluse !
						</p>
						<p className="text-sm text-muted-foreground">
							Avec votre abonnement Innovateur, vous recevez
							automatiquement{" "}
							{
								siteConfig.pricing.subscriptions.find(
									(s) => s.name === "INNOVATEUR"
								)?.monthlyTokens
							}{" "}
							tokens chaque mois.
						</p>
					</div>
				</div>
			)}

			<div className="grid gap-6 md:grid-cols-3">
				{siteConfig.pricing.tokens.packs.map((pack) => (
					<Card
						key={pack.id}
						className="border-2 hover:border-primary/50 transition-all"
					>
						<CardHeader>
							<CardTitle className="flex justify-between items-center">
								<span>{pack.name}</span>
								<span className="text-primary">
									{pack.price}
								</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<Coins className="w-4 h-4 text-primary" />
									<span className="font-medium">
										{pack.tokens} tokens
									</span>
								</div>
								<p className="text-sm text-muted-foreground">
									{pack.description}
								</p>
							</div>
							<Button
								className="w-full"
								onClick={() =>
									handlePurchaseTokens(pack.priceId)
								}
							>
								Acheter
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default TokenSection;
