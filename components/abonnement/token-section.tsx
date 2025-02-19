import React from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { siteConfig } from "@/lib/config";

interface TokenSectionProps {
	tokens?: number;
	userId: string;
	customerStripeId?: string;
	isBuilder: boolean;
}

const TokenSection = ({
	tokens = 0,
	userId,
	customerStripeId,
	isBuilder,
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

			const response = await fetch(
				"/api/stripe/create-checkout-session",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						priceId,
						customerId: customerStripeId,
						userId,
						isTokenPurchase: true,
					}),
				}
			);

			const data = await response.json();
			if (data.url) {
				window.location.href = data.url;
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

	// Calcul des réductions par rapport au prix unitaire du pack découverte
	const calculateDiscount = (tokenCount: number, price: number) => {
		const baseTokenPrice = siteConfig.pricing.tokens.packs[0].priceAmount;
		const currentTokenPrice = price / tokenCount;
		const discount =
			((baseTokenPrice - currentTokenPrice) / baseTokenPrice) * 100;
		return Math.round(discount);
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

			{isBuilder && (
				<div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
					<AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
					<div>
						<p className="font-medium">
							Recharge mensuelle de tokens incluse !
						</p>
						<p className="text-sm text-muted-foreground">
							Avec votre abonnement Builder, vous recevez
							automatiquement{" "}
							{
								siteConfig.pricing.subscriptions.find(
									(s) => s.name === "BUILDER"
								)?.monthlyTokens
							}{" "}
							tokens chaque mois.
						</p>
					</div>
				</div>
			)}

			<div className="grid gap-6 md:grid-cols-3">
				{siteConfig.pricing.tokens.packs.map((pack, index) => {
					const discount =
						index > 0
							? calculateDiscount(pack.tokens, pack.priceAmount)
							: 0;

					return (
						<Card
							key={pack.id}
							className="border-2 hover:border-primary/50 transition-all flex flex-col relative"
						>
							{discount > 0 && (
								<div className="absolute -top-3 -right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-md">
									-{discount}% / token
								</div>
							)}

							<CardHeader className="flex-none">
								<CardTitle className="flex justify-between items-center">
									<span>{pack.name}</span>
									<span className="text-primary">
										{pack.price}
									</span>
								</CardTitle>
							</CardHeader>

							<CardContent className="flex-grow">
								<div className="space-y-4">
									<div className="flex items-center gap-2">
										<Coins className="w-4 h-4 text-primary" />
										<span className="font-medium">
											{pack.tokens} tokens
										</span>
									</div>
									<p className="text-sm text-muted-foreground">
										{pack.description}
									</p>
									{discount > 0 && (
										<p className="text-xs text-primary">
											Soit{" "}
											{(
												pack.priceAmount / pack.tokens
											).toFixed(2)}
											€ par token
										</p>
									)}
								</div>
							</CardContent>

							<CardFooter className="mt-auto pt-4">
								<Button
									className="w-full"
									onClick={() =>
										handlePurchaseTokens(pack.priceId)
									}
								>
									Acheter
								</Button>
							</CardFooter>
						</Card>
					);
				})}
			</div>
		</div>
	);
};

export default TokenSection;
