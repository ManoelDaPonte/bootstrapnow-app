// api/stripe/webhook/route.tsx
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Import de nos handlers
import { handleCheckoutSessionCompleted } from "@/lib/stripe/webhooks/handleCheckoutSessionCompleted";
import { handleCustomerSubscriptionCreated } from "@/lib/stripe/webhooks/handleCustomerSubscriptionCreated";
import { handleCustomerSubscriptionUpdated } from "@/lib/stripe/webhooks/handleCustomerSubscriptionUpdated";
import { handleCustomerSubscriptionDeleted } from "@/lib/stripe/webhooks/handleCustomerSubscriptionDeleted";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-12-18.acacia",
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

	try {
		switch (event.type) {
			case "checkout.session.completed":
				// On récupère l'object (Checkout.Session)
				await handleCheckoutSessionCompleted(
					event.data.object as Stripe.Checkout.Session
				);
				break;

			case "customer.subscription.created":
				await handleCustomerSubscriptionCreated(
					event.data.object as Stripe.Subscription
				);
				break;

			case "customer.subscription.updated":
				await handleCustomerSubscriptionUpdated(
					event.data.object as Stripe.Subscription
				);
				break;

			case "customer.subscription.deleted":
				await handleCustomerSubscriptionDeleted(
					event.data.object as Stripe.Subscription
				);
				break;

			default:
				// Event non géré, mais on renvoie OK pour éviter de spammer Stripe d'erreurs
				break;
		}
	} catch (err: any) {
		console.error("Error processing webhook event:", err.message);
		return NextResponse.json({ error: err.message }, { status: 500 });
	}

	return NextResponse.json({ received: true });
}
