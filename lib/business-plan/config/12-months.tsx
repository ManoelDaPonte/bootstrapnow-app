// lib/business-plan/config/twelve-months.ts
import { ProfitLossData } from "@/types/12-months";
import { QAData } from "@/types/shared/qa-section";

export const months = Array.from({ length: 12 }, (_, i) => `M${i + 1}`);

export const INITIAL_PROFIT_LOSS_DATA: ProfitLossData = {
	revenue: [
		{
			id: "rev1",
			category: "Product Sales",
			...Object.fromEntries(months.map((m) => [m, 10000])),
		},
		{
			id: "rev2",
			category: "Service Revenue",
			...Object.fromEntries(months.map((m) => [m, 5000])),
		},
	],
	expenses: [
		{
			id: "exp1",
			category: "Operating Expenses",
			...Object.fromEntries(months.map((m) => [m, 8000])),
		},
		{
			id: "exp2",
			category: "Marketing",
			...Object.fromEntries(months.map((m) => [m, 2000])),
		},
	],
};

export const INVENTAIRE_QA_DATA: QAData = {
	sectionTitle: "Questions pour Approfondir Vos Dépenses de Démarrage",
	categories: [
		{
			id: "OP_Inventaire_stocktype",
			title: "Type de stock à conserver",
			question:
				"Quel type de stock devez-vous conserver pour assurer votre activité ?",
			examples: [
				"Nous maintenons un stock de matières premières essentielles pour assurer la continuité de notre production.",
				"Notre inventaire comprend des produits finis prêts à être expédiés afin de garantir une livraison rapide aux clients.",
				"Nous conservons un stock de pièces détachées et de composants pour assurer un service après-vente efficace.",
			],
		},
		{
			id: "OP_Inventaire_stockcost",
			title: "Valeur moyenne des stocks",
			question: "Quelle est la valeur moyenne de vos stocks ?",
			examples: [
				"La valeur moyenne de nos stocks est estimée à 50 000 €, ce qui nous permet de répondre aux fluctuations de la demande.",
				"Nous maintenons un stock d’une valeur moyenne de 100 000 € afin de sécuriser nos approvisionnements et éviter les ruptures.",
				"Notre gestion des stocks vise à maintenir une valeur moyenne inférieure à 30 000 € pour optimiser notre trésorerie.",
			],
		},
		{
			id: "OP_Inventaire_stockchurn",
			title: "Taux de rotation des stocks",
			question: "Quel est votre taux de rotation des stocks ?",
			examples: [
				"Notre taux de rotation des stocks est de 4 fois par an, ce qui nous permet d'éviter le surstockage.",
				"Nous visons un taux de rotation mensuel élevé pour garantir la fraîcheur de nos produits et limiter les pertes.",
				"Avec un taux de rotation de 6 fois par an, nous assurons un bon équilibre entre disponibilité des produits et gestion des coûts.",
			],
		},
		{
			id: "OP_Inventaire_stockvariation",
			title: "Variations saisonnières des stocks",
			question:
				"Comment gérez-vous les variations saisonnières de vos stocks ?",
			examples: [
				"Nous augmentons nos niveaux de stock en prévision des pics de demande lors des fêtes de fin d'année.",
				"Notre entreprise ajuste ses commandes en fonction des tendances saisonnières pour éviter les surstocks inutiles.",
				"Nous utilisons des prévisions basées sur les données des années précédentes pour anticiper les fluctuations de la demande.",
			],
		},
		{
			id: "OP_Inventaire_stockdelay",
			title: "Délai de commande des stocks",
			question:
				"Quel est votre délai moyen de commande et de réception des stocks ?",
			examples: [
				"Notre délai moyen de réapprovisionnement est de 2 semaines, ce qui nous permet d'ajuster nos stocks en temps réel.",
				"Nous avons négocié des délais de livraison courts avec nos fournisseurs afin de réduire notre besoin en stock de sécurité.",
				"Selon les produits, nos délais de commande varient entre 1 et 3 mois, nécessitant une planification rigoureuse.",
			],
		},
		{
			id: "OP_Credit_common",
			title: "Vente à crédit dans le secteur",
			question:
				"La vente à crédit est-elle courante dans votre secteur ? Les clients s'y attendent-ils ?",
			examples: [
				"Dans notre secteur, la vente à crédit est une pratique courante, notamment pour les achats de grande envergure.",
				"Nos clients s'attendent généralement à des facilités de paiement, bien que la majorité préfère payer comptant.",
				"Le crédit est rarement utilisé dans notre domaine, mais nous l'envisageons pour certains clients professionnels.",
			],
		},
		{
			id: "OP_Credit_policy",
			title: "Politique de crédit et montant accordé",
			question:
				"Quelle sera votre politique en matière de crédit ? Quel montant de crédit accorderez-vous ? Quels sont les critères d'octroi du crédit ?",
			examples: [
				"Nous limiterons le crédit à nos clients réguliers avec un historique d'achats fiable et un plafond de 5 000 €.",
				"Notre politique prévoit un crédit maximal de 10 000 €, accordé après analyse financière et validation interne.",
				"Nous accorderons du crédit uniquement aux entreprises ayant un bon dossier financier et un historique de paiements ponctuels.",
			],
		},
		{
			id: "OP_Credit_verification",
			title: " Vérification de la solvabilité des clients",
			question:
				"Comment allez-vous vérifier la solvabilité des nouveaux clients ?",
			examples: [
				"Nous vérifierons la solvabilité des clients via des rapports de crédit et des références bancaires.",
				"Une analyse de leurs bilans comptables et de leur historique de paiements sera réalisée avant d'accorder un crédit.",
				"Nous utiliserons des services de notation financière pour évaluer les risques et limiter les impayés.",
			],
		},
		{
			id: "OP_Credit_conditions",
			title: "Conditions de crédit proposées",
			question:
				"Quelles conditions de crédit proposerez-vous à vos clients ?",
			examples: [
				"Nous proposerons un délai de paiement de 30 jours avec un taux d'intérêt de 2 % en cas de retard.",
				"Nos conditions incluront un paiement en trois fois sans frais pour les commandes supérieures à 1 000 €.",
				"Les clients devront signer un accord de crédit précisant les échéances et les pénalités en cas de retard.",
			],
		},
		{
			id: "OP_Credit_slowpayments",
			title: "Gestion des paiements lents",
			question:
				"Comment traiterez-vous les clients qui paient lentement ?",
			examples: [
				"Nous enverrons des rappels automatiques et proposerons des solutions de paiement adaptées en cas de difficulté.",
				"Un suivi téléphonique sera mis en place dès le premier retard afin d'éviter l'accumulation des impayés.",
				"Après un retard de 60 jours, nous suspendrons les commandes futures et appliquerons des pénalités.",
			],
		},
		{
			id: "OP_Credit_latepayments",
			title: "Politique en matière de paiements en retard",
			question:
				"Quelle est votre politique en matière de paiements en retard et quand ferez-vous appel à un avocat ou une agence de recouvrement ?",
			examples: [
				"Nous appliquons des pénalités de 5 % après 30 jours de retard et faisons appel à une agence de recouvrement après 90 jours.",
				"Les clients en retard reçoivent une mise en demeure avant toute action juridique.",
				"Un plan de remboursement peut être proposé avant de recourir à des mesures légales.",
			],
		},
	],
};
