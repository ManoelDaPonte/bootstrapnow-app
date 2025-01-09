// components/business-plan/ui/SectionCard.tsx
"use client";

import React from "react";
import { SectionConfig, TeamMember, Card } from "@/lib/config/types";
import CardItem from "@/components/business-plan/ui/CardItem";
import { FaInfoCircle } from "react-icons/fa";

interface SectionCardProps {
	section: SectionConfig;
	shortDescription: string;
	onClick: () => void;
	cardList: TeamMember[] | Card[];
	onEdit: (member: TeamMember | Card) => void;
	onDelete: (member: TeamMember | Card) => void;
}

const SectionCard: React.FC<SectionCardProps> = ({
	section,
	shortDescription,
	onClick,
	cardList,
	onEdit,
	onDelete,
}) => {
	return (
		<div
			className={`flex flex-col p-4 rounded-md bg-white border border-gray-200 shadow relative hover:shadow-lg transition-shadow ${
				section.className || ""
			}`}
		>
			{/* Icône et Titre */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="text-2xl text-gray-700">{section.icon}</div>
					<h2
						className={`text-xl font-semibold ${
							section.titleClass || ""
						}`}
					>
						{section.title}
					</h2>
				</div>
				<button
					onClick={(e) => e.stopPropagation()} // Empêche d'activer onClick de la carte
					aria-label={`Afficher l'aide de ${section.title}`}
					className="text-gray-500 hover:text-gray-700 group relative"
				>
					<FaInfoCircle />
					{/* Tooltip */}
					<div className="absolute left-0 top-full mt-2 p-2 w-64 bg-white border rounded shadow hidden group-hover:block">
						<p className="text-sm text-gray-700">
							{shortDescription}
						</p>
					</div>
				</button>
			</div>

			{/* Infobulle (description courte) */}
			{shortDescription && (
				<div className="mt-2">
					<p className="text-sm text-gray-600">{shortDescription}</p>
				</div>
			)}

			{/* Liste des cartes */}
			<div className="mt-4 flex flex-col gap-2">
				{cardList && cardList.length > 0 ? (
					cardList.map((member) => (
						<CardItem
							key={member.id}
							card={{
								id: member.id,
								title:
									"title" in member
										? member.title
										: (member as TeamMember).name,
								description:
									"description" in member
										? member.description
										: (member as TeamMember).role,
							}}
							onEdit={() => onEdit(member)}
							onDelete={() => onDelete(member)}
						/>
					))
				) : (
					<p className="text-sm text-gray-500">
						Aucun élément ajouté.
					</p>
				)}
			</div>

			{/* Bouton + Ajouter un élément */}
			<button
				className="mt-2 flex items-center justify-center w-full h-10 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-100 transition"
				onClick={onClick}
				aria-label={`Ajouter un élément à ${section.title}`}
			>
				+
			</button>
		</div>
	);
};

export default SectionCard;
