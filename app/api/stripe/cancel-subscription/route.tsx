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
		console.log("🔵 Starting subscription cancellation process");

		const { subscriptionId, userId } = await request.json();
		console.log("📥 Received request data:", { subscriptionId, userId });

		if (!subscriptionId || !userId) {
			console.log("❌ Missing required parameters");
			return NextResponse.json(
				{ error: "Subscription ID and User ID are required" },
				{ status: 400 }
			);
		}

		console.log("🔍 Retrieving Stripe subscription");
		const subscription = await stripe.subscriptions.retrieve(
			subscriptionId
		);
		console.log("✅ Stripe subscription found");

		console.log("🔑 Getting Auth0 management token");
		const managementToken = await getManagementToken();

		if (!managementToken) {
			console.error("❌ Failed to get Auth0 management token");
			return NextResponse.json(
				{ error: "Authentication error" },
				{ status: 500 }
			);
		}

		console.log("✅ Management token retrieved");

		console.log("👤 Getting user metadata");
		const userMetadata = await getUserMetadata(managementToken, userId);
		console.log("✅ User metadata retrieved :", userMetadata);

		if (!userMetadata?.customer_id) {
			console.error("❌ No Stripe customer ID found in user metadata");
			return NextResponse.json(
				{ error: "User has no associated Stripe customer" },
				{ status: 400 }
			);
		}

		console.log("✅ User metadata retrieved:", {
			hasCustomerId: !!userMetadata.customer_id,
		});

		if (subscription.customer !== userMetadata.customer_id) {
			console.log("⛔ Authorization failed: Customer IDs don't match");
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 403 }
			);
		}

		console.log("🔄 Canceling subscription");
		const canceledSubscription = await stripe.subscriptions.cancel(
			subscriptionId
		);
		console.log("✅ Subscription canceled successfully");

		return NextResponse.json({
			message: "Subscription canceled successfully",
			subscription: canceledSubscription,
		});
	} catch (error: any) {
		console.error("❌ Error in subscription cancellation:", {
			message: error.message,
			code: error.code,
			type: error.type,
		});

		return NextResponse.json(
			{
				error: "Unable to cancel subscription",
				details: error.message,
			},
			{ status: 500 }
		);
	}
}
