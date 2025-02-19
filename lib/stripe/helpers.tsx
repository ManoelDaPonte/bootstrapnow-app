// lib/stripe/helpers.tsx
import Stripe from "stripe";
import getManagementToken from "@/lib/auth0/getManagementToken";
import updateUserMetadata from "@/lib/auth0/updateUserMetadata";
import { siteConfig } from "@/lib/config";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-12-18.acacia",
});

// Fonction existante createCustomer
export async function createCustomer(user: any): Promise<string> {
	const customer = await stripe.customers.create({
		email: user.email,
		name: user.name || user.nickname || "User",
	});

	return customer.id;
}

export async function createTokenCheckoutSession(
	priceId: string,
	customerId: string,
	userId: string
): Promise<string> {
	// Trouver le pack de tokens correspondant
	const tokenPack = siteConfig.pricing.tokens.packs.find(
		(pack) => pack.priceId === priceId
	);

	if (!tokenPack) {
		throw new Error(`Invalid token price ID: ${priceId}`);
	}

	const session = await stripe.checkout.sessions.create({
		customer: customerId,
		mode: "payment",
		payment_method_types: ["card"],
		line_items: [
			{
				price: priceId,
				quantity: 1,
			},
		],
		success_url: `${process.env.NEXT_PUBLIC_APP_HOST}/abonnement/success`,
		cancel_url: `${process.env.NEXT_PUBLIC_APP_HOST}/abonnement/canceled`,
		metadata: {
			userId: userId,
			product_type: "token",
			token_amount: tokenPack.tokens.toString(),
			price_id: priceId,
		},
	});

	return session.url || "";
}

export async function createCheckoutSession(
	priceId: string,
	customerId: string,
	userId: string,
	plan: string
): Promise<string> {
	// Trouver la configuration du plan
	const planConfig = siteConfig.pricing.subscriptions.find(
		(sub) =>
			sub.priceIds.monthly === priceId || sub.priceIds.yearly === priceId
	);

	const session = await stripe.checkout.sessions.create({
		customer: customerId,
		mode: "subscription",
		payment_method_types: ["card"],
		line_items: [
			{
				price: priceId,
				quantity: 1,
			},
		],
		success_url: `${process.env.NEXT_PUBLIC_APP_HOST}/abonnement/success`,
		cancel_url: `${process.env.NEXT_PUBLIC_APP_HOST}/abonnement/canceled`,
		metadata: {
			userId: userId,
			plan: plan,
			product_type: "subscription",
			monthly_tokens: planConfig?.monthlyTokens?.toString() || "0",
			price_id: priceId,
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
