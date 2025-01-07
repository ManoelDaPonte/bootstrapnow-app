// lib/stripe/webhooks/handleCustomerSubscriptionCreated.ts
import Stripe from "stripe";
import { findUserByCustomerId } from "@/lib/auth0/findUserByCustomerId";
import getManagementToken from "@/lib/auth0/getManagementToken";
import updateUserMetadata from "@/lib/auth0/updateUserMetadata";

export async function handleCustomerSubscriptionCreated(
	subscription: Stripe.Subscription
): Promise<void> {
	const customerId = subscription.customer.toString();
	const userId = await findUserByCustomerId(customerId);
	if (!userId) {
		console.warn(`No user found for customerId: ${customerId}`);
		return;
	}

	const statusStripe = subscription.status; // "active", "trialing", etc.
	const userStatus = statusStripe === "active" ? "actif" : "canceled";
	// On peut mapper la price.id en plan, ou laisser handleCheckoutSessionCompleted s’en charger

	const accessToken = await getManagementToken();
	await updateUserMetadata(accessToken, userId, {
		subscription_id: subscription.id,
		status: userStatus,
	});

	console.log(
		`handleCustomerSubscriptionCreated => user=${userId}, status=${userStatus}`
	);
}
