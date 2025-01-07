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
		email: "support@example.com",
		discord: process.env.NEXT_PUBLIC_DISCORD_LINK || "#",
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
					Cliquez sur “Rejoindre le Discord” dans votre tableau de
					bord ou directement{" "}
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
			question: "J’ai perdu mon mot de passe, que faire ?",
			answer: (
				<span>
					Cliquez sur “Mot de passe oublié” sur la page de connexion.
					Un email vous sera envoyé avec les instructions.
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
	pricing: [
		{
			name: "INITIATEUR",
			href: "#",
			price: "0 €",
			period: "à vie",
			yearlyPrice: "0 €",
			features: [
				"Accès à la communauté",
				"Newsletter hebdomadaire",
				"Templates de business plans",
			],
			description: "Parfait pour découvrir et rejoindre la communauté.",
			buttonText: "Rejoignez-nous gratuitement",
			isPopular: false,
		},
		{
			name: "INNOVATEUR",
			href: "#",
			price: "12 €", // Mensuel
			period: "mois",
			yearlyPrice: "10 €", // Annuel (prix au mois)
			features: [
				"Outil de génération d'idées SaaS",
				"Outil pour tester un marché",
				"Accès à des templates premium",
			],
			description:
				"Idéal pour accéder à nos outils avancés et valider vos idées rapidement.",
			buttonText: "S'abonner",
			isPopular: true,
		},
		{
			name: "VISIONNAIRE",
			href: "#",
			price: "50 €", // Mensuel
			period: "mois",
			yearlyPrice: "40 €", // Annuel (prix au mois)
			features: [
				"Accès illimité à tous les outils",
				"Accès à la communauté",
				"Communication privilégiée avec l’équipe",
			],
			description:
				"Allez plus loin encore, avec plus de ressources et un accompagnement dédié.",
			buttonText: "S'abonner",
			isPopular: false,
		},
	],
};

export type SiteConfig = typeof siteConfig;
