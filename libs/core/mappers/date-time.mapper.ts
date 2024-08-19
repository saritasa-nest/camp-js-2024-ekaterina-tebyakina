export namespace DateTimeMapper {

	/**
	 * Parse the given string to a Date.
	 * @param dateStr The given string.
	 */
	function parseDate(dateStr: string): Date | null {
		const date = new Date(dateStr);
		return isNaN(date.getTime()) ? null : date;
	}

	/**
	 * Map the dto string to Date.
	 * @param dto Dto.
	 */
	export function fromDto(dto: string): Date {
		const date = parseDate(dto);
		return date ?? new Date();
	}

	/**
	 * Map the date to string.
	 * @param model Dto.
	 */
	export function toDto(model: Date): string {
		return model.toISOString();
	}
}
