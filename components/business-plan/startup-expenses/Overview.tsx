// components/business-plan/startup-expenses/Overview.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export const Overview: React.FC<OverviewProps> = ({ data }) => {
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Finances globales</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<h3 className="text-lg font-semibold mb-4">
								Répartition du capital
							</h3>
							<ResponsiveContainer width="100%" height={300}>
								<PieChart>
									<Pie
										data={[
											...data.capital.investors,
											...data.capital.loans,
										]}
										dataKey="amount"
										nameKey="name"
										cx="50%"
										cy="50%"
										outerRadius={90}
									>
										{[
											...data.capital.investors,
											...data.capital.loans,
										].map((entry) => (
											<Cell
												key={entry.id}
												fill={
													data.categoryDefinitions.investors.find(
														(cat) =>
															cat.id ===
															entry.category
													)?.color ||
													data.categoryDefinitions.loans.find(
														(cat) =>
															cat.id ===
															entry.category
													)?.color
												}
											/>
										))}
									</Pie>
									<Tooltip />
									<Legend />
								</PieChart>
							</ResponsiveContainer>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-4">
								Détail des dépenses
							</h3>
							<ResponsiveContainer width="100%" height={300}>
								<BarChart data={data.expenses.categories}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis
										tick={{ fontSize: 12 }}
										tickFormatter={(value) => {
											const formattedValue =
												Math.abs(
													value
												).toLocaleString();
											return value === 0
												? `${formattedValue}`
												: `€${formattedValue}`;
										}}
									/>
									<Tooltip />
									<Bar
										dataKey="amount"
										fill="hsl(var(--primary))"
										fillOpacity={0.7}
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="mt-6">
				<CardHeader>
					<CardTitle>Risques globaux</CardTitle>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={data.risks}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="category" />
							<YAxis domain={[0, 10]} />
							<Tooltip
								formatter={(value) => {
									return [
										`Score: ${value}`,
										"Niveau de risque",
									];
								}}
							/>
							<Legend />
							<Bar
								dataKey={(risk) =>
									(risk.probability * risk.impact).toFixed(2)
								}
								fill="hsl(var(--destructive))"
								name="Score de Risque"
							/>
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</>
	);
};
