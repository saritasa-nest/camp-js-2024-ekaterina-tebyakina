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

	/** Form control to choose is an anime airing. */
	readonly airing: FormControl<boolean>;

	/** Form control to choose the start date of the anime aired. */
	readonly airedStart: FormControl<Date | null>;

	/** Form control to choose the end date of the anime aired. */
	readonly airedEnd: FormControl<Date | null>;

	/** Form control to select the type of anime. */
	readonly type: FormControl<AnimeType>;

	/** Form control to select the status of anime. */
	readonly status: FormControl<AnimeStatus>;

	/** Form control to select the rating of anime. */
	readonly rating: FormControl<AnimeRating>;

	/** Form control to select the source of anime. */
	readonly source: FormControl<AnimeSource>;

	/** Form control to select the season. */
	readonly season: FormControl<Season>;

	/** Form control to select the synopsis. */
	readonly synopsis: FormControl<string>;

	/** Form control to select the studios. */
	readonly studios: FormControl<readonly number[]>;

	/** Form control to select the studios. */
	readonly genres: FormControl<readonly number[]>;
};

/** Type of parameters of the form initialization function. */
type AnimeEditFormParams = {

	/** Initial value for control to input the english title of anime. */
	readonly englishTitleValue: string;

	/** Initial value for control to input the japanese title of anime. */
	readonly japaneseTitleValue: string;

	/** Initial value for control to choose is an anime airing. */
	readonly airingValue: boolean;

	/** Initial value for control to choose the start date of the anime aired. */
	readonly airedStartValue: Date | null;

	/** Initial value for control to choose the end date of the anime aired. */
	readonly airedEndValue: Date | null;

	/** Initial value for control to select the type of anime. */
	readonly typeValue: AnimeType;

	/** Initial value for control to select the status of anime. */
	readonly statusValue: AnimeStatus;

	/** Initial value for control to select the rating of anime. */
	readonly ratingValue: AnimeRating;

	/** Initial value for control to select the source of anime. */
	readonly sourceValue: AnimeSource;

	/** Initial value for control to select the season. */
	readonly seasonValue: Season;

	/** Initial value for control to select the synopsis. */
	readonly synopsisValue: string;

	/** Initial value for control to select the studios. */
	readonly studiosValue: readonly number[];

	/** Initial value for control to select the genres. */
	readonly genresValue: readonly number[];
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
			typeValue: AnimeType.Unknown,
			statusValue: AnimeStatus.NotYetAired,
			ratingValue: AnimeRating.Unknown,
			sourceValue: AnimeSource.Unknown,
			seasonValue: Season.NonSeasonal,
			synopsisValue: '',
			airingValue: false,
			studiosValue: [],
			genresValue: [],
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
		typeValue,
		statusValue,
		ratingValue,
		sourceValue,
		seasonValue,
		synopsisValue,
		airingValue,
		studiosValue,
		genresValue,
	}: AnimeEditFormParams): FormGroup<AnimeEditForm> {
		return this.formBuilder.group({
			englishTitle: this.formBuilder.control(englishTitleValue),
			japaneseTitle: this.formBuilder.control(japaneseTitleValue),
			airing: this.formBuilder.control(airingValue),
			airedStart: this.formBuilder.control(airedStartValue),
			airedEnd: this.formBuilder.control(airedEndValue),
			type: this.formBuilder.control(typeValue),
			status: this.formBuilder.control(statusValue),
			rating: this.formBuilder.control(ratingValue),
			source: this.formBuilder.control(sourceValue),
			season: this.formBuilder.control(seasonValue),
			synopsis: this.formBuilder.control(synopsisValue),
			studios: this.formBuilder.control(studiosValue),
			genres: this.formBuilder.control(genresValue),
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
		typeValue,
		statusValue,
		ratingValue,
		sourceValue,
		seasonValue,
		synopsisValue,
		studiosValue,
		genresValue,
	}: AnimeEditFormParams): void {
		this.form.controls.englishTitle.setValue(englishTitleValue);
		this.form.controls.japaneseTitle.setValue(japaneseTitleValue);
		this.form.controls.airedStart.setValue(airedStartValue);
		this.form.controls.airedEnd.setValue(airedEndValue);
		this.form.controls.type.setValue(typeValue);
		this.form.controls.status.setValue(statusValue);
		this.form.controls.rating.setValue(ratingValue);
		this.form.controls.source.setValue(sourceValue);
		this.form.controls.season.setValue(seasonValue);
		this.form.controls.synopsis.setValue(synopsisValue);
		this.form.controls.studios.setValue(studiosValue);
		this.form.controls.genres.setValue(genresValue);
	}
}
