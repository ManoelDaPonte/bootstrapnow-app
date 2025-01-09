// components/business-plan/ui/CardItem.tsx
"use client";

import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Card } from "@/lib/config/types";
import ActionButton from "@/components/business-plan/ui/ActionButton";

interface CardItemProps {
	card: Card;
	onEdit: () => void;
	onDelete: () => void;
}

const CardItem: React.FC<CardItemProps> = ({ card, onEdit, onDelete }) => {
	return (
		<div className="bg-gray-100 p-3 rounded-md shadow flex justify-between items-center">
			<div>
				<span className="font-semibold">{card.title}:</span>
				<span className="ml-2 text-sm text-gray-600">
					{card.description}
				</span>
			</div>
			<div className="flex gap-2">
				<ActionButton
					icon={<FaEdit size={16} />}
					onClick={onEdit}
					color="blue"
					hoverColor="blue"
					ariaLabel="Éditer la carte"
				/>
				<ActionButton
					icon={<FaTrashAlt size={16} />}
					onClick={onDelete}
					color="red"
					hoverColor="red"
					ariaLabel="Supprimer la carte"
				/>
			</div>
		</div>
	);
};

export default CardItem;
