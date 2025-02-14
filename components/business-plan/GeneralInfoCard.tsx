import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { GeneralInfoCardProps } from "@/types/general-info";
import { Loader2 } from "lucide-react";

interface ExtendedGeneralInfoCardProps extends GeneralInfoCardProps {
	isSaving?: boolean;
	onSave: () => void; // Ajout d'un prop spécifique pour la sauvegarde
}

const GeneralInfoCard: React.FC<ExtendedGeneralInfoCardProps> = ({
	data,
	onChange,
	onSave,
	isSaving = false,
}) => {
	return (
		<Card className="mb-8 bg-card">
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-xl font-semibold flex items-center gap-2">
						<span>🏢</span> Informations générales
					</CardTitle>
					{isSaving && (
						<div className="flex items-center text-sm text-muted-foreground">
							<Loader2 className="h-4 w-4 animate-spin mr-2" />
							Sauvegarde...
						</div>
					)}
				</div>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<Label htmlFor="company_name">
							Nom de l'entreprise
						</Label>
						<Input
							id="company_name"
							placeholder="Ex: TechVision Solutions"
							value={data.company_name || ""}
							onChange={(e) =>
								onChange("company_name", e.target.value)
							}
							onBlur={onSave} // Ajout de l'appel à onSave
							className="bg-background"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="business_type">Type d'activité</Label>
						<Select
							value={data.business_type || ""}
							onValueChange={(value) => {
								onChange(
									"business_type",
									value as "product" | "service" | "hybrid"
								);
								onSave(); // Ajout de l'appel à onSave
							}}
						>
							<SelectTrigger>
								<SelectValue placeholder="Sélectionnez le type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="product">Produit</SelectItem>
								<SelectItem value="service">Service</SelectItem>
								<SelectItem value="hybrid">
									Hybride (Produit & Service)
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="authors">Fondateurs</Label>
						<Input
							id="authors"
							placeholder="Ex: Jean Dupont, Marie Martin"
							value={data.authors || ""}
							onChange={(e) =>
								onChange("authors", e.target.value)
							}
							onBlur={onSave}
							className="bg-background"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="business_phone">Téléphone</Label>
						<Input
							id="business_phone"
							placeholder="Ex: +33 1 23 45 67 89"
							value={data.business_phone || ""}
							onChange={(e) =>
								onChange("business_phone", e.target.value)
							}
							onBlur={onSave}
							className="bg-background"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="email_address">Email</Label>
						<Input
							id="email_address"
							type="email"
							placeholder="contact@entreprise.com"
							value={data.email_address || ""}
							onChange={(e) =>
								onChange("email_address", e.target.value)
							}
							onBlur={onSave}
							className="bg-background"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="website_url">Site web</Label>
						<Input
							id="website_url"
							placeholder="https://www.entreprise.com"
							value={data.website_url || ""}
							onChange={(e) =>
								onChange("website_url", e.target.value)
							}
							onBlur={onSave}
							className="bg-background"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="street_address">Adresse</Label>
						<Input
							id="street_address"
							placeholder="123 rue de la Paix"
							value={data.street_address || ""}
							onChange={(e) =>
								onChange("street_address", e.target.value)
							}
							onBlur={onSave}
							className="bg-background"
						/>
					</div>

					<div className="grid grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label htmlFor="city">Ville</Label>
							<Input
								id="city"
								placeholder="Paris"
								value={data.city || ""}
								onChange={(e) =>
									onChange("city", e.target.value)
								}
								onBlur={onSave}
								className="bg-background"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="state">Région</Label>
							<Input
								id="state"
								placeholder="Île-de-France"
								value={data.state || ""}
								onChange={(e) =>
									onChange("state", e.target.value)
								}
								onBlur={onSave}
								className="bg-background"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="zipcode">Code postal</Label>
							<Input
								id="zipcode"
								placeholder="75000"
								value={data.zipcode || ""}
								onChange={(e) =>
									onChange("zipcode", e.target.value)
								}
								onBlur={onSave}
								className="bg-background"
							/>
						</div>
					</div>
				</div>

				<div className="mt-6 p-4 bg-muted rounded-lg">
					<p className="text-sm text-muted-foreground">
						👉 Complétez ces informations avec soin - elles seront
						utilisées dans la génération de votre business plan.
						Plus vos informations seront complètes et précises, plus
						votre business plan sera professionnel.
					</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default GeneralInfoCard;
