import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '@js-camp/angular/core/services/api.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';
import { ProgressBarComponent } from '@js-camp/angular/shared/components/progress-bar/progress-bar.component';

/** Column headers to be displayed in table. */
export enum ColumnsHeaders {
	Image = 'Image',
	TitleEng = 'English title',
	TitleJpn = 'Japanese title',
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

	/** Getter for column headers enum. Required to access enum from html. */
	protected get columnsHeaders(): typeof ColumnsHeaders {
		return ColumnsHeaders;
	}

	/** List of column headers. */
	protected readonly columnsToDisplay = Object.values(ColumnsHeaders);

}
