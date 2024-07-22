import { Pipe, PipeTransform } from '@angular/core';

/** Pipe for alternative representation of empty value. */
@Pipe({
	name: 'empty',
	standalone: true,
})
export class EmptyPipe implements PipeTransform {
	/** @inheritdoc */
	public transform(
		value: string | null | undefined,
		placeholder?: string
	): string;

	/** @inheritdoc */
	public transform(
		value: number | null | undefined,
		placeholder?: string
	): number | string;

	/**
	 * Transforms the specified empty string or nullable value into the specified placeholder.
	 * @param value Specified string.
	 * @param placeholder Specified placeholder.
	 * @returns Placeholder or value.
	 */
	public transform(
		value: number | string | null | undefined,
		placeholder?: string,
	): string | number {
		let placeholderValue = '\u2014';
		if (placeholder) {
			placeholderValue = placeholder;
		}
		if (value == null || value === '') {
			return placeholderValue;
		}

		return value;
	}
}
