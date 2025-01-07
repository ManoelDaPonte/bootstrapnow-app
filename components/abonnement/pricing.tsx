"use client";

import Section from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { siteConfig } from "@/lib/config";
import useWindowSize from "@/lib/hooks/use-window-size";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

export default function PricingSection() {
	const [isMonthly, setIsMonthly] = useState(true);
	const { isDesktop } = useWindowSize();

	const handleToggle = () => {
		setIsMonthly(!isMonthly);
	};

	const planMap: Record<string, { monthly: string; yearly: string }> = {
		INNOVATEUR: {
			monthly: "innovateur_monthly",
			yearly: "innovateur_yearly",
		},
		VISIONNAIRE: {
			monthly: "visionnaire_monthly",
			yearly: "visionnaire_yearly",
		},
		INITIATEUR: {
			monthly: "initiateur",
			yearly: "initiateur",
		},
	};

	function getPlanSlug(planName: string, isMonthly: boolean) {
		// Récupère l'objet correspondant au planName
		const planEntry = planMap[planName];
		if (!planEntry) {
			// Par défaut si le plan n'est pas trouvé
			return "initiateur";
		}
		return isMonthly ? planEntry.monthly : planEntry.yearly;
	}

	async function handleSubscribe(planName: string) {
		try {
			const planSlug = getPlanSlug(planName, isMonthly);

			// Appel POST à /api/stripe/create-checkout-session
			// On envoie { plan: planSlug } dans le body JSON
			const res = await axios.post(
				"/api/stripe/create-checkout-session",
				{
					plan: planSlug,
				}
			);

			// Récupérer l'URL de la session
			const { url } = res.data;
			if (url) {
				// Rediriger vers la page de paiement Stripe
				window.location.href = url;
			}
		} catch (err: any) {
			console.error(err);
			alert(
				err.response?.data?.error || "Erreur lors de la souscription"
			);
		}
	}

	return (
		<Section
			title="Tarifs"
			subtitle="Choisissez l'offre qui correspond à vos besoins"
			id="tarifs"
		>
			{/* Bouton de toggle mensuel/annuel */}
			<div className="flex justify-center mb-10">
				<span className="mr-2 font-semibold">Mensuel</span>
				<label className="relative inline-flex items-center cursor-pointer">
					<Label>
						<Switch
							checked={!isMonthly}
							onCheckedChange={handleToggle}
						/>
					</Label>
				</label>
				<span className="ml-2 font-semibold">Annuel</span>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 sm:2 gap-4">
				{siteConfig.pricing.map((plan, index) => (
					<motion.div
						key={index}
						initial={{ y: 50, opacity: 1 }}
						whileInView={
							isDesktop
								? {
										y: 0,
										opacity: 1,
										x:
											index ===
											siteConfig.pricing.length - 1
												? -30
												: index === 0
												? 30
												: 0,
										scale:
											index === 0 ||
											index ===
												siteConfig.pricing.length - 1
												? 0.94
												: 1.0,
								  }
								: {}
						}
						viewport={{ once: true }}
						transition={{
							duration: 1.6,
							type: "spring",
							stiffness: 100,
							damping: 30,
							delay: 0.4,
							opacity: { duration: 0.5 },
						}}
						className={cn(
							`rounded-2xl border-[1px] p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative`,
							plan.isPopular
								? "border-primary border-[2px]"
								: "border-border",
							index === 0 ||
								index === siteConfig.pricing.length - 1
								? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
								: "z-10",
							index === 0 && "origin-right",
							index === siteConfig.pricing.length - 1 &&
								"origin-left"
						)}
					>
						{plan.isPopular && (
							<div className="absolute top-0 right-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
								<FaStar className="text-white" />
								<span className="text-white ml-1 font-sans font-semibold">
									Populaire
								</span>
							</div>
						)}

						<div>
							{/* Nom du plan */}
							<p className="text-base font-semibold text-muted-foreground">
								{plan.name}
							</p>

							{/* Prix */}
							<p className="mt-6 flex items-center justify-center gap-x-2">
								<span className="text-5xl font-bold tracking-tight text-foreground">
									{isMonthly ? plan.price : plan.yearlyPrice}
								</span>
								{/* On n’affiche /mois ou /an que si ce n’est pas le plan gratuit */}
								{plan.name !== "INITIATEUR" && (
									<span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
										/ {plan.period}
									</span>
								)}
							</p>

							{/* Facturé mensuellement/annuellement */}
							{plan.name !== "INITIATEUR" ? (
								<p className="text-xs leading-5 text-muted-foreground">
									{isMonthly
										? "Facturé mensuellement"
										: "Facturé annuellement"}
								</p>
							) : (
								<p className="text-xs leading-5 text-muted-foreground">
									tout simplement
								</p>
							)}

							{/* Liste des features */}
							<ul className="mt-5 gap-2 flex flex-col">
								{plan.features.map((feature, idx) => (
									<li key={idx} className="flex items-center">
										<Check className="mr-2 h-4 w-4 text-primary" />
										<span>{feature}</span>
									</li>
								))}
							</ul>

							<hr className="w-full my-4" />

							{/* Bouton d’action */}
							<button
								onClick={() => handleSubscribe(plan.name)}
								className={cn(
									buttonVariants({ variant: "outline" }),
									"group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
									"transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-white",
									plan.isPopular
										? "bg-primary text-white"
										: "bg-white text-black"
								)}
							>
								{plan.buttonText}
							</button>

							{/* Description du plan */}
							<p className="mt-6 text-xs leading-5 text-muted-foreground">
								{plan.description}
							</p>
						</div>
					</motion.div>
				))}
			</div>
		</Section>
	);
}
