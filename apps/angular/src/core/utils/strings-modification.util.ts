/**
 * Modifies the string, converting it to a capital case.
 * @param text - String for modification.
 * @returns String starting with a capital letter.
 */
export function capitalize(text: string): string {
	return text.charAt(0).toUpperCase() + text.slice(1);
}
