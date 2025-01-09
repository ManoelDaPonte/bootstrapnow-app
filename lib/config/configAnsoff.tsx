// lib/config/configAnsoff.tsx

import { iconMapping } from "./iconMapping";
import { SectionConfig, DescriptionContent } from "./types";

/**
 * Configuration des sections Ansoff (icônes, titres, etc.)
 */
export const ansoffSections: SectionConfig[] = [
	{
		id: "marketPenetration",
		title: "Market Penetration",
		icon: iconMapping.info,
	},
	{
		id: "productDevelopment",
		title: "Product Development",
		icon: iconMapping.info,
	},
	{
		id: "marketDevelopment",
		title: "Market Development",
		icon: iconMapping.info,
	},
	{
		id: "diversification",
		title: "Diversification",
		icon: iconMapping.info,
	},
];

/**
 * Description courte pour l'infobulle (tooltip) au survol
 */
export const ansoffShortDescriptions: Record<string, string> = {
	marketPenetration:
		"Focuses on increasing sales of existing products to existing markets.",
	productDevelopment:
		"Focuses on developing new products for existing markets.",
	marketDevelopment:
		"Focuses on entering new markets with existing products.",
	diversification: "Focuses on entering new markets with new products.",
};

/**
 * Description détaillée pour chaque section (affichée dans la modale)
 */
export const ansoffDetailedDescriptions: Record<string, DescriptionContent> = {
	marketPenetration: {
		title: "Market Penetration",
		sections: [
			{
				header: "À propos de la pénétration de marché",
				content:
					"Market penetration involves intensifying efforts to sell existing products to existing customers within the current market. The primary goal is to increase market share and solidify the company's position within its existing customer base.",
			},
			{
				header: "Exemples",
				list: [
					"Loyalty Programs: Implementing a tiered loyalty program that rewards repeat customers with exclusive discounts, early access to new products, and personalized offers. (e.g., Starbucks Rewards, Sephora Beauty Insider)",
					"Cross-selling and Upselling: Training sales teams to effectively cross-sell complementary products or services (e.g., recommending a phone case and screen protector with a new phone purchase) and upsell premium versions of existing products (e.g., offering a business class upgrade on an airline ticket).",
					"Intensive Advertising Campaigns: Launching targeted advertising campaigns on social media, search engines, and other relevant platforms to reach existing customers with compelling offers and reminders about the company's products and services. (e.g., personalized email campaigns, retargeting ads)",
					"Customer Relationship Management (CRM) Systems: Implementing a robust CRM system to gather customer data, analyze purchasing behavior, and personalize marketing efforts to individual customer needs and preferences.",
				],
			},
		],
	},
	productDevelopment: {
		title: "Product Development",
		sections: [
			{
				header: "À propos du développement de produit",
				content:
					"Product development focuses on creating new products or improving existing ones to cater to the needs and preferences of the current market. This strategy aims to enhance customer satisfaction, gain a competitive edge, and drive revenue growth.",
			},
			{
				header: "Exemples",
				list: [
					"Innovation: Introducing groundbreaking new products with unique features and functionalities that address unmet customer needs and create new market segments. (e.g., Tesla's electric vehicles, Apple's innovative iPhones)",
					"Product Line Extensions: Expanding existing product lines with new variations, flavors, sizes, or models to cater to diverse customer preferences and increase market coverage. (e.g., Coca-Cola introducing new flavors of Coke, Nike releasing new colorways of popular sneakers)",
					"Product Improvements: Enhancing existing products with new features, improved performance, better quality, or enhanced aesthetics to address customer feedback and maintain a competitive advantage. (e.g., software updates with bug fixes and new functionalities, car manufacturers introducing new safety features)",
					"Customization and Personalization: Offering customized or personalized products to meet individual customer needs and preferences, such as personalized jewelry, custom-made clothing, or personalized online experiences.",
				],
			},
		],
	},
	marketDevelopment: {
		title: "Market Development",
		sections: [
			{
				header: "À propos du développement de marché",
				content:
					"Market development involves expanding into new markets with existing products. This strategy seeks to reach new customer segments, enter new geographic regions, or explore new distribution channels to drive revenue growth.",
			},
			{
				header: "Exemples",
				list: [
					"**Geographic Expansion:** Entering new domestic or international markets by opening new stores, establishing distribution networks, or partnering with local distributors. (e.g., Starbucks expanding to new countries, international franchises of fast-food chains)",
					"**New Customer Segments:** Targeting new demographic groups, psychographic segments, or industry verticals with existing products. (e.g., luxury brands targeting younger demographics, B2B marketing to specific industries)",
					"**New Distribution Channels:** Exploring new channels to reach existing and new customers, such as online marketplaces, social media platforms, direct-to-consumer sales, or partnerships with new retailers. (e.g., traditional retailers expanding their online presence, subscription boxes for various products)",
					"**Diversification of Distribution:** Expanding distribution channels to reach customers in different locations and situations, such as convenience stores, vending machines, or mobile sales teams.",
				],
			},
			// Ajoutez d'autres sections si nécessaire
		],
	},
	diversification: {
		title: "Diversification",
		sections: [
			{
				header: "À propos de la diversification",
				content:
					"Diversification involves entering new markets with new products. This strategy aims to reduce reliance on a single product or market, mitigate risks, and explore new growth opportunities in different areas.",
			},
			{
				header: "Exemples",
				list: [
					"**Concentric Diversification:** Entering related markets with new products that leverage existing core competencies and technologies. (e.g., a software company developing hardware products that integrate with its software, a car manufacturer producing electric vehicles)",
					"**Conglomerate Diversification:** Entering unrelated markets with new products, spreading risk across diverse industries. (e.g., a manufacturing company acquiring a hospitality chain, a technology company investing in renewable energy)",
					"**Horizontal Diversification:** Entering new markets with new products that are complementary to existing offerings, creating synergies and cross-selling opportunities. (e.g., a coffee shop expanding into food service, a clothing retailer launching a line of accessories)",
					"**Strategic Alliances and Acquisitions:** Forming partnerships or acquiring other companies to enter new markets and gain access to new technologies, products, and customer bases. (e.g., mergers between companies in different industries, strategic partnerships for research and development)",
				],
			},
			// Ajoutez d'autres sections si nécessaire
		],
	},
};
