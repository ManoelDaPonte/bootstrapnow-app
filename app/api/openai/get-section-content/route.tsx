// app/api/business-plan/get-section-content/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const auth0Id = searchParams.get("auth0Id");
		const section = searchParams.get("section");

		if (!auth0Id || !section) {
			return NextResponse.json(
				{ error: "Missing required parameters" },
				{ status: 400 }
			);
		}

		const user = await prisma.user.findUnique({
			where: { auth0Id },
			select: { id: true },
		});

		if (!user) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

		const metadata = await prisma.sectionMetadata.findUnique({
			where: {
				userId_sectionName: {
					userId: user.id,
					sectionName: section,
				},
			},
		});

		if (!metadata) {
			return NextResponse.json(
				{ error: "Section not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			content: metadata.generatedContent,
		});
	} catch (error) {
		console.error("Error getting section content:", error);
		return NextResponse.json(
			{ error: "Failed to get section content" },
			{ status: 500 }
		);
	}
}
