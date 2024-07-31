import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { MatSelectModule } from '@angular/material/select';

/**
 * Filter form component.
 * Contains control for choosing the type of anime and form for searching by anime title.
 */
@Component({
	selector: 'camp-filter-form',
	standalone: true,
	templateUrl: './filter-form.component.html',
	styleUrl: './filter-form.component.css',
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
export class DataRetrievalFormComponent implements OnInit {

	/** Initial value for anime types control. */
	@Input() public typesValue: AnimeType[] = [];

	/** Anime types selection control. */
	protected typesControl = new FormControl();

	/** List of permissible values for types select control. */
	protected typesList = Object.values(AnimeType);

	/** Event of anime type selection. */
	@Output() public typeSelectEvent = new EventEmitter<AnimeType[]>();

	/** Anime type selection handler. */
	protected onTypeSelect(): void {
		this.typeSelectEvent.emit(this.typesControl.value);
	}

	/** Initial value for search control. */
	@Input() public searchValue = '';

	/** Search form. */
	protected searchForm: FormGroup = new FormGroup({
		term: new FormControl(''),
	});

	/** Event of search form submitting. */
	@Output() public searchEvent = new EventEmitter<string>();

	/** Search form submitting handler. */
	protected onSearchSubmit(): void {
		this.searchEvent.emit(String(this.searchForm.value.term));
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.searchForm.controls['term'].setValue(this.searchValue);
		this.typesControl.setValue(this.typesValue);
	}
}
