import { inject, Injectable } from '@angular/core';
import { FormControl, NonNullableFormBuilder, FormGroup } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime-type';

/** Type for anime filter form group. Contains types for each control. */
export type AnimeFilterForm = {

	/** Type of form control to select the type of anime. */
	readonly types: FormControl<AnimeType[]>;

	/** Type of form control to search anime. */
	readonly search: FormControl<string>;
};

/** Type of parameters of the form initialization function. */
export type AnimeFilterFormParams = {

	/** Initial value for types form control. */
	readonly typesInitialValue: AnimeType[];

	/** Initial value for search form control. */
	readonly searchInitialValue: string;
};

/** Service to create a filter form. */
@Injectable({ providedIn: 'root' })
export class AnimeFilterFormService {

	private readonly formBuilder = inject(NonNullableFormBuilder);

	/**
	 * Function for initializing anime form filter.
	 * @param typesInitialValue - Initial value for types form control.
	 * @param searchInitialValue - Initial value for search form control.
	 * @param formBuilder - From builder for form.
	 * @returns Anime form.
	 */
	public initialize({
		searchInitialValue,
		typesInitialValue,
	}: AnimeFilterFormParams): FormGroup<AnimeFilterForm> {
		return this.formBuilder.group({
			types: this.formBuilder.control(typesInitialValue),
			search: this.formBuilder.control(searchInitialValue),
		});
	}
}
