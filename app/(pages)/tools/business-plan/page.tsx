//app/%28pages%29/tools/business-plan/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useTemplateProgress } from "@/lib/business-plan/hooks/useTemplateProgress";
import { Card } from "@/components/ui/card";
import GeneralInfoCard from "@/components/business-plan/GeneralInfoCard";
import { useGeneralInfo } from "@/lib/business-plan/hooks/useGeneralInfo";
import { useBusinessPlanGenerator } from "@/lib/openai/hooks/useBusinessPlanGenerator";
import { useUser } from "@auth0/nextjs-auth0/client";
import { toast } from "@/components/ui/use-toast";
import { Loader2, XCircle } from "lucide-react";
import HistoryDialog from "@/components/business-plan-document/HistoryDialog";

const templates = [
	{
		id: "market",
		title: "Étude de marché",
		color: "bg-[hsl(var(--chart-1)_/_0.1)]",
		borderColor: "border-[hsl(var(--chart-1)_/_0.2)]",
		hoverColor: "hover:bg-[hsl(var(--chart-1)_/_0.15)]",
		icon: "📈",
		templates: [
			{
				name: "Tendances du marché",
				route: "/tools/business-plan/market-trends",
				description: "Différenciez vous",
			},
			{
				name: "Competiteurs",
				route: "/tools/business-plan/competitors",
				description: "Différenciez vous",
			},
		],
	},
	{
		id: "model",
		title: "Modèle et acquisition",
		color: "bg-[hsl(var(--chart-2)_/_0.1)]",
		borderColor: "border-[hsl(var(--chart-2)_/_0.2)]",
		hoverColor: "hover:bg-[hsl(var(--chart-2)_/_0.15)]",
		icon: "👔",
		templates: [
			{
				name: "Business Model Canvas",
				route: "/tools/business-plan/canvas",
				description: "Définissez votre modèle d'affaires",
			},
			{
				name: "Funnel d'acquisition",
				route: "/tools/business-plan/funnel-chart",
				description: "Analysez votre entonnoir de conversion",
			},
		],
	},
	{
		id: "strategy",
		title: "Votre Stratégie",
		color: "bg-[hsl(var(--chart-3)_/_0.1)]",
		borderColor: "border-[hsl(var(--chart-3)_/_0.2)]",
		hoverColor: "hover:bg-[hsl(var(--chart-3)_/_0.15)]",
		icon: "🎯",
		templates: [
			{
				name: "Marketing Mix",
				route: "/tools/business-plan/marketing-mix",
				description: "Optimisez votre mix marketing",
			},
			{
				name: "PESTEL",
				route: "/tools/business-plan/pestel",
				description: "Analysez votre environnement macro",
			},
		],
	},
	{
		id: "economic",
		title: "Croissance contrôlée",
		color: "bg-[hsl(var(--chart-4)_/_0.1)]",
		borderColor: "border-[hsl(var(--chart-4)_/_0.2)]",
		hoverColor: "hover:bg-[hsl(var(--chart-4)_/_0.15)]",
		icon: "💰",
		templates: [
			{
				name: "Matrice d'Ansoff",
				route: "/tools/business-plan/ansoff",
				description: "Planifiez votre croissance",
			},
			{
				name: "SWOT",
				route: "/tools/business-plan/swot",
				description: "Évaluez vos forces et faiblesses",
			},
		],
	},
	{
		id: "execution",
		title: "Valeur ajoutée",
		color: "bg-[hsl(var(--chart-5)_/_0.1)]",
		borderColor: "border-[hsl(var(--chart-5)_/_0.2)]",
		hoverColor: "hover:bg-[hsl(var(--chart-5)_/_0.15)]",
		icon: "🚀",
		templates: [
			{
				name: "Matrice de compétences",
				route: "/tools/business-plan/skills-matrix",
				description: "Cartographiez vos compétences",
			},
			{
				name: "Proposition de valeur",
				route: "/tools/business-plan/value-proposition",
				description: "Définissez votre proposition de valeur",
			},
		],
	},
	{
		id: "financial",
		title: "Plan Financier",
		color: "bg-[hsl(var(--chart-6)_/_0.1)]",
		borderColor: "border-[hsl(var(--chart-6)_/_0.2)]",
		hoverColor: "hover:bg-[hsl(var(--chart-6)_/_0.15)]",
		icon: "💵",
		templates: [
			{
				name: "Projection sur 3 ans",
				route: "/tools/business-plan/3-years-projection",
				description: "Planifiez vos projections financières sur 3 ans",
			},
			{
				name: "Projection sur 12 mois",
				route: "/tools/business-plan/12-months-projection",
				description: "Détaillez votre première année d'activité",
			},
			{
				name: "Dépenses de démarrage",
				route: "/tools/business-plan/startup-expenses",
				description: "Estimez vos besoins en financement initial",
			},
		],
	},
];

interface TemplateData {
	name: string;
	route: string;
	description: string;
}

interface SectionData {
	id: string;
	title: string;
	color: string;
	borderColor: string;
	hoverColor: string;
	icon: string;
	templates: TemplateData[];
}

interface ProgressType {
	[key: string]: {
		[key: string]: number;
	};
}

export default function BusinessPlanPage() {
	const {
		generationState,
		generations,
		isLoadingHistory,
		generateSection,
		saveGeneratedContent,
		generateDocument,
		loadHistory,
		downloadGeneration,
	} = useBusinessPlanGenerator();
	const { user } = useUser();
	const {
		data: generalInfo,
		updateField: handleGeneralInfoChange,
		saveData: handleGeneralInfoSave,
		completionPercentage: generalInfoProgress,
		isSaving,
	} = useGeneralInfo();

	// Ajoutez cet useEffect pour charger l'historique au montage
	useEffect(() => {
		if (user?.sub) {
			loadHistory(user.sub);
		}
	}, [user?.sub]);

	const handleGenerateBusinessPlan = async () => {
		if (!user?.sub) {
			toast({
				title: "Erreur",
				description:
					"Vous devez être connecté pour générer un business plan",
				variant: "destructive",
			});
			return;
		}

		try {
			// 1. Générer les sections
			const result = await generateSection(user.sub, "ES_Overview");

			// 2. Sauvegarder les sections et obtenir l'ID
			const { generationId } = await saveGeneratedContent(user.sub, {
				ES_Overview: result,
			});

			// 3. Attendre un court instant pour s'assurer que la transaction est terminée
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// 4. Générer le document
			const docxUrl = await generateDocument(user.sub, generationId); // Modifier pour accepter l'ID

			toast({
				title: "Succès",
				description: "Votre business plan a été généré avec succès",
			});

			// 4. Proposer le téléchargement
			window.open(docxUrl, "_blank");
		} catch (error) {
			console.error("Erreur détaillée:", error);
			toast({
				title: "Erreur",
				description: "Une erreur est survenue lors de la génération",
				variant: "destructive",
			});
		}
	};

	const renderProgress = () => {
		const completedSections = generationState.sections.filter(
			(s) => s.status === "completed"
		).length;

		return (
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<span>Progression de la génération</span>
					<span>
						{Math.round(
							(completedSections /
								generationState.sections.length) *
								100
						)}
						%
					</span>
				</div>
				<Progress
					value={
						(completedSections / generationState.sections.length) *
						100
					}
					className="w-full"
				/>
				<div className="space-y-2">
					{generationState.sections.map((section) => (
						<div
							key={section.section}
							className="flex items-center gap-2"
						>
							{section.status === "completed" && (
								<CheckCircle2 className="w-4 h-4 text-green-500" />
							)}
							{section.status === "generating" && (
								<Loader2 className="w-4 h-4 animate-spin" />
							)}
							{section.status === "error" && (
								<XCircle className="w-4 h-4 text-red-500" />
							)}
							<span>{section.section}</span>
						</div>
					))}
				</div>
			</div>
		);
	};

	const router = useRouter();

	type ProgressType = {
		[key: string]: {
			[key: string]: number;
		};
	};

	const progress: ProgressType = useTemplateProgress();

	const getTemplateProgress = (
		sectionId: string,
		templateName: string
	): number => {
		return progress[sectionId]?.[templateName] || 0;
	};

	const totalProgress = Math.round(
		Object.entries(progress).reduce((acc, [, section]) => {
			return (
				acc +
				Object.values(section).reduce((sum, value) => sum + value, 0)
			);
		}, 0) /
			Object.values(progress).reduce((total, section) => {
				return total + Object.keys(section).length;
			}, 0)
	);

	return (
		<div className="flex flex-col min-h-screen">
			<div className="bg-background border-b">
				<div className="max-w-full mx-auto">
					<div className="container py-4">
						<div className="flex items-center justify-between mr-16">
							<div className="space-y-1">
								<h1 className="text-2xl font-bold text-foreground">
									Business Plan
								</h1>
							</div>
							<div className="flex items-center gap-8">
								<div className="flex items-center gap-3 bg-card px-4 py-2 rounded-lg border">
									<Progress
										value={totalProgress}
										className="w-32 h-2"
									/>
									<span className="text-sm font-medium text-foreground">
										{totalProgress}%
									</span>
								</div>

								<div className="flex items-center gap-3">
									<div className="flex items-center gap-3">
										<Button
											onClick={handleGenerateBusinessPlan}
											className="bg-primary text-primary-foreground hover:bg-primary/90"
											disabled={totalProgress < 80}
										>
											Générer le Business Plan
										</Button>

										<HistoryDialog
											generations={generations}
											onDownload={downloadGeneration}
											isLoading={isLoadingHistory}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container py-8 flex-1">
				<div className="bg-muted/30 border rounded-lg p-6 mb-8">
					<h2 className="text-lg font-semibold mb-3">
						Comment procéder ?
					</h2>
					<ul className="space-y-2 text-muted-foreground">
						<li className="flex items-center gap-2">
							<span className="text-primary">1.</span>
							Commencez par remplir les informations générales de
							votre entreprise ci-dessous
						</li>
						<li className="flex items-center gap-2">
							<span className="text-primary">2.</span>
							Complétez chaque section du business plan (minimum
							80% pour chaque section)
						</li>
						<li className="flex items-center gap-2">
							<span className="text-primary">3.</span>
							Plus vous ajoutez d'éléments dans chaque section,
							plus votre business plan sera détaillé et pertinent
						</li>
						<li className="flex items-center gap-2">
							<span className="text-primary">4.</span>
							Une fois que la progression globale atteint 80%,
							vous pourrez générer votre business plan
						</li>
					</ul>
				</div>

				<GeneralInfoCard
					data={generalInfo}
					onChange={handleGeneralInfoChange}
					onSave={handleGeneralInfoSave}
					isSaving={isSaving}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{templates.map((section) => (
						<div key={section.id} className="space-y-4">
							<div className="flex items-center gap-2">
								<span className="text-2xl">{section.icon}</span>
								<h2 className="text-xl font-semibold text-foreground">
									{section.title}
								</h2>
							</div>

							<div className="grid grid-cols-1 gap-4">
								{section.templates.map((template) => {
									const templateProgress =
										getTemplateProgress(
											section.id,
											template.name
										);
									return (
										<Card
											key={template.name}
											onClick={() =>
												router.push(template.route)
											}
											className={`
						  cursor-pointer transition-all duration-300
						  ${section.color} ${section.borderColor} ${section.hoverColor}
						  hover:shadow-lg hover:scale-[1.02]
						`}
										>
											<div className="p-6 space-y-4">
												<div className="flex justify-between items-start">
													<div className="space-y-1">
														<h3 className="font-semibold text-foreground">
															{template.name}
														</h3>
														<p className="text-sm text-muted-foreground">
															{
																template.description
															}
														</p>
													</div>
													{templateProgress >= 80 ? (
														<CheckCircle2 className="w-5 h-5 text-green-500" />
													) : (
														<AlertCircle className="w-5 h-5 text-primary" />
													)}
												</div>
												<div className="space-y-1">
													<Progress
														value={templateProgress}
														className="h-1.5"
													/>
													<div className="text-sm text-right text-muted-foreground">
														{templateProgress}%
													</div>
												</div>
											</div>
										</Card>
									);
								})}
							</div>
						</div>
					))}
				</div>
				{generationState.status !== "idle" && (
					<Card className="p-4 mt-8">{renderProgress()}</Card>
				)}
			</div>
		</div>
	);
}
