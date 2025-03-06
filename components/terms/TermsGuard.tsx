"use client";

import { useTerms } from "@/context/termsContext";
import TermsModal from "./TermsModal";

export default function TermsGuard({
	children,
}: {
	children: React.ReactNode;
}) {
	const {} = useTerms();

	return (
		<>
			{children}
			<TermsModal />
		</>
	);
}
