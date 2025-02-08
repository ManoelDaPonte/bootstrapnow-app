import { CustomShapeProps } from "@/types/competitors";

const CustomShape: React.FC<CustomShapeProps> = ({ cx, cy, payload }) => {
	if (!cx || !cy || !payload) return null;
	return (
		<circle
			cx={cx}
			cy={cy}
			r={payload.isMyCompany ? 8 : 5}
			fill={payload.isMyCompany ? "#22c55e" : "#6366f1"}
			stroke={payload.isMyCompany ? "#166534" : "#4338ca"}
			strokeWidth={2}
			className="transition-all duration-200 hover:opacity-80"
		/>
	);
};
export default CustomShape;
