import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, QueryParamsHandling, Router } from '@angular/router';
import { EMPTY, map, Observable, switchMap } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeApiService } from '@js-camp/angular/core/services/anime-api.service';
import { ProgressBarComponent } from '@js-camp/angular/shared/components/progress-bar/progress-bar.component';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { DEFAULT_PAGE_INDEX, AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { AnimeQueryParamsMapper } from '@js-camp/core/mappers/anime-query-params.mapper';

import { AnimeTableComponent } from '../anime-table/anime-table.component';
import { AnimeFilterFormComponent } from '../anime-filter-form/anime-filter-form.component';

import { MaterialSortMapper } from './material-sort.mapper';

/** Dashboard component. Contains table and form components. */
@Component({
	selector: 'camp-dashboard',
	standalone: true,
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		ProgressBarComponent,
		AnimeTableComponent,
		AnimeFilterFormComponent,
		AsyncPipe,
	],
})
export class DashboardComponent implements OnInit {

	private readonly route = inject(ActivatedRoute);

	private readonly router = inject(Router);

	private readonly animeApiService = inject(AnimeApiService);

	/** Stream of anime page. */
	protected animeListPage$: Observable<Pagination<Anime>> = EMPTY;

	/** Stream of anime filter params. */
	protected animeParams$: Observable<AnimeFilterParams> = EMPTY;

	/** @inheritdoc */
	public ngOnInit(): void {

		this.animeParams$ = this.route.queryParams.pipe(
			map(params => AnimeQueryParamsMapper.fromQueryParams(params)),
		);

		this.animeListPage$ = this.animeParams$.pipe(
			switchMap(params => this.animeApiService.getPage(params)),
		);

	}

	/**
	 * Triggers when the list of selected anime types is changed.
	 * Forms a new query parameters object with new type list and navigate with these parameters.
	 * @param event - List of selected anime types.
	 */
	protected onTypeChange(event: AnimeType[]): void {

		const filterParams: Partial<AnimeFilterParams> = {
			selectedTypes: event,
			pageIndex: DEFAULT_PAGE_INDEX,
		};

		this.navigate(filterParams, 'merge');
	}

	/**
	 * Triggers when search term is changed.
	 * Forms a new query parameters object with a new search term and navigate with these parameters.
	 * @param event - Search term.
	 */
	protected onSearchChange(event: string): void {

		const filterParams: Partial<AnimeFilterParams> = {
			searchTerm: event,
			pageIndex: DEFAULT_PAGE_INDEX,
		};

		this.navigate(filterParams, 'merge');
	}

	/**
	 * Triggers when pagination is changed.
	 * Forms a new query parameters object with a new pagination data and navigate with these parameters.
	 * @param event - Pagination settings.
	 */
	protected onPageChange(event: PageEvent): void {

		const filterParams: Partial<AnimeFilterParams> = {
			pageSize: event.pageSize,
			pageIndex: event.pageIndex,
		};

		this.navigate(filterParams, 'merge');
	}

	/**
	 * Triggers when ordering is changed.
	 * Forms a new query parameters object with a new ordering data and navigate with these parameters.
	 * @param event - Ordering settings.
	 */
	protected onOrderingChange(event: Sort): void {

		const filterParams: Partial<AnimeFilterParams> = {
			sortingSettings: MaterialSortMapper.fromMaterialSort(event),
		};

		this.navigate(filterParams, 'merge');
	}

	private navigate(params: Partial<AnimeFilterParams>, queryParamsHandling: QueryParamsHandling): void {
		this.router.navigate(
			[''],
			{
				queryParams: AnimeQueryParamsMapper.toQueryParams(params),
				queryParamsHandling,
			},
		);
	}
}
