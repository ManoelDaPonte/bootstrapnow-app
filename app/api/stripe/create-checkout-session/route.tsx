import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import getUserMetadata from "@/lib/auth0/getUserMetadata";
import {
	ensureCustomerExists,
	createCheckoutSession,
} from "@/lib/stripe/helpers";
import getManagementToken from "@/lib/auth0/getManagementToken";

export async function POST(request: NextRequest) {
	const user = await getUserFromSession();
	if (!user) {
		return NextResponse.json(
			{ error: "Not authenticated" },
			{ status: 401 }
		);
	}

	const { priceId } = await request.json();
	if (!priceId) {
		return NextResponse.json(
			{ error: "priceId is required" },
			{ status: 400 }
		);
	}

	try {
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
			user.sub
		);

		return NextResponse.json({ url: sessionUrl });
	} catch (error: any) {
		console.error("Stripe Error:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
