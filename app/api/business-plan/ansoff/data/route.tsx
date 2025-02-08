// app/api/business-plan/ansoff/data/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { prisma } from "@/lib/db/prisma";
import { getEmptyAnsoffData } from "@/lib/business-plan/hooks/ansoff/storage-ansoff";

export async function GET() {
	try {
		const user = await getUserFromSession();
		if (!user) {
			return NextResponse.json(
				{ error: "User not authenticated" },
				{ status: 401 }
			);
		}

		const userData = await prisma.user.findUnique({
			where: { auth0Id: user.sub },
			include: { ansoffAnalysis: true },
		});

		// Return empty valid structure if no data
		const emptyData = {
			data: getEmptyAnsoffData(),
			qaResponses: {},
		};

		if (!userData?.ansoffAnalysis) {
			return NextResponse.json(emptyData);
		}

		// Data validation
		const rawData = userData.ansoffAnalysis.data;
		const rawQAResponses = userData.ansoffAnalysis.qaResponses;

		// Verify data structure
		const isValidData = validateAnsoffData(rawData);
		if (!isValidData) {
			console.error("Invalid Ansoff data in DB:", rawData);
			return NextResponse.json(emptyData);
		}

		return NextResponse.json({
			data: rawData,
			qaResponses: rawQAResponses,
		});
	} catch (error) {
		console.error("Error during data retrieval:", error);
		return NextResponse.json(
			{ error: "Server error during data retrieval" },
			{ status: 500 }
		);
	}
}

function validateAnsoffData(data: any): boolean {
	const requiredCategories = [
		"penetration",
		"development_market",
		"development_product",
		"diversification",
	];

	// Check that all categories exist and are arrays
	return requiredCategories.every((category) =>
		Array.isArray(data[category])
	);
}
