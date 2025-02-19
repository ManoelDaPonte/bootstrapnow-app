// lib/auth0/getManagementToken.ts
import axios from "axios";

let cachedToken: { token: string; expiresAt: number } | null = null;

const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL?.replace(
	/\/$/,
	""
);
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;

export default async function getManagementToken(): Promise<string> {
	// Vérification des variables d'environnement
	if (
		!AUTH0_ISSUER_BASE_URL ||
		!AUTH0_CLIENT_ID ||
		!AUTH0_CLIENT_SECRET ||
		!AUTH0_AUDIENCE
	) {
		console.error("Missing Auth0 configuration:", {
			hasIssuerBaseUrl: !!AUTH0_ISSUER_BASE_URL,
			hasClientId: !!AUTH0_CLIENT_ID,
			hasClientSecret: !!AUTH0_CLIENT_SECRET,
			hasAudience: !!AUTH0_AUDIENCE,
		});
		throw new Error("Missing required Auth0 environment variables");
	}

	const now = Date.now();

	if (cachedToken && now < cachedToken.expiresAt) {
		return cachedToken.token;
	}

	try {
		const tokenUrl = `${AUTH0_ISSUER_BASE_URL}/oauth/token`;
		console.log("Requesting token from:", tokenUrl);

		const { data } = await axios.post(
			tokenUrl,
			{
				client_id: AUTH0_CLIENT_ID,
				client_secret: AUTH0_CLIENT_SECRET,
				audience: AUTH0_AUDIENCE,
				grant_type: "client_credentials",
			},
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		);

		if (!data.access_token) {
			throw new Error("No access token received from Auth0");
		}

		cachedToken = {
			token: data.access_token,
			expiresAt: now + data.expires_in * 1000,
		};

		return data.access_token;
	} catch (error: any) {
		console.error("Error fetching Auth0 management token:", {
			status: error.response?.status,
			statusText: error.response?.statusText,
			data: error.response?.data,
			message: error.message,
			url: `${AUTH0_ISSUER_BASE_URL}/oauth/token`,
		});

		throw new Error(
			`Unable to fetch Auth0 management token: ${
				error.response?.data?.error_description ||
				error.response?.data?.message ||
				error.message
			}`
		);
	}
}
