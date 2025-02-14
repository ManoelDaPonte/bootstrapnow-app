import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Target } from "lucide-react";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Label,
} from "recharts";

const NoDataPlaceholder = ({ onAddClick }: { onAddClick: () => void }) => (
	<div className="flex flex-col items-center justify-center h-[500px] bg-muted/10 border-2 border-dashed border-muted rounded-lg p-6">
		<Target className="h-12 w-12 text-muted-foreground mb-4" />
		<p className="text-muted-foreground text-center mb-4">
			Aucun concurrent n'a été ajouté. Commencez par ajouter des données
			pour visualiser la matrice de positionnement.
		</p>
		<Button
			variant="outline"
			onClick={onAddClick}
			className="bg-white hover:bg-muted/20"
		>
			<Plus className="mr-2 h-4 w-4" />
			Ajouter un concurrent
		</Button>
	</div>
);

interface Competitor {
	nom: string;
	prix: number;
	valeurPercue: number;
	isMyCompany?: boolean;
}

interface ChartBounds {
	minPrice: number;
	maxPrice: number;
	minValue: number;
	maxValue: number;
}

interface CompetitorMatrixProps {
	competitors: Competitor[];
	chartBounds: ChartBounds;
	onAddClick: () => void;
}

const CompetitorMatrix: React.FC<CompetitorMatrixProps> = ({
	competitors,
	chartBounds,
	onAddClick,
}) => {
	const hasData = competitors.length > 0;

	return (
		<Card className="bg-card">
			<CardHeader>
				<CardTitle className="text-xl font-semibold text-foreground">
					Matrice de Positionnement Concurrentiel
				</CardTitle>
			</CardHeader>
			<CardContent>
				{hasData ? (
					<div className="h-[500px] w-full">
						<ResponsiveContainer>
							<ScatterChart
								margin={{
									top: 20,
									right: 20,
									bottom: 40,
									left: 40,
								}}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									className="stroke-muted"
								/>
								<XAxis
									type="number"
									dataKey="prix"
									name="Prix"
									domain={[
										chartBounds.minPrice,
										chartBounds.maxPrice,
									]}
									tickCount={8}
									stroke="hsl(var(--foreground))"
								>
									<Label
										value="Prix"
										offset={-20}
										position="insideBottom"
										style={{
											fill: "hsl(var(--foreground))",
										}}
									/>
								</XAxis>
								<YAxis
									type="number"
									dataKey="valeurPercue"
									name="Valeur perçue"
									domain={[
										chartBounds.minValue,
										chartBounds.maxValue,
									]}
									tickCount={8}
									stroke="hsl(var(--foreground))"
								>
									<Label
										value="Valeur perçue"
										angle={-90}
										offset={-20}
										position="insideLeft"
										style={{
											fill: "hsl(var(--foreground))",
										}}
									/>
								</YAxis>
								<Tooltip
									content={({ active, payload }) => {
										if (
											active &&
											payload &&
											payload.length
										) {
											const data = payload[0].payload;
											return (
												<div className="bg-background border rounded-lg p-3 shadow-lg">
													<p className="font-medium text-foreground">
														{data.nom}
													</p>
													<p className="text-muted-foreground">
														Prix: €{data.prix}
													</p>
													<p className="text-muted-foreground">
														Valeur perçue:{" "}
														{data.valeurPercue}
													</p>
												</div>
											);
										}
										return null;
									}}
								/>
								<Scatter
									name="Entreprises"
									data={competitors}
									fill="hsl(var(--primary))"
									shape={(props: any) => {
										const { cx, cy, payload } = props;
										const size = payload.isMyCompany
											? 12
											: 8;
										const color = payload.isMyCompany
											? "hsl(var(--primary))"
											: "hsl(var(--primary) / 0.7)";

										return (
											<circle
												cx={cx}
												cy={cy}
												r={size}
												fill={color}
												stroke="hsl(var(--background))"
												strokeWidth={2}
												className="transition-all duration-200 hover:opacity-80"
											/>
										);
									}}
								/>
							</ScatterChart>
						</ResponsiveContainer>
					</div>
				) : (
					<NoDataPlaceholder onAddClick={onAddClick} />
				)}
			</CardContent>
		</Card>
	);
};

export default CompetitorMatrix;
