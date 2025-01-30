// lib/business-plan/prompt/replacePlaceholders.ts
export const replacePlaceholders = (
	template: string,
	data: Record<string, string>
): string => {
	return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
		return data[key] || "{{NA}}";
	});
};
