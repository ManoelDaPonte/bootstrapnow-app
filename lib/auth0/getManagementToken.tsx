// lib/auth0/getManagementToken.ts
import axios from "axios";

let cachedToken: { token: string; expiresAt: number } | null = null;

const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;

export default async function getManagementToken(): Promise<string> {
	const now = Date.now();

	if (cachedToken && now < cachedToken.expiresAt) {
		return cachedToken.token;
	}

	try {
		const { data } = await axios.post(
			`${AUTH0_ISSUER_BASE_URL}/oauth/token`,
			{
				client_id: AUTH0_CLIENT_ID,
				client_secret: AUTH0_CLIENT_SECRET,
				audience: `${AUTH0_ISSUER_BASE_URL}/api/v2/`,
				grant_type: "client_credentials",
			},
			{
				headers: { "Content-Type": "application/json" },
			}
		);

		cachedToken = {
			token: data.access_token,
			expiresAt: now + data.expires_in * 1000, // Expiration en millisecondes
		};

		return data.access_token;
	} catch (error: any) {
		console.error(
			"Error fetching Auth0 management token:",
			error.response?.data || error.message
		);
		throw new Error("Unable to fetch Auth0 management token.");
	}
}
