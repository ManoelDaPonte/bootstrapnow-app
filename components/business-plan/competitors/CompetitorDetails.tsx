import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Building2, Users, Trash2 } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { CompetitorEntry } from "@/types/competitors";

interface Field {
	key: keyof Omit<CompetitorEntry, "id" | "isMyCompany">;
	label: string;
	type: "text" | "number";
	placeholder: string;
}

interface CompetitorDetailsProps {
	competitors: CompetitorEntry[];
	onAdd: () => void;
	onUpdate: (
		id: string,
		field: keyof CompetitorEntry,
		value: string | number
	) => void;
	onRemove: (id: string) => void;
	onSave: () => void;
	fieldConfig: Record<string, string>;
}

const NoCompetitorsMessage: React.FC = () => (
	<div className="text-center py-8 bg-muted/10 border-2 border-dashed border-muted rounded-lg">
		<Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
		<p className="text-muted-foreground">
			Aucun concurrent n&apos;a été ajouté.
		</p>
	</div>
);

// Configuration des largeurs minimales pour chaque type de champ
const getFieldWidth = (key: string) => {
	switch (key) {
		case "nom":
			return "min-w-[250px]";
		case "description":
			return "min-w-[300px]";
		case "prix":
		case "valeurPercue":
			return "min-w-[150px]";
		default:
			return "min-w-[200px]";
	}
};

const CompanyRow: React.FC<{
	competitor: CompetitorEntry;
	fields: Field[];
	onUpdate: (
		id: string,
		field: keyof CompetitorEntry,
		value: string | number
	) => void;
	onSave: () => void;
}> = ({ competitor, fields, onUpdate, onSave }) => (
	<TableRow className="bg-primary/5 hover:bg-primary/10">
		{fields.map((field) => (
			<TableCell key={field.key} className="relative p-0">
				<div className="flex gap-2 items-center p-2">
					{field.key === "nom" && (
						<Building2 className="h-4 w-4 text-primary flex-shrink-0" />
					)}
					<Input
						type={field.type}
						value={String(competitor[field.key])}
						onChange={(e) => {
							const value =
								field.type === "number"
									? Number(e.target.value)
									: e.target.value;
							onUpdate(competitor.id, field.key, String(value));
						}}
						onBlur={onSave}
						className={`bg-transparent border-muted h-11 ${getFieldWidth(
							field.key
						)}`}
						placeholder={field.placeholder}
					/>
				</div>
				{field.key === "nom" && (
					<div className="absolute -top-3 left-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
						Votre entreprise
					</div>
				)}
			</TableCell>
		))}
		<TableCell className="w-24"></TableCell>
	</TableRow>
);

// Modification du CompetitorRow pour l'icône Trash
const CompetitorRow: React.FC<{
	competitor: CompetitorEntry;
	fields: Field[];
	onUpdate: (
		id: string,
		field: keyof CompetitorEntry,
		value: string | number
	) => void;
	onSave: () => void;
	onRemove: (id: string) => void;
}> = ({ competitor, fields, onUpdate, onSave, onRemove }) => (
	<TableRow className="hover:bg-muted/5">
		{fields.map((field) => (
			<TableCell key={field.key} className="p-0">
				<div className="p-2">
					<Input
						type={field.type}
						value={String(competitor[field.key])}
						onChange={(e) => {
							const value =
								field.type === "number"
									? Number(e.target.value)
									: e.target.value;
							onUpdate(competitor.id, field.key, value);
						}}
						onBlur={onSave}
						className={`bg-transparent h-11 ${getFieldWidth(
							field.key
						)}`}
						placeholder={field.placeholder}
					/>
				</div>
			</TableCell>
		))}
		<TableCell className="w-24">
			<Button
				variant="ghost"
				size="icon"
				onClick={() => onRemove(competitor.id)}
				className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
			>
				<Trash2 className="h-4 w-4" />
			</Button>
		</TableCell>
	</TableRow>
);

const CompetitorDetails: React.FC<CompetitorDetailsProps> = ({
	competitors,
	onAdd,
	onUpdate,
	onRemove,
	onSave,
	fieldConfig,
}) => {
	const myCompany = competitors.find((c) => c.isMyCompany);
	const otherCompetitors = competitors.filter((c) => !c.isMyCompany);

	const fields: Field[] = Object.entries(fieldConfig)
		.filter(([key]) => !["id", "isMyCompany"].includes(key))
		.map(([key, label]) => ({
			key: key as keyof Omit<CompetitorEntry, "id" | "isMyCompany">,
			label,
			type: key === "prix" || key === "valeurPercue" ? "number" : "text",
			placeholder: `Entrez ${label.toLowerCase()}`,
		}));

	return (
		<Card className="relative h-full">
			<CardHeader className="flex flex-row items-center justify-between sticky top-0 z-10 bg-background border-b">
				<div>
					<CardTitle className="text-xl font-semibold">
						Analyse détaillée des concurrents
					</CardTitle>
					<p className="text-sm text-muted-foreground mt-1">
						Commencez par renseigner les informations de votre
						entreprise, puis ajoutez vos concurrents
					</p>
				</div>
				<Button
					onClick={onAdd}
					variant="outline"
					className="text-primary hover:text-primary/80 border-primary hover:bg-primary/10"
				>
					<Plus className="mr-2 h-4 w-4" />
					Ajouter un concurrent
				</Button>
			</CardHeader>
			<CardContent className="p-0 relative">
				<div className="overflow-x-auto max-w-full">
					<div className="min-w-[1200px]">
						<Table>
							<TableHeader>
								<TableRow>
									{fields.map((field) => (
										<TableHead
											key={field.key}
											className={getFieldWidth(field.key)}
										>
											{field.label}
										</TableHead>
									))}
									<TableHead className="w-24">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{myCompany && (
									<CompanyRow
										competitor={myCompany}
										fields={fields}
										onUpdate={onUpdate}
										onSave={onSave}
									/>
								)}
								{otherCompetitors.length > 0 ? (
									otherCompetitors.map((competitor) => (
										<CompetitorRow
											key={competitor.id}
											competitor={competitor}
											fields={fields}
											onUpdate={onUpdate}
											onSave={onSave}
											onRemove={onRemove}
										/>
									))
								) : (
									<TableRow>
										<TableCell colSpan={fields.length + 1}>
											<NoCompetitorsMessage />
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default CompetitorDetails;
