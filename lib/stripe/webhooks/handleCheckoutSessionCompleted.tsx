// lib/stripe/webhooks/handleCheckoutSessionCompleted.ts
import Stripe from "stripe";
import getManagementToken from "@/lib/auth0/getManagementToken";
import updateUserMetadata from "@/lib/auth0/updateUserMetadata";

/**
 * Gère l'événement checkout.session.completed.
 * Met à jour plan = plan choisi, status = "actif", et stocke le customer_id dans Auth0.
 */
export async function handleCheckoutSessionCompleted(
	session: Stripe.Checkout.Session
): Promise<void> {
	console.log("checkout.session.completed event received");

	if (session.customer && session.metadata?.userId) {
		const customerId = session.customer.toString();
		const accessToken = await getManagementToken();

		const userId = session.metadata.userId;
		// Le plan choisi dans la metadata Stripe : "innovateur_monthly", etc.
		const userPlan = session.metadata.plan || "innovateur_monthly";

		// Mise à jour des métadonnées Auth0
		await updateUserMetadata(accessToken, userId, {
			plan: userPlan,
			status: "actif", // nouvel abonnement actif
			customer_id: customerId,
			// subscription_id: pas disponible directement ici, on l’a dans customer.subscription.created ou updated
		});

		console.log(
			`handleCheckoutSessionCompleted => user=${userId}, plan=${userPlan}, status=actif`
		);
	} else {
		console.warn(
			"checkout.session.completed event without metadata.userId or no customer"
		);
	}
}
