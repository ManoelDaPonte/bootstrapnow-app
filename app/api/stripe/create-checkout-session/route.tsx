// api/stripe/create-checkout-session/route.tsx
import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import getUserMetadata from "@/lib/auth0/getUserMetadata";
import getManagementToken from "@/lib/auth0/getManagementToken";

import {
	ensureCustomerExists,
	createCheckoutSession,
	createTokenCheckoutSession,
} from "@/lib/stripe/helpers";

const priceMap: Record<string, string | undefined> = {
	builder_monthly: process.env.STRIPE_PRICE_ID_BUILDER_MONTHLY,
	builder_yearly: process.env.STRIPE_PRICE_ID_BUILDER_YEARLY,
	token_1: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_TOKEN_1,
	token_5: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_TOKEN_5,
	token_15: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_TOKEN_15,
};

export async function POST(request: NextRequest) {
	// Vérifier si l'utilisateur est connecté
	const user = await getUserFromSession();
	if (!user) {
		return NextResponse.json(
			{ error: "Not authenticated" },
			{ status: 401 }
		);
	}

	try {
		// Récupérer le body (JSON)
		const body = await request.json();
		const { plan, isTokenPurchase, priceId: directPriceId } = body;

		// Récupérer les métadonnées de l'utilisateur
		const accessToken = await getManagementToken();
		const metadata = await getUserMetadata(accessToken, user.sub);

		// Créer ou récupérer le client Stripe
		const customerId = await ensureCustomerExists({ ...user, metadata });

		let sessionUrl;

		if (isTokenPurchase) {
			// Vérifier que le priceId direct est valide pour les tokens
			if (!Object.values(priceMap).includes(directPriceId)) {
				return NextResponse.json(
					{ error: "Invalid token price" },
					{ status: 400 }
				);
			}
			sessionUrl = await createTokenCheckoutSession(
				directPriceId,
				customerId,
				user.sub
			);
		} else {
			// Logique existante pour les abonnements
			if (!plan) {
				return NextResponse.json(
					{ error: "Missing plan" },
					{ status: 400 }
				);
			}

			const priceId = priceMap[plan];
			if (!priceId) {
				return NextResponse.json(
					{ error: "Invalid plan" },
					{ status: 400 }
				);
			}

			// Vérifier le tier actuel pour les abonnements
			if (metadata?.tier === "paid") {
				return NextResponse.json(
					{ error: "Vous avez déjà un abonnement actif." },
					{ status: 400 }
				);
			}

			sessionUrl = await createCheckoutSession(
				priceId,
				customerId,
				user.sub,
				plan
			);
		}

		return NextResponse.json({ url: sessionUrl });
	} catch (error: any) {
		console.error("Stripe Error:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
