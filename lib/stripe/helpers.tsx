// lib/stripe.ts
import Stripe from "stripe";
import getManagementToken from "@/lib/auth0/getManagementToken";
import updateUserMetadata from "@/lib/auth0/updateUserMetadata";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-11-20.acacia",
});

// Helpers
export async function createCustomer(user: any): Promise<string> {
	const customer = await stripe.customers.create({
		email: user.email,
		name: user.name || user.nickname || "User",
	});

	return customer.id;
}

export async function createCheckoutSession(
	priceId: string,
	customerId: string,
	userId: string // Ajout du userId pour lier la session à l'utilisateur
): Promise<string> {
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		mode: "subscription",
		line_items: [{ price: priceId, quantity: 1 }],
		customer: customerId,
		success_url: `${process.env.NEXT_PUBLIC_APP_HOST}/abonnement/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.NEXT_PUBLIC_APP_HOST}/abonnement/canceled`,
		metadata: {
			userId, // Ajout de l'ID utilisateur pour qu'il soit récupéré dans le webhook
		},
	});

	return session.url || "";
}

export async function ensureCustomerExists(user: any): Promise<string> {
	const customerId = user.metadata?.customer_id;

	// Si un customer_id existe déjà dans les métadonnées
	if (customerId) {
		try {
			// Vérifiez que le client existe dans Stripe
			await stripe.customers.retrieve(customerId);
			return customerId;
		} catch (error) {
			console.warn(
				"Le client dans Stripe n'existe plus :",
				(error as Error).message
			);
		}
	}

	// Si aucun customer_id ou le client n'existe pas, créez un nouveau client
	const newCustomerId = await createCustomer(user);

	// Mettez à jour les métadonnées Auth0 avec le nouveau customer_id
	const accessToken = await getManagementToken();
	await updateUserMetadata(accessToken, user.sub, {
		customer_id: newCustomerId,
	});

	return newCustomerId;
}
