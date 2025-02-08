// components/providers/user-metadata-provider.tsx

"use client";

import React, { createContext, useContext, useState } from "react";
import axios from "axios";

type UserMetadataContextType = {
	metadata: Record<string, any> | null;
	loading: boolean;
	error: string | null;
	fetchUserMetadata: (userId: string) => Promise<void>;
	updateLocalMetadata: (newMetadata: Record<string, any>) => void;
};

const UserMetadataContext = createContext<UserMetadataContextType | undefined>(
	undefined
);

export function UserMetadataProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [metadata, setMetadata] = useState<Record<string, any> | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function fetchUserMetadata(userId: string) {
		setLoading(true);
		setError(null);
		try {
			const res = await axios.get(
				`/api/auth/user/get-metadata?userId=${encodeURIComponent(
					userId
				)}`
			);
			setMetadata(res.data.metadata);
		} catch (err: any) {
			console.error(err);
			setError(err.response?.data?.error || err.message);
		} finally {
			setLoading(false);
		}
	}

	function updateLocalMetadata(newMetadata: Record<string, any>) {
		setMetadata(newMetadata);
	}

	return (
		<UserMetadataContext.Provider
			value={{
				metadata,
				loading,
				error,
				fetchUserMetadata,
				updateLocalMetadata,
			}}
		>
			{children}
		</UserMetadataContext.Provider>
	);
}

export function useUserMetadata() {
	const context = useContext(UserMetadataContext);
	if (!context) {
		throw new Error(
			"useUserMetadata must be used within a UserMetadataProvider"
		);
	}
	return context;
}
