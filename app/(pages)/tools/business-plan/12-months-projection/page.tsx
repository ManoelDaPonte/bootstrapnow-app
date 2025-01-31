"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";
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
import { Header } from "@/components/business-plan/shared/Header";

import { ProfitLossData, ProfitLossEntry } from "@/types/12-months";
import {
	INITIAL_PROFIT_LOSS_DATA,
	months,
} from "@/lib/business-plan/config/12-months";

const TwelveMonthsProjection: React.FC = () => {
	const [profitLossData, setProfitLossData] = useState<ProfitLossData>(
		INITIAL_PROFIT_LOSS_DATA
	);

	// Calcul du progrès pour le Header
	const calculateProgress = useCallback(() => {
		const totalFields =
			(profitLossData.revenue.length + profitLossData.expenses.length) *
			13; // 12 mois + catégorie
		const filledFields = [
			...profitLossData.revenue,
			...profitLossData.expenses,
		].reduce((acc, entry) => {
			const monthFields = months.reduce(
				(sum, month) => sum + (entry[month] ? 1 : 0),
				0
			);
			return acc + (entry.category ? 1 : 0) + monthFields;
		}, 0);
		return Math.round((filledFields / totalFields) * 100);
	}, [profitLossData]);

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
		<div className="flex flex-col h-screen">
			<Header
				title="Prévisionnel à 12 mois"
				progress={calculateProgress()}
			/>

			<div className="flex-1 max-w-7xl mx-auto w-full p-6 overflow-y-auto">
				<Tabs defaultValue="overview" className="space-y-6">
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
								<CardTitle>
									Prévisionnel des Finances mensuelles
								</CardTitle>
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
													? [
															formattedValue,
															"Net Profit",
													  ]
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

					{/* Tableau */}
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
													onClick={() =>
														addRow(section)
													}
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

							<CardContent className="p-0">
								{" "}
								{/* Suppression du padding */}
								<div className="space-y-6 p-6">
									{" "}
									{/* Déplacement du padding ici */}
									{(["revenue", "expenses"] as const).map(
										(section) => (
											<div
												key={section}
												className={`${
													section === "revenue"
														? "bg-green-100"
														: "bg-red-100"
												} rounded-lg`}
											>
												<div className="p-4">
													<h3 className="text-lg font-semibold mb-2 capitalize">
														{section}
													</h3>
												</div>

												<div className="overflow-auto max-h-[400px]">
													{" "}
													{/* Limitation de la hauteur et scroll */}
													<Table className="w-full">
														<TableHeader className="sticky top-0 bg-white z-10">
															{" "}
															{/* Header fixe */}
															<TableRow>
																<TableHead
																	rowSpan={2}
																	className="sticky left-0 bg-white z-20"
																>
																	Categorie
																</TableHead>
																<TableHead
																	colSpan={6}
																	className="text-center border-b"
																>
																	Premier
																	semestre
																</TableHead>
																<TableHead
																	colSpan={6}
																	className="text-center border-b"
																>
																	Deuxième
																	semestre
																</TableHead>
																<TableHead
																	rowSpan={2}
																	className="sticky right-0 bg-white z-20"
																>
																	Actions
																</TableHead>
															</TableRow>
															<TableRow>
																{months
																	.slice(0, 6)
																	.map(
																		(
																			month
																		) => (
																			<TableHead
																				key={
																					month
																				}
																				className="text-center bg-white"
																			>
																				{
																					month
																				}
																			</TableHead>
																		)
																	)}
																{months
																	.slice(6)
																	.map(
																		(
																			month
																		) => (
																			<TableHead
																				key={
																					month
																				}
																				className="text-center bg-white"
																			>
																				{
																					month
																				}
																			</TableHead>
																		)
																	)}
															</TableRow>
														</TableHeader>
														<TableBody>
															{profitLossData[
																section
															].map((entry) => (
																<TableRow
																	key={
																		entry.id
																	}
																>
																	<TableCell className="sticky left-0 bg-white">
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
																		(
																			month
																		) => (
																			<TableCell
																				key={
																					month
																				}
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
																	<TableCell className="sticky right-0 bg-white">
																		<button
																			onClick={() =>
																				removeRow(
																					section,
																					entry.id
																				)
																			}
																			className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
																		>
																			<Trash2 className="h-4 w-4" />
																		</button>
																	</TableCell>
																</TableRow>
															))}
														</TableBody>
													</Table>
												</div>
											</div>
										)
									)}
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};
export default TwelveMonthsProjection;
