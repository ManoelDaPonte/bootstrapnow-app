// lib/stripe/webhooks/handleCustomerSubscriptionUpdated.ts
import Stripe from "stripe";
import { findUserByCustomerId } from "@/lib/auth0/findUserByCustomerId";
import updateUserMetadata from "@/lib/auth0/updateUserMetadata";
import getManagementToken from "@/lib/auth0/getManagementToken";

const priceToPlanMap: Record<string, string> = {
	[process.env.STRIPE_PRICE_ID_BUILDER_MONTHLY!]: "builder_monthly",
	[process.env.STRIPE_PRICE_ID_BUILDER_YEARLY!]: "builder_yearly",
};

function getPlanFromSubscription(subscription: Stripe.Subscription): string {
	if (subscription.items.data.length === 0) {
		return "free"; // fallback si on a plus d'items
	}
	const priceId = subscription.items.data[0].price.id;
	return priceToPlanMap[priceId] || "free";
}

export async function handleCustomerSubscriptionUpdated(
	subscription: Stripe.Subscription
): Promise<void> {
	const customerId = subscription.customer.toString();
	const userId = await findUserByCustomerId(customerId);
	if (!userId) {
		console.warn(`No user found for customerId: ${customerId}`);
		return;
	}

	const stripeStatus = subscription.status;
	// Choix simple : "actif" si status = "active" ou "trialing", sinon "canceled"
	let userStatus: "actif" | "canceled" = "actif";
	if (
		stripeStatus === "canceled" ||
		stripeStatus === "incomplete" ||
		stripeStatus === "incomplete_expired" ||
		stripeStatus === "unpaid" ||
		stripeStatus === "past_due"
	) {
		userStatus = "canceled";
	}

	// Si on est "canceled", on repasse plan = "free"
	// Sinon on lit la subscription pour extraire le nouveau plan
	const userPlan =
		userStatus === "canceled"
			? "free"
			: getPlanFromSubscription(subscription);

	const accessToken = await getManagementToken();
	await updateUserMetadata(accessToken, userId, {
		subscription_id: subscription.id,
		plan: userPlan,
		status: userStatus,
	});

	console.log(
		`handleCustomerSubscriptionUpdated => user=${userId}, plan=${userPlan}, status=${userStatus}`
	);
}
