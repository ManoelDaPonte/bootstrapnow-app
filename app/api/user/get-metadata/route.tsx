//api/user/get-metadata/route.ts
import { NextRequest, NextResponse } from "next/server";
import getManagementToken from "@/lib/auth0/getManagementToken";
import getUserMetadata from "@/lib/auth0/getUserMetadata";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const userId = searchParams.get("userId");

	if (!userId) {
		return NextResponse.json(
			{ error: "User ID non fourni" },
			{ status: 400 }
		);
	}

	try {
		const accessToken = await getManagementToken();
		const metadata = await getUserMetadata(accessToken, userId);
		return NextResponse.json({ success: true, metadata });
	} catch (error: any) {
		console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
