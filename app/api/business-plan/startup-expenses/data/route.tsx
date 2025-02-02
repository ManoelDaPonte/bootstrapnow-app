// app/api/business-plan/startup-expenses/data/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { prisma } from "@/lib/db/prisma";
import { getEmptyStartupData } from "@/lib/business-plan/hooks/startup-expenses/storage-startup";

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
			include: { startupExpensesAnalysis: true },
		});

		// Si pas de données, retourner une structure vide mais valide
		const emptyData = {
			data: getEmptyStartupData(),
		};

		if (!userData?.startupExpensesAnalysis) {
			return NextResponse.json(emptyData);
		}

		// Validation des données
		const rawData = userData.startupExpensesAnalysis.data;

		// Vérification que les données sont bien structurées
		const isValidData = validateStartupData(rawData);
		if (!isValidData) {
			console.error(
				"Données startup expenses invalides en base:",
				rawData
			);
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

function validateStartupData(data: any): boolean {
	if (typeof data !== "object" || data === null) {
		console.log("Les données ne sont pas un objet valide");
		return false;
	}

	// Vérifier la structure de base
	if (!data.capital || !data.expenses || !Array.isArray(data.risks)) {
		console.log("Structure de base invalide");
		return false;
	}

	// Vérifier la structure du capital
	if (
		!Array.isArray(data.capital.investors) ||
		!Array.isArray(data.capital.loans)
	) {
		console.log("Structure de capital invalide");
		return false;
	}

	// Vérifier la structure des dépenses
	if (!Array.isArray(data.expenses.categories)) {
		console.log("Structure de dépenses invalide");
		return false;
	}

	// Vérifier les entrées financières
	const validateFinancialEntry = (entry: any) => {
		return (
			typeof entry.id === "string" &&
			typeof entry.name === "string" &&
			typeof entry.amount === "number" &&
			typeof entry.type === "string" &&
			(!entry.category || typeof entry.category === "string")
		);
	};

	// Vérifier tous les tableaux d'entrées financières
	if (
		!data.capital.investors.every(validateFinancialEntry) ||
		!data.capital.loans.every(validateFinancialEntry) ||
		!data.expenses.categories.every(validateFinancialEntry)
	) {
		console.log("Entrées financières invalides");
		return false;
	}

	// Vérifier les risques
	const validateRisk = (risk: any) => {
		return (
			typeof risk.category === "string" &&
			typeof risk.probability === "number" &&
			typeof risk.impact === "number" &&
			typeof risk.mitigation === "string"
		);
	};

	if (!data.risks.every(validateRisk)) {
		console.log("Risques invalides");
		return false;
	}

	return true;
}
