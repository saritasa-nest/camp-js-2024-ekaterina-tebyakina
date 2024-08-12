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

/** Type of parameters of the form control's updating function. */
export type UpdateControlsValuesParams = {

	/** Form group for updating. */
	readonly formGroup: FormGroup<AnimeFilterForm>;

	/** Value for types form control. */
	readonly typesValue: AnimeType[];

	/** Value for search form control. */
	readonly searchValue: string;
};

/** Filter form management service. */
@Injectable({ providedIn: 'root' })
export class AnimeFilterFormService {

	private readonly formBuilder = inject(NonNullableFormBuilder);

	/**
	 * Function for initializing anime form filter.
	 * @param typesInitialValue - Initial value for types form control.
	 * @param searchInitialValue - Initial value for search form control.
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

	/**
	 * Sets new values for form controls.
	 * @param formGroup - Form group for updating.
	 * @param typesValue - New value for types form control.
	 * @param searchValue - New value for search form control.
	 */
	public updateControlsValues({ formGroup, searchValue, typesValue }: UpdateControlsValuesParams): void {
		formGroup.controls.search.setValue(searchValue);
		formGroup.controls.types.setValue(typesValue);
	}
}
