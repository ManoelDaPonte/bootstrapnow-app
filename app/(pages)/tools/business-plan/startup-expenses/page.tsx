"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Plus,
  Trash2,
  Calculator,
  TrendingUp,
  AlertTriangle,
  Car,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

// Types definitions
interface FinancialEntry {
  id: string;
  name: string;
  amount: number;
  type: string;
  category?: string;
}

interface CategoryDefinition {
  id: string;
  name: string;
  color: string;
}

interface Risk {
  category: string;
  probability: number;
  impact: number;
  mitigation: string;
}

interface StartupFinancialData {
  capital: {
    investors: FinancialEntry[];
    loans: FinancialEntry[];
  };
  expenses: {
    categories: FinancialEntry[];
  };
  revenue: number;
  projections: {
    year1: number;
    year2: number;
    year3: number;
  };
  risks: Risk[];
  categoryDefinitions: {
    investors: CategoryDefinition[];
    loans: CategoryDefinition[];
    expenses: CategoryDefinition[];
  };
}

const StartupFinancialDashboard: React.FC = () => {
  const [financialData, setFinancialData] = useState<StartupFinancialData>({
    capital: {
      investors: [
        {
          id: "inv1",
          name: "Investor 1",
          amount: 10000,
          type: "seed",
          category: "tech",
        },
        {
          id: "inv2",
          name: "Business Angel",
          amount: 25000,
          type: "series-a",
          category: "venture",
        },
      ],
      loans: [
        {
          id: "loan1",
          name: "Bank Loan",
          amount: 20000,
          type: "secured",
          category: "working-capital",
        },
      ],
    },
    expenses: {
      categories: [
        {
          id: "exp1",
          name: "Technology Development",
          amount: 5000,
          type: "operational",
          category: "tech",
        },
        {
          id: "exp2",
          name: "Marketing",
          amount: 3000,
          type: "marketing",
          category: "growth",
        },
        {
          id: "exp3",
          name: "Operations",
          amount: 7000,
          type: "administrative",
          category: "overhead",
        },
      ],
    },
    revenue: 50000,
    projections: {
      year1: 60000,
      year2: 75000,
      year3: 90000,
    },
    risks: [
      {
        category: "Market Risk",
        probability: 0.3,
        impact: 0.7,
        mitigation: "Market diversification strategy",
      },
      {
        category: "Technical Risk",
        probability: 0.2,
        impact: 0.5,
        mitigation: "Regular technical audits",
      },
    ],
    categoryDefinitions: {
      investors: [
        { id: "tech", name: "Technology Investors", color: "#3B82F6" },
        { id: "venture", name: "Venture Capital", color: "#10B981" },
      ],
      loans: [
        {
          id: "working-capital",
          name: "Working Capital",
          color: "#F43F5E",
        },
      ],
      expenses: [
        { id: "tech", name: "Technology", color: "#6366F1" },
        { id: "growth", name: "Growth", color: "#8B5CF6" },
        { id: "overhead", name: "Overhead", color: "#EF4444" },
      ],
    },
  });

  const [newCategoryDialogOpen, setNewCategoryDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    type: "investors" as keyof StartupFinancialData["categoryDefinitions"],
  });
  const [newRiskDialogOpen, setNewRiskDialogOpen] = useState(false);
  const [newRisk, setNewRisk] = useState<Risk>({
    category: "",
    probability: 0,
    impact: 0,
    mitigation: "",
  });
  const [errorProbability, setErrorProbability] = useState("");
  const [errorImpact, setErrorImpact] = useState("");

  const addNewCategory = useCallback(() => {
    if (!newCategory.name.trim()) return;

    const newCategoryId = newCategory.name.toLowerCase().replace(/\s+/g, "-");
    const newCategoryEntry = {
      id: newCategoryId,
      name: newCategory.name.trim(),
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    };

    setFinancialData((prev) => ({
      ...prev,
      categoryDefinitions: {
        ...prev.categoryDefinitions,
        [newCategory.type]: [...prev.categoryDefinitions[newCategory.type], newCategoryEntry],
      },
    }));

    setNewCategoryDialogOpen(false);
    setNewCategory({ name: "", type: "investors" });
  }, [newCategory]);

  const addNewEntry = useCallback(
    (section: keyof StartupFinancialData["capital"] | "expenses") => {
      const newId = `${section}_${Date.now()}`;
      const newEntry: FinancialEntry = {
        id: newId,
        name: "New Entry",
        amount: 0,
        type: "default",
        category: financialData.categoryDefinitions[section][0]?.id,
      };

      setFinancialData((prev) => {
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
    [financialData.categoryDefinitions]
  );

  const removeEntry = useCallback(
    (section: keyof StartupFinancialData["capital"] | "expenses", id: string) => {
      setFinancialData((prev) => {
        if (section === "expenses") {
          return {
            ...prev,
            expenses: {
              ...prev.expenses,
              categories: prev.expenses.categories.filter((entry) => entry.id !== id),
            },
          };
        }
        return {
          ...prev,
          capital: {
            ...prev.capital,
            [section]: prev.capital[section].filter((entry) => entry.id !== id),
          },
        };
      });
    },
    []
  );

  const updateEntry = useCallback(
    (
      section: keyof StartupFinancialData["capital"] | "expenses",
      id: string,
      field: keyof FinancialEntry,
      value: string | number
    ) => {
      setFinancialData((prev) => {
        if (section === "expenses") {
          return {
            ...prev,
            expenses: {
              ...prev.expenses,
              categories: prev.expenses.categories.map((entry) =>
                entry.id === id ? { ...entry, [field]: value } : entry
              ),
            },
          };
        }
        return {
          ...prev,
          capital: {
            ...prev.capital,
            [section]: prev.capital[section].map((entry) =>
              entry.id === id ? { ...entry, [field]: value } : entry
            ),
          },
        };
      });
    },
    []
  );

  const addNewRisk = useCallback(() => {
	// On vérifie que category, probability, et impact sont valides
	if (!newRisk.category.trim() || !newRisk.probability || !newRisk.impact)
		return;

	// Création de l'objet de risque avec mitigation
	const newRiskEntry: Risk = {
		category: newRisk.category.trim(),
		probability: newRisk.probability,
		impact: newRisk.impact,
		mitigation: newRisk.mitigation.trim() || "No mitigation specified", // Assure-toi que mitigation existe
	};

	// Mise à jour de l'état avec le nouveau risque
	setFinancialData((prev) => ({
		...prev,
		risks: [...prev.risks, newRiskEntry], // Ajouter le risque
	}));

	// Fermeture du dialogue et réinitialisation des données
	setNewRiskDialogOpen(false);
	setNewRisk({
		category: "",
		probability: 0,
		impact: 0,
		mitigation: "", // Réinitialisation avec mitigation vide
	});
}, [newRisk]);

const updateRisk = useCallback(
	(index: number, field: keyof Risk, value: string | number) => {
	  setFinancialData((prev) => {
		const updatedRisks = prev.risks.map((risk, idx) =>
		  idx === index
			? {
				...risk,
				[field]: value,
			  }
			: risk
		);
		return {
		  ...prev,
		  risks: updatedRisks,
		};
	  });
	},
	[]
  );

  const removeRisk = useCallback((index: number) => {
    setFinancialData((prev) => ({
      ...prev,
      risks: prev.risks.filter((_, idx) => idx !== index),
    }));
  }, []);

  const getRiskColor = (score: number, probability: number, impact: number) => {
    const textColorProbability =
      probability >= 0.75 ? "text-red-600" : probability >= 0.50 ? "text-yellow-600" : "text-green-600";

    const textColorImpact =
      impact >= 7.5 ? "text-red-600" : impact >= 5.0 ? "text-yellow-600" : "text-green-600";

    const backgroundColor =
      score < 3 ? "bg-red-600" : score < 7 ? "bg-yellow-600" : "bg-green-600";

    return { textColorProbability, textColorImpact, backgroundColor };
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Vue globale</TabsTrigger>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="risks">Évaluation des Risques</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Finances globales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Répartition du capital</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[...financialData.capital.investors, ...financialData.capital.loans]}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                      >
                        {[...financialData.capital.investors, ...financialData.capital.loans].map(
                          (entry) => (
                            <Cell
                              key={entry.id}
                              fill={
                                financialData.categoryDefinitions.investors.find(
                                  (cat) => cat.id === entry.category
                                )?.color ||
                                financialData.categoryDefinitions.loans.find(
                                  (cat) => cat.id === entry.category
                                )?.color
                              }
                            />
                          )
                        )}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Détail des dépenses</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={financialData.expenses.categories}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
					  <YAxis 
						tick={{ fontSize: 12 }} 
						tickFormatter={(value) => {
							const formattedValue = Math.abs(value).toLocaleString();
							return value === 0 ? `${formattedValue}` : `€${formattedValue}`;
						}}
						/>
                      <Tooltip />
                      <Bar dataKey="amount" fill="#8884d8" fillOpacity={0.7} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
		  <Card>
		  	<CardHeader>
              <CardTitle>Risques globaux</CardTitle>
            </CardHeader>
            <CardContent>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={financialData.risks}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="category" />
				<YAxis domain={[0, 10]} /> {/* Score max basé sur l'impact max */}
				<Tooltip />
				<Legend />
				<Bar dataKey={(risk) => (risk.probability * risk.impact).toFixed(2)} fill="#ff6384" name="Score de Risque" />
				</BarChart>
			</ResponsiveContainer>
			</CardContent>
		  </Card>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Détails financier
                <div className="flex space-x-2">
                  <Dialog open={newCategoryDialogOpen} onOpenChange={setNewCategoryDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />  Nouvelle Catégorie
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ajoutez une nouvelle catégorie</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Select
                          value={newCategory.type}
                          onValueChange={(val) =>
                            setNewCategory((prev) => ({
                              ...prev,
                              type: val as keyof StartupFinancialData["categoryDefinitions"],
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {(["investors", "loans", "expenses"] as const).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="Category Name"
                          value={newCategory.name}
                          onChange={(e) =>
                            setNewCategory((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />
                        <DialogClose asChild>
                          <Button onClick={addNewCategory} disabled={!newCategory.name.trim()}>
                            Creer une catégorie
                          </Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm" onClick={() => addNewEntry("investors")}>
                    <Calculator className="mr-2 h-4 w-4" />
                    Ajoutez un investisseur
                  </Button>

                  <Button variant="outline" size="sm" onClick={() => addNewEntry("loans")}>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Ajoutez un prêt
                  </Button>

                  <Button variant="outline" size="sm" onClick={() => addNewEntry("expenses")}>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Ajoutez une dépense
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Investors Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Investisseurs</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Categorie</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialData.capital.investors.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <Input
                            value={entry.name}
                            onChange={(e) =>
                              updateEntry("investors", entry.id, "name", e.target.value)
                            }
                            placeholder="Nom"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={entry.amount}
                            onChange={(e) =>
                              updateEntry("investors", entry.id, "amount", Number(e.target.value))
                            }
                            placeholder="Quantité"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={entry.type}
                            onChange={(e) =>
                              updateEntry("investors", entry.id, "type", e.target.value)
                            }
                            placeholder="Type"
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={entry.category || ""}
                            onValueChange={(val) =>
                              updateEntry("investors", entry.id, "category", val)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selectionnez une catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                              {financialData.categoryDefinitions.investors.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeEntry("investors", entry.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Loans Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Prêts</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
					  <TableHead>Nom</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Categorie</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialData.capital.loans.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <Input
                            value={entry.name}
                            onChange={(e) =>
                              updateEntry("loans", entry.id, "name", e.target.value)
                            }
                            placeholder="Entry Name"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={entry.amount}
                            onChange={(e) =>
                              updateEntry("loans", entry.id, "amount", Number(e.target.value))
                            }
                            placeholder="Amount"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={entry.type}
                            onChange={(e) =>
                              updateEntry("loans", entry.id, "type", e.target.value)
                            }
                            placeholder="Type"
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={entry.category || ""}
                            onValueChange={(val) =>
                              updateEntry("loans", entry.id, "category", val)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {financialData.categoryDefinitions.loans.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeEntry("loans", entry.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Expenses Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Dépenses</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
					  <TableHead>Nom</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Categorie</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialData.expenses.categories.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <Input
                            value={entry.name}
                            onChange={(e) =>
                              updateEntry("expenses", entry.id, "name", e.target.value)
                            }
                            placeholder="Entry Name"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={entry.amount}
                            onChange={(e) =>
                              updateEntry("expenses", entry.id, "amount", Number(e.target.value))
                            }
                            placeholder="Amount"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={entry.type}
                            onChange={(e) =>
                              updateEntry("expenses", entry.id, "type", e.target.value)
                            }
                            placeholder="Type"
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={entry.category || ""}
                            onValueChange={(val) =>
                              updateEntry("expenses", entry.id, "category", val)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {financialData.categoryDefinitions.expenses.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeEntry("expenses", entry.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risks Tab */}
        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle>Évaluation des risques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <Dialog open={newRiskDialogOpen} onOpenChange={setNewRiskDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Ajoutez un risque
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ajouter un nouveau risque</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Catégorie de risque"
                        value={newRisk.category}
                        onChange={(e) =>
                          setNewRisk((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                      />
					<div>
					<Input
						type="number"
						step="0.01"
						placeholder="Probabilité (0-1)"
						value={newRisk.probability}
						onChange={(e) => {
						let value = Number(e.target.value) || 0;
						if (value < 0 || value > 1) {
							setErrorProbability("La probabilité doit être entre 0 et 1.");
						} else {
							setErrorProbability("");
						}
						setNewRisk((prev) => ({
							...prev,
							probability: Math.min(1, Math.max(0, value)), // Restriction entre 0 et 1
						}));
						}}
					/>
					{errorProbability && (
						<p className="text-red-600 text-sm">{errorProbability}</p>
					)}
					</div>

					<div>
					<Input
						type="number"
						step="0.1"
						placeholder="Impact (1-10)"
						value={newRisk.impact}
						onChange={(e) => {
						let value = Number(e.target.value) || 1;
						if (value < 1 || value > 10) {
							setErrorImpact("L'impact doit être entre 1 et 10.");
						} else {
							setErrorImpact("");
						}
						setNewRisk((prev) => ({
							...prev,
							impact: Math.min(10, Math.max(1, value)), // Restriction entre 1 et 10
						}));
						}}
					/>
					{errorImpact && <p className="text-red-600 text-sm">{errorImpact}</p>}
					</div>

                      <Input
                        placeholder="Stratégie d'amortissement"
                        value={newRisk.mitigation}
                        onChange={(e) =>
                          setNewRisk((prev) => ({
                            ...prev,
                            mitigation: e.target.value,
                          }))
                        }
                      />
                      <DialogClose asChild>
                        <Button
                          onClick={addNewRisk}
                          disabled={!newRisk.category.trim() || !newRisk.probability || !newRisk.impact}
                        >
                          Créer un risque
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <Table>
				<TableHeader>
					<TableRow>
					<TableHead>Catégorie de Risque</TableHead>
					<TableHead>Probabilité</TableHead>
					<TableHead>Impact</TableHead>
					<TableHead>Amortissement</TableHead>
					<TableHead>Score</TableHead>
					<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{financialData.risks.map((risk, index) => {
					const score = (risk.probability * risk.impact).toFixed(1);
					const {
						textColorProbability,
						textColorImpact,
						backgroundColor,
					} = getRiskColor(parseFloat(score), risk.probability, risk.impact);

					return (
						<TableRow key={index}>
						<TableCell>
							<Input
							value={risk.category}
							onChange={(e) =>
								updateRisk(index, "category", e.target.value)
							}
							/>
						</TableCell>
						<TableCell className={textColorProbability}>
							<Input
								type="number"
								step="0.01"
								value={risk.probability}
								onChange={(e) => {
								let value = Number(e.target.value) || 0;
								if (value < 0 || value > 1) {
									setErrorProbability(`La probabilité doit être entre 0 et 1.`);
								} else {
									setErrorProbability("");
								}
								updateRisk(index, "probability", Math.min(1, Math.max(0, value)));
								}}
							/>
							{errorProbability && <p className="text-red-600 text-sm">{errorProbability}</p>}
						</TableCell>

						<TableCell className={textColorImpact}>
							<Input
								type="number"
								step="0.1"
								value={risk.impact}
								onChange={(e) => {
								let value = Number(e.target.value) || 1;
								if (value < 1 || value > 10) {
									setErrorImpact(`L'impact doit être entre 1 et 10.`);
								} else {
									setErrorImpact("");
								}
								updateRisk(index, "impact", Math.min(10, Math.max(1, value)));
								}}
							/>
							{errorImpact && <p className="text-red-600 text-sm">{errorImpact}</p>}
						</TableCell>

						<TableCell>
							<Input
							value={risk.mitigation}
							onChange={(e) =>
								updateRisk(index, "mitigation", e.target.value)
							}
							/>
						</TableCell>
						<TableCell className={`${backgroundColor} text-white font-bold px-4 py-2`}>
							{score}
						</TableCell>
						<TableCell>
							<Button
							variant="destructive"
							size="sm"
							onClick={() => removeRisk(index)}
							>
							<Trash2 className="h-4 w-4" />
							</Button>
						</TableCell>
						</TableRow>
					);
					})}
				</TableBody>
			</Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StartupFinancialDashboard;