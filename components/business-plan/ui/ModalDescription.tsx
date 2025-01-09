// components/ui/ModalDescription.tsx
"use client";

import React from "react";
import { DescriptionContent } from "@/lib/config/types";
import DescriptionSection from "./DescriptionSection";
import { FaLightbulb } from "react-icons/fa";

interface ModalDescriptionProps {
	detailedDescription: DescriptionContent;
}

const ModalDescription: React.FC<ModalDescriptionProps> = ({
	detailedDescription,
}) => {
	return (
		<div className="flex-1 bg-gray-50 p-4 rounded-md border border-gray-200 max-h-80 overflow-y-auto">
			<h3 className="flex items-center gap-2 text-lg font-bold">
				Conseils <FaLightbulb className="text-orange-400" />
			</h3>
			<h4 className="text-xl mt-2">{detailedDescription.title}</h4>
			{detailedDescription.sections.map((section, index) => (
				<DescriptionSection key={index} section={section} />
			))}
		</div>
	);
};

export default ModalDescription;
