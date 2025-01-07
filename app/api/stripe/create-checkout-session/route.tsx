// api/stripe/create-checkout-session/route.tsx
import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import getUserMetadata from "@/lib/auth0/getUserMetadata";
import getManagementToken from "@/lib/auth0/getManagementToken";

import {
	ensureCustomerExists,
	createCheckoutSession,
} from "@/lib/stripe/helpers";

const priceMap: Record<string, string | undefined> = {
	innovateur_monthly: process.env.STRIPE_PRICE_ID_INNOVATEUR_MONTHLY,
	innovateur_yearly: process.env.STRIPE_PRICE_ID_INNOVATEUR_YEARLY,
	visionnaire_monthly: process.env.STRIPE_PRICE_ID_VISIONNAIRE_MONTHLY,
	visionnaire_yearly: process.env.STRIPE_PRICE_ID_VISIONNAIRE_YEARLY,
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
		const { plan } = body;

		// Vérifier qu'on a un plan
		if (!plan) {
			return NextResponse.json(
				{ error: "Missing plan" },
				{ status: 400 }
			);
		}

		// Vérifier qu'on a un priceId
		const priceId = priceMap[plan];
		if (!priceId) {
			return NextResponse.json(
				{ error: "Invalid plan" },
				{ status: 400 }
			);
		}

		// Récupérer les métadonnées de l'utilisateur
		const accessToken = await getManagementToken();
		const metadata = await getUserMetadata(accessToken, user.sub);

		// Vérifier le tier actuel
		if (metadata?.tier === "paid") {
			return NextResponse.json(
				{ error: "Vous avez déjà un abonnement actif." },
				{ status: 400 }
			);
		}

		// Créer ou récupérer le client Stripe
		const customerId = await ensureCustomerExists({ ...user, metadata });

		// Créer la session Stripe avec userId dans les métadonnées
		const sessionUrl = await createCheckoutSession(
			priceId,
			customerId,
			user.sub,
			plan
		);

		return NextResponse.json({ url: sessionUrl });
	} catch (error: any) {
		console.error("Stripe Error:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
