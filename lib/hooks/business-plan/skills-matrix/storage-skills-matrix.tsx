// lib/business-plan/skill-matrix/storage.ts
import { prisma } from "@/lib/prisma";
import { Person, Domain } from "@/types/skill-matrix";

interface SkillMatrixData {
	people: Person[];
	domains: Domain[];
}

export async function updateSkillMatrixData(
	auth0Id: string,
	data: SkillMatrixData
) {
	try {
		const user = await prisma.user.upsert({
			where: { auth0Id },
			update: {},
			create: {
				auth0Id,
				email: "",
			},
		});

		const skillMatrix = await prisma.skillMatrix.upsert({
			where: { userId: user.id },
			update: {
				data: JSON.parse(JSON.stringify(data)),
				updatedAt: new Date(),
			},
			create: {
				userId: user.id,
				data: JSON.parse(JSON.stringify(data)),
			},
		});

		return skillMatrix;
	} catch (error) {
		console.error("Erreur lors de la mise à jour de la matrice:", error);
		throw error;
	}
}

export const getEmptySkillMatrixData = (): SkillMatrixData => ({
	people: [],
	domains: [],
});
