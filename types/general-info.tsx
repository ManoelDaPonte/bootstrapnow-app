// types/general-info.ts
export interface GeneralInfo {
	company_name?: string;
	business_type?: "product" | "service" | "hybrid";
	authors?: string;
	business_phone?: string;
	email_address?: string;
	website_url?: string;
	street_address?: string;
	city?: string;
	state?: string;
	zipcode?: string;
}

export interface GeneralInfoCardProps {
	data: GeneralInfo;
	onChange: (field: keyof GeneralInfo, value: string) => void;
}
