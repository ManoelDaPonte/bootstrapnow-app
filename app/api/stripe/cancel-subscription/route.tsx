import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import getManagementToken from "@/lib/auth0/getManagementToken";
import updateUserMetadata from "@/lib/auth0/updateUserMetadata";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-11-20.acacia",
});

export async function POST(request: NextRequest) {
	try {
		const { subscriptionId, userId } = await request.json();

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

		// Mettre à jour les métadonnées Auth0 pour refléter l'annulation
		const accessToken = await getManagementToken();
		await updateUserMetadata(accessToken, userId, {
			tier: "free",
		});

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
