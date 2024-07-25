import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AnimeApiService } from '@js-camp/angular/core/services/anime-api.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';
import { ProgressBarComponent } from '@js-camp/angular/shared/components/progress-bar/progress-bar.component';
import { Anime } from '@js-camp/core/models/anime';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

/** Column headers to be displayed in table. */
export enum ColumnsHeaders {
	Image = 'Image',
	EnglishTitle = 'English title',
	JapaneseTitle = 'Japanese title',
	AiredStart = 'Aired starts with',
	Type = 'Type',
	Status = 'Status',
}

/** Dashboard component. Contains table with list of anime. */
@Component({
	selector: 'camp-dashboard',
	standalone: true,
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
	imports: [
		MatTableModule,
		MatPaginator,
		AsyncPipe,
		DatePipe,
		EmptyPipe,
		ProgressBarComponent,
	],
})
export class DashboardComponent {

	private readonly animeApiService = inject(AnimeApiService);

	/** Stream of anime. */
	// protected readonly animeList$ = this.animeApiService.getList();

	/** */
	protected page = 0;

	/** */
	protected pageSize = 25;

	/** */
	protected animeListPage$ = this.animeApiService.getPage({});

	/**
	 * Page.
	 * @param event - Page.
	 */
	protected pageChanged(event: PageEvent): void {
		this.page = event.pageIndex;
		this.pageSize = event.pageSize;
		this.animeListPage$ = this.animeApiService.getPage({ page: event.pageIndex, pageSize: event.pageSize });
	}

	/**
	 * Track by function for anime list.
	 * @param index - Anime list item id.
	 * @param item - Item of anime list.
	 * @returns Item's id.
	 */
	protected trackByAnime(index: number, item: Anime): Anime['id'] {
		return item.id;
	}

	/** Property containing enum with column headers. */
	protected readonly columnsHeaders = ColumnsHeaders;

	/** List of column headers. */
	protected readonly columnsToDisplay = Object.values(ColumnsHeaders);

}
