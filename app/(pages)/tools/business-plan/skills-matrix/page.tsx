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
import { QAResponses } from "@/types/shared/qa-section";
import {
	SKILL_LEVELS,
	SKILLS_MATRIX_QA_DATA,
} from "@/lib/business-plan/config/skills-matrix";

interface TableRow {
	original: Person;
	id: string;
	getValue: (key: string) => any;
}

export default function SkillMatrixPage() {
	const {
		people,
		domains,
		isLoading,
		addPerson,
		addDomain,
		updateSkill,
		removePerson,
		removeDomain,
	} = useSkillMatrix();

	const [qaResponses, setQAResponses] = React.useState<QAResponses>({});

	const handleQAResponseChange = (categoryId: string, response: string) => {
		setQAResponses((prev) => ({
			...prev,
			[categoryId]: response,
		}));
	};

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
						<span>{domain.name}</span>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => removeDomain(domain.id)}
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				),
				cell: ({ row }: { row: TableRow }) => {
					const level = row.original.skills[domain.id] || 0;
					return (
						<div
							className={`rounded-lg ${
								SKILL_LEVELS[level as keyof typeof SKILL_LEVELS]
									.color
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
								className="w-full p-2 bg-transparent border-0 rounded-lg focus:ring-2 focus:ring-blue-500"
								title={
									SKILL_LEVELS[
										level as keyof typeof SKILL_LEVELS
									].label
								}
							>
								{Object.entries(SKILL_LEVELS).map(
									([value, { label }]) => (
										<option key={value} value={value}>
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
							<Button variant="ghost" className="h-8 w-8 p-0">
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								onClick={() => removePerson(row.original.id)}
								className="text-red-600"
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
		return <div>Chargement...</div>;
	}

	return (
		<div className="flex flex-col h-screen">
			<Header title="Skills Matrix" progress={100} />

			<div className="p-6 space-y-6">
				<div className="flex gap-4 mb-6">
					<AddPersonDialog onAdd={addPerson} />
					<AddDomainDialog onAdd={addDomain} />
				</div>

				<div className="rounded-md border bg-white">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead key={header.id}>
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
										className="h-24 text-center text-gray-500"
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
				/>
			</div>
		</div>
	);
}
