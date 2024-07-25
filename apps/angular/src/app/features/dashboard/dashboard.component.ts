import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AnimeApiService } from '@js-camp/angular/core/services/anime-api.service';
import { AsyncPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';
import { ProgressBarComponent } from '@js-camp/angular/shared/components/progress-bar/progress-bar.component';
import { Anime } from '@js-camp/core/models/anime';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { toTypeDto } from '@js-camp/core/mappers/anime-type.mapper';
import { AnimeTypeDto } from '@js-camp/core/dtos/anime-type.dto';

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
		MatSort,
		MatSortModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatSelectModule,
		ReactiveFormsModule,
		AsyncPipe,
		DatePipe,
		EmptyPipe,
		ProgressBarComponent,
		NgOptimizedImage,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {

	/** */
	protected types = new FormControl();

	/** */
	protected typesList = Object.values(AnimeType);

	/** */
	protected onSelect(): void {
		// TODO: Use EventEmitter with form value
		console.log(this.types.value);
		const typesArr = this.types.value as AnimeType[];
		let typesDtoArr: AnimeTypeDto[] = [];

		if (typesArr) {
			typesDtoArr = typesArr.map(type => toTypeDto(type));
		}
		const typesString = typesDtoArr.join(',');
		console.log(typesDtoArr.join(','));
		this.animeListPage$ = this.animeApiService.getPage({ type__in: typesString });
	}

	/** */
	protected searchForm = new FormGroup({
		term: new FormControl(''),
	});

	/** */
	protected onSubmit(): void {
		// TODO: Use EventEmitter with form value
		console.log(this.searchForm.value.term);
		this.animeListPage$ = this.animeApiService.getPage({ search: String(this.searchForm.value.term) });
	}

	/** */
	protected searchKeywordFilter = new FormControl();

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

	/** */
	protected sortOrder = {
		title_eng: '',
		aired__startswith: '',
		status: '',
	};

	// dataSource = new MatTableDataSource();

	/** Announce the change in sort state for assistive technology.
	 * @param sortState - Anime list item id.
	 */
	protected sortData(sortState: Sort): void {
		console.log(sortState);

		let sortField: keyof typeof this.sortOrder;

		switch (sortState.active) {
			case 'English title':
				sortField = 'title_eng';
				break;
			case 'Aired starts with':
				sortField = 'aired__startswith';
				break;
			case 'Status':
				sortField = 'status';
				break;
			default:
				sortField = 'status';
		}

		// console.log(sortField);

		switch (sortState.direction) {
			case 'asc':
				this.sortOrder[sortField] = sortField;
				break;
			case 'desc':
				this.sortOrder[sortField] = `-${sortField}`;
				break;
			default:
				this.sortOrder[sortField] = '';
		}

		// console.log(Object.values(this.sortOrder));

		let orderString = '';
		Object.values(this.sortOrder).forEach(item => {
			if (item) {
				if (orderString) {
					orderString = `${orderString},${item}`;
				} else {
					orderString = item;
				}

			}
		});

		// const orderString = Object.values(this.sortOrder).join(',');
		// console.log(orderString);
		this.animeListPage$ = this.animeApiService.getPage({ page: this.page, pageSize: this.pageSize, ordering: orderString });
	}
}
