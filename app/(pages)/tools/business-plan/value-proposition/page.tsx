// app/business-plan/value-proposition/page.tsx
"use client";

import React, { useState } from "react";
import { Plus, Trash2, HelpCircle } from "lucide-react";
import { useValuePropositionData } from "@/lib/hooks/business-plan/proposition-value/useValuePropositionData";
import type {
	ValuePropositionCategory,
	ValuePropositionCard,
	TooltipMessages,
} from "@/types/value-proposition";
import { calculateProgress } from "@/lib/hooks/business-plan/proposition-value/storage-value-proposition";
import { Header } from "@/components/business-plan/shared/Header";

const tooltips: TooltipMessages = {
	customerJobs:
		"Décrivez les tâches que vos clients essaient d'accomplir dans leur travail ou leur vie.",
	pains: "Listez les mauvaises expériences, émotions et risques que vos clients expérimentent.",
	gains: "Identifiez les bénéfices que vos clients attendent et les résultats positifs qu'ils désirent.",
	products:
		"Énumérez tous les produits et services que votre proposition de valeur constitue.",
	painRelievers:
		"Décrivez comment vos produits et services soulagent les problèmes spécifiques des clients.",
	gainCreators:
		"Expliquez comment vos produits et services créent des bénéfices pour vos clients.",
};

interface EditableListProps {
	items: ValuePropositionCard[];
	onAddItem: (content: string) => void;
	onUpdateItem: (id: number, content: string) => void;
	onDeleteItem: (id: number) => void;
}

const EditableList: React.FC<EditableListProps> = ({
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

interface SectionProps {
	title: string;
	items: ValuePropositionCard[];
	onAddItem: (content: string) => void;
	onUpdateItem: (id: number, content: string) => void;
	onDeleteItem: (id: number) => void;
	className: string;
	sectionKey: ValuePropositionCategory;
}

const Section: React.FC<SectionProps> = ({
	title,
	items,
	onAddItem,
	onUpdateItem,
	onDeleteItem,
	className,
	sectionKey,
}) => (
	<div className={`p-3 relative group ${className}`}>
		<div className="flex items-center justify-between mb-2">
			<h3 className="text-sm font-semibold text-gray-800">{title}</h3>
			<div className="relative">
				<HelpCircle
					size={16}
					className="text-gray-400 hover:text-gray-600 cursor-help"
				/>
				<div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-white rounded shadow-lg text-xs text-gray-600 hidden group-hover:block">
					{tooltips[sectionKey]}
				</div>
			</div>
		</div>
		<EditableList
			items={items}
			onAddItem={onAddItem}
			onUpdateItem={onUpdateItem}
			onDeleteItem={onDeleteItem}
		/>
	</div>
);

const ValuePropositionCanvas: React.FC = () => {
	const {
		data,
		isLoading,
		handleSaveItem,
		handleUpdateItem,
		handleDeleteItem,
	} = useValuePropositionData();

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-gray-600">Chargement...</div>
			</div>
		);
	}

	const renderSection = (
		category: ValuePropositionCategory,
		title: string,
		className: string
	) => (
		<Section
			title={title}
			items={data[category]}
			onAddItem={(content) => handleSaveItem(category, content)}
			onUpdateItem={(id, content) =>
				handleUpdateItem(category, id, content)
			}
			onDeleteItem={(id) => handleDeleteItem(category, id)}
			className={className}
			sectionKey={category}
		/>
	);

	return (
		<div className="min-h-screen flex flex-col">
			{/* Header */}
			<Header
				title="Value-Proposition"
				progress={calculateProgress(data)}
			/>

			{/* Canvas Container */}
			<div className="flex-1 flex items-center justify-center">
				<div className="max-w-6xl w-full p-8">
					<div className="relative flex flex-col lg:flex-row justify-center gap-4">
						{/* Customer Segment (Circle) */}
						<div className="lg:w-1/2 relative">
							<div className="aspect-square rounded-full border-4 border-blue-500 p-2 bg-blue-50">
								<div className="h-full flex flex-col">
									{renderSection(
										"customerJobs",
										"Tâches du Client",
										"flex-1 border-b-2 border-blue-200"
									)}
									<div className="flex flex-1">
										{renderSection(
											"pains",
											"Problèmes",
											"flex-1 border-r-2 border-blue-200"
										)}
										{renderSection(
											"gains",
											"Gains Attendus",
											"flex-1"
										)}
									</div>
								</div>
							</div>
						</div>

						{/* Value Proposition (Square) */}
						<div className="lg:w-1/2 relative">
							<div className="aspect-square border-4 border-green-500 p-2 bg-green-50">
								<div className="h-full flex flex-col">
									{renderSection(
										"products",
										"Produits & Services",
										"flex-1 border-b-2 border-green-200"
									)}
									<div className="flex flex-1">
										{renderSection(
											"painRelievers",
											"Solutions aux Problèmes",
											"flex-1 border-r-2 border-green-200"
										)}
										{renderSection(
											"gainCreators",
											"Créateurs de Gains",
											"flex-1"
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ValuePropositionCanvas;
