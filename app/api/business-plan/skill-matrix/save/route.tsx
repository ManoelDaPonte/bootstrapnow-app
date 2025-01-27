// app/api/business-plan/skill-matrix/save/route.ts
import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth0/getUserFromSession";
import { updateSkillMatrixData } from "@/lib/hooks/business-plan/skills-matrix/storage-skills-matrix";
import { Person, Domain } from "@/types/skill-matrix";

interface SkillMatrixData {
	people: Person[];
	domains: Domain[];
}

export async function POST(request: Request) {
	try {
		const user = await getUserFromSession();
		if (!user?.sub) {
			return NextResponse.json(
				{ error: "Non autorisé" },
				{ status: 401 }
			);
		}

		const data = (await request.json()) as SkillMatrixData;
		const result = await updateSkillMatrixData(user.sub, data);

		return NextResponse.json({ success: true, data: result });
	} catch (error) {
		console.error("Erreur lors de la sauvegarde:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la sauvegarde" },
			{ status: 500 }
		);
	}
}
