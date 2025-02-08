// components/business-plan/startup-expenses/RiskAssessment.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { RiskAssessmentProps } from "@/types/startup-expenses";

export const RiskAssessment: React.FC<RiskAssessmentProps> = ({
	risks,
	onUpdate,
	onAdd,
	onRemove,
}) => {
	const [newRisk, setNewRisk] = useState({
		category: "",
		probability: 0,
		impact: 0,
		mitigation: "",
	});
	const [errorProbability, setErrorProbability] = useState("");
	const [errorImpact, setErrorImpact] = useState("");

	const getRiskColor = (
		score: number,
		probability: number,
		impact: number
	) => {
		return {
			textColorProbability:
				probability >= 0.75
					? "text-destructive"
					: probability >= 0.5
					? "text-yellow-600 dark:text-yellow-500"
					: "text-green-600 dark:text-green-500",
			textColorImpact:
				impact >= 7.5
					? "text-destructive"
					: impact >= 5.0
					? "text-yellow-600 dark:text-yellow-500"
					: "text-green-600 dark:text-green-500",
			backgroundColor:
				score < 3
					? "bg-green-600 dark:bg-green-500"
					: score < 7
					? "bg-yellow-600 dark:bg-yellow-500"
					: "bg-destructive",
		};
	};

	return (
		<Card className="bg-card">
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle className="text-xl font-semibold text-foreground">
						Évaluation des risques
					</CardTitle>
					<Dialog>
						<DialogTrigger asChild>
							<Button>
								<Plus className="mr-2 h-4 w-4" />
								Ajoutez un risque
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									Ajouter un nouveau risque
								</DialogTitle>
							</DialogHeader>
							<div className="space-y-4">
								<Input
									placeholder="Catégorie de risque"
									value={newRisk.category}
									onChange={(e) =>
										setNewRisk((prev) => ({
											...prev,
											category: e.target.value,
										}))
									}
									className="bg-background"
								/>
								<div>
									<Input
										type="number"
										step="0.01"
										placeholder="Probabilité (0-1)"
										value={newRisk.probability}
										onChange={(e) => {
											const value =
												Number(e.target.value) || 0;
											setErrorProbability(
												value < 0 || value > 1
													? "La probabilité doit être entre 0 et 1"
													: ""
											);
											setNewRisk((prev) => ({
												...prev,
												probability: Math.min(
													1,
													Math.max(0, value)
												),
											}));
										}}
										className="bg-background"
									/>
									{errorProbability && (
										<p className="text-sm text-destructive mt-1">
											{errorProbability}
										</p>
									)}
								</div>

								<div>
									<Input
										type="number"
										step="0.1"
										placeholder="Impact (1-10)"
										value={newRisk.impact}
										onChange={(e) => {
											const value =
												Number(e.target.value) || 1;
											setErrorImpact(
												value < 1 || value > 10
													? "L'impact doit être entre 1 et 10"
													: ""
											);
											setNewRisk((prev) => ({
												...prev,
												impact: Math.min(
													10,
													Math.max(1, value)
												),
											}));
										}}
										className="bg-background"
									/>
									{errorImpact && (
										<p className="text-sm text-destructive mt-1">
											{errorImpact}
										</p>
									)}
								</div>

								<Input
									placeholder="Stratégie d'atténuation"
									value={newRisk.mitigation}
									onChange={(e) =>
										setNewRisk((prev) => ({
											...prev,
											mitigation: e.target.value,
										}))
									}
									className="bg-background"
								/>
								<DialogClose asChild>
									<Button
										onClick={() => onAdd(newRisk)}
										disabled={
											!newRisk.category.trim() ||
											!newRisk.probability ||
											!newRisk.impact
										}
										className="w-full"
									>
										Créer un risque
									</Button>
								</DialogClose>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</CardHeader>

			<CardContent>
				<div className="overflow-auto rounded-lg border bg-background">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Catégorie de Risque</TableHead>
								<TableHead>Probabilité</TableHead>
								<TableHead>Impact</TableHead>
								<TableHead>Atténuation</TableHead>
								<TableHead>Score</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{risks.map((risk, index) => {
								const score = (
									risk.probability * risk.impact
								).toFixed(1);
								const {
									textColorProbability,
									textColorImpact,
									backgroundColor,
								} = getRiskColor(
									parseFloat(score),
									risk.probability,
									risk.impact
								);

								return (
									<TableRow key={index}>
										<TableCell>
											<Input
												value={risk.category}
												onChange={(e) =>
													onUpdate(
														index,
														"category",
														e.target.value
													)
												}
												className="bg-background"
											/>
										</TableCell>
										<TableCell
											className={textColorProbability}
										>
											<Input
												type="number"
												step="0.01"
												value={risk.probability}
												onChange={(e) => {
													const value =
														Number(
															e.target.value
														) || 0;
													onUpdate(
														index,
														"probability",
														Math.min(
															1,
															Math.max(0, value)
														)
													);
												}}
												className="bg-background"
											/>
										</TableCell>
										<TableCell className={textColorImpact}>
											<Input
												type="number"
												step="0.1"
												value={risk.impact}
												onChange={(e) => {
													const value =
														Number(
															e.target.value
														) || 1;
													onUpdate(
														index,
														"impact",
														Math.min(
															10,
															Math.max(1, value)
														)
													);
												}}
												className="bg-background"
											/>
										</TableCell>
										<TableCell>
											<Input
												value={risk.mitigation}
												onChange={(e) =>
													onUpdate(
														index,
														"mitigation",
														e.target.value
													)
												}
												className="bg-background"
											/>
										</TableCell>
										<TableCell>
											<span
												className={`${backgroundColor} text-white font-medium px-3 py-1 rounded-full`}
											>
												{score}
											</span>
										</TableCell>
										<TableCell>
											<button
												onClick={() => onRemove(index)}
												className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
											>
												<Trash2 className="h-4 w-4" />
											</button>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
};
