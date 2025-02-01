// app/api/business-plan/profit-loss/data/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { prisma } from "@/lib/db/prisma";
import { getEmptyProfitLossData } from "@/lib/business-plan/hooks/3-years/storage-profit-loss";

export async function GET() {
	try {
		const user = await getUserFromSession();
		if (!user) {
			return NextResponse.json(
				{ error: "Utilisateur non authentifié" },
				{ status: 401 }
			);
		}

		const userData = await prisma.user.findUnique({
			where: { auth0Id: user.sub },
			include: { yearlyProjectionAnalysis: true },
		});

		// Si pas de données, retourner une structure vide mais valide
		const emptyData = {
			data: getEmptyProfitLossData(),
		};

		if (!userData?.yearlyProjectionAnalysis) {
			return NextResponse.json(emptyData);
		}

		// Validation des données
		const rawData = userData.yearlyProjectionAnalysis.data;

		// Vérification que les données sont bien structurées
		const isValidData = validateProfitLossData(rawData);
		if (!isValidData) {
			console.error("Données profit/loss invalides en base:", rawData);
			return NextResponse.json(emptyData);
		}

		return NextResponse.json({
			data: rawData,
		});
	} catch (error) {
		console.error("Erreur lors de la récupération:", error);
		return NextResponse.json(
			{ error: "Erreur serveur lors de la récupération" },
			{ status: 500 }
		);
	}
}

function validateProfitLossData(data: any): boolean {
	if (typeof data !== "object" || data === null) {
		console.log("Les données ne sont pas un objet valide");
		return false;
	}

	const requiredCategories = ["revenue", "expenses"];
	const requiredYears = ["Year 1", "Year 2", "Year 3"];

	// Vérifier la structure de base
	const hasValidCategories = requiredCategories.every((category) =>
		Array.isArray(data[category])
	);

	if (!hasValidCategories) {
		console.log("Les catégories requises ne sont pas des tableaux valides");
		return false;
	}

	// Vérifier chaque catégorie
	return requiredCategories.every((category) =>
		data[category].every((entry: any, index: number) => {
			// Vérifier l'ID
			if (typeof entry.id !== "string" && typeof entry.id !== "number") {
				console.log(`ID invalide dans ${category}[${index}]`);
				return false;
			}

			// Vérifier la catégorie
			if (typeof entry.category !== "string") {
				console.log(`Catégorie invalide dans ${category}[${index}]`);
				return false;
			}

			// Vérifier les années
			return requiredYears.every((year) => {
				const yearValue = entry[year];
				if (typeof yearValue !== "number") {
					console.log(
						`Valeur invalide pour ${year} dans ${category}[${index}]:`,
						yearValue
					);
					return false;
				}
				return true;
			});
		})
	);
}
