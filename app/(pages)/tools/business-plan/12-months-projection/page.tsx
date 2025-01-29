"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Plus, Trash2 } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

// Définitions des mois sous forme M1, M2, ..., M12
const months = Array.from({ length: 12 }, (_, i) => `M${i + 1}`);

interface ProfitLossEntry {
	id: string;
	category: string;
	[month: string]: number | string;
}

interface ProfitLossData {
	revenue: ProfitLossEntry[];
	expenses: ProfitLossEntry[];
}

const TwelveMonthsProjection: React.FC = () => {
	const [profitLossData, setProfitLossData] = useState<ProfitLossData>({
		revenue: [
			{
				id: "rev1",
				category: "Product Sales",
				...Object.fromEntries(months.map((m) => [m, 10000])),
			},
			{
				id: "rev2",
				category: "Service Revenue",
				...Object.fromEntries(months.map((m) => [m, 5000])),
			},
		],
		expenses: [
			{
				id: "exp1",
				category: "Operating Expenses",
				...Object.fromEntries(months.map((m) => [m, 8000])),
			},
			{
				id: "exp2",
				category: "Marketing",
				...Object.fromEntries(months.map((m) => [m, 2000])),
			},
		],
	});

	// Ajouter une ligne
	const addRow = useCallback((section: keyof ProfitLossData) => {
		const newId = `new_${section}_${Date.now()}`;
		setProfitLossData((prev) => ({
			...prev,
			[section]: [
				...prev[section],
				{
					id: newId,
					category: "New Category",
					...Object.fromEntries(months.map((m) => [m, 0])),
				},
			],
		}));
	}, []);

	// Supprimer une ligne
	const removeRow = useCallback(
		(section: keyof ProfitLossData, id: string) => {
			setProfitLossData((prev) => ({
				...prev,
				[section]: prev[section].filter((entry) => entry.id !== id),
			}));
		},
		[]
	);

	// Mettre à jour une cellule
	const updateRow = useCallback(
		(
			section: keyof ProfitLossData,
			id: string,
			field: string,
			value: string | number
		) => {
			setProfitLossData((prev) => ({
				...prev,
				[section]: prev[section].map((entry) =>
					entry.id === id ? { ...entry, [field]: value } : entry
				),
			}));
		},
		[]
	);

	// Calcul du total revenu par mois
	const totalRevenue = useMemo(
		() =>
			months.map((month) =>
				profitLossData.revenue.reduce(
					(acc, rev) => acc + Number(rev[month] || 0),
					0
				)
			),
		[profitLossData]
	);

	// Calcul du total dépenses par mois
	const totalExpenses = useMemo(
		() =>
			months.map((month) =>
				profitLossData.expenses.reduce(
					(acc, exp) => acc + Number(exp[month] || 0),
					0
				)
			),
		[profitLossData]
	);

	// Calcul du profit net par mois
	const netProfitData = useMemo(
		() =>
			months.map((month, index) => ({
				name: month,
				Revenue: totalRevenue[index],
				Expenses: -totalExpenses[index], // Mettre en négatif pour affichage correct
				Profit: totalRevenue[index] - totalExpenses[index],
			})),
		[totalRevenue, totalExpenses]
	);

	return (
		<div className="container mx-auto p-4 space-y-6">
			<Tabs defaultValue="overview">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="overview">
						Bénéfices et pertes 
					</TabsTrigger>
					<TabsTrigger value="details">
						Prévisions détaillées
					</TabsTrigger>
				</TabsList>

				{/* Graphique */}
				<TabsContent value="overview">
					<Card>
						<CardHeader>
							<CardTitle>Prévisionnel des Finances mensuelles</CardTitle>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer width="100%" height={300}>
								<ComposedChart data={netProfitData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis
										tickFormatter={(value) => {
											const formattedValue =
												Math.abs(
													value
												).toLocaleString(); // Met l'abs de la valeur
											return value < 0
												? `-€${formattedValue}`
												: `€${formattedValue}`; // Ajoute le signe '-' pour les valeurs négatives
										}}
									/>
									<Tooltip
										formatter={(value, name) => {
											const formattedValue = `€${Math.abs(
												Number(value)
											).toLocaleString()}`;
											return name === "Profit"
												? [formattedValue, "Net Profit"]
												: [formattedValue, name];
										}}
									/>
									<Legend />

									<Bar
										dataKey="Revenue"
										fill="#3498db"
										stackId="a"
									/>
									<Bar
										dataKey="Expenses"
										fill="#e74c3c"
										stackId="b"
										fillOpacity={0.7}
									/>
									<Line
										type="monotone"
										dataKey="Profit"
										stroke="#2ecc71"
										strokeWidth={3}
									/>
								</ComposedChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Tableau détaillé */}
				<TabsContent value="details">
					<Card>
						<CardHeader>
							<CardTitle className="flex justify-between items-center">
								Bénéfices et pertes détaillés
								<div className="flex space-x-2">
									{(["revenue", "expenses"] as const).map(
										(section) => (
											<Button
												key={section}
												variant="outline"
												size="sm"
												onClick={() => addRow(section)}
											>
												<Plus className="mr-2 h-4 w-4" />
												Add{" "}
												{section === "revenue"
													? "Revenue"
													: "Expense"}{" "}
												Row
											</Button>
										)
									)}
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							{(["revenue", "expenses"] as const).map(
								(section) => (
									<div
										key={section}
										className={`${
											section === "revenue"
												? "bg-green-100"
												: "bg-red-100"
										} p-4 rounded-lg`} // Ajout de couleurs de fond différenciées
									>
										<h3 className="text-lg font-semibold mb-2 capitalize">
											{section}
										</h3>
										<div className="overflow-x-auto">
											<Table className="table-auto min-w-max">
												<TableHeader>
													<TableRow>
														<TableHead
															rowSpan={2}
															className="align-middle"
														>
															Categorie
														</TableHead>
														<TableHead
															colSpan={6}
															className="text-center border-b"
														>
															Premier semestre
														</TableHead>
														<TableHead
															colSpan={6}
															className="text-center border-b"
														>
															Deuxième semestre
														</TableHead>
														<TableHead
															rowSpan={2}
															className="align-middle"
														>
															Actions
														</TableHead>
													</TableRow>
													<TableRow>
														{months
															.slice(0, 6)
															.map((month) => (
																<TableHead
																	key={month}
																	className="text-center"
																>
																	{month}
																</TableHead>
															))}
														{months
															.slice(6)
															.map((month) => (
																<TableHead
																	key={month}
																	className="text-center"
																>
																	{month}
																</TableHead>
															))}
													</TableRow>
												</TableHeader>
												<TableBody>
													{profitLossData[
														section
													].map((entry) => (
														<TableRow
															key={entry.id}
														>
															<TableCell className="whitespace-nowrap max-w-[150px]">
																{" "}
																{/* Limite la largeur des cellules catégorie */}
																<Input
																	value={
																		entry.category
																	}
																	onChange={(
																		e
																	) =>
																		updateRow(
																			section,
																			entry.id,
																			"category",
																			e
																				.target
																				.value
																		)
																	}
																/>
															</TableCell>
															{months.map(
																(month) => (
																	<TableCell
																		key={
																			month
																		}
																		className="max-w-[120px]"
																	>
																		<Input
																			type="number"
																			value={
																				entry[
																					month
																				]
																			}
																			onChange={(
																				e
																			) =>
																				updateRow(
																					section,
																					entry.id,
																					month,
																					Number(
																						e
																							.target
																							.value
																					)
																				)
																			}
																		/>
																	</TableCell>
																)
															)}
															<TableCell>
																<Button
																	variant="destructive"
																	size="icon"
																	onClick={() =>
																		removeRow(
																			section,
																			entry.id
																		)
																	}
																>
																	<Trash2 className="h-4 w-4" />
																</Button>
															</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</div>
									</div>
								)
							)}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default TwelveMonthsProjection;
