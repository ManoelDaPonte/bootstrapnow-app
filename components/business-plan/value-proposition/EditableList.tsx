import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ValuePropositionCard } from "@/types/value-proposition";

interface EditableListProps {
	items: ValuePropositionCard[];
	onAddItem: (content: string) => void;
	onUpdateItem: (id: number, content: string) => void;
	onDeleteItem: (id: number) => void;
}

export const EditableList: React.FC<EditableListProps> = ({
	items,
	onAddItem,
	onUpdateItem,
	onDeleteItem,
}) => {
	const [newItem, setNewItem] = useState<string>("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (newItem.trim()) {
			onAddItem(newItem.trim());
			setNewItem("");
		}
	};

	return (
		<div className="space-y-2">
			{items.map((item) => (
				<div key={item.id} className="flex items-start gap-2">
					<input
						type="text"
						value={item.content}
						onChange={(e) => onUpdateItem(item.id, e.target.value)}
						className="w-full p-1 border rounded text-sm bg-white/80"
					/>
					<button
						onClick={() => onDeleteItem(item.id)}
						className="text-red-500 hover:text-red-700 p-1"
						title="Supprimer"
					>
						<Trash2 size={16} />
					</button>
				</div>
			))}
			<form onSubmit={handleSubmit} className="flex gap-2">
				<input
					type="text"
					value={newItem}
					onChange={(e) => setNewItem(e.target.value)}
					placeholder="Ajouter..."
					className="w-full p-1 border rounded text-sm bg-white/80"
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
				>
					<Plus size={16} />
				</button>
			</form>
		</div>
	);
};
