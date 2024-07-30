import { Component, EventEmitter, Input, Output, ChangeDetectorRef, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { MatSelectModule } from '@angular/material/select';

/** Dashboard component. Contains table with list of anime. */
@Component({
	selector: 'camp-filter-form',
	standalone: true,
	templateUrl: './filter-form.component.html',
	styleUrl: './filter-form.component.css',
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatSelectModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataRetrievalFormComponent implements OnInit {

	/** */
	@Input() public typesValue: AnimeType[] = [];

	/** Types select control. */
	protected typesControl = new FormControl();

	/** */
	protected typesList = Object.values(AnimeType);

	/** */
	@Output() public typeSelectEvent = new EventEmitter<AnimeType[]>();

	/** */
	protected onTypeSelect(): void {
		this.typeSelectEvent.emit(this.typesControl.value);
	}

	/** */
	@Output() public searchEvent = new EventEmitter<string>();

	/** */
	protected onSearchSubmit(): void {
		this.searchEvent.emit(String(this.searchForm.value.term));
	}

	/** Search form. */
	protected searchForm: FormGroup = new FormGroup({
		term: new FormControl(''),
	});

	/** */
	@Input() public searchValue = '';

	/** @inheritdoc */
	public ngOnInit(): void {
		this.searchForm.controls['term'].setValue(this.searchValue);
		this.typesControl.setValue(this.typesValue);
	}
}