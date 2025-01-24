//components/business-plan/skills-matrix/AddPersonDialog.tsx
import * as React from "react";
import { Plus } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddPersonDialog = ({ onAdd }: { onAdd: (name: string) => void }) => {
	const [name, setName] = React.useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (name.trim()) {
			onAdd(name);
			setName("");
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Plus className="mr-2 h-4 w-4" />
					Ajouter une personne
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Ajouter une nouvelle personne</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						placeholder="Nom de la personne"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Button type="submit">Ajouter</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};
export default AddPersonDialog;
