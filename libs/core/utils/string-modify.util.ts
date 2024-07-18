/**
 * Replace underscores in string to spaces.
 * @param string - String with underscores.
 * @returns String without underscores.
 */
export function replaceUnderscores(string: string): string {
	return string.replace(/_/g, ' ');
}

/**
 * Replace spaces in string to underscores.
 * @param string - String with spaces.
 * @returns String without spaces.
 */
export function replaceSpaces(string: string): string {
	return string.replace(/ /g, '_');
}

/**
 * Change string case to capital.
 * @param string - String.
 * @returns - String with capital case.
 */
export function changeStringCase(string: string): string {
	return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
}
