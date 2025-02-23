//types/openai/section.tsx
export interface SectionConfig {
	title: string;
	paths: [string, string, string][];
	systemPrompt: string;
	contextGroup: number; // Nouveau paramètre
}

export interface GenerationResult {
	metadata: {
		section_name: string;
		section_title: string;
		generated_at: string;
		auth0_id: string;
		valid_paths_count: number;
		total_paths_count: number;
	};
	prompts: {
		system: string;
		user: string;
	};
	generated_content: string;
}
