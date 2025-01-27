"use client";
import { useBusinessPlanData } from "@/lib/hooks/business-plan/useBusinessPlanData";

const YourComponent = () => {
	const { data, isLoading, error } = useBusinessPlanData();

	if (isLoading) return <div>Chargement...</div>;
	if (error) return <div>Erreur: {error}</div>;

	// Utiliser les données
	console.log(data);

	return <div>{/* Afficher les données */}</div>;
};

export default YourComponent;
