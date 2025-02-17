"use client";
import React, { useCallback } from "react";
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
} from "recharts";
import { Trash2, TrendingUp, PanelRightOpen } from "lucide-react";
import { Header } from "@/components/business-plan/shared/Header";
import { TrendEntry, MarketNumber } from "@/types/market-trends";
import { useMarketTrends } from "@/lib/business-plan/hooks/market-trends/useMarketTrends";

const FIELD_LABELS = {
	annee: "Année",
	tauxCroissance: "Taux de Croissance (%)",
	variationDemande: "Variation de Demande (%)",
};

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

const Trends: React.FC = () => {
	const {
		trends,
		marketNumbers,
		isLoading,
		addTrend,
		updateTrend,
		removeTrend,
		updateMarketNumber,
		saveTrend,
		removeMarketNumber,
		addMarketNumber, // Ajoutez cette ligne
	} = useMarketTrends();

	const calculateProgress = useCallback(() => {
		const totalFields = marketNumbers.length * 4 + trends.length * 3;
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

	const handleAddTrend = () => {
		addTrend();
	};

	const handleRemoveTrend = (id: string) => {
		removeTrend(id);
	};

	const handleUpdateTrend = (
		id: string,
		field: keyof TrendEntry,
		value: string
	) => {
		updateTrend(id, field, value);
	};

	const handleUpdateMarketNumber = (
		id: string,
		field: keyof MarketNumber,
		value: string
	) => {
		updateMarketNumber(id, field, value);
	};

	const switchToDetails = () => {
		const tabsTrigger = document.querySelector(
			'[value="details"]'
		) as HTMLElement;
		if (tabsTrigger) {
			tabsTrigger.click();
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-lg">Chargement...</div>
			</div>
		);
	}

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
							Vue d&apos;ensemble du marché
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
								{marketNumbers.length === 0 ? (
									<NoDataCard
										message="Aucune donnée de marché disponible"
										buttonText="Ajouter des données"
										onNavigate={switchToDetails}
									/>
								) : (
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
												{item.referenceLink && (
													<a
														href={
															item.referenceLink
														}
														target="_blank"
														rel="noopener noreferrer"
														className="text-sm text-primary hover:text-primary/80 transition-colors"
													>
														Voir la référence
													</a>
												)}
											</div>
										))}
									</div>
								)}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-xl font-semibold text-foreground">
									Évolution des Tendances
								</CardTitle>
							</CardHeader>
							<CardContent>
								{trends.length === 0 ? (
									<NoDataCard
										message="Aucune tendance enregistrée"
										buttonText="Ajouter des tendances"
										onNavigate={switchToDetails}
									/>
								) : (
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
												/>
												<YAxis stroke="currentColor" />
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
													stroke="hsl(var(--chart-2))"
													name="Variation de la demande"
												/>
											</LineChart>
										</ResponsiveContainer>
									</div>
								)}
							</CardContent>
						</Card>
					</TabsContent>

					{/* Détail du marché */}
					<TabsContent value="details" className="mt-6">
						<Card className="mb-6">
							<CardHeader>
								<div className="flex justify-between items-center">
									<CardTitle>Tendances du marché</CardTitle>
									<Button
										variant="outline"
										size="sm"
										onClick={handleAddTrend}
									>
										<TrendingUp className="mr-2 h-4 w-4" />
										Ajouter une tendance
									</Button>
								</div>
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
																onBlur={() =>
																	saveTrend()
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
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<div className="flex justify-between items-center">
									<CardTitle>
										Grands Nombres du Marché
									</CardTitle>
									<Button
										variant="outline"
										size="sm"
										onClick={addMarketNumber} // Remplacez l'ancien onClick par celui-ci
									>
										<TrendingUp className="mr-2 h-4 w-4" />
										Ajouter un nombre du marché
									</Button>
								</div>
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
												<TableHead>Actions</TableHead>
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
																onBlur={() =>
																	saveTrend()
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
																onBlur={() =>
																	saveTrend()
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
																onBlur={() =>
																	saveTrend()
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
																onBlur={() =>
																	saveTrend()
																}
															/>
														</TableCell>
														<TableCell>
															<button
																onClick={() => {
																	// Ajouter la logique pour supprimer un nombre du marché
																	const updatedNumbers =
																		marketNumbers.filter(
																			(
																				n
																			) =>
																				n.id !==
																				item.id
																		);
																	// Mettre à jour l'état et sauvegarder
																	// Cette fonction devra être ajoutée à votre hook useMarketTrends
																	removeMarketNumber(
																		item.id
																	);
																}}
																className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
															>
																<Trash2 className="h-4 w-4" />
															</button>
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
