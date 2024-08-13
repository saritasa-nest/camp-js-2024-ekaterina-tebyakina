import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, finalize, map, Observable, shareReplay, switchMap } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeApiService } from '@js-camp/angular/core/services/anime-api.service';
import { ProgressBarComponent } from '@js-camp/angular/shared/components/progress-bar/progress-bar.component';
import { DEFAULT_PAGE_INDEX, AnimeParams } from '@js-camp/core/models/anime-params';
import { AnimeQueryParamsMapper } from '@js-camp/core/mappers/anime-query-params.mapper';

import { AnimeFilters } from '@js-camp/core/models/anime-filters';

import { RouterPaths } from '@js-camp/angular/core/model/router-paths';

import { AnimeTableComponent } from '../anime-table/anime-table.component';
import { AnimeFilterFormComponent } from '../anime-filter-form/anime-filter-form.component';

import { MaterialSortMapper } from './material-sort.mapper';

/** Dashboard component. Contains table and form components. */
@Component({
	selector: 'camp-anime-dashboard',
	standalone: true,
	templateUrl: './anime-dashboard.component.html',
	styleUrl: './anime-dashboard.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		ProgressBarComponent,
		AnimeTableComponent,
		AnimeFilterFormComponent,
		AsyncPipe,
	],
})
export class AnimeDashboardComponent {

	/** Stream of anime page. */
	protected readonly animeListPage$: Observable<Pagination<Anime>>;

	/** Stream of anime filter params. */
	protected readonly animeParams$: Observable<AnimeParams>;

	/** Loading state to show progress bar. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(true);

	private readonly route = inject(ActivatedRoute);

	private readonly router = inject(Router);

	private readonly animeApiService = inject(AnimeApiService);

	public constructor() {
		this.animeParams$ = this.route.queryParams.pipe(
			map(params => AnimeQueryParamsMapper.fromQueryParams(params)),
			shareReplay({ refCount: true, bufferSize: 1 }),
		);

		this.animeListPage$ = this.animeParams$.pipe(
			switchMap(params => {
				this.isLoading$.next(true);
				return this.animeApiService.getPage(params).pipe(
					finalize(() => this.isLoading$.next(false)),
				);
			}),
		);
	}

	/**
	 * Triggers when the list of selected anime types or search term are changed.
	 * Forms a new query parameters object with new type list and a new search term and navigate with these parameters.
	 * @param event - Object of selected anime filters.
	 */
	protected onAnimeFiltersChange(event: AnimeFilters): void {

		const filterParams: Partial<AnimeParams> = {
			selectedTypes: event.types,
			searchTerm: event.search,
			pageIndex: DEFAULT_PAGE_INDEX,
		};

		this.navigate(filterParams);
	}

	/**
	 * Triggers when pagination is changed.
	 * Forms a new query parameters object with a new pagination data and navigate with these parameters.
	 * @param event - Pagination settings.
	 */
	protected onPageChange(event: PageEvent): void {

		const filterParams: Partial<AnimeParams> = {
			pageSize: event.pageSize,
			pageIndex: event.pageIndex,
		};

		this.navigate(filterParams);
	}

	/**
	 * Triggers when ordering is changed.
	 * Forms a new query parameters object with a new ordering data and navigate with these parameters.
	 * @param event - Ordering settings.
	 */
	protected onOrderingChange(event: Sort): void {

		const filterParams: Partial<AnimeParams> = {
			sortingSettings: MaterialSortMapper.from(event),
		};

		this.navigate(filterParams);
	}

	/**
	 * Triggers when an anime is selected.
	 * @param event - Selected anime index.
	 */
	protected onAnimeSelect(event: number): void {
		this.router.navigate([RouterPaths.Main, event]);
	}

	private navigate(params: Partial<AnimeParams>): void {
		this.router.navigate(
			[RouterPaths.Main],
			{
				queryParams: AnimeQueryParamsMapper.toQueryParams(params),
				queryParamsHandling: 'merge',
			},
		);
	}
}
