import { Pipe, PipeTransform } from '@angular/core';

const DEFAULT_PLACEHOLDER = '\u2014';

/** Pipe for alternative representation of empty value. */
@Pipe({
	name: 'empty',
	standalone: true,
})
export class EmptyPipe implements PipeTransform {

	/**
	 * Transforms the specified empty string or nullable value into the specified placeholder.
	 * @param value Specified string.
	 * @param placeholder Specified placeholder.
	 * @returns Placeholder or value.
	 */
	public transform(
		value: number | string | null | undefined,
		placeholder = DEFAULT_PLACEHOLDER,
	): string | number {

		if (value == null || value === '') {
			return placeholder;
		}

		return value;
	}
}
