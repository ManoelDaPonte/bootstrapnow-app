import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Person, Domain } from "@/types/skill-matrix";
import { QAResponses } from "@/types/shared/qa-section";
import {
	loadSkillMatrixData,
	saveSkillMatrixData,
	saveToDatabase,
} from "@/lib/business-plan/hooks/skills-matrix/storage-skills-matrix";

interface SkillMatrixData {
	people: Person[];
	domains: Domain[];
}

export const useSkillMatrix = () => {
	const { user, isLoading: authLoading } = useUser();
	const initialData = loadSkillMatrixData();
	const [people, setPeople] = useState<Person[]>(initialData.data.people);
	const [domains, setDomains] = useState<Domain[]>(initialData.data.domains);
	const [qaResponses, setQAResponses] = useState<QAResponses>(
		initialData.qaResponses
	);
	const [isLoading, setIsLoading] = useState(true);

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
							setPeople(serverData.data.people);
							setDomains(serverData.data.domains);
							setQAResponses(serverData.qaResponses);
							saveSkillMatrixData(
								serverData.data,
								serverData.qaResponses
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
			setIsLoading(false);
		};

		if (!authLoading) {
			loadInitialData();
		}
	}, [user, authLoading]);

	const handleSaveData = async (newData: SkillMatrixData) => {
		try {
			saveSkillMatrixData(newData, qaResponses);
			if (user) {
				await saveToDatabase(newData, qaResponses);
			}
		} catch (error) {
			console.error("Erreur lors de la sauvegarde:", error);
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
		await handleSaveData({ people: newPeople, domains });
	};

	const addDomain = async (name: string) => {
		const newDomain: Domain = {
			id: Date.now().toString(),
			name,
		};
		const newDomains = [...domains, newDomain];
		setDomains(newDomains);
		await handleSaveData({ people, domains: newDomains });
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
		await handleSaveData({ people: newPeople, domains });
	};

	const removePerson = async (personId: string) => {
		const newPeople = people.filter((person) => person.id !== personId);
		setPeople(newPeople);
		await handleSaveData({ people: newPeople, domains });
	};

	const removeDomain = async (domainId: string) => {
		const newDomains = domains.filter((domain) => domain.id !== domainId);
		const newPeople = people.map((person) => {
			const { [domainId]: ignore, ...remainingSkills } = person.skills;
			return { ...person, skills: remainingSkills };
		});

		setDomains(newDomains);
		setPeople(newPeople);
		await handleSaveData({ people: newPeople, domains: newDomains });
	};

	const handleQAResponseChange = (categoryId: string, response: string) => {
		setQAResponses((prev) => ({
			...prev,
			[categoryId]: response,
		}));
	};

	const handleQAResponseSave = async (
		categoryId: string,
		response: string
	) => {
		const newQAResponses = {
			...qaResponses,
			[categoryId]: response,
		};

		setQAResponses(newQAResponses);
		await handleSaveData({ people, domains });
	};

	return {
		people,
		domains,
		qaResponses,
		isLoading: isLoading || authLoading,
		user,
		addPerson,
		addDomain,
		updateSkill,
		removePerson,
		removeDomain,
		handleQAResponseChange,
		handleQAResponseSave,
	};
};
