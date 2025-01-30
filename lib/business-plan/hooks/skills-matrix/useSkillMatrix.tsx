// hooks/useSkillMatrix.ts
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Person, Domain } from "@/types/skill-matrix";

interface SkillMatrixData {
	people: Person[];
	domains: Domain[];
}

export const useSkillMatrix = () => {
	const { user, isLoading } = useUser();
	const [people, setPeople] = useState<Person[]>([]);
	const [domains, setDomains] = useState<Domain[]>([]);

	useEffect(() => {
		const loadInitialData = async () => {
			if (user) {
				try {
					const response = await fetch(
						"/api/business-plan/skill-matrix/data"
					);
					if (response.ok) {
						const serverData = await response.json();
						if (serverData) {
							setPeople(serverData.people);
							setDomains(serverData.domains);
							localStorage.setItem(
								"skill-matrix-data",
								JSON.stringify(serverData)
							);
						}
					}
				} catch (error) {
					console.error(
						"Erreur lors du chargement des données:",
						error
					);
				}
			}
		};

		if (!isLoading) {
			loadInitialData();
		}
	}, [user, isLoading]);

	const saveToDatabase = async (data: SkillMatrixData) => {
		try {
			const response = await fetch(
				"/api/business-plan/skill-matrix/save",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			if (!response.ok) {
				throw new Error(
					"Erreur lors de la sauvegarde dans la base de données"
				);
			}
		} catch (error) {
			console.error("Erreur lors de la sauvegarde dans la BD:", error);
		}
	};

	const addPerson = async (name: string) => {
		const newPerson: Person = {
			id: Date.now().toString(),
			name,
			skills: {},
		};
		const newPeople = [...people, newPerson];
		setPeople(newPeople);

		if (user) {
			await saveToDatabase({ people: newPeople, domains });
		}
	};

	const addDomain = async (name: string) => {
		const newDomain: Domain = {
			id: Date.now().toString(),
			name,
		};
		const newDomains = [...domains, newDomain];
		setDomains(newDomains);

		if (user) {
			await saveToDatabase({ people, domains: newDomains });
		}
	};

	const updateSkill = async (
		personId: string,
		domainId: string,
		level: number
	) => {
		const newPeople = people.map((person) =>
			person.id === personId
				? {
						...person,
						skills: {
							...person.skills,
							[domainId]: level,
						},
				  }
				: person
		);
		setPeople(newPeople);

		if (user) {
			await saveToDatabase({ people: newPeople, domains });
		}
	};

	const removePerson = async (personId: string) => {
		const newPeople = people.filter((person) => person.id !== personId);
		setPeople(newPeople);

		if (user) {
			await saveToDatabase({ people: newPeople, domains });
		}
	};

	const removeDomain = async (domainId: string) => {
		const newDomains = domains.filter((domain) => domain.id !== domainId);
		const newPeople = people.map((person) => {
			const { [domainId]: ignore, ...remainingSkills } = person.skills; // eslint-disable-line @typescript-eslint/no-unused-vars
			return { ...person, skills: remainingSkills };
		});

		setDomains(newDomains);
		setPeople(newPeople);

		if (user) {
			await saveToDatabase({
				people: newPeople,
				domains: newDomains,
			});
		}
	};

	return {
		people,
		domains,
		isLoading,
		user,
		addPerson,
		addDomain,
		updateSkill,
		removePerson,
		removeDomain,
	};
};
