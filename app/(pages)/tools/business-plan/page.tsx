"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useTemplateProgress } from "@/lib/hooks/business-plan/useTemplateProgress";

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
				name: "Business Model Canvas",
				route: "/tools/business-plan/canvas",
				description: "Définissez votre modèle d'affaires",
			},
			{
				name: "Funnel Chart",
				route: "/tools/business-plan/funnel-chart",
				description: "Analysez votre entonnoir de conversion",
			},
		],
	},
	{
		id: "strategy",
		title: "Stratégie",
		color: "bg-[hsl(var(--chart-2)_/_0.1)]",
		borderColor: "border-[hsl(var(--chart-2)_/_0.2)]",
		hoverColor: "hover:bg-[hsl(var(--chart-2)_/_0.15)]",
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
		title: "Modèle économique",
		color: "bg-[hsl(var(--chart-3)_/_0.1)]",
		borderColor: "border-[hsl(var(--chart-3)_/_0.2)]",
		hoverColor: "hover:bg-[hsl(var(--chart-3)_/_0.15)]",
		icon: "💰",
		templates: [
			{
				name: "Matrice Ansoff",
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
		title: "Éxecution",
		color: "bg-[hsl(var(--chart-4)_/_0.1)]",
		borderColor: "border-[hsl(var(--chart-4)_/_0.2)]",
		hoverColor: "hover:bg-[hsl(var(--chart-4)_/_0.15)]",
		icon: "🚀",
		templates: [
			{
				name: "Skills Matrix",
				route: "/tools/business-plan/skills-matrix",
				description: "Cartographiez vos compétences",
			},
			{
				name: "Value Proposition",
				route: "/tools/business-plan/value-proposition",
				description: "Définissez votre proposition de valeur",
			},
		],
	},
	{
		id: "financial",
		title: "Plan Financier",
		color: "bg-[hsl(var(--chart-5)_/_0.1)]",
		borderColor: "border-[hsl(var(--chart-5)_/_0.2)]",
		hoverColor: "hover:bg-[hsl(var(--chart-5)_/_0.15)]",
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
	const router = useRouter();
	type ProgressType = {
		[key: string]: {
			[key: string]: number;
		};
	};

	const progress: ProgressType = useTemplateProgress();

	const getTemplateProgress = (sectionId: string, templateName: string) => {
		return progress[sectionId]?.[templateName] || 0;
	};

	const totalProgress = Math.round(
		Object.entries(progress).reduce((acc, [sectionId, section]) => {
			if (sectionId === "execution") {
				return acc + (section["Value Proposition"] || 0);
			}
			if (sectionId === "financial") {
				return acc; // Exclure la section financière
			}
			return (
				acc +
				Object.values(section).reduce((sum, value) => sum + value, 0)
			);
		}, 0) /
			(Object.values(progress).reduce(
				(acc, section) => acc + Object.keys(section).length,
				0
			) -
				4) // Ajuster pour exclure Skills Matrix et les 3 pages financières
	);

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
								<div className="flex items-center gap-3 bg-card px-4 py-2 rounded-lg">
									<Progress
										value={totalProgress}
										className="w-32 h-2"
									/>
									<span className="text-sm font-medium">
										{totalProgress}%
									</span>
								</div>
								<Button
									onClick={() => alert("Génération...")}
									className="bg-[hsl(var(--primary))] text-primary-foreground hover:bg-[hsl(var(--primary)_/_0.9)]"
									disabled={totalProgress < 70}
								>
									Générer le Business Plan
								</Button>
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
									const templateProgress =
										getTemplateProgress(
											section.id,
											template.name
										);
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
													{templateProgress ===
													100 ? (
														<CheckCircle2 className="w-5 h-5 text-green-500" />
													) : (
														<AlertCircle className="w-5 h-5 text-[hsl(var(--primary))]" />
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
