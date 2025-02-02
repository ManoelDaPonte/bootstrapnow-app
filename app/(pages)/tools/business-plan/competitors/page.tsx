"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	greenIcon,
	redIcon,
} from "@/lib/business-plan/config/competitors/map-icons";
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
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Label,
} from "recharts";
import { Header } from "@/components/business-plan/shared/Header";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { CompetitorEntry } from "@/types/competitors";
import {
	INITIAL_COMPETITORS,
	FIELD_LABELS,
	zoneCoordinates,
} from "@/lib/business-plan/config/competitors";
import CustomTooltip from "@/components/business-plan/competitors/CustomTooltip";
import CustomShape from "@/components/business-plan/competitors/CustomShape";
import { CustomShapeProps } from "@/types/competitors";
import { useCompetitors } from "@/lib/business-plan/hooks/competitors/useCompetitors";

// Main Component
const Competitors: React.FC = () => {
	const {
		competitors,
		isLoading,
		addCompetitor,
		updateCompetitor,
		removeCompetitor,
		calculateProgress,
		saveCompetitor,
	} = useCompetitors();

	// Memoized values
	const chartBounds = useMemo(() => {
		const prices = competitors.map((c) => c.prix);
		const values = competitors.map((c) => c.valeurPercue);

		return {
			minPrice: Math.floor(Math.min(...prices) / 10) * 10 - 10,
			maxPrice: Math.ceil(Math.max(...prices) / 10) * 10 + 10,
			minValue: Math.floor(Math.min(...values) / 10) * 10 - 10,
			maxValue: Math.ceil(Math.max(...values) / 10) * 10 + 10,
		};
	}, [competitors]);

	// Ajouter la gestion du chargement
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
				title="Analyse Concurrentielle"
				progress={calculateProgress()}
			/>

			<div className="flex-1 max-w-7xl mx-auto w-full p-6 overflow-y-auto">
				<Tabs defaultValue="overview" className="space-y-6">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="overview">
							Vue d'ensemble
						</TabsTrigger>
						<TabsTrigger value="details">
							Détail des concurrents
						</TabsTrigger>
						<TabsTrigger value="mapping">
							Mapping 'Beta'
						</TabsTrigger>
					</TabsList>

					{/* Vue d'ensemble */}
					<TabsContent value="overview" className="mt-6">
						<Card className="bg-card">
							<CardHeader>
								<CardTitle className="text-xl font-semibold text-foreground">
									Matrice de Positionnement Concurrentiel
								</CardTitle>
							</CardHeader>
							<CardContent>
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
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis
												type="number"
												dataKey="prix"
												name="Prix"
												domain={[
													chartBounds.minPrice,
													chartBounds.maxPrice,
												]}
												tickCount={8}
											>
												<Label
													value="Prix"
													offset={-20}
													position="insideBottom"
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
											>
												<Label
													value="Valeur perçue"
													angle={-90}
													offset={-20}
													position="insideLeft"
												/>
											</YAxis>
											<Tooltip
												content={<CustomTooltip />}
											/>
											<Scatter
												name="Entreprises"
												data={competitors}
												shape={(
													props: CustomShapeProps
												) => <CustomShape {...props} />}
											/>
										</ScatterChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Détail des concurrents */}
					<TabsContent value="details" className="mt-6">
						<Card className="bg-card">
							<CardHeader>
								<div className="flex justify-between items-center">
									<CardTitle className="text-xl font-semibold text-foreground">
										Concurrents
									</CardTitle>
									<Button
										onClick={addCompetitor}
										variant="outline"
										size="sm"
										className="text-primary hover:text-primary/80"
									>
										<Plus className="mr-2 h-4 w-4" />
										Ajouter un concurrent
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
											{competitors.map((competitor) => (
												<TableRow
													key={competitor.id}
													className={
														competitor.isMyCompany
															? "bg-primary/5"
															: ""
													}
												>
													{(
														Object.keys(
															FIELD_LABELS
														) as Array<
															keyof typeof FIELD_LABELS
														>
													).map((field) => (
														<TableCell key={field}>
															<Input
																type={
																	field ===
																		"prix" ||
																	field ===
																		"valeurPercue"
																		? "number"
																		: "text"
																}
																value={
																	competitor[
																		field
																	]
																}
																onChange={(e) =>
																	updateCompetitor(
																		competitor.id,
																		field,
																		e.target
																			.value
																	)
																}
																onBlur={() =>
																	saveCompetitor()
																}
																className={
																	competitor.isMyCompany
																		? "bg-primary/5"
																		: ""
																}
															/>
														</TableCell>
													))}
													<TableCell>
														{!competitor.isMyCompany && (
															<button
																onClick={() =>
																	removeCompetitor(
																		competitor.id
																	)
																}
																className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
															>
																<Trash2 className="h-4 w-4" />
															</button>
														)}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Mapping */}
					<TabsContent value="mapping" className="mt-6">
						<Card className="bg-card">
							<CardHeader>
								<CardTitle className="text-xl font-semibold text-foreground">
									Carte des concurrents
								</CardTitle>
								<p className="text-sm text-muted-foreground">
									ATTENTION: Cette carte n'est pour l'instant
									valable que pour la France
								</p>
							</CardHeader>
							<CardContent>
								<div className="h-[500px] w-full">
									<MapContainer
										center={[46.603354, 1.888334]}
										zoom={6}
										style={{
											height: "100%",
											width: "100%",
										}}
										scrollWheelZoom={false}
									>
										<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
										{competitors.map((competitor) => {
											const position = zoneCoordinates[
												competitor.zoneGeographique
											] || [46.603354, 1.888334];
											const icon = competitor.isMyCompany
												? greenIcon
												: redIcon;
											return (
												<Marker
													key={competitor.id}
													position={position}
													icon={icon}
												>
													<Popup>
														<h3>
															{competitor.nom}
														</h3>
														<p>
															Solution:{" "}
															{
																competitor.solution
															}
														</p>
														<p>
															Prix:{" "}
															{competitor.prix}
														</p>
														<p>
															Valeur perçue:{" "}
															{
																competitor.valeurPercue
															}
														</p>
														<p>
															Zone géographique:{" "}
															{
																competitor.zoneGeographique
															}
														</p>
													</Popup>
												</Marker>
											);
										})}
										{/* Légende */}
										<div className="absolute pointer-events-none bottom-10 left-10 p-2.5 rounded-lg z-[1000] bg-white bg-opacity-90">
											<div className="flex items-center mb-1.5">
												<img
													src="/icons/map-pin-green.svg"
													alt="Mon Entreprise"
													className="w-[30px] h-[40px] mr-2.5"
												/>
												<span>
													Notre positionnement
												</span>
											</div>
											<div className="flex items-center">
												<img
													src="/icons/map-pin-red.svg"
													alt="Autres Compétiteurs"
													className="w-[30px] h-[40px] mr-2.5"
												/>
												<span>Autres Compétiteurs</span>
											</div>
										</div>
									</MapContainer>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default Competitors;
