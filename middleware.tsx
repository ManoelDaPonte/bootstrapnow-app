// middleware.ts
import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Fonction pour vérifier si une route doit être protégée
function isProtectedRoute(pathname: string) {
	const protectedPaths = [
		"/tools",
		"/profile",
		"/dashboard",
		"/business-plan",
	];

	return protectedPaths.some((path) => pathname.startsWith(path));
}

// Fonction pour vérifier si une route doit être publique
function isPublicRoute(pathname: string) {
	const publicPaths = [
		"/_next",
		"/api/auth",
		"/favicon.ico",
		"/static",
		"/images",
	];

	return publicPaths.some((path) => pathname.startsWith(path));
}

export default withMiddlewareAuthRequired(function middleware(
	req: NextRequest
) {
	const pathname = req.nextUrl.pathname;

	// Si c'est une route publique, on laisse passer
	if (isPublicRoute(pathname)) {
		return NextResponse.next();
	}

	// Si c'est une route protégée, Auth0 s'en occupe
	if (isProtectedRoute(pathname)) {
		return NextResponse.next();
	}

	// Pour toutes les autres routes, on laisse passer
	return NextResponse.next();
});

export const config = {
	matcher: [
		/*
		 * Match toutes les routes sauf :
		 * 1. Les routes API Auth0 (/api/auth/*)
		 * 2. Les fichiers statiques (_next/static, images, favicon.ico)
		 */
		"/((?!api/auth|_next/static|_next/image|favicon.ico|images).*)",
	],
};
