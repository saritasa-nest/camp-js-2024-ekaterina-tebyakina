import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, catchError, filter, finalize, map, merge, Observable, of, shareReplay, startWith, Subject, switchMap, tap } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
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

	/** Subject to emit deletion events. */
	private readonly animeDeletion$ = new Subject<void>();

	private readonly route = inject(ActivatedRoute);

	private readonly router = inject(Router);

	private readonly animeService = inject(AnimeService);

	public constructor() {
		this.animeParams$ = this.route.queryParams.pipe(
			map(params => AnimeQueryParamsMapper.fromQueryParams(params)),
			shareReplay({ refCount: true, bufferSize: 1 }),
		);

    this.animeListPage$ = merge(
			this.animeParams$,
			this.animeDeletion$.pipe(startWith(null))
		).pipe(
				switchMap(() => {
						this.isLoading$.next(true);
						return this.animeParams$.pipe(
								switchMap(params => this.animeService.getPage(params).pipe(
										catchError(error => {
												console.error('Error fetching updated anime list:', error);
												return of(null);
										}),
										finalize(() => this.isLoading$.next(false))
								))
						);
				}),
				filter((result): result is Pagination<Anime> => result !== null),
		);
	}

	/**
	 * Triggers when the list of selected anime types or search term are changed.
	 * Forms a new query parameters object with new type list and a new search term and navigate with these parameters.
	 * @param filters - Object of selected anime filters.
	 */
	protected onAnimeFiltersChange(filters: AnimeFilters): void {

		const filterParams: Partial<AnimeParams> = {
			selectedTypes: filters.types,
			searchTerm: filters.search,
			pageIndex: DEFAULT_PAGE_INDEX,
		};

		this.navigate(filterParams);
	}

	/**
	 * Triggers when pagination is changed.
	 * Forms a new query parameters object with a new pagination data and navigate with these parameters.
	 * @param pagination - Pagination settings.
	 */
	protected onPaginationChange(pagination: PageEvent): void {

		const filterParams: Partial<AnimeParams> = {
			pageSize: pagination.pageSize,
			pageIndex: pagination.pageIndex,
		};

		this.navigate(filterParams);
	}

	/**
	 * Triggers when ordering is changed.
	 * Forms a new query parameters object with a new ordering data and navigate with these parameters.
	 * @param sorting - Ordering settings.
	 */
	protected onSortingChange(sorting: Sort): void {

		const filterParams: Partial<AnimeParams> = {
			sortingSettings: MaterialSortMapper.from(sorting),
		};

		this.navigate(filterParams);
	}

	/**
	 * Triggers when an anime is selected.
	 * @param animeId - Selected anime identifier.
	 */
	protected onAnimeSelect(animeId: number): void {
		this.router.navigate([RouterPaths.Main, animeId]);
	}

	/**
	 * Triggers when an anime for deletion is selected.
	 * @param animeId - Selected anime identifier.
	 */
	protected onAnimeDelete(animeId: number): void {
		this.isLoading$.next(true);
    this.animeService.deleteAnime(animeId).pipe(
        catchError(error => {
            console.error('Error deleting anime:', error);
            return of(null);
        }),
        tap(() => {
            this.animeDeletion$.next();
        }),
    ).subscribe();
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
