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
import { Trash2, Calculator, TrendingUp, AlertTriangle } from "lucide-react";
import { DetailsProps } from "@/types/startup-expenses";

export const Details: React.FC<DetailsProps> = ({
	data,
	onUpdate,
	onAdd,
	onRemove,
}) => {
	return (
		<Card className="bg-card">
			<CardHeader>
				<CardTitle className="text-xl font-semibold text-foreground">
					Détails financiers
				</CardTitle>
			</CardHeader>

			<CardContent className="space-y-6">
				{/* Section Investisseurs */}
				<div>
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-lg font-semibold text-foreground">
							Investisseurs
						</h3>
						<Button
							variant="outline"
							size="sm"
							onClick={() => onAdd("investors")}
							className="text-primary hover:text-primary/80 border-primary hover:bg-primary/10"
						>
							<Calculator className="mr-2 h-4 w-4" />
							Ajoutez un investisseur
						</Button>
					</div>
					<div className="overflow-auto rounded-lg border bg-background">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nom</TableHead>
									<TableHead>Quantité</TableHead>
									<TableHead>Type</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data.capital.investors.map((entry) => (
									<TableRow key={entry.id}>
										<TableCell>
											<Input
												value={entry.name}
												onChange={(e) =>
													onUpdate(
														"investors",
														entry.id,
														"name",
														e.target.value
													)
												}
												className="bg-background"
											/>
										</TableCell>
										<TableCell>
											<Input
												type="number"
												value={entry.amount}
												onChange={(e) =>
													onUpdate(
														"investors",
														entry.id,
														"amount",
														Number(e.target.value)
													)
												}
												className="bg-background"
											/>
										</TableCell>
										<TableCell>
											<Input
												value={entry.type}
												onChange={(e) =>
													onUpdate(
														"investors",
														entry.id,
														"type",
														e.target.value
													)
												}
												className="bg-background"
											/>
										</TableCell>
										<TableCell>
											<button
												onClick={() =>
													onRemove(
														"investors",
														entry.id
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
				</div>

				{/* Section Prêts */}
				<div>
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-lg font-semibold text-foreground">
							Prêts
						</h3>
						<Button
							variant="outline"
							size="sm"
							onClick={() => onAdd("loans")}
							className="text-primary hover:text-primary/80 border-primary hover:bg-primary/10"
						>
							<TrendingUp className="mr-2 h-4 w-4" />
							Ajoutez un prêt
						</Button>
					</div>
					<div className="overflow-auto rounded-lg border bg-background">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nom</TableHead>
									<TableHead>Quantité</TableHead>
									<TableHead>Type</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data.capital.loans.map((entry) => (
									<TableRow key={entry.id}>
										<TableCell>
											<Input
												value={entry.name}
												onChange={(e) =>
													onUpdate(
														"loans",
														entry.id,
														"name",
														e.target.value
													)
												}
												className="bg-background"
											/>
										</TableCell>
										<TableCell>
											<Input
												type="number"
												value={entry.amount}
												onChange={(e) =>
													onUpdate(
														"loans",
														entry.id,
														"amount",
														Number(e.target.value)
													)
												}
												className="bg-background"
											/>
										</TableCell>
										<TableCell>
											<Input
												value={entry.type}
												onChange={(e) =>
													onUpdate(
														"loans",
														entry.id,
														"type",
														e.target.value
													)
												}
												className="bg-background"
											/>
										</TableCell>
										<TableCell>
											<button
												onClick={() =>
													onRemove("loans", entry.id)
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
				</div>

				{/* Section Dépenses */}
				<div>
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-lg font-semibold text-foreground">
							Dépenses
						</h3>
						<Button
							variant="outline"
							size="sm"
							onClick={() => onAdd("expenses")}
							className="text-primary hover:text-primary/80 border-primary hover:bg-primary/10"
						>
							<AlertTriangle className="mr-2 h-4 w-4" />
							Ajoutez une dépense
						</Button>
					</div>
					<div className="overflow-auto rounded-lg border bg-background">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nom</TableHead>
									<TableHead>Quantité</TableHead>
									<TableHead>Type</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data.expenses.categories.map((entry) => (
									<TableRow key={entry.id}>
										<TableCell>
											<Input
												value={entry.name}
												onChange={(e) =>
													onUpdate(
														"expenses",
														entry.id,
														"name",
														e.target.value
													)
												}
												className="bg-background"
											/>
										</TableCell>
										<TableCell>
											<Input
												type="number"
												value={entry.amount}
												onChange={(e) =>
													onUpdate(
														"expenses",
														entry.id,
														"amount",
														Number(e.target.value)
													)
												}
												className="bg-background"
											/>
										</TableCell>
										<TableCell>
											<Input
												value={entry.type}
												onChange={(e) =>
													onUpdate(
														"expenses",
														entry.id,
														"type",
														e.target.value
													)
												}
												className="bg-background"
											/>
										</TableCell>
										<TableCell>
											<button
												onClick={() =>
													onRemove(
														"expenses",
														entry.id
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
				</div>
			</CardContent>
		</Card>
	);
};

export default Details;
