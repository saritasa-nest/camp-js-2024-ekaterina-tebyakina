import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectorRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { MatSelectModule } from '@angular/material/select';

/** Dashboard component. Contains table with list of anime. */
@Component({
	selector: 'camp-data-retrieval-form',
	standalone: true,
	templateUrl: './data-retrieval-form.component.html',
	styleUrl: './data-retrieval-form.component.css',
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatSelectModule,
	],
})
export class DataRetrievalFormComponent {

	/** Types select control. */
	protected types = new FormControl();

	/** */
	protected typesList = Object.values(AnimeType);

	/** */
	@Output() public typeSelectEvent = new EventEmitter<AnimeType[]>();

	/** */
	protected onTypeSelect(): void {
		this.typeSelectEvent.emit(this.types.value);
	}

	/** Search form. */
	// protected searchForm = new FormGroup({
	// 	term: new FormControl(''),
	// });

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
	// @Input() public searchTerm = '';

	// Child component
	@Input() public set searchTerm(value: string) {
		// This setter function will execute whenever parent input `searchText` is changed.
		console.log(value); // New value from parent
		this.searchForm.controls['term'].setValue(value);
		this.cdr.detectChanges();
	}

	public constructor(private cdr: ChangeDetectorRef) {
		// this.searchForm = new FormGroup({
		// 	term: new FormControl(''),
		// });
	}

	/** Subscribes on route parameters when the component is initialized. */
	// public ngAfterContentInit(): void {
	// 	console.log(this.searchTerm);
	// 	this.searchForm.setValue({
	// 		term: this.searchTerm,
	// 	});
	// 	this.cdr.detectChanges();

	// 	// this.searchForm.get('term')?.setValue(this.searchTerm);
	// 	// patchValue(this.searchTerm);
	// }

	/** */
	// public ngAfterViewInit(): void {
	// 	this.searchForm.setValue({
	// 		term: this.searchTerm,
	// 	});
	// }
}
