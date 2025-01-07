// lib/stripe/webhooks/handleCustomerSubscriptionDeleted.ts
import Stripe from "stripe";
import { findUserByCustomerId } from "@/lib/auth0/findUserByCustomerId";
import getManagementToken from "@/lib/auth0/getManagementToken";
import updateUserMetadata from "@/lib/auth0/updateUserMetadata";

export async function handleCustomerSubscriptionDeleted(
	subscription: Stripe.Subscription
): Promise<void> {
	const customerId = subscription.customer.toString();
	const userId = await findUserByCustomerId(customerId);
	if (!userId) {
		console.warn(`No user found for customerId: ${customerId}`);
		return;
	}

	const accessToken = await getManagementToken();
	await updateUserMetadata(accessToken, userId, {
		plan: "free",
		status: "canceled",
		subscription_id: "",
	});

	console.log(
		`handleCustomerSubscriptionDeleted => user=${userId}, plan=free, status=canceled`
	);
}
