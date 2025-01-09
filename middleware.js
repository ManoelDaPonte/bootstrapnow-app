import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';

export async function middleware(req) {
//   const res = NextResponse.next();
//   const session = await getSession(req, res);

//   if (!session) {
//     // Utilisateur non authentifié, redirigez vers la route de login Auth0
//     const loginUrl = new URL('/api/auth/login', req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   return res;
// }

// export const config = {
//   matcher: [
//     "/((?!api/auth0|login|api/*|_next/static|_next/image|favicon.ico|.*\\..*$).*)",
//   ],
};
