// lib/business-plan-document/placeholderMapper.ts
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface GeneralInfo {
	city: string;
	state: string;
	authors: string;
	zipcode: string;
	website_url: string;
	company_name: string;
	business_type: string;
	email_address: string;
	business_phone: string;
	street_address: string;
}

interface MarketTrend {
	id: string;
	annee: number;
	tauxCroissance: number;
	variationDemande: number;
}

interface MarketNumber {
	id: string;
	title: string;
	value: string;
	description: string;
	referenceLink: string;
}

interface MarketTrendsData {
	trends: MarketTrend[];
	marketNumbers: MarketNumber[];
}

export function mapPlaceholders(
	generalInfo: GeneralInfo,
	marketTrendsData: MarketTrendsData
): Record<string, string> {
	// Formatter la date du jour
	const currentDate = format(new Date(), "dd MMMM yyyy", { locale: fr });

	// Initialiser les valeurs par défaut pour 3 CAGR
	const defaultTrendData = {
		CAGR_1: "N/A",
		CAGR_1_description: "Données non disponibles",
		CAGR_2: "N/A",
		CAGR_2_description: "Données non disponibles",
		CAGR_3: "N/A",
		CAGR_3_description: "Données non disponibles",
	};

	// Mapper les données de marché disponibles
	const trendsMapping = marketTrendsData.marketNumbers.reduce(
		(acc, marketNumber, index) => {
			if (index < 3) {
				// Ne prendre que les 3 premiers éléments
				return {
					...acc,
					[`CAGR_${index + 1}`]: marketNumber.value,
					[`CAGR_${index + 1}_description`]: marketNumber.description,
				};
			}
			return acc;
		},
		defaultTrendData
	);

	// Mapper toutes les valeurs
	return {
		// Informations générales
		Nom_Entreprise: generalInfo.company_name,
		AUTHORS: generalInfo.authors,
		Business_phone: generalInfo.business_phone,
		Email_address: generalInfo.email_address,
		// Pour le nom du fondateur, on prend le premier auteur
		Founder_NAME: generalInfo.authors.split(",")[0].trim(),
		Street_Address: generalInfo.street_address,
		City: generalInfo.city,
		state: generalInfo.state,
		ZIPcode: generalInfo.zipcode,
		Website_URL: generalInfo.website_url,

		// Tendances du marché
		...trendsMapping,

		// Date courante
		date: currentDate,
	};
}

export function replacePlaceholders(
	content: string,
	placeholders: Record<string, string>
): string {
	return Object.entries(placeholders).reduce((text, [key, value]) => {
		const regex = new RegExp(`{{${key}}}`, "g");
		return text.replace(regex, value);
	}, content);
}
