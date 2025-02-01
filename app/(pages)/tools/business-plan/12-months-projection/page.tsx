"use client";

import React, { useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save } from "lucide-react"; // Ajout de l'icône Save
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
import { months } from "@/lib/business-plan/config/12-months";
import { useProfitLossData } from "@/lib/business-plan/hooks/12-months/useProfitLossData";
import { calculateProgress } from "@/lib/business-plan/hooks/12-months/storage-12-months";

const TwelveMonthsProjection: React.FC = () => {
	const {
		profitLossData,
		isLoading,
		isSaving,
		hasUnsavedChanges,
		handleUpdateData,
		saveChanges,
	} = useProfitLossData();

	// Ajouter une ligne
	const addRow = useCallback(
		(section: keyof ProfitLossData) => {
			const newId = `new_${section}_${Date.now()}`;
			// Créer un objet avec tous les mois initialisés à 0
			const monthValues = {
				Jan: 0,
				Feb: 0,
				Mar: 0,
				Apr: 0,
				May: 0,
				Jun: 0,
				Jul: 0,
				Aug: 0,
				Sep: 0,
				Oct: 0,
				Nov: 0,
				Dec: 0,
			};

			const newData = {
				...profitLossData,
				[section]: [
					...profitLossData[section],
					{
						id: newId,
						category: "New Category",
						...monthValues,
					},
				],
			};
			console.log("Nouvelles données à sauvegarder:", newData);
			handleUpdateData(newData);
		},
		[profitLossData, handleUpdateData]
	);

	// Supprimer une ligne
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

	// Mettre à jour une cellule
	const updateRow = useCallback(
		(
			section: keyof ProfitLossData,
			id: string,
			field: string,
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
				title="Prévisionnel à 12 mois"
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
							Bénéfices et pertes
						</TabsTrigger>
						<TabsTrigger value="details">
							Prévisions détaillées
						</TabsTrigger>
					</TabsList>

					{/* Vue d'ensemble avec le graphique */}
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
													).toLocaleString();
												return value < 0
													? `-€${formattedValue}`
													: `€${formattedValue}`;
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

					{/* Vue détaillée avec le tableau */}
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
								<div className="space-y-6 p-6">
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
													<Table className="w-full">
														<TableHeader className="sticky top-0 bg-white z-10">
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
