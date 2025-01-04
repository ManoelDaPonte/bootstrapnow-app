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
import Link from "next/link";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function PricingSection() {
	const [isMonthly, setIsMonthly] = useState(true);
	const { isDesktop } = useWindowSize();

	// IDs des tarifs Stripe (fictifs, à remplacer par vos vrais price_id)
	const PRICE_MONTHLY = "price_1QVYm3LeUDeexlQtgjHqqyal";
	const PRICE_YEARLY = "price_XXX_yearly";
	const PRICE_ONETIME = "price_XXX_onetime";

	async function handleCheckout(priceId: string) {
		const res = await fetch("/api/stripe/create-checkout-session", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ priceId }),
		});

		const data = await res.json();
		console.log(data);
		if (data.url) {
			window.location.href = data.url;
		} else {
			alert("Erreur lors de la création de la session de paiement");
		}
	}

	const handleToggle = () => {
		setIsMonthly(!isMonthly);
	};

	return (
		<Section
			title="Tarifs"
			subtitle="Choisissez l'offre qui correspond à vos besoins"
		>
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
				{siteConfig.pricing.map((plan, index) => {
					// Déterminer le priceId selon le plan
					let priceId = "";
					if (plan.name === "STANDARD") {
						// Si c’est le plan standard, on choisit mensuel ou annuel selon l’état `isMonthly`
						priceId = isMonthly ? PRICE_MONTHLY : PRICE_YEARLY;
					} else if (plan.name === "ACCÈS À VIE") {
						priceId = PRICE_ONETIME;
					}

					return (
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
													siteConfig.pricing.length -
														1
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
								<p className="text-base font-semibold text-muted-foreground">
									{plan.name}
								</p>
								<p className="mt-6 flex items-center justify-center gap-x-2">
									<span className="text-5xl font-bold tracking-tight text-foreground">
										{isMonthly
											? plan.price
											: plan.yearlyPrice}
									</span>
									{plan.period !== "Prochaines 3 mois" && (
										<span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
											/ {plan.period}
										</span>
									)}
								</p>

								<p className="text-xs leading-5 text-muted-foreground">
									{isMonthly
										? plan.name === "STANDARD"
											? "Facturé mensuellement"
											: plan.period
										: plan.name === "STANDARD"
										? "Facturé annuellement"
										: plan.period}
								</p>

								<ul className="mt-5 gap-2 flex flex-col">
									{plan.features.map((feature, idx) => (
										<li
											key={idx}
											className="flex items-center"
										>
											<Check className="mr-2 h-4 w-4 text-primary" />
											<span>{feature}</span>
										</li>
									))}
								</ul>

								<hr className="w-full my-4" />

								{plan.name === "GRATUIT" ? (
									<Link
										href={plan.href}
										className={cn(
											buttonVariants({
												variant: "outline",
											}),
											"group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
											"transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-white",
											plan.isPopular
												? "bg-primary text-white"
												: "bg-white text-black"
										)}
									>
										{plan.buttonText}
									</Link>
								) : (
									<Button
										variant={
											plan.isPopular
												? "default"
												: "outline"
										}
										className="w-full sm:w-auto text-background flex gap-2"
										onClick={() => handleCheckout(priceId)}
									>
										{plan.buttonText}
									</Button>
								)}

								<p className="mt-6 text-xs leading-5 text-muted-foreground">
									{plan.description}
								</p>
							</div>
						</motion.div>
					);
				})}
			</div>
		</Section>
	);
}
