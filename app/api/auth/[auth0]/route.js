// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogout } from '@auth0/nextjs-auth0';

export async function GET(request, { params }) {
  const resolvedParams = await params;

    // Déterminer l'environnement
    const isProduction = process.env.NODE_ENV === 'production';

    // Définir les URLs de redirection en fonction de l'environnement
    const logoutReturnTo = isProduction 
      ? process.env.NEXT_PUBLIC_LANDING_PAGE_HOST 
      : 'http://localhost:3000';

    console.log('logoutReturnTo', logoutReturnTo);
      
  return handleAuth({
    logout: handleLogout({
      auth0Logout: true,
      returnTo: logoutReturnTo,
    }),
  })(request, { params: resolvedParams });
}