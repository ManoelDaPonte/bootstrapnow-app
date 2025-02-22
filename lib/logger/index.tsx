// lib/logger/index.ts

enum LogLevel {
	INFO = "INFO",
	ERROR = "ERROR",
	DEBUG = "DEBUG",
}

class Logger {
	private sectionId: string = "";

	setSection(id: string) {
		this.sectionId = id;
		return this;
	}

	private formatMessage(level: LogLevel, message: string): string {
		const timestamp = new Date().toISOString();
		const prefix = this.sectionId ? `[${this.sectionId}]` : "";
		return `${timestamp} ${level} ${prefix} ${message}`;
	}

	info(message: string) {
		console.log(this.formatMessage(LogLevel.INFO, message));
	}

	error(message: string, error?: unknown) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		console.error(
			this.formatMessage(LogLevel.ERROR, `${message} - ${errorMessage}`)
		);
	}

	debug(message: string) {
		if (process.env.NODE_ENV === "development") {
			console.debug(this.formatMessage(LogLevel.DEBUG, message));
		}
	}

	// Méthodes spécifiques pour chaque étape de génération
	startGeneration(sectionName: string) {
		this.info(`Début de génération de la section: ${sectionName}`);
	}

	dataFetch() {
		this.debug("Récupération des données utilisateur");
	}

	sectionCheck() {
		this.debug("Vérification de la nécessité de régénération");
	}

	formatting() {
		this.debug("Formatage des données");
	}

	pathValidation(validCount: number, totalCount: number) {
		this.info(
			`Validation des chemins: ${validCount}/${totalCount} valides`
		);
	}

	promptCreation() {
		this.debug("Création du prompt utilisateur");
	}

	contextFetch() {
		this.debug("Récupération du contexte des sections précédentes");
	}

	generating() {
		this.info("Génération du contenu en cours via OpenAI");
	}

	saving() {
		this.debug("Sauvegarde de la section et des métadonnées");
	}
}

export const logger = new Logger();
