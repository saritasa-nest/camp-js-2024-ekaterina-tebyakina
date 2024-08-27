import { inject, Injectable } from '@angular/core';
import { FormControl, NonNullableFormBuilder, FormGroup } from '@angular/forms';
import { AnimeRating } from '@js-camp/core/models/anime-rating';
import { AnimeSource } from '@js-camp/core/models/anime-source';
import { AnimeStatus } from '@js-camp/core/models/anime-status';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { Season } from '@js-camp/core/models/season';

/** Type for anime edit form group. Contains types for each control. */
type AnimeEditForm = {

	/** Form control to input the english title of anime. */
	readonly englishTitle: FormControl<string>;

	/** Form control to input the english title of anime. */
	readonly japaneseTitle: FormControl<string>;

	/** Form control to choose the start date of the anime aired. */
	readonly airedStart: FormControl<Date | null>;

	/** Form control to choose the end date of the anime aired. */
	readonly airedEnd: FormControl<Date | null>;

	/** Form control to select the type of anime. */
	readonly types: FormControl<AnimeType | ''>;

	/** Form control to select the status of anime. */
	readonly status: FormControl<AnimeStatus | ''>;

	/** Form control to select the rating of anime. */
	readonly rating: FormControl<AnimeRating | ''>;

	/** Form control to select the source of anime. */
	readonly source: FormControl<AnimeSource | ''>;

	/** Form control to select the season. */
	readonly season: FormControl<Season | ''>;
};

/** Type of parameters of the form initialization function. */
type AnimeEditFormParams = {

	/** Initial value for control to input the english title of anime. */
	readonly englishTitleValue: string;

	/** Initial value for control to input the english title of anime. */
	readonly japaneseTitleValue: string;

	/** Initial value for control to choose the start date of the anime aired. */
	readonly airedStartValue: Date | null;

	/** Initial value for control to choose the end date of the anime aired. */
	readonly airedEndValue: Date | null;

	/** Initial value for control to select the type of anime. */
	readonly typesValue: AnimeType | '';

	/** Initial value for control to select the status of anime. */
	readonly statusValue: AnimeStatus | '';

	/** Initial value for control to select the rating of anime. */
	readonly ratingValue: AnimeRating | '';

	/** Initial value for control to select the source of anime. */
	readonly sourceValue: AnimeSource | '';

	/** Initial value for control to select the season. */
	readonly seasonValue: Season | '';
};

/** Edit form management service. */
@Injectable({ providedIn: 'root' })
export class AnimeEditFormService {

	private readonly formBuilder = inject(NonNullableFormBuilder);

	/** Form group for anime edit form. */
	public readonly form: FormGroup<AnimeEditForm>;

	public constructor() {
		this.form = this.initialize({
			englishTitleValue: '',
			japaneseTitleValue: '',
			airedStartValue: null,
			airedEndValue: null,
			typesValue: '',
			statusValue: '',
			ratingValue: '',
			sourceValue: '',
			seasonValue: '',
		});
	}

	/**
	 * Function for initializing anime form edit.
	 *  @param AnimeEditFormParams - Initial values for form.
	 * @returns Anime edit form.
	 */
	public initialize({
		englishTitleValue,
		japaneseTitleValue,
		airedStartValue,
		airedEndValue,
		typesValue,
		statusValue,
		ratingValue,
		sourceValue,
		seasonValue,
	}: AnimeEditFormParams): FormGroup<AnimeEditForm> {
		return this.formBuilder.group({
			englishTitle: this.formBuilder.control(englishTitleValue),
			japaneseTitle: this.formBuilder.control(japaneseTitleValue),
			airedStart: this.formBuilder.control(airedStartValue),
			airedEnd: this.formBuilder.control(airedEndValue),
			types: this.formBuilder.control(typesValue),
			status: this.formBuilder.control(statusValue),
			rating: this.formBuilder.control(ratingValue),
			source: this.formBuilder.control(sourceValue),
			season: this.formBuilder.control(seasonValue),
		});
	}

	/**
	 * Sets new values for form controls.
	 * @param AnimeEditFormParams - New values for form.
	 */
	public updateControlsValues({
		englishTitleValue,
		japaneseTitleValue,
		airedStartValue,
		airedEndValue,
		typesValue,
		statusValue,
		ratingValue,
		sourceValue,
		seasonValue,
	}: AnimeEditFormParams): void {
		this.form.controls.englishTitle.setValue(englishTitleValue);
		this.form.controls.japaneseTitle.setValue(japaneseTitleValue);
		this.form.controls.airedStart.setValue(airedStartValue);
		this.form.controls.airedEnd.setValue(airedEndValue);
		this.form.controls.types.setValue(typesValue);
		this.form.controls.status.setValue(statusValue);
		this.form.controls.rating.setValue(ratingValue);
		this.form.controls.source.setValue(sourceValue);
		this.form.controls.season.setValue(seasonValue);
	}
}
