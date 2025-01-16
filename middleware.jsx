// middleware.js (in your root directory)
import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired();

export const config = {
	matcher: [
		// Add routes that should be protected
		"/protected/:path*",
		"/api/protected/:path*",

		// Exclude routes that should be public
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
