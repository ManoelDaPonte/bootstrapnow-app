// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogout } from '@auth0/nextjs-auth0';

export async function GET(request, { params }) {
  const resolvedParams = await params;
  return handleAuth({
    logout: handleLogout({
      auth0Logout: true,
      returnTo: process.env.NEXT_PUBLIC_LANDING_PAGE_HOST,
    }),
  })(request, { params: resolvedParams });
}