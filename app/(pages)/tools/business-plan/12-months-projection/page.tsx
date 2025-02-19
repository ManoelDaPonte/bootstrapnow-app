"use client";

import React, { useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save, PanelRightOpen } from "lucide-react";
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
	TooltipProps,
} from "recharts";
import { Header } from "@/components/business-plan/shared/Header";
import QASection from "@/components/business-plan/shared/QASection";
import {
	ProfitLossData,
	TableComponentProps,
	NoDataCardProps,
} from "@/types/12-months";
import {
	months,
	INVENTAIRE_QA_DATA,
} from "@/lib/business-plan/config/12-months";
import { useProfitLossData } from "@/lib/business-plan/hooks/12-months/useProfitLossData";
import { calculateProgress } from "@/lib/business-plan/hooks/12-months/storage-12-months";

const NoDataCard: React.FC<NoDataCardProps> = ({
	message,
	buttonText,
	onClick,
}) => (
	<div className="flex flex-col items-center justify-center h-[300px] bg-muted/30 rounded-lg border border-dashed border-muted">
		<p className="text-muted-foreground mb-4">{message}</p>
		<Button
			variant="outline"
			onClick={onClick}
			className="border-muted hover:bg-muted"
		>
			<PanelRightOpen className="mr-2 h-4 w-4" />
			{buttonText}
		</Button>
	</div>
);

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
	active,
	payload,
	label,
}) => {
	if (!active || !payload) return null;

	return (
		<div className="bg-background border rounded-lg p-3 shadow-lg">
			<p className="font-medium text-foreground mb-2">{label}</p>
			{payload.map((entry, index) => (
				<p
					key={index}
					style={{ color: entry.color }}
					className="text-sm"
				>
					{entry.name}: €
					{Math.abs(Number(entry.value)).toLocaleString()}
				</p>
			))}
		</div>
	);
};

const TableComponent: React.FC<TableComponentProps> = ({
	section,
	data,
	onUpdate,
	onRemove,
}) => {
	return (
		<div className="max-h-[500px]">
			<div className="min-w-[800px]">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="sticky left-0 bg-background z-20 w-[10px]"></TableHead>
							<TableHead
								className="text-center bg-muted/50 font-medium border-l"
								colSpan={6}
							>
								Premier semestre
							</TableHead>
							<TableHead
								className="text-center bg-muted/50 font-medium border-l"
								colSpan={6}
							>
								Deuxième semestre
							</TableHead>
							<TableHead className="sticky right-0 bg-background z-20 w-[80px]"></TableHead>
						</TableRow>
						<TableRow>
							<TableHead className="sticky left-0 bg-background" />
							{months.map((month, idx) => (
								<TableHead
									key={month}
									className={`text-center w-[80px] ${
										idx === 6 ? "border-l" : ""
									}`}
								>
									{month}
								</TableHead>
							))}
							<TableHead className="sticky right-0 bg-background" />
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((entry) => (
							<TableRow key={entry.id}>
								<TableCell className="sticky left-0 bg-card font-medium min-w-[100px]">
									<Input
										value={entry.category}
										onChange={(e) =>
											onUpdate(
												section,
												entry.id,
												"category",
												e.target.value
											)
										}
										className="bg-background"
										placeholder="Nom de la catégorie"
									/>
								</TableCell>
								{months.map((month, idx) => (
									<TableCell
										key={month}
										className={`min-w-[80px] ${
											idx === 6 ? "border-l" : ""
										}`}
									>
										<Input
											type="number"
											value={entry[month]}
											onChange={(e) =>
												onUpdate(
													section,
													entry.id,
													month,
													Number(e.target.value)
												)
											}
											className="bg-background text-right"
											placeholder="0"
										/>
									</TableCell>
								))}
								<TableCell className="sticky right-0 bg-card w-[50px]">
									<div className="flex justify-center">
										<button
											onClick={() =>
												onRemove(section, entry.id)
											}
											className="p-2 hover:bg-destructive/10 rounded-md transition-colors"
										>
											<Trash2 className="h-4 w-4 text-destructive" />
										</button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default function TwelveMonthsProjection() {
	const [activeTab, setActiveTab] = React.useState<"overview" | "details">(
		"overview"
	);
	const {
		profitLossData,
		isLoading,
		isSaving,
		hasUnsavedChanges,
		handleUpdateData,
		saveChanges,
		qaResponses,
		handleQAResponseChange,
		handleQAResponseSave,
	} = useProfitLossData();

	const addRow = useCallback(
		(section: keyof ProfitLossData) => {
			const monthValues = months.reduce(
				(acc, month) => ({
					...acc,
					[month]: 0,
				}),
				{}
			);

			const newId = `new_${section}_${Date.now()}`;
			const newData = {
				...profitLossData,
				[section]: [
					...profitLossData[section],
					{
						id: newId,
						category: "Nouvelle catégorie",
						...monthValues,
					},
				],
			};
			handleUpdateData(newData);
		},
		[profitLossData, handleUpdateData]
	);

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

	const { netProfitData } = useMemo(() => {
		const totalRev = months.map((month) =>
			profitLossData.revenue.reduce(
				(acc, rev) => acc + Number(rev[month] || 0),
				0
			)
		);

		const totalExp = months.map((month) =>
			profitLossData.expenses.reduce(
				(acc, exp) => acc + Number(exp[month] || 0),
				0
			)
		);

		const profitData = months.map((month, index) => ({
			name: month,
			Revenue: totalRev[index],
			Expenses: -totalExp[index],
			Profit: totalRev[index] - totalExp[index],
		}));

		return {
			totalRevenue: totalRev,
			totalExpenses: totalExp,
			netProfitData: profitData,
		};
	}, [profitLossData]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-lg">Chargement...</div>
			</div>
		);
	}

	const hasData =
		profitLossData.revenue.length > 0 || profitLossData.expenses.length > 0;
	return (
		<div className="min-h-screen bg-background flex flex-col">
			<Header
				title="Projection sur 12 mois"
				progress={calculateProgress(profitLossData, qaResponses)}
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

			<div className="flex-1 p-6 space-y-12 max-w-[1600px] mx-auto w-full">
				<Tabs
					value={activeTab}
					onValueChange={(value) =>
						setActiveTab(value as "overview" | "details")
					}
					className="space-y-6"
				>
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="overview">
							Bénéfices et pertes
						</TabsTrigger>
						<TabsTrigger value="details">
							Prévisions détaillées
						</TabsTrigger>
					</TabsList>

					<TabsContent value="overview">
						<Card>
							<CardHeader>
								<div className="flex justify-between items-center">
									<CardTitle>
										Prévisionnel des Finances mensuelles
									</CardTitle>
									<Button
										variant="outline"
										size="sm"
										onClick={() => setActiveTab("details")}
										className="border-muted hover:bg-muted"
									>
										<PanelRightOpen className="mr-2 h-4 w-4" />
										Voir les détails
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								{hasData ? (
									<ResponsiveContainer
										width="100%"
										height={400}
									>
										<ComposedChart data={netProfitData}>
											<CartesianGrid
												strokeDasharray="3 3"
												className="stroke-muted/50"
											/>
											<XAxis
												dataKey="name"
												className="text-xs fill-muted-foreground"
											/>
											<YAxis
												className="text-xs fill-muted-foreground"
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
												content={<CustomTooltip />}
											/>
											<Legend />
											<Bar
												name="Revenus"
												dataKey="Revenue"
												fill="hsl(var(--chart-1))"
												radius={[4, 4, 0, 0]}
											/>
											<Bar
												name="Dépenses"
												dataKey="Expenses"
												fill="hsl(var(--chart-2))"
												radius={[4, 4, 0, 0]}
											/>
											<Line
												name="Profit Net"
												type="monotone"
												dataKey="Profit"
												stroke="hsl(var(--chart-3))"
												strokeWidth={2}
												dot={{
													r: 4,
													fill: "hsl(var(--chart-3))",
													strokeWidth: 0,
												}}
												activeDot={{ r: 6 }}
											/>
										</ComposedChart>
									</ResponsiveContainer>
								) : (
									<NoDataCard
										message="Aucune donnée financière disponible"
										buttonText="Ajouter des données"
										onClick={() => setActiveTab("details")}
									/>
								)}
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="details">
						<Card>
							<CardHeader>
								<div className="flex justify-between items-center">
									<CardTitle>
										Bénéfices et pertes détaillés
									</CardTitle>
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
													className="border-muted hover:bg-muted"
												>
													<Plus className="mr-2 h-4 w-4" />
													Ajouter{" "}
													{section === "revenue"
														? "un revenu"
														: "une dépense"}
												</Button>
											)
										)}
									</div>
								</div>
							</CardHeader>

							<CardContent>
								<div className="space-y-8">
									{(["revenue", "expenses"] as const).map(
										(section) => (
											<div
												key={section}
												className="rounded-lg border bg-card"
											>
												<div className="p-4 border-b bg-muted/10">
													<h3 className="text-lg font-semibold text-foreground">
														{section === "revenue"
															? "Revenus"
															: "Dépenses"}
													</h3>
												</div>

												{profitLossData[section]
													.length > 0 ? (
													<TableComponent
														section={section}
														data={
															profitLossData[
																section
															]
														}
														onUpdate={updateRow}
														onRemove={removeRow}
													/>
												) : (
													<div className="p-8">
														<NoDataCard
															message={`Aucun ${
																section ===
																"revenue"
																	? "revenu"
																	: "dépense"
															} enregistré`}
															buttonText={`Ajouter ${
																section ===
																"revenue"
																	? "un revenu"
																	: "une dépense"
															}`}
															onClick={() =>
																addRow(section)
															}
														/>
													</div>
												)}
											</div>
										)
									)}
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>

				<div className="mt-6">
					<QASection
						data={INVENTAIRE_QA_DATA}
						responses={qaResponses}
						onResponseChange={handleQAResponseChange}
						onResponseSave={handleQAResponseSave}
					/>
				</div>
			</div>
		</div>
	);
}
