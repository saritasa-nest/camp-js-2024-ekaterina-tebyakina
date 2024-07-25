import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AnimeApiService } from '@js-camp/angular/core/services/anime-api.service';
import { AsyncPipe, DatePipe } from '@angular/common';
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
import { ActivatedRoute, Router } from '@angular/router';

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
	],
})
export class DashboardComponent implements OnInit {

	private readonly route = inject(ActivatedRoute);

	private readonly router = inject(Router);

	/** */
	public ngOnInit(): void {
		this.route.queryParams
			.subscribe(params => {
				console.log(params);
				this.animeListPage$ = this.animeApiService.getPage(params);
			});
	}

	/** */
	protected types = new FormControl();

	/** */
	protected typesList = Object.values(AnimeType);

	/** */
	protected onSelect(): void {
		// TODO: Use EventEmitter with form value

		const typesArr = this.types.value as AnimeType[];
		let typesDtoArr: AnimeTypeDto[] = [];

		if (typesArr) {
			typesDtoArr = typesArr.map(type => toTypeDto(type));
		}
		const typesString = typesDtoArr.join(',');

		this.router.navigate(
			[''],
			{
				queryParams: { type__in: typesString },
				queryParamsHandling: 'merge',
			},
		);
	}

	/** */
	protected searchForm = new FormGroup({
		term: new FormControl(''),
	});

	/** */
	protected onSubmit(): void {

		this.router.navigate(
			[''],
			{
				queryParams: { search: String(this.searchForm.value.term) },
				queryParamsHandling: 'merge',
			},
		);
	}

	/** */
	protected searchKeywordFilter = new FormControl();

	private readonly animeApiService = inject(AnimeApiService);

	/** */
	protected animeListPage$ = this.animeApiService.getPage({});

	/**
	 * Page.
	 * @param event - Page.
	 */
	protected pageChanged(event: PageEvent): void {

		this.router.navigate(
			[''],
			{
				queryParams: { page: event.pageIndex, pageSize: event.pageSize },
				queryParamsHandling: 'merge',
			},
		);
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

	/** Announce the change in sort state for assistive technology.
	 * @param sortState - Anime list item id.
	 */
	protected sortData(sortState: Sort): void {

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

		this.router.navigate(
			[''],
			{
				queryParams: { ordering: orderString },
				queryParamsHandling: 'merge',
			},
		);
	}
}
