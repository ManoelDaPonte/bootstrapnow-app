"use client";

import React, { useState } from "react";
import { Header } from "@/components/business-plan/shared/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/business-plan/startup-expenses/Overview";
import { Details } from "@/components/business-plan/startup-expenses/Details";
import { RiskAssessment } from "@/components/business-plan/startup-expenses/RiskAssessment";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStartupData } from "@/lib/business-plan/hooks/startup-expenses/useStartupData";
import { calculateProgress } from "@/lib/business-plan/hooks/startup-expenses/storage-startup";

const StartupExpenses: React.FC = () => {
	const [activeTab, setActiveTab] = useState("overview");

	const {
		data,
		isLoading,
		isSaving,
		hasUnsavedChanges,
		handleUpdateEntry,
		handleAddEntry,
		handleRemoveEntry,
		handleUpdateRisk,
		handleAddRisk,
		handleRemoveRisk,
		saveChanges,
	} = useStartupData();

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-lg">Chargement...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<Header
				title="Dépenses de Démarrage"
				progress={calculateProgress(data)}
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
					onValueChange={handleTabChange}
					className="space-y-6"
				>
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="overview">Vue globale</TabsTrigger>
						<TabsTrigger value="details">Détails</TabsTrigger>
						<TabsTrigger value="risks">
							Évaluation des Risques
						</TabsTrigger>
					</TabsList>

					<TabsContent value="overview">
						<Overview data={data} onNavigate={handleTabChange} />
					</TabsContent>

					<TabsContent value="details">
						<Details
							data={data}
							onUpdate={handleUpdateEntry}
							onAdd={handleAddEntry}
							onRemove={handleRemoveEntry}
						/>
					</TabsContent>

					<TabsContent value="risks">
						<RiskAssessment
							risks={data.risks}
							onUpdate={handleUpdateRisk}
							onAdd={handleAddRisk}
							onRemove={handleRemoveRisk}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default StartupExpenses;
