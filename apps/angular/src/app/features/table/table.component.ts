import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/core/models/anime';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { AsyncPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';
import { Pagination } from '@js-camp/core/models/pagination';

/** Column headers to be displayed in table. */
export enum ColumnsHeaders {
	Image = 'Image',
	EnglishTitle = 'English title',
	JapaneseTitle = 'Japanese title',
	AiredStart = 'Aired starts with',
	Type = 'Type',
	Status = 'Status',
}

/** Anime table component. */
@Component({
	selector: 'camp-table',
	standalone: true,
	templateUrl: './table.component.html',
	styleUrl: './table.component.css',
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
export class TableComponent implements OnInit {

	/** Anime list page data. */
	@Input() public pageData?: Pagination<Anime>;

	/** Sorting ordering settings. */
	@Input() public ordering?: Sort;

	/** Limit of anime for one page. */
	@Input() public limit = 25;

	/** Offset of anime list. */
	@Input() public offset = 0;

	/** Index of current page. */
	protected pageIndex = 0;

	/** Pages count. */
	protected pagesCount = 0;

	/** @inheritdoc */
	public ngOnInit(): void {
		this.pageIndex = this.offset / this.limit;
		if (this.pageData) {
			this.pagesCount = this.pageData.count / this.limit;
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

	/** Property containing enum with column headers. */
	protected readonly columnsHeaders = ColumnsHeaders;

	/** List of column headers. */
	protected readonly columnsToDisplay = Object.values(ColumnsHeaders);

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
