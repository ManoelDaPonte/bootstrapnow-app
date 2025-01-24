// app/api/business-plan/funnel-chart/data/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { prisma } from "@/lib/prisma";

const INITIAL_SECTIONS = [
	{
		id: 1,
		title: "Visibilité",
		size: 100,
		cards: [],
		color: "from-yellow-50 to-yellow-100",
	},
	{
		id: 2,
		title: "Intérêt",
		size: 85,
		cards: [],
		color: "from-yellow-100 to-orange-100",
	},
	{
		id: 3,
		title: "Considération",
		size: 70,
		cards: [],
		color: "from-orange-100 to-orange-200",
	},
	{
		id: 4,
		title: "Intention",
		size: 55,
		cards: [],
		color: "from-orange-200 to-red-200",
	},
	{
		id: 5,
		title: "Achat",
		size: 40,
		cards: [],
		color: "from-red-200 to-red-300",
	},
];

export async function GET() {
	try {
		const user = await getUserFromSession();
		if (!user) {
			return NextResponse.json(
				{ error: "Utilisateur non trouvé" },
				{ status: 404 }
			);
		}

		// Récupérer les données de l'utilisateur
		const userData = await prisma.user.findUnique({
			where: { auth0Id: user.sub },
			include: { funnelChartAnalysis: true },
		});

		if (!userData?.funnelChartAnalysis) {
			return NextResponse.json(INITIAL_SECTIONS);
		}

		return NextResponse.json(userData.funnelChartAnalysis.data);
	} catch (error) {
		console.error("Erreur lors de la récupération:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la récupération" },
			{ status: 500 }
		);
	}
}
