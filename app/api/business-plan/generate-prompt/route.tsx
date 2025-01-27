import { useBusinessPlanData } from "@/lib/hooks/business-plan/useBusinessPlanData";

const YourComponent = () => {
	const { data, isLoading, error } = useBusinessPlanData();
};
