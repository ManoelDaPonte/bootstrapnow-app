import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ActionButton {
	label: string;
	href?: string;
	onClick?: () => void;
}

interface ActionCardProps {
	stepNumber: number;
	title: string;
	description: string;
	done: boolean;
	buttons?: ActionButton[];
	buttonLabel?: string;
	buttonHref?: string;
	onClick?: () => void;
}

export function ActionCard({
	stepNumber,
	title,
	description,
	done,
	buttons,
	buttonLabel,
	buttonHref,
	onClick,
}: ActionCardProps) {
	const hasLink = !!buttonHref && !onClick;

	const renderSingleButton = () => {
		if (!buttonLabel) return null;

		return (
			<Button
				variant={done ? "outline" : "default"}
				onClick={onClick}
				asChild={hasLink}
			>
				{hasLink ? (
					<Link href={buttonHref!}>{buttonLabel}</Link>
				) : (
					<span>{buttonLabel}</span>
				)}
			</Button>
		);
	};

	const renderMultipleButtons = () => {
		if (!buttons?.length) return null;

		return (
			<div className="flex flex-wrap gap-2 mt-2">
				{buttons.map((button, index) => (
					<Button
						key={index}
						variant="outline"
						asChild={!!button.href}
					>
						{button.href ? (
							<Link href={button.href}>{button.label}</Link>
						) : (
							<span onClick={button.onClick}>{button.label}</span>
						)}
					</Button>
				))}
			</div>
		);
	};

	return (
		<div
			className={cn(
				"p-4 bg-card rounded-lg shadow-md transition-colors space-y-2 border border-border",
				done && "border-green-500 bg-green-50 dark:bg-green-500/10"
			)}
		>
			<div className="flex items-center space-x-3">
				<div className="h-10 w-10 flex items-center justify-center rounded-full bg-background border border-border">
					{done ? (
						<CheckCircle className="text-green-500" />
					) : (
						<span className="w-3 h-3 bg-foreground rounded-full" />
					)}
				</div>
				<h2 className="font-semibold text-lg">
					Étape {stepNumber} : {title}
				</h2>
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
			{buttons ? renderMultipleButtons() : renderSingleButton()}
		</div>
	);
}

export default ActionCard;
