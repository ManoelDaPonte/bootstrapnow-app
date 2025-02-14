import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Tooltip,
	Legend,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
} from "recharts";
import { OverviewProps } from "@/types/startup-expenses";
import { PanelRightOpen, AlertTriangle } from "lucide-react";
import { TooltipProps } from "recharts";

// Tableau de couleurs harmonieuses pour les graphiques
const CHART_COLORS = [
	"hsl(var(--chart-1))",
	"hsl(var(--chart-2))",
	"hsl(var(--chart-3))",
	"hsl(var(--chart-4))",
	"hsl(var(--chart-5))",
];

interface NoDataCardProps {
	message: string;
	buttonText: string;
	onNavigate: () => void;
}

const NoDataCard = ({ message, buttonText, onNavigate }: NoDataCardProps) => (
	<div className="flex flex-col items-center justify-center h-[300px] bg-muted/30 rounded-lg border border-dashed border-muted">
		<p className="text-muted-foreground mb-4">{message}</p>
		<Button
			variant="outline"
			onClick={onNavigate}
			className="text-primary hover:text-primary/80 border-primary hover:bg-primary/10"
		>
			<PanelRightOpen className="mr-2 h-4 w-4" />
			{buttonText}
		</Button>
	</div>
);

interface ExtendedOverviewProps extends OverviewProps {
	onNavigate: (tab: string) => void;
}

export const Overview: React.FC<ExtendedOverviewProps> = ({
	data,
	onNavigate,
}) => {
	const capitalData = [...data.capital.investors, ...data.capital.loans];
	const hasCapitalData = capitalData.length > 0;
	const hasExpensesData = data.expenses.categories.length > 0;
	const hasRisksData = data.risks.length > 0;

	// Assignation dynamique des couleurs pour le capital
	const getCapitalColor = (index: number) =>
		CHART_COLORS[index % CHART_COLORS.length];

	// Formate les données des risques pour une meilleure visualisation
	const formattedRisks = data.risks.map((risk) => ({
		...risk,
		score: (risk.probability * risk.impact).toFixed(2),
	}));

	// Configuration personnalisée du tooltip

	const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
		active,
		payload,
		label,
	}) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-background border rounded-lg p-3 shadow-lg">
					<p className="font-medium text-foreground">{label}</p>
					<p className="text-primary">
						{`€${Number(payload[0].value).toLocaleString()}`}
					</p>
				</div>
			);
		}
		return null;
	};

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<div className="flex justify-between items-center">
						<CardTitle>Finances globales</CardTitle>
						<Button
							variant="outline"
							size="sm"
							onClick={() => onNavigate("details")}
							className="text-primary hover:text-primary/80 border-primary hover:bg-primary/10"
						>
							<PanelRightOpen className="mr-2 h-4 w-4" />
							Voir les détails
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid md:grid-cols-2 gap-6">
						{/* Répartition du capital */}
						<div>
							<h3 className="text-lg font-semibold mb-4 text-foreground">
								Répartition du capital
							</h3>
							{hasCapitalData ? (
								<ResponsiveContainer width="100%" height={300}>
									<PieChart>
										<Pie
											data={capitalData}
											dataKey="amount"
											nameKey="name"
											cx="50%"
											cy="50%"
											outerRadius={90}
											label={({ name, percent }) =>
												`${name} (${(
													percent * 100
												).toFixed(0)}%)`
											}
										>
											{capitalData.map((entry, index) => (
												<Cell
													key={entry.id}
													fill={getCapitalColor(
														index
													)}
													className="stroke-background hover:opacity-80 transition-opacity"
												/>
											))}
										</Pie>
										<Tooltip content={<CustomTooltip />} />
									</PieChart>
								</ResponsiveContainer>
							) : (
								<NoDataCard
									message="Aucune donnée de capital disponible"
									buttonText="Ajouter du capital"
									onNavigate={() => onNavigate("details")}
								/>
							)}
						</div>

						{/* Détail des dépenses */}
						<div>
							<h3 className="text-lg font-semibold mb-4 text-foreground">
								Détail des dépenses
							</h3>
							{hasExpensesData ? (
								<ResponsiveContainer width="100%" height={300}>
									<BarChart data={data.expenses.categories}>
										<CartesianGrid
											strokeDasharray="3 3"
											className="stroke-muted"
										/>
										<XAxis
											dataKey="name"
											className="text-muted-foreground text-sm"
										/>
										<YAxis
											className="text-muted-foreground text-sm"
											tickFormatter={(value) =>
												value === 0
													? "0"
													: `€${Math.abs(
															value
													  ).toLocaleString()}`
											}
										/>
										<Tooltip content={<CustomTooltip />} />
										<Bar
											dataKey="amount"
											fill="hsl(var(--primary))"
											radius={[4, 4, 0, 0]}
											className="hover:opacity-80 transition-opacity"
										/>
									</BarChart>
								</ResponsiveContainer>
							) : (
								<NoDataCard
									message="Aucune dépense enregistrée"
									buttonText="Ajouter des dépenses"
									onNavigate={() => onNavigate("details")}
								/>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<div className="flex justify-between items-center">
						<CardTitle>Risques globaux</CardTitle>
						<Button
							variant="outline"
							size="sm"
							onClick={() => onNavigate("risks")}
							className="text-primary hover:text-primary/80 border-primary hover:bg-primary/10"
						>
							<AlertTriangle className="mr-2 h-4 w-4" />
							Gérer les risques
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					{hasRisksData ? (
						<ResponsiveContainer width="100%" height={300}>
							<BarChart
								data={formattedRisks}
								margin={{ left: 20 }}
								maxBarSize={100}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									className="stroke-muted"
								/>
								<XAxis
									dataKey="category"
									className="text-muted-foreground text-sm"
								/>
								<YAxis
									domain={[0, 10]}
									className="text-muted-foreground text-sm"
								/>
								<Tooltip
									content={({ active, payload }) => {
										if (
											active &&
											payload &&
											payload.length
										) {
											const risk = payload[0].payload;
											return (
												<div className="bg-background border rounded-lg p-3 shadow-lg">
													<p className="font-medium text-foreground">
														{risk.category}
													</p>
													<p className="text-muted-foreground">
														Score: {risk.score}
													</p>
													<p className="text-muted-foreground">
														Impact: {risk.impact}
													</p>
													<p className="text-muted-foreground">
														Probabilité:{" "}
														{risk.probability}
													</p>
												</div>
											);
										}
										return null;
									}}
								/>
								<Bar
									dataKey="score"
									fill="hsl(var(--destructive))"
									radius={[4, 4, 0, 0]}
									className="hover:opacity-80 transition-opacity"
								/>
							</BarChart>
						</ResponsiveContainer>
					) : (
						<NoDataCard
							message="Aucun risque identifié"
							buttonText="Évaluer les risques"
							onNavigate={() => onNavigate("risks")}
						/>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default Overview;
