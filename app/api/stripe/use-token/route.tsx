// app/api/tokens/use-token/route.ts
import { NextRequest, NextResponse } from "next/server";
import getManagementToken from "@/lib/auth0/getManagementToken";
import { TokenService } from "@/lib/stripe/services/token-service";
import getUserMetadata from "@/lib/auth0/getUserMetadata";

export async function POST(request: NextRequest) {
	try {
		const { userId } = await request.json();

		if (!userId) {
			return NextResponse.json(
				{ error: "User ID is required" },
				{ status: 400 }
			);
		}

		const accessToken = await getManagementToken();
		const metadata = await getUserMetadata(accessToken, userId);

		const success = await TokenService.consumeToken(
			accessToken,
			userId,
			metadata
		);

		if (!success) {
			return NextResponse.json(
				{ error: "Failed to use token" },
				{ status: 400 }
			);
		}

		// Retourner les nouveaux metadata après l'utilisation du token
		const updatedMetadata = await getUserMetadata(accessToken, userId);

		return NextResponse.json({
			success: true,
			tokens: updatedMetadata.tokens,
		});
	} catch (error: any) {
		console.error("Error using token:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
