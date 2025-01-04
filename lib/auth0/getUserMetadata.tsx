// lib/auth0/getUserMetadata.ts
import axios from "axios";

export default async function getUserMetadata(
	accessToken: string,
	userId: string
): Promise<Record<string, any>> {
	const url = `${
		process.env.AUTH0_ISSUER_BASE_URL
	}/api/v2/users/${encodeURIComponent(userId)}`;

	const { data } = await axios.get(url, {
		headers: { Authorization: `Bearer ${accessToken}` },
	});

	return data.user_metadata || {};
}
