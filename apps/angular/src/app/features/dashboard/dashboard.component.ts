import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '@js-camp/angular/core/services/api.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';
import { ProgressBarComponent } from '@js-camp/angular/shared/components/progress-bar/progress-bar.component';

/** Column headers to be displayed in table. */
export enum ColumnsHeaders {
	Image = 'Image',
	EnglishTitle = 'English title',
	JapaneseTitle = 'Japanese title',
	AiredStart = 'Aired starts with',
	Type = 'type',
	Status = 'status',
}

/** Dashboard component. Contains table with list of anime. */
@Component({
	selector: 'camp-dashboard',
	standalone: true,
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
	imports: [
		MatTableModule,
		AsyncPipe,
		DatePipe,
		EmptyPipe,
		ProgressBarComponent,
	],
})
export class DashboardComponent {

	private readonly apiService = inject(ApiService);

	/** Stream of anime. */
	protected readonly anime$ = this.apiService.getAnime();

	/**
	 * Track by function for anime list.
	 * @param index - Anime list item id.
	 * @param item - Item of anime list.
	 * @returns Item's id.
	 */
	protected trackByAnime(index: number, item: { id: number; }): number {
		return item.id;
	}

	/** Getter for column headers enum to access enum from html. */
	protected get columnsHeaders(): typeof ColumnsHeaders {
		return ColumnsHeaders;
	}

	/** List of column headers. */
	protected readonly columnsToDisplay = Object.values(ColumnsHeaders);

}
