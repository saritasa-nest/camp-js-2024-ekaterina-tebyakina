import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/core/models/anime';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule, SortDirection, MatSortable } from '@angular/material/sort';
import { AsyncPipe, DatePipe } from '@angular/common';
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

/** Column headers to be displayed in table. */
export enum SortingColumnsDto {
	EnglishTitle = 'title_eng',
	AiredStart = 'aired__startswith',
	Status = 'status',
}

const sortingColumnsDtoMap: Readonly<Record<SortingColumnsDto, ColumnsHeaders>> = {
	[SortingColumnsDto.EnglishTitle]: ColumnsHeaders.EnglishTitle,
	[SortingColumnsDto.AiredStart]: ColumnsHeaders.AiredStart,
	[SortingColumnsDto.Status]: ColumnsHeaders.Status,
};

/**
 * SortingColumnsDto.
 * @param enumKey SortingColumnsDto.
 * @returns SortingColumnsDto.
 */
export function fromSortingColumnsDto(enumKey: SortingColumnsDto): ColumnsHeaders {
	return sortingColumnsDtoMap[enumKey];
}

/** Dashboard component. Contains table with list of anime. */
@Component({
	selector: 'camp-table',
	standalone: true,
	templateUrl: './table.component.html',
	styleUrl: './table.component.css',
	imports: [
		MatTableModule,
		MatPaginator,
		MatSort,
		MatSortModule,
		AsyncPipe,
		DatePipe,
		EmptyPipe,
	],
})
export class TableComponent implements OnInit {

	/** Subscribes on route parameters when the component is initialized. */
	public ngOnInit(): void {
		// if (this.ordering) {
		// 	this.ordering.active = fromSortingColumnsDto(this.ordering.active as SortingColumnsDto);
		// }
	}

	/** */
	@Input() public pageData?: Pagination<Anime>;

	/** */
	@Input() public ordering?: Sort;

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

	/** */
	@Output() public paginationEvent = new EventEmitter<PageEvent>();

	/**
	 * Page.
	 * @param event - Page.
	 */
	protected pageChanged(event: PageEvent): void {
		this.paginationEvent.emit(event);
	}

	/** */
	@Output() public sortEvent = new EventEmitter<Sort>();

	/** Announce the change in sort state for assistive technology.
	 * @param sortState - Anime list item id.
	 */
	protected sortData(sortState: Sort): void {
		this.sortEvent.emit(sortState);
	}

}
