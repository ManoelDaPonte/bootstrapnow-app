// api/stripe/webhook/route.tsx

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Import de nos handlers
import { handleCheckoutSessionCompleted } from "@/lib/stripe/webhooks/handleCheckoutSessionCompleted";
import { handleCustomerSubscriptionCreated } from "@/lib/stripe/webhooks/handleCustomerSubscriptionCreated";
import { handleCustomerSubscriptionUpdated } from "@/lib/stripe/webhooks/handleCustomerSubscriptionUpdated";
import { handleCustomerSubscriptionDeleted } from "@/lib/stripe/webhooks/handleCustomerSubscriptionDeleted";
import { handleTokenPurchaseCompleted } from "@/lib/stripe/webhooks/handleTokenPurchaseCompleted";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-12-18.acacia",
});

export async function POST(request: NextRequest) {
	console.log("⭐ Webhook called");
	try {
		const payload = await request.text();

		const sig = request.headers.get("stripe-signature");
		if (!sig) {
			console.error("❌ Missing signature");
			return NextResponse.json(
				{ error: "No signature" },
				{ status: 400 }
			);
		}
		console.log("✅ Signature verified");

		let event: Stripe.Event;
		try {
			event = stripe.webhooks.constructEvent(
				payload,
				sig,
				process.env.STRIPE_WEBHOOK_SECRET!
			);
			console.log("✅ Event constructed:", event.type);
		} catch (err: any) {
			console.error("❌ Event construction failed:", err.message);
			return NextResponse.json(
				{ error: `Webhook Error: ${err.message}` },
				{ status: 400 }
			);
		}

		try {
			console.log("🎯 Processing event:", event.type);
			switch (event.type) {
				case "checkout.session.completed":
					const session = event.data
						.object as Stripe.Checkout.Session;
					console.log(
						"Checkout session completed with metadata:",
						session.metadata
					);
					console.log(
						"Product type:",
						session.metadata?.product_type
					);

					if (session.metadata?.product_type === "token") {
						console.log("Handling token purchase...");
						await handleTokenPurchaseCompleted(session);
					} else {
						console.log("Handling subscription...");
						await handleCheckoutSessionCompleted(session);
					}
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
			console.log("✅ Event processed successfully");
		} catch (err: any) {
			console.error("❌ Event processing failed:", err);
			throw err; // Propager l'erreur pour le logging global
		}

		return NextResponse.json({ received: true });
	} catch (err: any) {
		console.error("❌ Global webhook error:", err);
		// Important : toujours retourner une réponse 200 même en cas d'erreur
		// pour éviter que Stripe ne réessaie indéfiniment
		return NextResponse.json(
			{
				error: "Processed with errors",
				message: err.message,
			},
			{ status: 200 }
		);
	}
}
