// lib/auth0/getUserFromSession.ts
import { cookies } from "next/headers";
import { getSession } from "@auth0/nextjs-auth0";

export async function getUserFromSession() {
	const cookieStore = await cookies();
	const allCookies = cookieStore.getAll();
	const cookieHeader = allCookies
		.map((c) => `${c.name}=${c.value}`)
		.join("; ");

	const req: any = { headers: { cookie: cookieHeader } };
	const res: any = {
		getHeader: () => undefined,
		setHeader: () => {},
		end: () => {},
	};

	const session = await getSession(req, res);
	return session?.user || null;
}
