//api/stripe/cancel-subscription/route.tsx

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import getUserMetadata from "@/lib/auth0/getUserMetadata";
import getManagementToken from "@/lib/auth0/getManagementToken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-12-18.acacia",
});

export async function POST(request: NextRequest) {
	try {
		const { subscriptionId, userId } = await request.json();

		const subscription = await stripe.subscriptions.retrieve(
			subscriptionId
		);

		const managementToken = await getManagementToken();
		const userMetadata = await getUserMetadata(userId, managementToken);

		if (subscription.customer !== userMetadata.customer_id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 403 }
			);
		}

		if (!subscriptionId || !userId) {
			return NextResponse.json(
				{ error: "Subscription ID and User ID are required" },
				{ status: 400 }
			);
		}

		// Annuler l'abonnement dans Stripe
		const canceledSubscription = await stripe.subscriptions.cancel(
			subscriptionId
		);

		return NextResponse.json({
			message: "Subscription canceled successfully",
			subscription: canceledSubscription,
		});
	} catch (error: any) {
		console.error("Error canceling subscription:", error.message);
		return NextResponse.json(
			{ error: "Unable to cancel subscription" },
			{ status: 500 }
		);
	}
}
