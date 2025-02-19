// lib/stripe/webhooks/handleCustomerSubscriptionDeleted.ts
import Stripe from "stripe";
import getManagementToken from "@/lib/auth0/getManagementToken";
import { findUserByCustomerId } from "@/lib/auth0/findUserByCustomerId";
import { TokenService } from "@/lib/stripe/services/token-service";
import getUserMetadata from "@/lib/auth0/getUserMetadata";

export async function handleCustomerSubscriptionDeleted(
	subscription: Stripe.Subscription
): Promise<void> {
	const customerId = subscription.customer.toString();
	const userId = await findUserByCustomerId(customerId);
	if (!userId) {
		console.warn(`No user found for customerId: ${customerId}`);
		return;
	}

	try {
		const accessToken = await getManagementToken();
		const currentMetadata = await getUserMetadata(accessToken, userId);

		// Récupérer le nombre de tokens mensuel du plan actuel
		const priceId = subscription.items.data[0].price.id;
		const monthlyTokens = TokenService.getTokensFromStripePriceId(priceId);

		console.log(`Processing subscription deletion:`, {
			userId,
			currentTokens: currentMetadata.tokens,
			monthlyTokens,
		});

		// Mise à jour du statut et conservation des tokens restants
		await TokenService.updateUserTokens(
			accessToken,
			userId,
			currentMetadata,
			0, // On ne modifie pas le nombre de tokens
			{
				plan: "free",
				status: "canceled",
				subscription_id: "",
			}
		);
	} catch (error) {
		console.error("Error in handleCustomerSubscriptionDeleted:", error);
		throw error;
	}
}
