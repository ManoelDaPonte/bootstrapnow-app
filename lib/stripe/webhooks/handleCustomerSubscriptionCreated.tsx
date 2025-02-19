// lib/stripe/webhooks/handleCustomerSubscriptionCreated.ts
import Stripe from "stripe";
import getManagementToken from "@/lib/auth0/getManagementToken";
import { findUserByCustomerId } from "@/lib/auth0/findUserByCustomerId";
import getUserMetadata from "@/lib/auth0/getUserMetadata";
import { TokenService } from "@/lib/stripe/services/token-service";

export async function handleCustomerSubscriptionCreated(
	subscription: Stripe.Subscription
): Promise<void> {
	const customerId = subscription.customer.toString();
	const userId = await findUserByCustomerId(customerId);
	if (!userId) {
		console.warn(`No user found for customerId: ${customerId}`);
		return;
	}

	const statusStripe = subscription.status;
	const userStatus = statusStripe === "active" ? "actif" : "canceled";
	const priceId = subscription.items.data[0].price.id;

	const accessToken = await getManagementToken();
	const currentMetadata = await getUserMetadata(accessToken, userId);
	const tokensToAdd = TokenService.getTokensFromStripePriceId(priceId);

	await TokenService.updateUserTokens(
		accessToken,
		userId,
		{
			...currentMetadata,
			subscription_id: subscription.id,
			status: userStatus,
		},
		tokensToAdd
	);
}
