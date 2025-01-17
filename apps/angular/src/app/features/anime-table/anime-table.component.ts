import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/core/models/anime';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { AsyncPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeColumnsHeaders } from '@js-camp/core/models/anime-columns-headers';
import { AnimeColumnsIndexes } from '@js-camp/core/models/anime-columns-indexes';
import { AnimeSort } from '@js-camp/core/models/anime-sort';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@js-camp/core/models/anime-params';

const DEFAULT_SIZE_OPTIONS = [10, 25, 50];

/** Anime table component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		MatTableModule,
		MatPaginator,
		MatSort,
		MatSortModule,
		AsyncPipe,
		DatePipe,
		EmptyPipe,
		NgOptimizedImage,
	],
})
export class AnimeTableComponent {

	/** Anime page data. */
	@Input({ required: true })
	public pageData: Pagination<Anime> | null = null;

	/** Settings for sort. Contains data about sort column and direction of sort. */
	@Input({ required: true })
	public sortingSettings: AnimeSort | null = null;

	/** Limit of anime for one page. */
	@Input({ required: true })
	public pageSize = DEFAULT_PAGE_SIZE;

	/** Index of current page. */
	@Input({ required: true })
	public pageIndex = DEFAULT_PAGE_INDEX;

	/** Event of pagination change. */
	@Output()
	public readonly paginationEvent = new EventEmitter<PageEvent>();

	/** Event of table sorting. */
	@Output()
	public readonly sortEvent = new EventEmitter<Sort>();

	/** Possible page size values. */
	protected readonly pageSizeOptions = DEFAULT_SIZE_OPTIONS;

	/** Property containing enum with column headers. */
	protected readonly columnsHeaders = AnimeColumnsHeaders;

	/** Property containing enum with column indexes. */
	protected readonly columns = AnimeColumnsIndexes;

	/** List of column indexes. */
	protected readonly columnsToDisplay = Object.values(AnimeColumnsIndexes);

	/**
	 * Track by function for anime list.
	 * @param index - Anime list item id.
	 * @param item - Item of anime list.
	 * @returns Item's id.
	 */
	protected trackByAnime(index: number, item: Anime): Anime['id'] {
		return item.id;
	}

	/**
	 * Pagination changing handler.
	 * @param event - Pagination settings.
	 */
	protected onPageChange(event: PageEvent): void {
		if (this.pageSize !== event.pageSize) {
			event.pageIndex = 0;
		}

		this.paginationEvent.emit(event);
	}

	/**
	 * Handler for changes in sorting settings.
	 * @param event - Sorting settings.
	 */
	protected onSortData(event: Sort): void {
		this.sortEvent.emit(event);
	}

}
