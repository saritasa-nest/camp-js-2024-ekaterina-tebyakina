import { AsyncPipe, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { AnimeStatus } from '@js-camp/core/models/anime-status';
import { AnimeRating } from '@js-camp/core/models/anime-rating';
import { AnimeSource } from '@js-camp/core/models/anime-source';
import { Season } from '@js-camp/core/models/season';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressBarComponent } from '@js-camp/angular/shared/components/progress-bar/progress-bar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterPaths } from '@js-camp/angular/core/model/router-paths';

import { AnimeEditFormService } from './anime-edit-form.service';

/** Component to edit an anime. */
@Component({
	selector: 'camp-anime-edit-form',
	standalone: true,
	templateUrl: './anime-edit-form.component.html',
	styleUrl: './anime-edit-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [provideNativeDateAdapter()],
	imports: [
		MatButtonModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatSelectModule,
		ReactiveFormsModule,
		AsyncPipe,
		ProgressBarComponent,
		MatSlideToggleModule,
	],
})
export class AnimeEditFormComponent implements OnInit {

	/** Loading state to show progress bar. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(true);

	/** List of permissible values for types select control. */
	protected readonly animeTypes = Object.values(AnimeType);

	/** List of permissible values for status select control. */
	protected readonly animeStatuses = Object.values(AnimeStatus);

	/** List of permissible values for rating select control. */
	protected readonly animeRatings = Object.values(AnimeRating);

	/** List of permissible values for source select control. */
	protected readonly animeSources = Object.values(AnimeSource);

	/** List of permissible values for season select control. */
	protected readonly seasons = Object.values(Season);

	/** Edit form management service. */
	protected readonly animeEditFormService = inject(AnimeEditFormService);

	private readonly location = inject(Location);

	private readonly animeService = inject(AnimeService);

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly router = inject(Router);

	private animeId = this.activatedRoute.snapshot.params['id'];

	/** @inheritdoc */
	public ngOnInit(): void {
		this.isLoading$.next(true);
		this.animeService.getAnime(this.animeId).pipe(
			tap(
				anime => {
					this.animeEditFormService.updateControlsValues({
						englishTitleValue: anime.englishTitle,
						japaneseTitleValue: anime.japaneseTitle,
						airingValue: anime.airing,
						airedStartValue: anime.aired.start,
						airedEndValue: anime.aired.end,
						typeValue: anime.type,
						statusValue: anime.status,
						ratingValue: anime.rating,
						sourceValue: anime.source,
						seasonValue: anime.season,
						synopsisValue: anime.synopsis,
						studiosValue: anime.studios,
						genresValue: anime.genres,
					});
				},
			),
			finalize(() => this.isLoading$.next(false)),
		)
			.subscribe();
	}

	/** Handle click on go back button. */
	protected onGoBack(): void {
		this.location.back();
	}

	/** Handle login form submit. */
	protected onEditSubmit(): void {

		if (this.animeEditFormService.form.invalid) {
			return;
		}

		const formData = this.animeEditFormService.form.getRawValue();

		const animeData = {
			englishTitle: formData.englishTitle ?? '',
			japaneseTitle: formData.japaneseTitle ?? '',
			airing: formData.airing,
			aired: {
				start: formData.airedStart ?? null,
				end: formData.airedEnd ?? null,
			},
			type: formData.type,
			status: formData.status,
			rating: formData.rating,
			source: formData.source,
			season: formData.season,
			synopsis: formData.synopsis,
			studios: formData.studios,
			genres: formData.genres,
		};

		this.isLoading$.next(true);
		this.animeService.editAnime(this.animeId, animeData).pipe(
			finalize(() => {
				this.isLoading$.next(false);
				this.router.navigate([RouterPaths.Main, this.animeId]);
			}),
		)
			.subscribe();
	}
}
