import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@js-camp/core/models/anime-filter-params';

const DEFAULT_PAGES_COUNT = 0;
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
export class AnimeTableComponent implements OnInit {

	/** Anime page data. */
	@Input() public pageData?: Pagination<Anime>;

	/** Settings for sort. Contains data about sort column and direction of sort. */
	@Input() public sortingSettings?: AnimeSort;

	/** Limit of anime for one page. */
	@Input() public pageSize = DEFAULT_PAGE_SIZE;

	/** Index of current page. */
	@Input() public pageIndex = DEFAULT_PAGE_INDEX;

	/** Pages count. */
	protected pagesCount = DEFAULT_PAGES_COUNT;

	/** Possible page size values. */
	protected pageSizeOptions = DEFAULT_SIZE_OPTIONS;

	/** Property containing enum with column headers. */
	protected readonly columnsHeaders = AnimeColumnsHeaders;

	/** Property containing enum with column indexes. */
	protected readonly columnsIndexes = AnimeColumnsIndexes;

	/** List of column indexes. */
	protected readonly columnsToDisplay = Object.values(AnimeColumnsIndexes);

	/** @inheritdoc */
	public ngOnInit(): void {
		if (this.pageData) {
			this.pagesCount = Math.ceil(this.pageData.count / this.pageSize);
		}
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

	/** Event of pagination change. */
	@Output() public paginationEvent = new EventEmitter<PageEvent>();

	/**
	 * Pagination changing handler.
	 * @param event - Pagination settings.
	 */
	protected onPageChanged(event: PageEvent): void {
		this.paginationEvent.emit(event);
	}

	/** Event of table sorting. */
	@Output() public sortEvent = new EventEmitter<Sort>();

	/**
	 * Handler for changes in sorting settings.
	 * @param event - Sorting settings.
	 */
	protected onSortData(event: Sort): void {
		this.sortEvent.emit(event);
	}

}
