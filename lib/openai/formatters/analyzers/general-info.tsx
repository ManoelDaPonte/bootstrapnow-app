import { GeneralInfoData } from "@/types/openai/analyzers";

export function format_general_info(data: any): GeneralInfoData {
	// Les données sont dans data.general_info.data
	const info_data = data.general_info.data;

	// Normalisation des données
	const normalized_data = {
		city: info_data.GI_City || "",
		state: info_data.GI_State || "",
		authors: info_data.GI_Authors || "",
		zipcode: info_data.GI_Zipcode || "",
		website_url: info_data.GI_WebsiteUrl || "",
		company_name: info_data.GI_CompanyName || "",
		business_type: info_data.GI_BusinessType || "",
		email_address: info_data.GI_EmailAddress || "",
		business_phone: info_data.GI_BusinessPhone || "",
		street_address: info_data.GI_StreetAddress || "",
	};

	// Création des sections formatées reste la même
	const formatted_sections = {
		company_name: `Nom de l'entreprise : ${normalized_data.company_name}`,
		business_type: `Type d'entreprise : ${normalized_data.business_type}`,
		contact_info: [
			"Coordonnées :",
			`Email : ${normalized_data.email_address}`,
			`Téléphone : ${normalized_data.business_phone}`,
			`Site web : ${normalized_data.website_url}`,
		].join("\n"),
		location: [
			"Localisation :",
			`${normalized_data.street_address}`,
			`${normalized_data.city}, ${normalized_data.state} ${normalized_data.zipcode}`,
		].join("\n"),
		authors: `Auteurs : ${normalized_data.authors}`,
	};

	// Création du texte complet formaté
	const complete_text = [
		formatted_sections.company_name,
		formatted_sections.business_type,
		formatted_sections.contact_info,
		formatted_sections.location,
		formatted_sections.authors,
	].join("\n\n");

	return {
		data: normalized_data,
		formatted_sections,
		formatted_text: complete_text,
	};
}
