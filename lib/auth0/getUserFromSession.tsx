//lib/auth0/getUserFromSession.tsx
import { getSession } from "@auth0/nextjs-auth0";

export async function getUserFromSession() {
	try {
		const session = await getSession();
		console.log("Session complète:", session);

		if (!session?.user) {
			console.log("Pas de session utilisateur");
			return null;
		}

		// Adaptation pour gérer le cas où l'email est dans le champ 'name'
		const user = {
			...session.user,
			email: session.user.email || session.user.name, // Utiliser name comme fallback pour l'email
			sub: session.user.sub, // Ensure sub is included
		};

		// Vérifier uniquement le sub car nous avons maintenant un fallback pour l'email
		if (!user.sub) {
			console.log("ID utilisateur manquant", user);
			return null;
		}

		console.log("Informations utilisateur traitées:", user);
		return user;
	} catch (error) {
		console.error("Erreur dans getUserFromSession:", error);
		return null;
	}
}
