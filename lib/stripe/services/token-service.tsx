// lib/stripe/services/token-service.ts
import { siteConfig } from "@/lib/config";
import updateUserMetadata from "@/lib/auth0/updateUserMetadata";

export class TokenService {
	// Récupère le nombre de tokens à partir des métadonnées du prix Stripe
	static getTokensFromStripePriceId(priceId: string): number {
		// Chercher dans les packs de tokens
		const tokenPack = siteConfig.pricing.tokens.packs.find(
			(pack) => pack.priceId === priceId
		);
		if (tokenPack) {
			return tokenPack.tokens;
		}

		// Chercher dans les abonnements
		const subscription = siteConfig.pricing.subscriptions.find(
			(sub) =>
				sub.priceIds.monthly === priceId ||
				sub.priceIds.yearly === priceId
		);

		if (subscription?.monthlyTokens) {
			console.log("Found subscription:", subscription);
			return subscription.monthlyTokens;
		}

		console.log("No tokens found for priceId:", priceId);
		return 0;
	}

	// Met à jour les tokens d'un utilisateur
	static async updateUserTokens(
		accessToken: string,
		userId: string,
		currentMetadata: any,
		tokensToAdd: number,
		additionalMetadata: object = {}
	): Promise<void> {
		const currentTokens = parseInt(currentMetadata.tokens || "0");
		const newTokens = Math.max(0, currentTokens + tokensToAdd); // Empêche les tokens négatifs

		const updatedMetadata = {
			...currentMetadata,
			...additionalMetadata,
			tokens: newTokens.toString(),
		};

		await updateUserMetadata(accessToken, userId, updatedMetadata);

		console.log(
			`Tokens updated => user=${userId}, tokens_added=${tokensToAdd}, total_tokens=${newTokens}, additional_metadata=`,
			additionalMetadata
		);

		// Déclencher l'événement de mise à jour des tokens
		if (typeof window !== "undefined") {
			const event = new CustomEvent("tokensUpdated", {
				detail: { newTokens },
			});
			window.dispatchEvent(event);
		}
	}

	static async consumeToken(
		accessToken: string,
		userId: string,
		currentMetadata: any
	): Promise<boolean> {
		try {
			const currentTokens = parseInt(currentMetadata.tokens || "0");

			if (currentTokens <= 0) {
				return false;
			}

			await this.updateUserTokens(
				accessToken,
				userId,
				currentMetadata,
				-1
			);
			return true;
		} catch (error) {
			console.error("Error using token:", error);
			return false;
		}
	}
}
