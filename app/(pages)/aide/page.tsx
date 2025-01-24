"use client";

import Link from "next/link";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

export default function AidePage() {
	const discordLink = siteConfig.links.discord;

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-3xl mx-auto py-10 px-6 space-y-10">
				<div className="text-center space-y-3">
					<h1 className="text-3xl font-bold">Aide & Support</h1>
					<p className="text-muted-foreground text-sm">
						Besoin d’aide ? Consultez la FAQ ci-dessous, ou
						rejoignez notre communauté Discord pour plus
						d’assistance.
					</p>
				</div>

				{/* Section FAQ */}
				<div className="space-y-4">
					<h2 className="font-semibold text-lg">
						Foire aux questions (FAQ)
					</h2>
					<p className="text-sm text-muted-foreground">
						Trouvez une réponse rapide à vos questions. Pour plus de
						détails, n’hésitez pas à rejoindre le Discord.
					</p>

					<Accordion
						type="single"
						collapsible
						className="flex w-full flex-col items-center justify-center space-y-2"
					>
						{siteConfig.faqs.map((faq, idx) => (
							<AccordionItem
								key={idx}
								value={faq.question}
								className="w-full border rounded-lg overflow-hidden bg-card"
							>
								<AccordionTrigger className="px-4">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="px-4">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>

					<h4 className="my-6 text-center text-sm font-medium tracking-tight text-foreground/80">
						Vous avez encore des questions ? Envoyez-nous un email à{" "}
						<a
							href={`mailto:${siteConfig.links.email}`}
							className="underline"
						>
							{siteConfig.links.email}
						</a>
						.
					</h4>
				</div>

				{/* Section Support */}
				<div className="space-y-4">
					<h2 className="font-semibold text-lg">
						Support & Communauté
					</h2>
					<p className="text-sm text-muted-foreground">
						Pour une assistance personnalisée, contactez notre
						support ou discutez avec la communauté.
					</p>
					<ul className="text-sm list-disc ml-6 space-y-1">
						<li>
							Email :{" "}
							<a
								href={`mailto:${siteConfig.links.email}`}
								className="underline"
							>
								{siteConfig.links.email}
							</a>
						</li>
						<li>
							Communauté Discord :{" "}
							<a
								href={discordLink}
								className="underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								Rejoindre
							</a>
						</li>
						<li>
							Formulaire de contact (en cours de développement)
						</li>
					</ul>
				</div>

				{/* Section Ressources */}
				<div className="space-y-4">
					<h2 className="font-semibold text-lg">
						Ressources & Documentation
					</h2>
					<p className="text-sm text-muted-foreground">
						Consultez nos guides et tutoriels pour vous aider à
						démarrer :
					</p>
					<ul className="text-sm list-disc ml-6 space-y-1">
						{siteConfig.resources.map((resource, i) => (
							<li key={i}>
								<a href={resource.href} className="underline">
									{resource.title}
								</a>
							</li>
						))}
					</ul>
				</div>

				<div className="text-center">
					<p className="text-sm text-muted-foreground">
						Pour toute autre question, rejoignez notre Discord !
					</p>
					<Button variant="default" asChild className="mt-4">
						<Link
							href={discordLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							Rejoindre le Discord
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
