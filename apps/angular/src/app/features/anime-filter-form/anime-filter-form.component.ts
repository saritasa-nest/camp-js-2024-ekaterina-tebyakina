import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';

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
export class AnimeFilterFormComponent implements OnInit, OnDestroy {

	/** Form group for anime filter form. */
	public animeFilterFormGroup?: FormGroup<AnimeFilterForm>;

	/** Initial value for search control. */
	@Input() public searchValue = '';

	/** Event of search form submitting. */
	@Output() public searchEvent = new EventEmitter<string>();

	/** Initial value for anime types control. */
	@Input() public typesValue: AnimeType[] = [];

	/** Event of anime type selection. */
	@Output() public typeSelectEvent = new EventEmitter<AnimeType[]>();

	/** List of permissible values for types select control. */
	protected typesList = Object.values(AnimeType);

	private searchChangesSubscription?: Subscription;

	private typesChangesSubscription?: Subscription;

	public constructor(private readonly formBuilder: NonNullableFormBuilder) {}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.animeFilterFormGroup = AnimeFilterForm.initialize({
			formBuilder: this.formBuilder,
			searchInitialValue: this.searchValue,
			typesInitialValue: this.typesValue,
		});

		this.searchChangesSubscription = this.animeFilterFormGroup.get('search')?.valueChanges.subscribe(value => {
			this.searchEvent.emit(value);
		});

		this.typesChangesSubscription = this.animeFilterFormGroup.get('types')?.valueChanges.subscribe(value => {
			this.typeSelectEvent.emit(value);
		});
	}

	/** @inheritdoc */
	public ngOnDestroy(): void {
		if (this.searchChangesSubscription) {
			this.searchChangesSubscription.unsubscribe();
		}
		if (this.typesChangesSubscription) {
			this.typesChangesSubscription.unsubscribe();
		}
	}

}
