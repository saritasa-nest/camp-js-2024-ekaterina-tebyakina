import { inject, Injectable } from '@angular/core';
import { FormControl, NonNullableFormBuilder, FormGroup } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime-type';

/** Type for anime filter form group. Contains types for each control. */
type AnimeFilterForm = {

	/** Type of form control to select the type of anime. */
	readonly types: FormControl<AnimeType[]>;

	/** Type of form control to search anime. */
	readonly search: FormControl<string>;
};

/** Type of parameters of the form initialization function. */
type AnimeFilterFormParams = {

	/** Initial value for types form control. */
	readonly typesInitialValue: AnimeType[];

	/** Initial value for search form control. */
	readonly searchInitialValue: string;
};

/** Type of parameters of the form control's updating function. */
type UpdateControlsValuesParams = {

	/** Value for types form control. */
	readonly typesValue: AnimeType[];

	/** Value for search form control. */
	readonly searchValue: string;
};

/** Filter form management service. */
@Injectable({ providedIn: 'root' })
export class AnimeFilterFormService {

	private readonly formBuilder = inject(NonNullableFormBuilder);

	/** Form group for anime filter form. */
	public readonly form: FormGroup<AnimeFilterForm>;

	public constructor() {
		this.form = this.initialize({
			searchInitialValue: '',
			typesInitialValue: [],
		});
	}

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
	 * @param typesValue - New value for types form control.
	 * @param searchValue - New value for search form control.
	 */
	public updateControlsValues({ searchValue, typesValue }: UpdateControlsValuesParams): void {
		this.form.controls.search.setValue(searchValue);
		this.form.controls.types.setValue(typesValue);
	}
}
