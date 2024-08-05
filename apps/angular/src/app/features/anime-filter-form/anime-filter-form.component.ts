import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { MatSelectModule } from '@angular/material/select';
import { AnimeFilters } from '@js-camp/core/models/anime-filters';

import { AnimeFilterForm } from './anime-filter-form.model';

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
	@Input() public searchValue = '';

	/** Initial value for anime types control. */
	@Input() public typesValue: AnimeType[] = [];

	/** Event of anime types or search term changes. */
	@Output() public animeFiltersEvent = new EventEmitter<Partial<AnimeFilters>>();

	/** Form group for anime filter form. */
	protected readonly animeFilterFormGroup: FormGroup<AnimeFilterForm>;

	/** List of permissible values for types select control. */
	protected readonly typesList = Object.values(AnimeType);

	private readonly destroyRef = inject(DestroyRef);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	public constructor() {
		this.animeFilterFormGroup = AnimeFilterForm.initialize({
			formBuilder: this.formBuilder,
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
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe(value => {
				this.animeFiltersEvent.emit(value);
			});
	}

}
