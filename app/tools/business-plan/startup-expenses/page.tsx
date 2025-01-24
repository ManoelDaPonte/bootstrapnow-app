"use client"

import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  Tooltip, Legend, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import { 
  Plus, Trash2, 
  Download, 
  Calculator, TrendingUp, 
  AlertTriangle 
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

// Définition d'une entrée financière
interface FinancialEntry {
  id: string;
  name: string;
  amount: number;
  type: string;
  category?: string;
}

// Définition d'une catégorie
interface CategoryDefinition {
  id: string;
  name: string;
  color: string;
}

// Définition d'un risque avec la mitigation
interface Risk {
  category: string;
  probability: number;
  impact: number;
  mitigation: string; // Ajout de la propriété mitigation
}

// Définition des données financières pour une startup
interface StartupFinancialData {
  capital: {
    investors: FinancialEntry[];  // Liste des investisseurs
    loans: FinancialEntry[];  // Liste des prêts
  };
  expenses: {
    categories: FinancialEntry[];  // Liste des catégories de dépenses
  };
  revenue: number;  // Chiffre d'affaires total
  projections: {
    year1: number;  // Projections de revenu pour l'année 1
    year2: number;  // Projections de revenu pour l'année 2
    year3: number;  // Projections de revenu pour l'année 3
  };
  risks: Risk[];  // Liste des risques, utilisant l'interface Risk
  categoryDefinitions: {
    investors: CategoryDefinition[];  // Définition des catégories d'investisseurs
    loans: CategoryDefinition[];  // Définition des catégories de prêts
    expenses: CategoryDefinition[];  // Définition des catégories de dépenses
  };
}


const StartupFinancialDashboard: React.FC = () => {
  const [financialData, setFinancialData] = useState<StartupFinancialData>({
    capital: {
      investors: [
        { id: 'inv1', name: 'Investor 1', amount: 10000, type: 'seed', category: 'tech' },
        { id: 'inv2', name: 'Angel Investor', amount: 25000, type: 'series-a', category: 'venture' }
      ],
      loans: [
        { id: 'loan1', name: 'Bank Loan', amount: 20000, type: 'secured', category: 'working-capital' }
      ]
    },
    expenses: {
      categories: [
        { id: 'exp1', name: 'Technology Development', amount: 5000, type: 'operational', category: 'tech' },
        { id: 'exp2', name: 'Marketing', amount: 3000, type: 'marketing', category: 'growth' },
        { id: 'exp3', name: 'Operations', amount: 7000, type: 'administrative', category: 'overhead' }
      ]
    },
    revenue: 50000,
    projections: {
      year1: 60000,
      year2: 75000,
      year3: 90000
    },
    risks: [
      { category: 'Market Risk', probability: 0.3, impact: 0.7, mitigation: '' },
      { category: 'Technology Risk', probability: 0.2, impact: 0.5, mitigation: '' }
    ],
    categoryDefinitions: {
      investors: [
        { id: 'tech', name: 'Technology Investors', color: '#3B82F6' },
        { id: 'venture', name: 'Venture Capital', color: '#10B981' }
      ],
      loans: [
        { id: 'working-capital', name: 'Working Capital', color: '#F43F5E' }
      ],
      expenses: [
        { id: 'tech', name: 'Technology', color: '#6366F1' },
        { id: 'growth', name: 'Growth', color: '#8B5CF6' },
        { id: 'overhead', name: 'Overhead', color: '#EF4444' }
      ]
    }
  });

  // State for new category dialog
  const [newCategoryDialogOpen, setNewCategoryDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ 
    name: '', 
    type: 'investors' as keyof StartupFinancialData['categoryDefinitions'] 
  });
  const [newRiskDialogOpen, setNewRiskDialogOpen] = useState(false); // Pour ouvrir/fermer le dialogue d'ajout de risque
  const [newRisk, setNewRisk] = useState<Risk>({
    category: '',
    probability: 0,
    impact: 0,
    mitigation: '' // Initialisation correcte avec mitigation
  });
  

  // Add new category
  const addNewCategory = useCallback(() => {
    if (!newCategory.name.trim()) return;

    const newCategoryId = newCategory.name.toLowerCase().replace(/\s+/g, '-');
    const newCategoryEntry = { 
      id: newCategoryId, 
      name: newCategory.name.trim(),
      color: `#${Math.floor(Math.random()*16777215).toString(16)}` 
    };

    setFinancialData(prev => ({
      ...prev,
      categoryDefinitions: {
        ...prev.categoryDefinitions,
        [newCategory.type]: [
          ...prev.categoryDefinitions[newCategory.type],
          newCategoryEntry
        ]
      }
    }));

    // Reset dialog state
    setNewCategoryDialogOpen(false);
    setNewCategory({ name: '', type: 'investors' });
  }, [newCategory]);

  // Add new row to a section
  const addRow = useCallback((section: "investors" | "loans" | "expenses") => {
    const newId = `new_${section}_${Date.now()}`;
    setFinancialData((prev) => {
      const sectionKey = section === "expenses" ? "expenses" : "capital";
      const currentEntries = section === "expenses" 
        ? prev.expenses.categories 
        : prev.capital[section];

      return {
        ...prev,
        [sectionKey]: {
          ...(sectionKey === "expenses" ? prev.expenses : prev.capital),
          [section]: [
            ...currentEntries,
            { 
              id: newId, 
              name: "New Entry", 
              amount: 0, 
              type: "general",
              category: prev.categoryDefinitions[section][0]?.id || ''
            }
          ]
        }
      };
    });
  }, []);

  // Remove row from a section
  const removeRow = useCallback((section: "investors" | "loans" | "expenses", id: string) => {
    setFinancialData((prev) => {
      const sectionKey = section === "expenses" ? "expenses" : "capital";
      const currentEntries = section === "expenses" 
        ? prev.expenses.categories 
        : prev.capital[section];

      return {
        ...prev,
        [sectionKey]: {
          ...(sectionKey === "expenses" ? prev.expenses : prev.capital),
          [section]: currentEntries.filter((entry) => entry.id !== id)
        }
      };
    });
  }, []);

  // Update row in a section
  const updateRow = useCallback((
    section: "investors" | "loans" | "expenses", 
    id: string, 
    field: keyof FinancialEntry, 
    value: string | number
  ) => {
    setFinancialData((prev) => {
      const sectionKey = section === "expenses" ? "expenses" : "capital";
      const currentEntries = section === "expenses" 
        ? prev.expenses.categories 
        : prev.capital[section];

      return {
        ...prev,
        [sectionKey]: {
          ...(sectionKey === "expenses" ? prev.expenses : prev.capital),
          [section]: currentEntries.map((entry) =>
            entry.id === id ? { ...entry, [field]: value } : entry
          )
        }
      };
    });
  }, []);

  const addNewRisk = useCallback(() => {
    // On vérifie que category, probability, et impact sont valides
    if (!newRisk.category.trim() || !newRisk.probability || !newRisk.impact) return;
  
    // Création de l'objet de risque avec mitigation
    const newRiskEntry: Risk = {
      category: newRisk.category.trim(),
      probability: newRisk.probability,
      impact: newRisk.impact,
      mitigation: newRisk.mitigation.trim() || 'No mitigation specified' // Assure-toi que mitigation existe
    };
  
    // Mise à jour de l'état avec le nouveau risque
    setFinancialData((prev) => ({
      ...prev,
      risks: [...prev.risks, newRiskEntry]  // Ajouter le risque
    }));
  
    // Fermeture du dialogue et réinitialisation des données
    setNewRiskDialogOpen(false);
    setNewRisk({
      category: '',
      probability: 0,
      impact: 0,
      mitigation: ''  // Réinitialisation avec mitigation vide
    });
  }, [newRisk]);
  
  
  const removeRisk = useCallback((index: number) => {
    setFinancialData((prev) => ({
      ...prev,
      risks: prev.risks.filter((_, idx) => idx !== index)
    }));
  }, []);

const getRiskColor = (score: number, probability: number, impact: number) => {
  // Déterminer la couleur pour le texte dans les colonnes "Probability" et "Impact"
  let textColorProbability = '';
  if (probability >= 75) {
    textColorProbability = 'text-red-600'; // Forte probabilité d'impact
  } else if (probability >= 50) {
    textColorProbability = 'text-yellow-600'; // Risque moyen
  } else {
    textColorProbability = 'text-green-600'; // Faible risque
  }

  let textColorImpact = '';
  if (impact >= 75) {
    textColorImpact = 'text-red-600'; // Forte probabilité d'impact
  } else if (impact >= 50) {
    textColorImpact = 'text-yellow-600'; // Risque moyen
  } else {
    textColorImpact = 'text-green-600'; // Faible risque
  }

  // Déterminer la couleur pour le fond de la cellule du score
  let backgroundColor = '';
  if (score < 30) {
    backgroundColor = 'bg-red-600'; // Risque élevé (rouge)
  } else if (score >= 30 && score < 70) {
    backgroundColor = 'bg-yellow-600'; // Risque moyen (jaune)
  } else {
    backgroundColor = 'bg-green-600'; // Risque faible (vert)
  }

  return { textColorProbability, textColorImpact, backgroundColor };
};

  // Calculations
  const totalCapital = useMemo(() => 
    financialData.capital.investors.reduce((acc, inv) => acc + inv.amount, 0) + 
    financialData.capital.loans.reduce((acc, loan) => acc + loan.amount, 0), 
    [financialData]
  );

  const totalExpenses = useMemo(() => 
    financialData.expenses.categories.reduce((acc, exp) => acc + exp.amount, 0), 
    [financialData]
  );

  const netProfit = useMemo(() => 
    financialData.revenue - totalExpenses, 
    [financialData, totalExpenses]
  );

  // Financial Ratios
  const profitabilityRatio = useMemo(() => 
    (financialData.revenue ? (netProfit / financialData.revenue) * 100 : 0).toFixed(2), 
    [netProfit, financialData]
  );

  const debtToEquityRatio = useMemo(() => 
    (totalCapital ? (financialData.capital.loans.reduce((acc, loan) => acc + loan.amount, 0) / totalCapital) * 100 : 0).toFixed(2), 
    [financialData, totalCapital]
  );

  const [errorProbability, setErrorProbability] = useState('');
const [errorImpact, setErrorImpact] = useState('');

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Financial Details</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold">Capital Allocation</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie 
                        data={[
                          ...financialData.capital.investors, 
                          ...financialData.capital.loans
                        ]} 
                        dataKey="amount" 
                        nameKey="name" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={90}
                      >
                        {[...financialData.capital.investors, ...financialData.capital.loans].map((entry, index) => (
                          <Cell 
                            key={entry.id} 
                            fill={
                              financialData.categoryDefinitions.investors.find(cat => cat.id === entry.category)?.color || 
                              financialData.categoryDefinitions.loans.find(cat => cat.id === entry.category)?.color
                            } 
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Expense Breakdown</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={financialData.expenses.categories}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar 
                        dataKey="amount" 
                        fill="#8884d8" 
                        fillOpacity={0.7} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Detailed Financial Entries
                <div className="flex space-x-2">
                  <Dialog open={newCategoryDialogOpen} onOpenChange={setNewCategoryDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" /> Add Category
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Select 
                          value={newCategory.type}
                          onValueChange={(val) => setNewCategory(prev => ({ 
                            ...prev, 
                            type: val as keyof StartupFinancialData['categoryDefinitions'] 
                          }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {(['investors', 'loans', 'expenses'] as const).map(type => (
                              <SelectItem key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input 
                          placeholder="Category Name" 
                          value={newCategory.name}
                          onChange={(e) => setNewCategory(prev => ({ 
                            ...prev, 
                            name: e.target.value 
                          }))}
                        />
                        <DialogClose asChild>
                          <Button 
                            onClick={addNewCategory} 
                            disabled={!newCategory.name.trim()}
                          >
                            Create Category
                          </Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {Object.entries({
                    investors: { icon: <Calculator />, label: 'Investor' },
                    loans: { icon: <TrendingUp />, label: 'Loan' },
                    expenses: { icon: <AlertTriangle />, label: 'Expense' }
                  }).map(([section, config]) => (
                    <Button 
                      key={section} 
                      variant="outline" 
                      size="sm" 
                      onClick={() => addRow(section as keyof StartupFinancialData['capital'] | 'expenses')}
                    >
                      {config.icon}
                      <span className="ml-2">Add {config.label}</span>
                    </Button>
                  ))}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries({
                investors: financialData.capital.investors,
                loans: financialData.capital.loans,
                expenses: financialData.expenses.categories
              }).map(([section, entries]) => (
                <div key={section}>
                  <h3 className="text-lg font-semibold mb-2 capitalize">{section}</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {entries.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell>
                            <Input
                              value={entry.name}
                              onChange={(e) => updateRow(section as any, entry.id, 'name', e.target.value)}
                              placeholder="Entry Name"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={entry.amount}
                              onChange={(e) => updateRow(section as any, entry.id, 'amount', Number(e.target.value))}
                              placeholder="Amount"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.type}
                              onChange={(e) => updateRow(section as any, entry.id, 'type', e.target.value)}
                              placeholder="Type"
                            />
                          </TableCell>
                          <TableCell>
                            <Select 
                              value={entry.category || ''} 
                              onValueChange={(val) => updateRow(section as any, entry.id, 'category', val)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                              <SelectContent>
                                {financialData.categoryDefinitions[section as keyof StartupFinancialData['categoryDefinitions']].map(cat => (
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
							  onClick={() => removeRow(section as any, entry.id)}
							>
							  <Trash2 className="h-4 w-4" />
							</Button>
						  </TableCell>
						</TableRow>
					  ))}
					</TableBody>
				  </Table>
				</div>
			  ))}
			</CardContent>
		  </Card>
		</TabsContent>
  
		<TabsContent value="risks">
  <Card>
    <CardHeader>
      <CardTitle>Risk Assessment</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex justify-between mb-4">
        <Dialog open={newRiskDialogOpen} onOpenChange={setNewRiskDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Add Risk</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Risk</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Risk Category"
                value={newRisk.category}
                onChange={(e) => setNewRisk(prev => ({ ...prev, category: e.target.value }))} 
              />
            <div>
              <Input
                type="number"
                placeholder="Probability (0-100)"
                min={0}
                max={100}
                value={newRisk.probability}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;

                  // Vérifier si la valeur est hors limites avant correction
                  if (value > 100) {
                    setErrorProbability('Probability must be between 0 and 100.');
                  } else if (value < 0) {
                    setErrorProbability('Probability cannot be negative.');
                  } else {
                    setErrorProbability(''); // Efface l'erreur si la valeur est correcte
                  }

                  setNewRisk(prev => ({
                    ...prev,
                    probability: Math.min(100, Math.max(0, value))
                  }));
                }}
              />
              {errorProbability && <p className="text-red-600 text-sm">{errorProbability}</p>}
            </div>
            <div>
              <Input
                type="number"
                placeholder="Impact (0-1)"
                min={0}
                max={1}
                step={0.01}
                value={newRisk.impact}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;

                  // Vérifier si la valeur est hors limites avant correction
                  if (value > 1) {
                    setErrorImpact('Impact must be between 0 and 1.');
                  } else if (value < 0) {
                    setErrorImpact('Impact cannot be negative.');
                  } else {
                    setErrorImpact(''); // Efface l'erreur si la valeur est correcte
                  }

                  setNewRisk(prev => ({
                    ...prev,
                    impact: Math.min(1, Math.max(0, value))
                  }));
                }}
              />
              {errorImpact && <p className="text-red-600 text-sm">{errorImpact}</p>}
            </div>
              <Input
                placeholder="Mitigation Strategy"
                value={newRisk.mitigation}
                onChange={(e) => setNewRisk(prev => ({ ...prev, mitigation: e.target.value }))}
              />

              <DialogClose asChild>
                <Button 
                  onClick={addNewRisk} 
                  disabled={!newRisk.category.trim() || !newRisk.probability || !newRisk.impact}
                >
                  Create Risk
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Risk Category</TableHead>
            <TableHead>Probability</TableHead>
            <TableHead>Impact</TableHead>
            <TableHead>Risk Score</TableHead>
            <TableHead>Mitigation</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {financialData.risks.map((risk, index) => {
            const score = (risk.probability / risk.impact).toFixed(1);
            const { textColorProbability, textColorImpact, backgroundColor } = getRiskColor(
              parseFloat(score),
              risk.probability,
              risk.impact
            );

            return (
              <TableRow key={index}>
                <TableCell>{risk.category}</TableCell>
                <TableCell className={textColorProbability}>{(risk.probability).toFixed(1)}%</TableCell>
                <TableCell className={textColorImpact}>{(risk.impact).toFixed(1)}</TableCell>
                <TableCell className={`${backgroundColor} text-white font-bold px-4 py-2`}>{score}</TableCell>
                <TableCell>{risk.mitigation}</TableCell>
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
}

export default StartupFinancialDashboard;