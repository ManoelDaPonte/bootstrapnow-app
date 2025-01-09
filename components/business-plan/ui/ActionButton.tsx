// components/ui/ActionButton.tsx
"use client";

import React from "react";

interface ActionButtonProps {
	icon: React.ReactElement;
	onClick: () => void;
	color: string;
	hoverColor: string;
	ariaLabel: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
	icon,
	onClick,
	color,
	hoverColor,
	ariaLabel,
}) => {
	return (
		<button
			onClick={onClick}
			className={`flex items-center justify-center p-1 rounded-md ${color}-500 hover:${hoverColor}-600`}
			aria-label={ariaLabel}
		>
			{icon}
		</button>
	);
};

export default ActionButton;
