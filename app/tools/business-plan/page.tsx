"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleProgressRing } from "@/components/ui/circle-progress-ring";

interface Template {
	title: string;
	route: string;
	image: string;
	progress: number;
}

interface Step {
	title: string;
	range: [number, number];
}

const templates: Template[] = [
	{
		title: "Étude de marché",
		route: "/tools/business-plan/etude-marche",
		image: "BM-canvas.png",
		progress: 75,
	},
	{
		title: "Funnel Chart",
		route: "/tools/business-plan/funnel-chart",
		image: "Funnel-canvas.png",
		progress: 60,
	},
	{
		title: "Marketing Mix",
		route: "/tools/business-plan/marketing-mix",
		image: "MMix-canvas.png",
		progress: 80,
	},
	{
		title: "PESTEL",
		route: "/tools/business-plan/pestel",
		image: "Pestel-canvas.png",
		progress: 50,
	},
	{
		title: "Modèle économique",
		route: "/tools/business-plan/ansoff",
		image: "Ansoff-canvas.png",
		progress: 90,
	},
	{
		title: "SWOT",
		route: "/tools/business-plan/swot",
		image: "Swot-canvas.png",
		progress: 65,
	},
	{
		title: "Skills Matrix",
		route: "/tools/business-plan/skills-matrix",
		image: "SkillMatrix-canvas.png",
		progress: 70,
	},
	{
		title: "Value Proposition",
		route: "/tools/business-plan/value-proposition",
		image: "ValueProposition-canvas.png",
		progress: 85,
	},
];

const steps: Step[] = [
	{ title: "Étape 1 : Étude de marché", range: [0, 2] },
	{ title: "Étape 2 : Stratégie", range: [2, 4] },
	{ title: "Étape 3 : Modèle économique", range: [4, 6] },
	{ title: "Étape 4 : Éxecution", range: [6, 8] },
];

export default function BusinessPlanPage() {
	const router = useRouter();

	const handleCardClick = (route: string) => {
		router.push(route);
	};

	return (
		<div className="p-8 space-y-8">
			{/* Bouton "GÉNÉRER LE BUSINESS PLAN" */}
			<div className="flex justify-end">
				<Button
					variant="orange"
					size="sm"
					onClick={() => alert("Génération...")}
				>
					GÉNÉRER LE BUSINESS PLAN
				</Button>
			</div>

			{/* Grid qui affiche chaque colonne (chaque étape) */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
				{steps.map((step) => {
					const [start, end] = step.range;
					const chunk = templates.slice(start, end);

					return (
						<div key={step.title} className="space-y-4">
							{/* Titre de l’étape plus petit, uppercase, et souligné en bas */}
							<h2 className="text-sm font-semibold uppercase border-b pb-1">
								{step.title}
							</h2>

							{chunk.map((template, index) => (
								<Card
									key={`${template.title}-${index}`}
									onClick={() =>
										handleCardClick(template.route)
									}
									className="
    relative cursor-pointer overflow-hidden 
    transition-shadow hover:shadow-lg 
    w-full h-64 rounded-lg
  "
								>
									{/* 1) Conteneur pour l'image de fond */}
									<div className="absolute inset-0 transition-transform hover:scale-105">
										{/* L'image en background */}
										<div
											className="absolute inset-0 bg-center bg-cover"
											style={{
												backgroundImage: `url(/business-plan/${template.image})`,
											}}
										/>
										{/* Le calque qui ajoute la transparence (pour voir le flou) */}
										<div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
									</div>

									{/* 2) Conteneur pour le contenu par-dessus l’image */}
									<div className="relative z-10 flex flex-col h-full w-full">
										<CardHeader className="flex-grow-0 flex-shrink-0 flex items-center justify-center bg-transparent h-14">
											<CardTitle className="text-lg font-bold text-center">
												{template.title}
											</CardTitle>
										</CardHeader>

										<CardContent className="flex-grow flex items-center justify-center">
											<CircleProgressRing
												value={template.progress}
												strokeWidth={8}
												colorStroke="text-[hsl(var(--primary))]"
												colorTrack="text-[hsl(var(--muted-foreground))]"
											/>
										</CardContent>
									</div>
								</Card>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
}
