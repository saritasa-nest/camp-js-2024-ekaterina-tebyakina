export namespace DateTimeMapper {

	/**
	 * Map DTO to model.
	 * @param dto DTO.
	 */
	export function fromDto(dto: string): Date {
		return parseDate(dto);
	}

	/**
	 * Map model to DTO.
	 * @param model Model.
	 */
	export function toDto(model: Date): string {
		return model.toISOString();
	}

	/**
	 * Parse a string to date and check if that date is valid.
	 * @param dateStr The date string.
	 */
	function parseDate(dateStr: string): Date {
		const date = new Date(dateStr);
		if (isNaN(date.getTime())) {
			throw new Error(`Invalid date format: ${dateStr}`);
		}
		return date;
	}
}
