// types/general-info.ts
export interface BaseGeneralInfoData {
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

export interface FormattedGeneralInfoSections {
	company_name: string;
	business_type: string;
	contact_info: string;
	location: string;
	authors: string;
}

export interface GeneralInfoData {
	data: BaseGeneralInfoData;
	formatted_sections: FormattedGeneralInfoSections;
	formatted_text: string;
}

export interface GeneralInfo {
	city: string;
	state: string;
	authors: string;
	zipcode: string;
	website_url: string;
	company_name: string;
	business_type: "product" | "service" | "hybrid"; // Ajout des valeurs spécifiques
	email_address: string;
	business_phone: string;
	street_address: string;
}

// Interface pour les props du composant
export interface GeneralInfoCardProps {
	data: GeneralInfo;
	onChange: (field: keyof GeneralInfo, value: string) => void;
	isSaving?: boolean;
	onSave: () => void;
}
