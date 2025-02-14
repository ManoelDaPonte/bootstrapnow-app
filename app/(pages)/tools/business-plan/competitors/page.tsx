"use client";

import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/business-plan/shared/Header";
import { FIELD_LABELS } from "@/lib/business-plan/config/competitors";
import { useCompetitors } from "@/lib/business-plan/hooks/competitors/useCompetitors";
import CompetitorMatrix from "@/components/business-plan/competitors/CompetitorMatrix";
import CompetitorDetails from "@/components/business-plan/competitors/CompetitorDetails";
import type { CompetitorEntry } from "@/types/competitors";

interface ChartBounds {
	minPrice: number;
	maxPrice: number;
	minValue: number;
	maxValue: number;
}

const Competitors: React.FC = () => {
	const {
		competitors: rawCompetitors,
		isLoading,
		addCompetitor,
		updateCompetitor,
		removeCompetitor,
		calculateProgress,
		saveCompetitor,
	} = useCompetitors();

	const competitors: CompetitorEntry[] = rawCompetitors.map((competitor) => ({
		...competitor,
		isMyCompany: competitor.isMyCompany ?? false,
	}));

	const chartBounds: ChartBounds = useMemo(() => {
		if (competitors.length === 0) {
			return {
				minPrice: 0,
				maxPrice: 100,
				minValue: 0,
				maxValue: 100,
			};
		}

		const prices = competitors.map((c) => c.prix);
		const values = competitors.map((c) => c.valeurPercue);

		return {
			minPrice: Math.floor(Math.min(...prices) / 10) * 10 - 10,
			maxPrice: Math.ceil(Math.max(...prices) / 10) * 10 + 10,
			minValue: Math.floor(Math.min(...values) / 10) * 10 - 10,
			maxValue: Math.ceil(Math.max(...values) / 10) * 10 + 10,
		};
	}, [competitors]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-lg">Chargement...</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col h-full">
			<Header
				title="Analyse Concurrentielle"
				progress={calculateProgress()}
			/>

			<div className="flex-1 p-6 space-y-12 w-full">
				<Tabs defaultValue="overview" className="h-full flex flex-col">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="overview">
							Vue d'ensemble
						</TabsTrigger>
						<TabsTrigger value="details">
							Détail des concurrents
						</TabsTrigger>
					</TabsList>

					<TabsContent value="overview" className="mt-6 flex-1">
						<CompetitorMatrix
							competitors={competitors}
							chartBounds={chartBounds}
							onAddClick={addCompetitor}
						/>
					</TabsContent>
					<TabsContent value="details" className="mt-6 flex-1">
						<CompetitorDetails
							competitors={competitors}
							onAdd={addCompetitor}
							onUpdate={(
								id: string,
								field: keyof CompetitorEntry,
								value: string | number
							) => {
								updateCompetitor(id, field, String(value));
							}}
							onRemove={removeCompetitor}
							onSave={saveCompetitor}
							fieldConfig={FIELD_LABELS}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default Competitors;
