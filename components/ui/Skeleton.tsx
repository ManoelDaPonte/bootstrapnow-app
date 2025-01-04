"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
	className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
	return <div className={cn("animate-pulse rounded bg-muted", className)} />;
}
