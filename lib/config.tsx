// lib/config.tsx

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
	name: "BootstrapNow",
	description: "Un outil pour bootstrappeurs : idées, communauté et réussite",
	url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
	keywords: [
		"SaaS",
		"Bootstrap",
		"Entrepreneur",
		"Communauté",
		"Idées",
		"Business",
		"Startup",
		"Projet",
		"Template",
		"Newsletter",
		"Analyse",
		"Marché",
	],
	links: {
		email: "contact@bootstrap-now.com",
		discord: process.env.NEXT_PUBLIC_DISCORD_LINK || "#",
	},
	pricing: {
		subscriptions: [
			{
				name: "INNOVATEUR",
				href: "#",
				price: "12 €",
				period: "mois",
				yearlyPrice: "10 €",
				features: [
					"Acces à tous les outils",
					"Assistance prioritaire",
					"Accès à des templates premium",
					"15 tokens de génération par mois inclus",
				],
				description:
					"Idéal pour accéder à nos outils avancés et valider vos idées rapidement.",
				buttonText: "S'abonner",
				isPopular: true,
				monthlyTokens: 15,
				priceIds: {
					monthly: process.env.STRIPE_PRICE_ID_INNOVATEUR_MONTHLY,
					yearly: process.env.STRIPE_PRICE_ID_INNOVATEUR_YEARLY,
				},
			},
		],
		tokens: {
			packs: [
				{
					id: "token_1",
					name: "Pack Découverte",
					tokens: 1,
					amount: 1,
					price: "2.99 €",
					priceAmount: 2.99,
					description:
						"Idéal pour tester la génération de business plan",
					priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_TOKEN_1,
				},
				{
					id: "token_2",
					name: "Pack Standard",
					tokens: 5,
					amount: 5,
					price: "9.99 €",
					priceAmount: 9.99,
					description:
						"Idéal pour gérer un projet de création d'entreprise",
					priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_TOKEN_5,
				},
				{
					id: "token_3",
					name: "Pack Pro",
					tokens: 15,
					amount: 15,
					price: "19.99 €",
					priceAmount: 19.99,
					description:
						"Idéal pour tester de multiples idées de business",
					priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_TOKEN_15,
				},
			],
		},
	},
	faqs: [
		{
			question: "Comment modifier mon profil ?",
			answer: (
				<span>
					Rendez-vous sur la page{" "}
					<a href="/profile" className="underline">
						Profil
					</a>{" "}
					pour changer votre rôle et vos préférences.
				</span>
			),
		},
		{
			question: "Comment rejoindre le Discord ?",
			answer: (
				<span>
					Cliquez sur &quot;Rejoindre le Discord&quot; dans votre
					tableau de bord ou directement{" "}
					<a
						href={process.env.NEXT_PUBLIC_DISCORD_LINK || "#"}
						className="underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						ici
					</a>
					.
				</span>
			),
		},
		{
			question: "Comment souscrire à un abonnement payant ?",
			answer: (
				<span>
					Visitez la page{" "}
					<a href="/abonnement" className="underline">
						Abonnement
					</a>{" "}
					pour choisir un plan payant.
				</span>
			),
		},
		{
			question: "J'ai perdu mon mot de passe, que faire ?",
			answer: (
				<span>
					Cliquez sur &quot;Mot de passe oublié&quot; sur la page de
					connexion. Un email vous sera envoyé avec les instructions.
				</span>
			),
		},
		{
			question:
				"Comment utiliser les outils (Business Plan, Search-Hunter, Market-Tester) ?",
			answer: (
				<span>
					Consultez nos guides détaillés ou posez vos questions sur
					notre{" "}
					<a
						href={process.env.NEXT_PUBLIC_DISCORD_LINK || "#"}
						className="underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						communauté Discord
					</a>{" "}
					pour une assistance plus précise.
				</span>
			),
		},
		{
			question: "Quelles sont les méthodes de paiement acceptées ?",
			answer: (
				<span>
					Nous acceptons les principales cartes bancaires (Visa,
					MasterCard, etc.). Pour toute autre question, contactez le
					support.
				</span>
			),
		},
	],
	resources: [
		{
			title: "Premiers pas avec le Business Plan",
			href: "#",
		},
		{
			title: "Valider une idée avec Search-Hunter",
			href: "#",
		},
		{
			title: "Tester votre marché avec Market-Tester",
			href: "#",
		},
	],
};

export type SiteConfig = typeof siteConfig;
