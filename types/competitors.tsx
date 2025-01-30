// types/competitors.ts
export interface CompetitorEntry {
	id: string;
	nom: string;
	solution: string;
	prix: number;
	valeurPercue: number;
	strategie: string;
	zoneGeographique: string;
	ciblageClient: string;
	forces: string;
	faiblesses: string;
	impactDirect: string;
	impactIndirect: string;
	isMyCompany?: boolean;
}

export interface CustomTooltipProps {
	active?: boolean;
	payload?: Array<{
		payload: CompetitorEntry;
	}>;
}

export interface CustomShapeProps {
	cx?: number;
	cy?: number;
	payload?: CompetitorEntry;
	r?: number;
	fill?: string;
	stroke?: string;
}
