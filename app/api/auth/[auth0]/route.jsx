// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0";

export async function GET(request, props) {
    const params = await props.params;
    const resolvedParams = await params;

    try {
		return handleAuth({
			login: handleLogin({
				returnTo: "/",
				authorizationParams: {
					screen_hint: "login",
					prompt: "login",
				},
			}),
			signup: handleLogin({
				returnTo: "/",
				authorizationParams: {
					screen_hint: "signup",
				},
			}),
			logout: handleLogout({
				returnTo: process.env.NEXT_PUBLIC_LANDING_PAGE_HOST,
			}),
			cookies: {
				session: {
					name: "appSession",
					rolling: true,
					sameSite: "lax",
					secure: process.env.NODE_ENV === "production",
				},
			},
		})(request, { params: resolvedParams });
	} catch (err) {
		return new Response("Erreur d'authentification", { status: 500 });
	}
}
