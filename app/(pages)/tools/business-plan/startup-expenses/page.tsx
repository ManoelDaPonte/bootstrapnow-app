"use client";

import React, { useState, useCallback } from "react";
import { Header } from "@/components/business-plan/shared/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/business-plan/startup-expenses/Overview";
import { Details } from "@/components/business-plan/startup-expenses/Details";
import { RiskAssessment } from "@/components/business-plan/startup-expenses/RiskAssessment";
import QASection from "@/components/business-plan/shared/QASection";
import {
	QA_DATA,
	INITIAL_FINANCIAL_DATA,
} from "@/lib/business-plan/config/startup-expenses";
import { FinancialData, FinancialEntry, Risk } from "@/types/startup-expenses";

const StartupExpenses: React.FC = () => {
	const [financialData, setFinancialData] = useState<FinancialData>(
		INITIAL_FINANCIAL_DATA
	);
	const [qaResponses, setQAResponses] = useState({});

	// Calcul du progrès
	const calculateProgress = useCallback(() => {
		const totalFields =
			(financialData.capital.investors.length +
				financialData.capital.loans.length +
				financialData.expenses.categories.length) *
				4 + // 4 champs par entrée financière
			financialData.risks.length * 4; // 4 champs par risque

		const filledFields: number =
			[
				...financialData.capital.investors,
				...financialData.capital.loans,
				...financialData.expenses.categories,
			].reduce((acc: number, entry: FinancialEntry) => {
				return (
					acc +
					((entry.name ? 1 : 0) +
						(entry.amount ? 1 : 0) +
						(entry.type ? 1 : 0) +
						(entry.category ? 1 : 0))
				);
			}, 0) +
			financialData.risks.reduce((acc: number, risk: Risk) => {
				return (
					acc +
					((risk.category ? 1 : 0) +
						(risk.probability ? 1 : 0) +
						(risk.impact ? 1 : 0) +
						(risk.mitigation ? 1 : 0))
				);
			}, 0);

		return Math.round((filledFields / totalFields) * 100);
	}, [financialData]);

	// Handlers pour Details
	const handleUpdateEntry = useCallback(
		(
			section: keyof FinancialData["capital"] | "expenses",
			id: string,
			field: keyof FinancialEntry,
			value: string | number
		) => {
			setFinancialData((prev: FinancialData) => {
				if (section === "expenses") {
					return {
						...prev,
						expenses: {
							...prev.expenses,
							categories: prev.expenses.categories.map(
								(entry: FinancialEntry) =>
									entry.id === id
										? { ...entry, [field]: value }
										: entry
							),
						},
					};
				}
				return {
					...prev,
					capital: {
						...prev.capital,
						[section]: prev.capital[section].map(
							(entry: FinancialEntry) =>
								entry.id === id
									? { ...entry, [field]: value }
									: entry
						),
					},
				};
			});
		},
		[]
	);

	const handleAddEntry = useCallback(
		(section: keyof FinancialData["capital"] | "expenses") => {
			const newEntry: FinancialEntry = {
				id: `${String(section)}_${Date.now()}`,
				name: "",
				amount: 0,
				type: "",
				category: "",
			};

			setFinancialData((prev: FinancialData) => {
				if (section === "expenses") {
					return {
						...prev,
						expenses: {
							...prev.expenses,
							categories: [...prev.expenses.categories, newEntry],
						},
					};
				}
				return {
					...prev,
					capital: {
						...prev.capital,
						[section]: [...prev.capital[section], newEntry],
					},
				};
			});
		},
		[]
	);

	const handleRemoveEntry = useCallback(
		(section: keyof FinancialData["capital"] | "expenses", id: string) => {
			setFinancialData((prev: FinancialData) => {
				if (section === "expenses") {
					return {
						...prev,
						expenses: {
							...prev.expenses,
							categories: prev.expenses.categories.filter(
								(entry: FinancialEntry) => entry.id !== id
							),
						},
					};
				}
				return {
					...prev,
					capital: {
						...prev.capital,
						[section]: prev.capital[section].filter(
							(entry: FinancialEntry) => entry.id !== id
						),
					},
				};
			});
		},
		[]
	);

	// Handlers pour RiskAssessment
	const handleUpdateRisk = useCallback(
		(index: number, field: keyof Risk, value: string | number) => {
			setFinancialData((prev: FinancialData) => ({
				...prev,
				risks: prev.risks.map((risk: Risk, i: number) =>
					i === index ? { ...risk, [field]: value } : risk
				),
			}));
		},
		[]
	);

	const handleAddRisk = useCallback((risk: Risk) => {
		setFinancialData((prev: FinancialData) => ({
			...prev,
			risks: [...prev.risks, risk],
		}));
	}, []);

	const handleRemoveRisk = useCallback((index: number) => {
		setFinancialData((prev: FinancialData) => ({
			...prev,
			risks: prev.risks.filter((_: Risk, i: number) => i !== index),
		}));
	}, []);

	return (
		<div className="flex flex-col h-screen">
			<Header
				title="Dépenses de Démarrage"
				progress={calculateProgress()}
			/>

			<div className="flex-1 max-w-7xl mx-auto w-full p-6 overflow-y-auto">
				<Tabs defaultValue="overview" className="space-y-6">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="overview">Vue globale</TabsTrigger>
						<TabsTrigger value="details">Détails</TabsTrigger>
						<TabsTrigger value="risks">
							Évaluation des Risques
						</TabsTrigger>
					</TabsList>

					<TabsContent value="overview">
						<Overview data={financialData} />
					</TabsContent>

					<TabsContent value="details">
						<Details
							data={financialData}
							onUpdate={handleUpdateEntry}
							onAdd={handleAddEntry}
							onRemove={handleRemoveEntry}
						/>
					</TabsContent>

					<TabsContent value="risks">
						<RiskAssessment
							risks={financialData.risks}
							onUpdate={handleUpdateRisk}
							onAdd={handleAddRisk}
							onRemove={handleRemoveRisk}
						/>
					</TabsContent>
				</Tabs>

				<QASection
					data={QA_DATA}
					responses={qaResponses}
					onResponseChange={(categoryId, response) =>
						setQAResponses((prev) => ({
							...prev,
							[categoryId]: response,
						}))
					}
				/>
			</div>
		</div>
	);
};

export default StartupExpenses;
