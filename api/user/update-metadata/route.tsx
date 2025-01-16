//api/user/update-metadata/route.ts
import { NextRequest, NextResponse } from "next/server";
import getManagementToken from "@/lib/auth0/getManagementToken";
import updateUserMetadata from "@/lib/auth0/updateUserMetadata";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { userId, ...metadata } = body;

		if (!userId) {
			return NextResponse.json(
				{ error: "User ID non fourni" },
				{ status: 400 }
			);
		}

		// 2. Obtenir un token management
		const accessToken = await getManagementToken();

		// 3. Mettre à jour les metadata de l'utilisateur sur Auth0
		const updatedUser = await updateUserMetadata(
			accessToken,
			userId,
			metadata
		);

		return NextResponse.json({ success: true, user: updatedUser });
	} catch (error: any) {
		console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
