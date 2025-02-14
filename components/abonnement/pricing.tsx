import { useState } from "react";
import Section from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

export default function PricingSection() {
	const [isMonthly, setIsMonthly] = useState(true);

	// Filtrer pour n'avoir que les plans payants
	const paidPlans = siteConfig.pricing.filter(
		(plan) => plan.name !== "INITIATEUR"
	);

	const planMap = {
		INNOVATEUR: {
			monthly: "innovateur_monthly",
			yearly: "innovateur_yearly",
		},
		VISIONNAIRE: {
			monthly: "visionnaire_monthly",
			yearly: "visionnaire_yearly",
		},
	};

	function getPlanSlug(planName: string, isMonthly: boolean) {
		const planEntry = planMap[planName as keyof typeof planMap];
		if (!planEntry) return "";
		return isMonthly ? planEntry.monthly : planEntry.yearly;
	}

	async function handleSubscribe(planName: string) {
		try {
			const planSlug = getPlanSlug(planName, isMonthly);
			const res = await axios.post(
				"/api/stripe/create-checkout-session",
				{
					plan: planSlug,
				}
			);
			const { url } = res.data;
			if (url) {
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
			<div className="flex justify-center mb-10">
				<span className="mr-2 font-semibold">Mensuel</span>
				<label className="relative inline-flex items-center cursor-pointer">
					<Label>
						<Switch
							checked={!isMonthly}
							onCheckedChange={() => setIsMonthly(!isMonthly)}
						/>
					</Label>
				</label>
				<span className="ml-2 font-semibold">Annuel</span>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
				{paidPlans.map((plan, index) => (
					<motion.div
						key={index}
						initial={{ y: 50, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						viewport={{ once: true }}
						transition={{
							duration: 0.6,
							delay: index * 0.2,
							ease: "easeOut",
						}}
						className={cn(
							"rounded-2xl border p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative",
							plan.isPopular
								? "border-primary border-2"
								: "border-border"
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
									{isMonthly ? plan.price : plan.yearlyPrice}
								</span>
								<span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
									/ {plan.period}
								</span>
							</p>

							<p className="text-xs leading-5 text-muted-foreground">
								{isMonthly
									? "Facturé mensuellement"
									: "Facturé annuellement"}
							</p>

							<ul className="mt-5 gap-2 flex flex-col">
								{plan.features.map((feature, idx) => (
									<li key={idx} className="flex items-center">
										<Check className="mr-2 h-4 w-4 text-primary" />
										<span>{feature}</span>
									</li>
								))}
							</ul>

							<hr className="w-full my-4" />

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
