"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useTemplateProgress } from "@/lib/business-plan/hooks/useTemplateProgress";
import { useState } from "react";
import { Download } from "lucide-react";

const templates = [
	{
		id: "market",
		title: "Étude de marché",
		color: "bg-[hsl(var(--chart-1)_/_0.1)]",
		borderColor: "border-[hsl(var(--chart-1)_/_0.2)]",
		hoverColor: "hover:bg-[hsl(var(--chart-1)_/_0.15)]",
		icon: "📊",
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
		icon: "📊",
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

export default function BusinessPlanPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [generatedText, setGeneratedText] = useState<string | null>(null);

	const router = useRouter();
	type ProgressType = {
		[key: string]: {
			[key: string]: number;
		};
	};

	//const progress: ProgressType = useTemplateProgress();

	//const getTemplateProgress = (sectionId: string, templateName: string) => {
	//	return progress[sectionId]?.[templateName] || 0;
	//};

	//const totalProgress = Math.round(
	//	Object.entries(progress).reduce((acc, [sectionId, section]) => {
	//		if (sectionId === "execution") {
	//			return acc + (section["Value Proposition"] || 0);
	//		}
	//		if (sectionId === "financial") {
	//			return acc; // Exclure la section financière
	//		}
	//		return (
	//			acc +
	//			Object.values(section).reduce((sum, value) => sum + value, 0)
	//		);
	//	}, 0) /
	//		(Object.values(progress).reduce(
	//			(acc, section) => acc + Object.keys(section).length,
	//			0
	//		) -
	//			4) // Ajuster pour exclure Skills Matrix et les 3 pages financières
	//);

	const handleGenerateBusinessPlan = async () => {
		setIsLoading(true);
		try {
			// 1. Récupérer les données
			const dataResponse = await fetch(
				"/api/business-plan/data/get-business-plan-data"
			);
			if (!dataResponse.ok)
				throw new Error("Erreur lors de la récupération des données");
			const businessPlanData = await dataResponse.json();
			console.log("Données récupérées:", businessPlanData);

			// 2. Générer le prompt
			const promptResponse = await fetch(
				"/api/business-plan/data/generate-prompt"
			);
			if (!promptResponse.ok)
				throw new Error("Erreur lors de la génération du prompt");
			const { prompt } = await promptResponse.json();
			console.log("Prompt généré:", prompt);

			// 3. Générer le texte avec OpenAI
			const generateTextResponse = await fetch(
				"/api/business-plan/data/generate-text",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ prompt }),
				}
			);

			if (!generateTextResponse.ok) {
				const errorData = await generateTextResponse.json();
				throw new Error(
					errorData.error || "Erreur lors de la génération du texte"
				);
			}

			const { text } = await generateTextResponse.json();
			setGeneratedText(text);
		} catch (error) {
			console.error("Erreur:", error);
			if (error instanceof Error) {
				alert("Une erreur est survenue: " + error.message);
			} else {
				alert("Une erreur inconnue est survenue");
			}
		} finally {
			setIsLoading(false);
		}
	};

	// Fonction pour exporter en fichier texte
	const handleExport = () => {
		if (!generatedText) return;
		const blob = new Blob([generatedText], { type: "text/plain" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "business-plan.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	};

	return (
		<div className="flex flex-col h-screen">
			<div className="bg-white">
				<div className="max-w-full mx-auto">
					<div className="container py-4">
						<div className="flex items-center justify-between">
							<div className="space-y-1">
								<h1 className="text-2xl font-bold">
									Business Plan
								</h1>
							</div>
							<div className="flex items-center gap-8">
								{/* <div className="flex items-center gap-3 bg-card px-4 py-2 rounded-lg">
									<Progress
										value={totalProgress}
										className="w-32 h-2"
									/>
									<span className="text-sm font-medium">
										{totalProgress}%
									</span>
								</div> */}

								{isLoading ? (
									<div className="flex items-center gap-2">
										<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
										<span className="text-sm">
											Génération en cours...
										</span>
									</div>
								) : (
									<div className="flex items-center gap-3">
										<Button
											onClick={handleGenerateBusinessPlan}
											className="bg-[hsl(var(--primary))] text-primary-foreground hover:bg-[hsl(var(--primary)_/_0.9)]"
											// disabled={
											// 	totalProgress < 10 || isLoading
											// }
										>
											Générer le Business Plan
										</Button>

										{generatedText && (
											<Button
												onClick={handleExport}
												variant="outline"
												className="flex items-center gap-2"
											>
												<Download size={16} />
												Télécharger le Business Plan
											</Button>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container py-8">
				<p className="text-sm text-muted-foreground mb-5">
					Complétez chaque section pour générer votre business plan
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{templates.map((section) => (
						<div key={section.id} className="space-y-4">
							<div className="flex items-center gap-2">
								<span className="text-2xl">{section.icon}</span>
								<h2 className="text-xl font-semibold">
									{section.title}
								</h2>
							</div>

							<div className="grid grid-cols-1 gap-4">
								{section.templates.map((template) => {
									// const templateProgress =
									// 	getTemplateProgress(
									// 		section.id,
									// 		template.name
									// 	);
									return (
										<div
											key={template.name}
											onClick={() =>
												router.push(template.route)
											}
											className={`
                        relative rounded-xl border p-6 
                        cursor-pointer transition-all duration-300
                        ${section.color} ${section.borderColor} ${section.hoverColor}
                        hover:shadow-lg hover:scale-[1.02]
                      `}
										>
											<div className="space-y-4">
												<div className="flex justify-between items-start">
													<div className="space-y-1">
														<h3 className="font-semibold">
															{template.name}
														</h3>
														<p className="text-sm text-muted-foreground">
															{
																template.description
															}
														</p>
													</div>
													{/* {templateProgress ===
													100 ? (
														<CheckCircle2 className="w-5 h-5 text-green-500" />
													) : (
														<AlertCircle className="w-5 h-5 text-[hsl(var(--primary))]" />
													)} */}
												</div>
												<div className="space-y-1">
													{/* <Progress
														value={templateProgress}
														className="h-1.5"
													/>
													<div className="text-sm text-right text-muted-foreground">
														{templateProgress}%
													</div> */}
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
