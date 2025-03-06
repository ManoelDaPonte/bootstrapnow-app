"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type TermsContextType = {
	hasAcceptedTerms: boolean;
	acceptTerms: () => void;
};

const TermsContext = createContext<TermsContextType | undefined>(undefined);

const TERMS_STORAGE_KEY = "bootstrapnow_terms_accepted";
const TERMS_VERSION = "1.0"; // Update this when terms change to require re-acceptance

export function TermsProvider({ children }: { children: React.ReactNode }) {
	const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean>(true); // Default to true to prevent flash

	useEffect(() => {
		// Check local storage for accepted terms
		const acceptedVersion = localStorage.getItem(TERMS_STORAGE_KEY);
		setHasAcceptedTerms(acceptedVersion === TERMS_VERSION);
	}, []);

	const acceptTerms = () => {
		localStorage.setItem(TERMS_STORAGE_KEY, TERMS_VERSION);
		setHasAcceptedTerms(true);
	};

	return (
		<TermsContext.Provider value={{ hasAcceptedTerms, acceptTerms }}>
			{children}
		</TermsContext.Provider>
	);
}

export function useTerms() {
	const context = useContext(TermsContext);
	if (context === undefined) {
		throw new Error("useTerms must be used within a TermsProvider");
	}
	return context;
}
