import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { MatSelectModule } from '@angular/material/select';
import { AnimeFilters } from '@js-camp/core/models/anime-filters';
import { throttleTime } from 'rxjs';

import { AnimeFilterFormService } from './anime-filter-form.service';

/**
 * Filter form component.
 * Contains controls for choosing the type of anime and for searching by anime title.
 */
@Component({
	selector: 'camp-anime-filter-form',
	standalone: true,
	templateUrl: './anime-filter-form.component.html',
	styleUrl: './anime-filter-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatSelectModule,
	],
})
export class AnimeFilterFormComponent implements OnInit {

	/** Initial value for search control. */
	@Input({ required: true })
	public searchValue = '';

	/** Initial value for anime types control. */
	@Input({ required: true })
	public typesValue: AnimeType[] = [];

	/** Event of anime types or search term changes. */
	@Output()
	public readonly animeFiltersChange = new EventEmitter<AnimeFilters>();

	/** List of permissible values for types select control. */
	protected readonly animeTypes = Object.values(AnimeType);

	/** Filter form management service. */
	protected readonly animeFilterFormService = inject(AnimeFilterFormService);

	private readonly destroyRef = inject(DestroyRef);

	/** @inheritdoc */
	public ngOnInit(): void {
		this.animeFilterFormService.updateControlsValues({
			searchValue: this.searchValue,
			typesValue: this.typesValue,
		});

		this.subscribeToFiltersChange();
	}

	/**
	 * Assert that value is typeof AnimeFilters.
	 * @param value - Object with anime filters.
	 */
	public isAnimeFilters(value: unknown): asserts value is AnimeFilters {
		const filters = value as AnimeFilters;
		if (filters.search === null && filters.types === null) {
			throw new Error(`${filters} is not a valid AnimeFilters!`);
		}
	}

	private subscribeToFiltersChange(): void {
		this.animeFilterFormService.form.valueChanges.pipe(
			throttleTime(300),
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe(value => {
				this.isAnimeFilters(value);
				this.animeFiltersChange.emit(value);
			});
	}

}
