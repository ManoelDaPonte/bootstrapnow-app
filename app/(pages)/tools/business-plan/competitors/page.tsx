"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

// React-Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { color } from "framer-motion";

// Types
interface CompetitorEntry {
  id: string;
  nom: string;
  solution: string;
  prix: number;
  valeurPercue: number;
  strategie: string;
  zoneGeographique: string;
  ciblageClient: string;
  forces: string;
  faiblesses: string;
  impactDirect: string;
  impactIndirect: string;
  isMyCompany?: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: CompetitorEntry;
  }>;
}

interface CustomShapeProps {
  cx?: number;
  cy?: number;
  payload?: CompetitorEntry;
  r?: number;
  fill?: string;
  stroke?: string;
}

// Constants
const INITIAL_COMPETITORS: CompetitorEntry[] = [
  {
    id: "my_company",
    nom: "Mon Entreprise",
    solution: "Produit Exceptionnel",
    prix: 100,
    valeurPercue: 95,
    strategie: "Premium",
    zoneGeographique: "Dijon",
    ciblageClient: "Grandes entreprises",
    forces: "Qualité supérieure",
    faiblesses: "Prix élevé",
    impactDirect: "Très élevé",
    impactIndirect: "Élevé",
    isMyCompany: true,
  },
  {
    id: "comp1",
    nom: "Entreprise A",
    solution: "Logiciel SaaS",
    prix: 60,
    valeurPercue: 85,
    strategie: "Abonnement",
    zoneGeographique: "Lyon",
    ciblageClient: "PME",
    forces: "Innovation",
    faiblesses: "Manque de support client",
    impactDirect: "Élevé",
    impactIndirect: "Moyen",
  },
  {
    id: "comp2",
    nom: "Entreprise B",
    solution: "Service Cloud",
    prix: 70,
    valeurPercue: 90,
    strategie: "Marseille",
    zoneGeographique: "Amérique du Nord",
    ciblageClient: "Startups",
    forces: "Grande communauté",
    faiblesses: "Coût élevé",
    impactDirect: "Moyen",
    impactIndirect: "Faible",
  },
];

const FIELD_LABELS = {
    nom: "Nom",
    solution: "Solution/produit",
    prix: "Prix",
    valeurPercue: "Valeur perçue",
    strategie: "Stratégie",
    zoneGeographique: "Zone géographique",
    ciblageClient: "Ciblage client",
    forces: "Forces",
    faiblesses: "Faiblesses",
    impactDirect: "Impact direct",
    impactIndirect: "Impact indirect",
  } as const;

  const zoneCoordinates: { [key: string]: LatLngExpression } = {
    France: [46.603354, 1.888334], // Coordonnées pour la France
    Paris: [48.8566, 2.3522], // Coordonnées pour Paris
    Lyon: [45.75, 4.85], // Coordonnées pour Lyon
    Marseille: [43.2965, 5.3698], // Coordonnées pour Marseille
    Bordeaux: [44.8378, -0.5792], // Coordonnées pour Bordeaux
    Dijon: [47.3220, 5.0415], // Coordonnées pour Dijon
    Toulouse: [43.6047, 1.4442], // Coordonnées pour Toulouse
    Lille: [50.6292, 3.0573], // Coordonnées pour Lille
    Nantes: [47.2184, -1.5536], // Coordonnées pour Nantes
    Strasbourg: [48.5734, 7.7521], // Coordonnées pour Strasbourg
    Rennes: [48.1173, -1.6778], // Coordonnées pour Rennes
    Nice: [43.7102, 7.2620], // Coordonnées pour Nice
    Montpellier: [43.6117, 3.8777], // Coordonnées pour Montpellier
    LeHavre: [49.4944, 0.1079], // Coordonnées pour Le Havre
    AixEnProvence: [43.529742, 5.447427], // Coordonnées pour Aix-en-Provence
    Grenoble: [45.1885, 5.7245], // Coordonnées pour Grenoble
    ClermontFerrand: [45.7772, 3.0870], // Coordonnées pour Clermont-Ferrand
    Perpignan: [42.6984, 2.8957], // Coordonnées pour Perpignan
    Angers: [47.4784, -0.5632], // Coordonnées pour Angers
    Caen: [49.4144, -0.6963], // Coordonnées pour Caen
    Tours: [47.3433, 0.6981], // Coordonnées pour Tours
    Nimes: [43.8367, 4.3601], // Coordonnées pour Nîmes
    LaRochelle: [46.1603, -1.1511], // Coordonnées pour La Rochelle
    Reims: [49.2583, 4.0317], // Coordonnées pour Reims
    LeMans: [48.0061, 0.1996], // Coordonnées pour Le Mans
    Valence: [44.9333, 4.8833], // Coordonnées pour Valence
    Metz: [49.1193, 6.1757], // Coordonnées pour Metz
    Nancy: [48.6921, 6.1844], // Coordonnées pour Nancy
    Rouen: [49.4431, 1.0993], // Coordonnées pour Rouen
    Mulhouse: [47.7508, 7.3359], // Coordonnées pour Mulhouse
    Troyes: [48.2974, 4.0744], // Coordonnées pour Troyes
    Amiens: [49.8941, 2.3020], // Coordonnées pour Amiens
    BoulogneSurMer: [50.7256, 1.6016], // Coordonnées pour Boulogne-sur-Mer
  };
  
// Créer une icône personnalisée pour les pins (icône locale SVG)
const greenIcon = new L.Icon({
    iconUrl: '/icons/map-pin-green.svg', // Chemin vers l'icône SVG local
    iconSize: [30, 40], // Taille de l'icône
    iconAnchor: [15, 40], // Ancrage de l'icône (au bas de l'icône)
    popupAnchor: [0, -40], // Position du popup
  });
  
  const redIcon = new L.Icon({
    iconUrl: '/icons/map-pin-red.svg', // Chemin vers l'icône SVG local (si vous avez une version rouge)
    iconSize: [30, 40], // Taille de l'icône
    iconAnchor: [15, 40], // Ancrage de l'icône
    popupAnchor: [0, -40], // Position du popup
  });


// Components
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload[0]) return null;

  const data = payload[0].payload;
  return (
    <div className="bg-white p-4 border rounded-lg shadow-lg">
      <p className="font-bold">{data.nom}</p>
      <p className="text-sm">Solution: {data.solution}</p>
      <p className="text-sm">Prix: {data.prix}</p>
      <p className="text-sm">Valeur perçue: {data.valeurPercue}</p>
      <p className="text-sm">Zone: {data.zoneGeographique}</p>
    </div>
  );
};

const CustomShape: React.FC<CustomShapeProps> = ({ cx, cy, payload }) => {
  if (!cx || !cy || !payload) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={payload.isMyCompany ? 8 : 5}
      fill={payload.isMyCompany ? "#22c55e" : "#6366f1"}
      stroke={payload.isMyCompany ? "#166534" : "#4338ca"}
      strokeWidth={2}
      className="transition-all duration-200 hover:opacity-80"
    />
  );
};

// Main Component
const Competitors: React.FC = () => {
  const [competitors, setCompetitors] = useState<CompetitorEntry[]>(INITIAL_COMPETITORS);

  // Memoized values
  const chartBounds = useMemo(() => {
    const prices = competitors.map((c) => c.prix);
    const values = competitors.map((c) => c.valeurPercue);

    return {
      minPrice: Math.floor(Math.min(...prices) / 10) * 10 - 10,
      maxPrice: Math.ceil(Math.max(...prices) / 10) * 10 + 10,
      minValue: Math.floor(Math.min(...values) / 10) * 10 - 10,
      maxValue: Math.ceil(Math.max(...values) / 10) * 10 + 10,
    };
  }, [competitors]);

  // Handlers
  const handleAddCompetitor = useCallback(() => {
    const newCompetitor: CompetitorEntry = {
      id: `comp_${Date.now()}`,
      nom: "",
      solution: "",
      prix: 0,
      valeurPercue: 0,
      strategie: "",
      zoneGeographique: "",
      ciblageClient: "",
      forces: "",
      faiblesses: "",
      impactDirect: "",
      impactIndirect: "",
    };
    setCompetitors((prev) => [...prev, newCompetitor]);
  }, []);

  const handleRemoveCompetitor = useCallback((id: string) => {
    if (id !== "my_company") {
      setCompetitors((prev) => prev.filter((comp) => comp.id !== id));
    }
  }, []);

  const handleUpdateCompetitor = useCallback(
    (id: string, field: keyof CompetitorEntry, value: string) => {
      setCompetitors((prev) =>
        prev.map((comp) => {
          if (comp.id !== id) return comp;

          const newValue =
            field === "prix" || field === "valeurPercue" ? parseFloat(value) || 0 : value;

          return { ...comp, [field]: newValue };
        })
      );
    },
    []
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="details">Détail des concurrents</TabsTrigger>
          <TabsTrigger value="mapping">Mapping 'Beta'</TabsTrigger>
        </TabsList>

        {/* Vue d'ensemble */}
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Matrice de Positionnement Concurrentiel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] w-full p-4">
                <ResponsiveContainer>
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      dataKey="prix"
                      name="Prix"
                      domain={[chartBounds.minPrice, chartBounds.maxPrice]}
                      tickCount={8}
                    >
                      <Label value="Prix" offset={-20} position="insideBottom" />
                    </XAxis>
                    <YAxis
                      type="number"
                      dataKey="valeurPercue"
                      name="Valeur perçue"
                      domain={[chartBounds.minValue, chartBounds.maxValue]}
                      tickCount={8}
                    >
                      <Label value="Valeur perçue" angle={-90} offset={-20} position="insideLeft" />
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Scatter
                    name="Entreprises"
                    data={competitors}
                    shape={(props: CustomShapeProps) => <CustomShape {...props} />}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Détail des concurrents */}
        <TabsContent value="details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Concurrents</span>
                <Button variant="outline" size="sm" onClick={handleAddCompetitor}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un concurrent
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {Object.values(FIELD_LABELS).map((label) => (
                        <TableHead key={label}>{label}</TableHead>
                      ))}
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {competitors.map((competitor) => (
                      <TableRow
                        key={competitor.id}
                        className={competitor.isMyCompany ? "bg-green-50" : ""}
                      >
                        {(Object.keys(FIELD_LABELS) as Array<keyof typeof FIELD_LABELS>).map((field) => (
                          <TableCell key={field}>
                            <Input
                              type={field === "prix" || field === "valeurPercue" ? "number" : "text"}
                              value={competitor[field]}
                              onChange={(e) => handleUpdateCompetitor(competitor.id, field, e.target.value)}
                              className={competitor.isMyCompany ? "bg-green-50" : ""}
                            />
                          </TableCell>
                        ))}
                        <TableCell>
                          {!competitor.isMyCompany && (
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleRemoveCompetitor(competitor.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mapping */}
        <TabsContent value="mapping" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Carte des concurrents</CardTitle>
              <span>ATTENTION: Cette carte n'est pour l'instant valable que pour la France</span>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] w-full p-4">
              <MapContainer
                center={[46.603354, 1.888334]} // Centre de la carte sur la France
                zoom={6} // Zoom adapté pour afficher la France
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false} // Désactiver le zoom par la molette de la souris
                >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Utilisation d'OpenStreetMap pour le fond de carte
                />

                {INITIAL_COMPETITORS.map((competitor) => {
                    const position: LatLngExpression =
                    zoneCoordinates[competitor.zoneGeographique] || [46.603354, 1.888334]; // Par défaut la France

                    // Choisir l'icône en fonction du compétiteur
                    const icon = competitor.isMyCompany ? greenIcon : redIcon;

                    return (
                    <Marker key={competitor.id} position={position} icon={icon}>
                        <Popup>
                        <h3>{competitor.nom}</h3>
                        <p>Solution: {competitor.solution}</p>
                        <p>Prix: {competitor.prix}</p>
                        <p>Valeur perçue: {competitor.valeurPercue}</p>
                        <p>Zone géographique: {competitor.zoneGeographique}</p>
                        </Popup>
                    </Marker>
                    );
                })} 
                    {/* Légende des icônes */}
                    <div
                        style={{
                            position: "absolute",
                            pointerEvents: "none",
                            bottom: "10px",
                            left: "10px",
                            padding: "10px",
                            borderRadius: "5px",
                            zIndex: 1000, // Assurez-vous que la légende reste au-dessus de la carte
                        }}
                    >
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                    <img
                        src="/icons/map-pin-green.svg"
                        alt="Mon Entreprise"
                        style={{ width: "30px", height: "40px", marginRight: "10px" }}
                    />
                    <span>Notre positionnement</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src="/icons/map-pin-red.svg"
                        alt="Autres Compétiteurs"
                        style={{ width: "30px", height: "40px", marginRight: "10px" }}
                    />
                    <span>Autres Compétiteurs</span>
                    </div>
                </div>
              </MapContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Competitors;
