// lib/auth0/findUserByCustomerId.ts
import getManagementToken from "./getManagementToken";

const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL;

export async function findUserByCustomerId(
	customerId: string
): Promise<string | null> {
	const accessToken = await getManagementToken();
	const url = `${AUTH0_ISSUER_BASE_URL}/api/v2/users?q=user_metadata.customer_id%3A"${encodeURIComponent(
		customerId
	)}"&search_engine=v3`;

	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		console.error("Error finding user by customer_id", await res.text());
		return null;
	}

	const users = await res.json();
	return Array.isArray(users) && users.length > 0 ? users[0].user_id : null;
}
