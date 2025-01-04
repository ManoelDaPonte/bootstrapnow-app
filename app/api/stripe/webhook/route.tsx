import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import getManagementToken from "@/lib/auth0/getManagementToken";
import updateUserMetadata from "@/lib/auth0/updateUserMetadata";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-11-20.acacia",
});

export async function POST(request: NextRequest) {
	const payload = await request.text();
	const sig = request.headers.get("stripe-signature");

	if (!sig) {
		console.error("Webhook Error: Missing signature");
		return NextResponse.json({ error: "No signature" }, { status: 400 });
	}

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			payload,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
	} catch (err: any) {
		console.error("Webhook Error:", err.message);
		return NextResponse.json(
			{ error: `Webhook Error: ${err.message}` },
			{ status: 400 }
		);
	}

	console.log(`Webhook received: ${event.type}`);

	try {
		if (event.type === "checkout.session.completed") {
			const session = event.data.object as Stripe.Checkout.Session;

			// Vérifiez que les métadonnées contiennent userId
			if (session.customer && session.metadata?.userId) {
				const customerId = session.customer.toString();
				const userId = session.metadata.userId;

				console.log(`Updating Auth0 metadata for user ${userId}`);

				// Mettre à jour les métadonnées Auth0
				const accessToken = await getManagementToken();
				await updateUserMetadata(accessToken, userId, {
					tier: "paid",
					customer_id: customerId,
				});
			} else {
				console.warn(
					"checkout.session.completed event received without metadata.userId"
				);
			}
		}

		if (event.type === "customer.subscription.created") {
			const subscription = event.data.object as Stripe.Subscription;

			// Récupérer le customerId
			const customerId = subscription.customer.toString();

			// Trouver l'utilisateur associé dans Auth0 via customerId
			const userId = await findUserByCustomerId(customerId);
			if (!userId) {
				console.warn(
					`Aucun utilisateur trouvé pour le customerId: ${customerId}`
				);
				return NextResponse.json({ received: true });
			}

			// Mettre à jour les métadonnées Auth0 avec le subscription_id
			const accessToken = await getManagementToken();
			await updateUserMetadata(accessToken, userId, {
				subscription_id: subscription.id, // Ajouter le subscription_id
			});

			console.log(`Subscription ID ajouté pour user ${userId}`);
		}

		// Ajoutez d'autres événements si nécessaire
	} catch (err: any) {
		console.error("Error processing webhook event:", err.message);
		return NextResponse.json({ error: err.message }, { status: 500 });
	}

	return NextResponse.json({ received: true });
}
