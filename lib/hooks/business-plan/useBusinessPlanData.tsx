// lib/hooks/business-plan/useBusinessPlanData.ts
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

interface BusinessPlanData {
	swot: any;
	ansoff: any;
	pestel: any;
	canvas: any;
	marketingMix: any;
	skillMatrix: any;
	valueProposition: any;
	funnelChart: any;
}

export const useBusinessPlanData = () => {
	const { user, isLoading: isUserLoading } = useUser();
	const [data, setData] = useState<BusinessPlanData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			if (!user) return;

			try {
				const response = await fetch(
					"/api/business-plan/get-business-plan-analysis-data"
				);
				if (!response.ok) {
					throw new Error(
						"Erreur lors de la récupération des données"
					);
				}
				const businessPlanData = await response.json();
				setData(businessPlanData);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Une erreur est survenue"
				);
			} finally {
				setIsLoading(false);
			}
		};

		if (!isUserLoading && user) {
			fetchData();
		}
	}, [user, isUserLoading]);

	return { data, isLoading, error };
};
