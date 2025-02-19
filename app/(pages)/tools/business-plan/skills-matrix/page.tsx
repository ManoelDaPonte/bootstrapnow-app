"use client";

import * as React from "react";
import { useSkillMatrix } from "@/lib/business-plan/hooks/skills-matrix/useSkillMatrix";
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	getSortedRowModel,
	getFilteredRowModel,
} from "@tanstack/react-table";
import { Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddPersonDialog from "@/components/business-plan/skills-matrix/AddPersonDialog";
import AddDomainDialog from "@/components/business-plan/skills-matrix/AddDomainDialog";
import QASection from "@/components/business-plan/shared/QASection";
import { Person, Domain } from "@/types/skill-matrix";
import { Header } from "@/components/business-plan/shared/Header";
import {
	SKILL_LEVELS,
	SKILLS_MATRIX_QA_DATA,
} from "@/lib/business-plan/config/skills-matrix";
import { calculateProgress } from "@/lib/business-plan/hooks/skills-matrix/storage-skills-matrix";

// Style mapping pour les niveaux de compétence
const SKILL_LEVEL_STYLES = {
	0: "bg-secondary/20 hover:bg-secondary/30",
	1: "bg-blue-500/10 hover:bg-blue-500/20",
	2: "bg-emerald-500/20 hover:bg-emerald-500/30",
	3: "bg-purple-500/20 hover:bg-purple-500/30",
	4: "bg-orange-500/20 hover:bg-orange-500/30",
	5: "bg-primary/20 hover:bg-primary/30",
} as const;

interface TableRow {
	original: Person;
	id: string;
	getValue: (key: string) => any;
}

export default function SkillMatrixPage() {
	const {
		people,
		domains,
		qaResponses,
		isLoading,
		addPerson,
		addDomain,
		updateSkill,
		removePerson,
		removeDomain,
		handleQAResponseChange,
		handleQAResponseSave,
	} = useSkillMatrix();

	const columns = React.useMemo(
		() => [
			{
				accessorKey: "name",
				header: "Nom",
			},
			...domains.map((domain: Domain) => ({
				accessorKey: `skills.${domain.id}`,
				header: () => (
					<div className="flex items-center justify-between">
						<span className="font-medium text-foreground">
							{domain.name}
						</span>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => removeDomain(domain.id)}
							className="text-muted-foreground hover:text-destructive"
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				),
				cell: ({ row }: { row: TableRow }) => {
					const level = row.original.skills[domain.id] || 0;
					return (
						<div
							className={`rounded-lg transition-colors duration-200 ${
								SKILL_LEVEL_STYLES[
									level as keyof typeof SKILL_LEVEL_STYLES
								]
							}`}
						>
							<select
								value={level}
								onChange={(e) =>
									updateSkill(
										row.original.id,
										domain.id,
										Number(e.target.value)
									)
								}
								className="w-full p-2 bg-transparent border-0 rounded-lg ring-offset-background 
                                         focus:ring-2 focus:ring-ring focus:ring-offset-2
                                         text-foreground"
								title={
									SKILL_LEVELS[
										level as keyof typeof SKILL_LEVELS
									].label
								}
							>
								{Object.entries(SKILL_LEVELS).map(
									([value, { label }]) => (
										<option
											key={value}
											value={value}
											className="bg-background text-foreground"
										>
											{`${value} - ${label}`}
										</option>
									)
								)}
							</select>
						</div>
					);
				},
			})),
			{
				id: "actions",
				header: "",
				cell: ({ row }: { row: TableRow }) => (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
							>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem
								onClick={() => removePerson(row.original.id)}
								className="text-destructive focus:text-destructive"
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Supprimer
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				),
			},
		],
		[domains, removeDomain, updateSkill, removePerson]
	);

	const table = useReactTable({
		data: people,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-lg">Chargement...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background flex flex-col">
			<Header
				title="Skills Matrix"
				progress={calculateProgress({ people, domains }, qaResponses)}
			/>

			<div className="flex-1 p-6 space-y-12 max-w-[1600px] mx-auto w-full">
				<div className="flex gap-4">
					<AddPersonDialog onAdd={addPerson} />
					<AddDomainDialog onAdd={addDomain} />
				</div>

				<div className="rounded-md border bg-card">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											className="text-muted-foreground"
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												  )}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow key={row.id}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center text-muted-foreground"
									>
										Aucune donnée dans la matrice des
										compétences
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>

				<QASection
					data={SKILLS_MATRIX_QA_DATA}
					responses={qaResponses}
					onResponseChange={handleQAResponseChange}
					onResponseSave={handleQAResponseSave}
				/>
			</div>
		</div>
	);
}
