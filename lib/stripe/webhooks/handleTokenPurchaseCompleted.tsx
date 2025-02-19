// lib/stripe/webhooks/handleTokenPurchaseCompleted.ts
import Stripe from "stripe";
import getManagementToken from "@/lib/auth0/getManagementToken";
import getUserMetadata from "@/lib/auth0/getUserMetadata";
import updateUserMetadata from "@/lib/auth0/updateUserMetadata";
import { siteConfig } from "@/lib/config";

export async function handleTokenPurchaseCompleted(
	session: Stripe.Checkout.Session
): Promise<void> {
	if (!session.metadata?.userId || !session.metadata?.price_id) {
		console.warn("Token purchase without userId or price_id in metadata");
		return;
	}

	console.log("Processing token purchase with metadata:", session.metadata);

	// Trouver le pack de tokens correspondant au price_id
	const tokenPack = siteConfig.pricing.tokens.packs.find(
		(pack) => pack.priceId === session.metadata!.price_id
	);

	if (!tokenPack) {
		console.warn(
			`No token pack found for price_id: ${session.metadata.price_id}`
		);
		return;
	}

	const tokenAmount = tokenPack.tokens;
	const userId = session.metadata.userId;

	try {
		const accessToken = await getManagementToken();
		const currentMetadata = await getUserMetadata(accessToken, userId);

		// Calculer le nouveau total de tokens
		const currentTokens = parseInt(currentMetadata.tokens || "0");
		const newTokensTotal = currentTokens + tokenAmount;

		// Mettre à jour les métadonnées de l'utilisateur
		await updateUserMetadata(accessToken, userId, {
			...currentMetadata,
			tokens: newTokensTotal.toString(),
		});

		console.log(`Tokens updated successfully:`, {
			userId,
			previousTokens: currentTokens,
			addedTokens: tokenAmount,
			newTotal: newTokensTotal,
		});
	} catch (error) {
		console.error("Error updating user tokens:", error);
		throw error;
	}
}
