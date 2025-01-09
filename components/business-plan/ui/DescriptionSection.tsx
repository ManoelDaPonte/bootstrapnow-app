// components/ui/DescriptionSection.tsx
"use client";

import React from "react";
import type { DescriptionSection } from "@/lib/config/types";

interface DescriptionSectionProps {
	section: DescriptionSection;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ section }) => {
	return (
		<div className="mb-4">
			<h3 className="text-lg font-semibold">{section.header}</h3>
			{section.content && (
				<p className="mt-1 text-gray-700">{section.content}</p>
			)}
			{section.list && (
				<ul className="list-disc list-inside mt-1 text-gray-600">
					{section.list.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default DescriptionSection;
