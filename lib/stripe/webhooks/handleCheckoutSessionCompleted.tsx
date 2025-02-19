// lib/stripe/webhooks/handleCheckoutSessionCompleted.ts
import Stripe from "stripe";
import updateUserMetadata from "@/lib/auth0/updateUserMetadata";
import getManagementToken from "@/lib/auth0/getManagementToken";
import getUserMetadata from "@/lib/auth0/getUserMetadata";
import { TokenService } from "@/lib/stripe/services/token-service";

export async function handleCheckoutSessionCompleted(
	session: Stripe.Checkout.Session
): Promise<void> {
	if (!session.customer || !session.metadata?.userId) {
		console.warn("Missing customer or userId in metadata");
		return;
	}

	const customerId = session.customer.toString();
	const accessToken = await getManagementToken();
	const userId = session.metadata.userId;

	try {
		// Récupérer les métadonnées actuelles
		const currentMetadata = await getUserMetadata(accessToken, userId);
		const currentTokens = parseInt(currentMetadata.tokens || "0");

		if (session.metadata.product_type === "token") {
			// Cas d'un achat de tokens
			const tokenAmount = parseInt(session.metadata.token_amount || "0");

			await TokenService.updateUserTokens(
				accessToken,
				userId,
				currentMetadata,
				tokenAmount
			);

			console.log(`Tokens ajoutés =>`, {
				user: userId,
				tokens_added: tokenAmount,
				current_metadata: currentMetadata,
				new_total:
					parseInt(currentMetadata.tokens || "0") + tokenAmount,
			});
		} else {
			// Cas d'un abonnement
			const userPlan = session.metadata.plan || "free";
			const monthlyTokens = parseInt(
				session.metadata.monthly_tokens || "0"
			);

			await updateUserMetadata(accessToken, userId, {
				...currentMetadata,
				plan: userPlan,
				status: "actif",
				customer_id: customerId,
				tokens: (currentTokens + monthlyTokens).toString(),
			});

			console.log("Subscription completed:", {
				userId,
				plan: userPlan,
				tokensAdded: monthlyTokens,
				newTotal: currentTokens + monthlyTokens,
			});
		}
	} catch (error) {
		console.error("Error in handleCheckoutSessionCompleted:", error);
		throw error;
	}
}
