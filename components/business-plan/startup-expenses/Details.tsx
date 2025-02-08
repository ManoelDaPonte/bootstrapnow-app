// components/business-plan/startup-expenses/Details.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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
	// DialogContent,
	// DialogHeader,
	// DialogTitle,
	DialogTrigger,
	// DialogClose,
} from "@/components/ui/dialog";
import {
	Plus,
	Trash2,
	Calculator,
	TrendingUp,
	AlertTriangle,
} from "lucide-react";
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
				<div className="flex justify-between items-center">
					<CardTitle className="text-xl font-semibold text-foreground">
						Détails financiers
					</CardTitle>
					<div className="flex space-x-2">
						<Dialog>
							<DialogTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className="text-primary hover:text-primary/80"
								>
									<Plus className="mr-2 h-4 w-4" />
									Nouvelle Catégorie
								</Button>
							</DialogTrigger>
							{/* ... Contenu du Dialog ... */}
						</Dialog>

						<Button
							variant="outline"
							size="sm"
							onClick={() => onAdd("investors")}
							className="bg-background hover:bg-muted"
						>
							<Calculator className="mr-2 h-4 w-4" />
							Ajoutez un investisseur
						</Button>

						<Button
							variant="outline"
							size="sm"
							onClick={() => onAdd("loans")}
							className="bg-background hover:bg-muted"
						>
							<TrendingUp className="mr-2 h-4 w-4" />
							Ajoutez un prêt
						</Button>

						<Button
							variant="outline"
							size="sm"
							onClick={() => onAdd("expenses")}
							className="bg-background hover:bg-muted"
						>
							<AlertTriangle className="mr-2 h-4 w-4" />
							Ajoutez une dépense
						</Button>
					</div>
				</div>
			</CardHeader>

			<CardContent className="space-y-6">
				{/* Section Investisseurs */}
				<div>
					<h3 className="text-lg font-semibold mb-4 text-foreground">
						Investisseurs
					</h3>
					<div className="overflow-auto rounded-lg border bg-background">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nom</TableHead>
									<TableHead>Quantité</TableHead>
									<TableHead>Type</TableHead>
									<TableHead>Catégorie</TableHead>
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
											<Select
												value={entry.category || ""}
												onValueChange={(val) =>
													onUpdate(
														"investors",
														entry.id,
														"category",
														val
													)
												}
											>
												<SelectTrigger className="bg-background">
													<SelectValue placeholder="Sélectionnez une catégorie" />
												</SelectTrigger>
												<SelectContent>
													{data.categoryDefinitions.investors.map(
														(cat) => (
															<SelectItem
																key={cat.id}
																value={cat.id}
															>
																{cat.name}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
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
					<h3 className="text-lg font-semibold mb-4 text-foreground">
						Prêts
					</h3>
					<div className="overflow-auto rounded-lg border bg-background">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nom</TableHead>
									<TableHead>Quantité</TableHead>
									<TableHead>Type</TableHead>
									<TableHead>Catégorie</TableHead>
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
											<Select
												value={entry.category || ""}
												onValueChange={(val) =>
													onUpdate(
														"loans",
														entry.id,
														"category",
														val
													)
												}
											>
												<SelectTrigger className="bg-background">
													<SelectValue placeholder="Sélectionnez une catégorie" />
												</SelectTrigger>
												<SelectContent>
													{data.categoryDefinitions.loans.map(
														(cat) => (
															<SelectItem
																key={cat.id}
																value={cat.id}
															>
																{cat.name}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
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
					<h3 className="text-lg font-semibold mb-4 text-foreground">
						Dépenses
					</h3>
					<div className="overflow-auto rounded-lg border bg-background">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nom</TableHead>
									<TableHead>Quantité</TableHead>
									<TableHead>Type</TableHead>
									<TableHead>Catégorie</TableHead>
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
											<Select
												value={entry.category || ""}
												onValueChange={(val) =>
													onUpdate(
														"expenses",
														entry.id,
														"category",
														val
													)
												}
											>
												<SelectTrigger className="bg-background">
													<SelectValue placeholder="Sélectionnez une catégorie" />
												</SelectTrigger>
												<SelectContent>
													{data.categoryDefinitions.expenses.map(
														(cat) => (
															<SelectItem
																key={cat.id}
																value={cat.id}
															>
																{cat.name}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
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
