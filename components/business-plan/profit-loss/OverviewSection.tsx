import React, { useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save, PieChart } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	ComposedChart,
	Bar,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const NoDataPlaceholder = ({ onAddClick }: { onAddClick: () => void }) => (
	<div className="flex flex-col items-center justify-center h-[300px] bg-muted/10 border-2 border-dashed border-muted rounded-lg p-6">
		<PieChart className="h-12 w-12 text-muted-foreground mb-4" />
		<p className="text-muted-foreground text-center mb-4">
			Aucune donnée financière disponible. Commencez par ajouter des
			revenus ou des dépenses.
		</p>
		<Button
			variant="outline"
			onClick={onAddClick}
			className="bg-white hover:bg-muted/20"
		>
			<Plus className="mr-2 h-4 w-4" />
			Ajouter des données
		</Button>
	</div>
);

interface FinancialData {
	name: string;
	Revenue: number;
	Expenses: number;
	Profit: number;
}

const FinancialChart = ({ data }: { data: FinancialData[] }) => {
	// Dégradé d'orange pour l'identité visuelle
	const colors = {
		revenue: "hsl(30, 100%, 60%)", // Orange principal
		expenses: "hsl(30, 80%, 40%)", // Orange plus foncé
		profit: "hsl(30, 100%, 45%)", // Orange intermédiaire
	};

	return (
		<ResponsiveContainer width="100%" height={300}>
			<ComposedChart data={data}>
				<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
				<XAxis dataKey="name" className="text-muted-foreground" />
				<YAxis
					tickFormatter={(value) => {
						const formattedValue = Math.abs(value).toLocaleString();
						return value < 0
							? `-€${formattedValue}`
							: `€${formattedValue}`;
					}}
					className="text-muted-foreground"
				/>
				<Tooltip
					formatter={(value, name) => {
						const formattedValue = `€${Math.abs(
							Number(value)
						).toLocaleString()}`;
						return name === "Profit"
							? [formattedValue, "Profit net"]
							: [formattedValue, name];
					}}
					contentStyle={{
						backgroundColor: "hsl(var(--background))",
						border: "1px solid hsl(var(--border))",
						borderRadius: "8px",
					}}
				/>
				<Legend />
				<Bar dataKey="Revenue" fill={colors.revenue} stackId="a" />
				<Bar
					dataKey="Expenses"
					fill={colors.expenses}
					stackId="b"
					fillOpacity={0.7}
				/>
				<Line
					type="monotone"
					dataKey="Profit"
					stroke={colors.profit}
					strokeWidth={3}
					dot={{
						stroke: colors.profit,
						fill: "white",
						strokeWidth: 2,
						r: 6,
					}}
				/>
			</ComposedChart>
		</ResponsiveContainer>
	);
};

interface OverviewSectionProps {
	netProfitData: FinancialData[];
	hasData: boolean;
	onAddClick: () => void;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
	netProfitData,
	hasData,
	onAddClick,
}) => (
	<Card>
		<CardHeader>
			<CardTitle>Projection de performance financière</CardTitle>
		</CardHeader>
		<CardContent>
			{hasData ? (
				<FinancialChart data={netProfitData} />
			) : (
				<NoDataPlaceholder onAddClick={onAddClick} />
			)}
		</CardContent>
	</Card>
);

// Export par défaut pour l'utilisation dans l'artifact
export default OverviewSection;
