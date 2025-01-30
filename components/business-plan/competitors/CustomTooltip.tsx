// components/business-plan/competitors/CustomTooltip.tsx
import { CustomTooltipProps } from "@/types/competitors";

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
	if (!active || !payload || !payload[0]) return null;

	const data = payload[0].payload;
	return (
		<div className="bg-white p-4 border rounded-lg shadow-lg">
			<p className="font-bold">{data.nom}</p>
			<p className="text-sm">Solution: {data.solution}</p>
			<p className="text-sm">Prix: {data.prix}</p>
			<p className="text-sm">Valeur perçue: {data.valeurPercue}</p>
			<p className="text-sm">Zone: {data.zoneGeographique}</p>
		</div>
	);
};

export default CustomTooltip;
