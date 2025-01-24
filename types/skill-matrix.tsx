// types/skill-matrix.ts
export type Skill = {
	id: string;
	name: string;
	level: number;
};

export type Person = {
	id: string;
	name: string;
	skills: Record<string, number>;
};

export type Domain = {
	id: string;
	name: string;
};
