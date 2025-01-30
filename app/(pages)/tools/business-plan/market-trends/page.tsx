"use client";
import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Label,
} from "recharts";
import { Trash2 } from "lucide-react";
import { Header } from "@/components/business-plan/shared/Header";
import { TrendEntry, MarketNumber } from "@/types/market-trends";

const INITIAL_TRENDS: TrendEntry[] = [
	{ id: "trend_1", annee: 2018, tauxCroissance: 5, variationDemande: 4 },
	{ id: "trend_2", annee: 2019, tauxCroissance: 7, variationDemande: 6 },
	{ id: "trend_3", annee: 2020, tauxCroissance: 8, variationDemande: 7 },
	{ id: "trend_4", annee: 2021, tauxCroissance: 10, variationDemande: 9 },
	{ id: "trend_5", annee: 2022, tauxCroissance: 12, variationDemande: 11 },
];

const INITIAL_MARKET_NUMBERS: MarketNumber[] = [
	{
		id: "market_size",
		value: "1,200M€",
		title: "Taille du marché",
		description:
			"C'est la taille actuelle du marché global, en pleine croissance.",
		referenceLink: "https://example.com/market_size",
	},
	{
		id: "annual_growth",
		value: "12%",
		title: "Croissance annuelle",
		description:
			"Le marché croît à un taux annuel de 12%, favorisant l'innovation.",
		referenceLink: "https://example.com/annual_growth",
	},
	{
		id: "market_share",
		value: "30%",
		title: "Part de marché des leaders",
		description: "Les trois principaux acteurs dominent 30% du marché.",
		referenceLink: "https://example.com/market_share",
	},
];

const FIELD_LABELS = {
	annee: "Année",
	tauxCroissance: "Taux de Croissance (%)",
	variationDemande: "Variation de Demande (%)",
};

const Trends: React.FC = () => {
	const [trends, setTrends] = useState<TrendEntry[]>(INITIAL_TRENDS);
	const [marketNumbers, setMarketNumbers] = useState<MarketNumber[]>(
		INITIAL_MARKET_NUMBERS
	);

	// Calcul du progrès basé sur le remplissage des données
	const calculateProgress = useCallback(() => {
		const hasMarketNumbers = marketNumbers.length > 0;
		const hasTrends = trends.length > 0;
		const totalFields = marketNumbers.length * 4 + trends.length * 3; // 4 champs pour marketNumbers, 3 pour trends
		const filledFields =
			marketNumbers.reduce((acc, item) => {
				return (
					acc +
					(item.value ? 1 : 0) +
					(item.title ? 1 : 0) +
					(item.description ? 1 : 0) +
					(item.referenceLink ? 1 : 0)
				);
			}, 0) +
			trends.reduce((acc, item) => {
				return (
					acc +
					(item.annee ? 1 : 0) +
					(item.tauxCroissance ? 1 : 0) +
					(item.variationDemande ? 1 : 0)
				);
			}, 0);

		return Math.round((filledFields / totalFields) * 100);
	}, [trends, marketNumbers]);

	// Handler pour ajouter une nouvelle entrée
	const handleAddTrend = useCallback(() => {
		const newTrend: TrendEntry = {
			id: `trend_${Date.now()}`,
			annee: new Date().getFullYear(),
			tauxCroissance: 0,
			variationDemande: 0,
		};
		setTrends((prev) => [...prev, newTrend]);
	}, []);

	// Handler pour supprimer une entrée
	const handleRemoveTrend = useCallback((id: string) => {
		setTrends((prev) => prev.filter((trend) => trend.id !== id));
	}, []);

	// Handler pour mettre à jour les données
	const handleUpdateTrend = useCallback(
		(id: string, field: keyof TrendEntry, value: string) => {
			setTrends((prev) =>
				prev.map((trend) => {
					if (trend.id !== id) return trend;
					const newValue =
						field === "annee"
							? parseInt(value)
							: parseFloat(value) || 0;
					return { ...trend, [field]: newValue };
				})
			);
		},
		[]
	);

	// Handler pour mettre à jour un grand chiffre
	const handleUpdateMarketNumber = useCallback(
		(id: string, field: keyof MarketNumber, value: string) => {
			setMarketNumbers((prev) =>
				prev.map((item) => {
					if (item.id !== id) return item;
					return { ...item, [field]: value };
				})
			);
		},
		[]
	);

	return (
		<div className="flex flex-col h-screen">
			<Header
				title="Tendances du Marché"
				progress={calculateProgress()}
			/>
			<div className="flex-1 max-w-7xl mx-auto w-full p-6 overflow-y-auto">
				<Tabs defaultValue="overview" className="space-y-6">
					<TabsList className="grid w-full grid-cols-2 mb-6">
						<TabsTrigger value="overview">
							Vue d'ensemble du marché
						</TabsTrigger>
						<TabsTrigger value="details">
							Détail du marché
						</TabsTrigger>
					</TabsList>
					{/* Vue d'ensemble */}
					<TabsContent value="overview" className="space-y-6">
						<Card className="bg-card">
							<CardHeader>
								<CardTitle className="text-xl font-semibold text-foreground">
									Les Grands Nombres du Marché
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									{marketNumbers.map((item, index) => (
										<div
											key={index}
											className="flex flex-col items-center p-6 rounded-lg bg-background border"
										>
											<div className="flex items-center justify-center rounded-full bg-primary/10 text-primary w-20 h-20 mb-4">
												<span className="text-2xl font-bold">
													{item.value}
												</span>
											</div>
											<h3 className="text-lg font-semibold text-foreground mb-2">
												{item.title}
											</h3>
											<p className="text-sm text-muted-foreground text-center mb-3">
												{item.description}
											</p>
											<a
												href={item.referenceLink}
												target="_blank"
												rel="noopener noreferrer"
												className="text-sm text-primary hover:text-primary/80 transition-colors"
											>
												Voir la référence
											</a>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-xl font-semibold text-foreground">
									Évolution des Tendances
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="h-[400px] w-full">
									<ResponsiveContainer>
										<LineChart data={trends}>
											<CartesianGrid
												strokeDasharray="3 3"
												className="opacity-50"
											/>
											<XAxis
												dataKey="annee"
												stroke="currentColor"
											>
												<Label
													value="Année"
													position="insideBottom"
													offset={-5}
												/>
											</XAxis>
											<YAxis stroke="currentColor">
												<Label
													value="Croissance (%)"
													angle={-90}
													position="insideLeft"
													offset={-5}
												/>
											</YAxis>
											<Tooltip
												contentStyle={{
													backgroundColor:
														"var(--background)",
													borderColor:
														"var(--border)",
												}}
												labelStyle={{
													color: "var(--foreground)",
												}}
											/>
											<Line
												type="monotone"
												dataKey="tauxCroissance"
												stroke="hsl(var(--primary))"
												activeDot={{ r: 8 }}
												name="Taux de croissance"
											/>
											<Line
												type="monotone"
												dataKey="variationDemande"
												stroke="hsl(var(--secondary))"
												name="Variation de la demande"
											/>
										</LineChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Détail du marché */}
					<TabsContent value="details" className="mt-6">
						<Card className="mb-6">
							<CardHeader>
								<CardTitle>Tendances du marché</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="overflow-x-auto">
									<Table>
										<TableHeader>
											<TableRow>
												{Object.values(
													FIELD_LABELS
												).map((label) => (
													<TableHead key={label}>
														{label}
													</TableHead>
												))}
												<TableHead>Actions</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{trends.map((trend) => (
												<TableRow key={trend.id}>
													{Object.keys(
														FIELD_LABELS
													).map((field) => (
														<TableCell key={field}>
															<Input
																type={
																	field ===
																	"annee"
																		? "number"
																		: "text"
																}
																value={
																	trend[
																		field as keyof TrendEntry
																	]
																}
																onChange={(e) =>
																	handleUpdateTrend(
																		trend.id,
																		field as keyof TrendEntry,
																		e.target
																			.value
																	)
																}
															/>
														</TableCell>
													))}
													<TableCell>
														<button
															onClick={() =>
																handleRemoveTrend(
																	trend.id
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
								<Button
									variant="outline"
									size="sm"
									onClick={handleAddTrend}
								>
									Ajouter une tendance
								</Button>
							</CardContent>
						</Card>

						{/* Détail des grands chiffres */}
						<Card>
							<CardHeader>
								<CardTitle>Grands Nombres du Marché</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="overflow-x-auto">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>
													Importance
												</TableHead>
												<TableHead>Titre</TableHead>
												<TableHead>Valeur</TableHead>
												<TableHead>
													Description
												</TableHead>
												<TableHead>
													Lien de Référence
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{marketNumbers.map(
												(item, index) => (
													<TableRow key={item.id}>
														<TableCell>
															{index + 1}
														</TableCell>
														<TableCell>
															<Input
																value={
																	item.title
																}
																onChange={(e) =>
																	handleUpdateMarketNumber(
																		item.id,
																		"title",
																		e.target
																			.value
																	)
																}
															/>
														</TableCell>
														<TableCell>
															<Input
																value={
																	item.value
																}
																onChange={(e) =>
																	handleUpdateMarketNumber(
																		item.id,
																		"value",
																		e.target
																			.value
																	)
																}
															/>
														</TableCell>
														<TableCell>
															<Input
																value={
																	item.description
																}
																onChange={(e) =>
																	handleUpdateMarketNumber(
																		item.id,
																		"description",
																		e.target
																			.value
																	)
																}
															/>
														</TableCell>
														<TableCell>
															<Input
																value={
																	item.referenceLink
																}
																onChange={(e) =>
																	handleUpdateMarketNumber(
																		item.id,
																		"referenceLink",
																		e.target
																			.value
																	)
																}
															/>
														</TableCell>
													</TableRow>
												)
											)}
										</TableBody>
									</Table>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default Trends;
