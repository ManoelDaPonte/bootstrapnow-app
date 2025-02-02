"use client";

import React, { useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save } from "lucide-react";
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
import { ProfitLossData, ProfitLossEntry } from "@/types/profit-loss";
import { useProfitLossData } from "@/lib/business-plan/hooks/3-years/useProfitLossData";
import { calculateProgress } from "@/lib/business-plan/hooks/3-years/storage-profit-loss";

const ProfitLossDashboard: React.FC = () => {
	const {
		profitLossData,
		isLoading,
		isSaving,
		hasUnsavedChanges,
		handleUpdateData,
		saveChanges,
	} = useProfitLossData();

	// Add new row to a section
	const addRow = useCallback(
		(section: keyof ProfitLossData) => {
			const newId = `new_${section}_${Date.now()}`;
			const newData = {
				...profitLossData,
				[section]: [
					...profitLossData[section],
					{
						id: newId,
						category: "New Category",
						"Year 1": 0,
						"Year 2": 0,
						"Year 3": 0,
					},
				],
			};
			handleUpdateData(newData);
		},
		[profitLossData, handleUpdateData]
	);

	// Remove row from a section
	const removeRow = useCallback(
		(section: keyof ProfitLossData, id: string) => {
			const newData = {
				...profitLossData,
				[section]: profitLossData[section].filter(
					(entry) => entry.id !== id
				),
			};
			handleUpdateData(newData);
		},
		[profitLossData, handleUpdateData]
	);

	// Update row in a section
	const updateRow = useCallback(
		(
			section: keyof ProfitLossData,
			id: string,
			field: keyof ProfitLossEntry,
			value: string | number
		) => {
			const newData = {
				...profitLossData,
				[section]: profitLossData[section].map((entry) =>
					entry.id === id ? { ...entry, [field]: value } : entry
				),
			};
			handleUpdateData(newData);
		},
		[profitLossData, handleUpdateData]
	);

	// Calculations
	const totalRevenue = useMemo(
		() =>
			[1, 2, 3].map((year) =>
				profitLossData.revenue.reduce(
					(acc, rev) =>
						acc +
						Number(
							rev[`Year ${year}` as keyof ProfitLossEntry] || 0
						),
					0
				)
			),
		[profitLossData]
	);
	const totalExpenses = useMemo(
		() =>
			[1, 2, 3].map((year) =>
				profitLossData.expenses.reduce(
					(acc, exp) =>
						acc +
						Number(
							exp[`Year ${year}` as keyof ProfitLossEntry] || 0
						),
					0
				)
			),
		[profitLossData]
	);

	// Net Profit Calculation
	const netProfitData = useMemo(
		() =>
			[0, 1, 2].map((index) => ({
				name: `Year ${index + 1}`,
				Revenue: totalRevenue[index],
				Expenses: -totalExpenses[index],
				Profit: totalRevenue[index] - totalExpenses[index],
			})),
		[totalRevenue, totalExpenses]
	);

	if (isLoading) {
		return <div>Chargement...</div>;
	}

	return (
		<div className="flex flex-col h-screen">
			<Header
				title="Prévisionnel à 3 ans"
				progress={calculateProgress(profitLossData)}
				rightContent={
					<Button
						onClick={saveChanges}
						disabled={!hasUnsavedChanges || isSaving}
						className="flex items-center gap-2"
					>
						<Save className="h-4 w-4" />
						{isSaving ? "Sauvegarde..." : "Sauvegarder"}
					</Button>
				}
			/>

			<div className="flex-1 max-w-7xl mx-auto w-full p-6 overflow-y-auto">
				<Tabs defaultValue="overview" className="space-y-6">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="overview">
							Profit & Loss Overview
						</TabsTrigger>
						<TabsTrigger value="details">
							Detailed Breakdown
						</TabsTrigger>
					</TabsList>

					<TabsContent value="overview">
						<Card>
							<CardHeader>
								<CardTitle>
									Financial Performance Projection
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
											dot={{
												stroke: "#2ecc71",
												fill: "white",
												strokeWidth: 2,
												r: 8,
											}}
										/>
									</ComposedChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="details">
						<Card>
							<CardHeader>
								<CardTitle className="flex justify-between items-center">
									Profit and Loss Details
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
							<CardContent className="space-y-6">
								{(["revenue", "expenses"] as const).map(
									(section) => (
										<div key={section}>
											<h3 className="text-lg font-semibold mb-2 capitalize">
												{section}
											</h3>
											<Table>
												<TableHeader>
													<TableRow>
														<TableHead>
															Categorie
														</TableHead>
														<TableHead>
															Année 1 (€)
														</TableHead>
														<TableHead>
															Année 2 (€)
														</TableHead>
														<TableHead>
															Année 3 (€)
														</TableHead>
														<TableHead>
															Actions
														</TableHead>
													</TableRow>
												</TableHeader>
												<TableBody>
													{profitLossData[
														section
													].map((entry) => (
														<TableRow
															key={entry.id}
														>
															<TableCell>
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
																	placeholder="Category"
																/>
															</TableCell>
															{(
																[
																	"Year 1",
																	"Year 2",
																	"Year 3",
																] as const
															).map((year) => (
																<TableCell
																	key={year}
																>
																	<Input
																		type="number"
																		value={
																			entry[
																				year
																			]
																		}
																		onChange={(
																			e
																		) =>
																			updateRow(
																				section,
																				entry.id,
																				year,
																				Number(
																					e
																						.target
																						.value
																				)
																			)
																		}
																		placeholder={`${year} Value`}
																	/>
																</TableCell>
															))}
															<TableCell>
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
									)
								)}

								<Card className="mt-4">
									<CardHeader>
										<CardTitle>Bilan financier</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="grid md:grid-cols-3 gap-4">
											{[1, 2, 3].map((year, index) => (
												<div
													key={year}
													className="border p-4 rounded-lg"
												>
													<h4 className="font-semibold mb-2">
														Bilan de l'année {year}
													</h4>
													<p>
														<strong>
															Revenus:
														</strong>{" "}
														€
														{totalRevenue[
															index
														].toLocaleString()}
													</p>
													<p>
														<strong>
															Total Expenses:
														</strong>{" "}
														€
														{totalExpenses[
															index
														].toLocaleString()}
													</p>
													<p>
														<strong>
															Net Profit:
														</strong>{" "}
														€
														{(
															totalRevenue[
																index
															] -
															totalExpenses[index]
														).toLocaleString()}
													</p>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default ProfitLossDashboard;
