import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { MatSelectModule } from '@angular/material/select';
import { AnimeFilters } from '@js-camp/core/models/anime-filters';

import { throttleTime } from 'rxjs';

import { AnimeFilterForm, AnimeFilterFormService } from './anime-filter-form.service';

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
	public animeFiltersEvent = new EventEmitter<Partial<AnimeFilters>>();

	/** Form group for anime filter form. */
	protected readonly animeFilterFormGroup: FormGroup<AnimeFilterForm>;

	/** List of permissible values for types select control. */
	protected readonly animeTypes = Object.values(AnimeType);

	private readonly animeFilterFormService = inject(AnimeFilterFormService);

	private readonly destroyRef = inject(DestroyRef);

	public constructor() {
		this.animeFilterFormGroup = this.animeFilterFormService.initialize({
			searchInitialValue: this.searchValue,
			typesInitialValue: this.typesValue,
		});
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		if (this.animeFilterFormGroup) {
			this.animeFilterFormGroup.controls.search.setValue(this.searchValue);
			this.animeFilterFormGroup.controls.types.setValue(this.typesValue);
		}

		this.subscribeToFiltersChange();
	}

	private subscribeToFiltersChange(): void {
		this.animeFilterFormGroup?.valueChanges.pipe(
			throttleTime(300),
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe(value => {
				this.animeFiltersEvent.emit(value);
			});
	}

}
