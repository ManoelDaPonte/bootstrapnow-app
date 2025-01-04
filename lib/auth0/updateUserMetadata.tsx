// lib/auth0/updateUserMetadata.ts
import axios from "axios";

export default async function updateUserMetadata(
	accessToken: string,
	userId: string,
	metadata: Record<string, any>
): Promise<any> {
	const url = `${
		process.env.AUTH0_ISSUER_BASE_URL
	}/api/v2/users/${encodeURIComponent(userId)}`;

	try {
		const { data } = await axios.patch(
			url,
			{ user_metadata: metadata },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		return data;
	} catch (error: any) {
		console.error(
			"Error updating user metadata:",
			error.response?.data || error.message
		);
		throw new Error("Unable to update user metadata.");
	}
}
