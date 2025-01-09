// lib/config/configMarketingMix.tsx
"use client";

import { iconMapping } from "./iconMapping";
import { SectionConfig, DescriptionContent } from "./types";

/**
 * Configuration des sections (icônes, titres, etc.)
 */
export const marketingMixSections: SectionConfig[] = [
	{ id: "product", title: "PRODUIT", icon: iconMapping.box },
	{ id: "place", title: "POSITIONNEMENT", icon: iconMapping.mapMarker },
	{ id: "people", title: "PERSONNE", icon: iconMapping.users },
	{
		id: "physical-evidence",
		title: "PREUVE",
		icon: iconMapping.clipboardCheck,
	},
	{ id: "price", title: "PRIX", icon: iconMapping.moneyBill },
	{ id: "promotion", title: "PROMOTION", icon: iconMapping.bullhorn },
	{ id: "process", title: "PROCÉDÉ", icon: iconMapping.projectDiagram },
];

/**
 * Description courte pour l'infobulle (tooltip) au survol
 */
export const marketingMixShortDescriptions: Record<string, string> = {
	product:
		"Les caractéristiques, avantages, et innovations des produits ou services proposés.",
	place: "Les canaux et la couverture géographique pour rendre le produit disponible.",
	people: "Les équipes internes et partenaires externes qui influencent l'expérience client.",
	"physical-evidence":
		"Les éléments tangibles ou symboliques qui renforcent la crédibilité et l'image de marque.",
	price: "Les stratégies de tarification pour maximiser la valeur perçue et rester compétitif.",
	promotion:
		"Les actions entreprises pour informer et convaincre les clients potentiels.",
	process:
		"Les méthodes et systèmes assurant une expérience client fluide et efficace.",
};

/**
 * Description détaillée pour chaque section (affichée dans la modale)
 */
export const marketingMixDetailedDescriptions: Record<
	string,
	DescriptionContent
> = {
	product: {
		title: "Produit",
		sections: [
			{
				header: "À propos du produit",
				content:
					"Cette section met en avant les caractéristiques, avantages, et innovations des produits ou services proposés, en ciblant les besoins spécifiques des consommateurs.",
			},
			{
				header: "Exemples",
				list: [
					"Un smartphone avec caméra haute résolution et mode nuit.",
					"Un service de streaming avec séries originales exclusives.",
					"Une gamme de cosmétiques biologiques adaptés aux peaux sensibles.",
					"Un abonnement de repas prêts-à-cuisiner livrés à domicile.",
				],
			},
		],
	},
	place: {
		title: "Distribution",
		sections: [
			{
				header: "À propos de la distribution",
				content:
					"Cette section décrit les canaux par lesquels le produit ou service est mis à disposition des clients, avec un focus sur l'accessibilité et la couverture géographique.",
			},
			{
				header: "Exemples",
				list: [
					"Un réseau de points de vente physiques dans des centres commerciaux.",
					"Une plateforme de e-commerce avec livraison rapide.",
					"Des distributeurs automatiques de snacks santé dans les espaces de coworking.",
					"Un partenariat avec Amazon pour toucher un public mondial.",
				],
			},
		],
	},
	people: {
		title: "Personnes",
		sections: [
			{
				header: "À propos des personnes",
				content:
					"Cette section inclut les équipes internes, les partenaires externes, et toutes les parties prenantes qui influencent l'expérience client.",
			},
			{
				header: "Exemples",
				list: [
					"Un service client 24/7 via chat, email et téléphone.",
					"Des vendeurs formés pour offrir des conseils personnalisés en magasin.",
					"Des influenceurs collaborant pour des campagnes authentiques.",
					"Des experts techniques pour démonstrations et ateliers éducatifs.",
				],
			},
		],
	},
	"physical-evidence": {
		title: "Preuve physique",
		sections: [
			{
				header: "À propos de la preuve physique",
				content:
					"Les éléments tangibles ou symboliques qui renforcent la crédibilité, la qualité perçue et l'image de marque.",
			},
			{
				header: "Exemples",
				list: [
					"Un packaging élégant reflétant les valeurs premium de la marque.",
					"Un site web avec certifications de sécurité et avis clients.",
					"Une boutique immersive avec des espaces de démonstration.",
					"Des témoignages clients satisfaits sur les réseaux sociaux.",
				],
			},
		],
	},
	price: {
		title: "Prix",
		sections: [
			{
				header: "À propos du prix",
				content:
					"Cette section couvre les stratégies de tarification pour maximiser la valeur perçue, attirer différents segments de clientèle, et maintenir la compétitivité.",
			},
			{
				header: "Exemples",
				list: [
					"Un modèle freemium pour les services numériques.",
					"Des réductions pour achats en gros ou abonnements longue durée.",
					"Une tarification basée sur la valeur pour un produit de luxe.",
					"Des prix promotionnels pendant les fêtes pour les nouveaux clients.",
				],
			},
		],
	},
	promotion: {
		title: "Promotion",
		sections: [
			{
				header: "À propos de la promotion",
				content:
					"Les actions entreprises pour informer, convaincre et fidéliser les clients potentiels, tout en augmentant la visibilité de la marque.",
			},
			{
				header: "Exemples",
				list: [
					"Des campagnes publicitaires interactives sur Instagram/TikTok.",
					"Des emailings personnalisés avec offres spéciales.",
					"Des partenariats avec des influenceurs pour promouvoir des lancements.",
					"Des événements en direct comme webinaires ou salons pro.",
				],
			},
		],
	},
	process: {
		title: "Processus",
		sections: [
			{
				header: "À propos du processus",
				content:
					"Les systèmes et méthodes qui assurent une expérience client fluide et efficace, tout en soutenant les objectifs opérationnels.",
			},
			{
				header: "Exemples",
				list: [
					"Une application mobile intuitive avec notifications de suivi.",
					"Un processus de retour simplifié pour chaque commande.",
					"Un système de commande automatisé avec alertes de promotions.",
					"Une expérience d'achat en magasin avec scan QR pour plus d'infos.",
				],
			},
		],
	},
};
