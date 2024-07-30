import { ChangeDetectionStrategy, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, QueryParamsHandling, Router } from '@angular/router';
import { EMPTY, Observable, of, Subscription, switchMap } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeApiService } from '@js-camp/angular/core/services/anime-api.service';
import { ProgressBarComponent } from '@js-camp/angular/shared/components/progress-bar/progress-bar.component';
import { AnimeType } from '@js-camp/core/models/anime-type';

import { AsyncPipe } from '@angular/common';
import { QueryParamsService } from '@js-camp/angular/core/services/query-params.service';

import { QueryParams } from '@js-camp/core/models/query-params';

import { QueryParamsDto } from '@js-camp/core/dtos/query-params.dto';

import { TableComponent } from '../table/table.component';
import { DataRetrievalFormComponent } from '../filter-form/filter-form.component';

/** Dashboard component. Contains table with list of anime. */
@Component({
	selector: 'camp-dashboard',
	standalone: true,
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		ProgressBarComponent,
		TableComponent,
		DataRetrievalFormComponent,
		AsyncPipe,
	],
})
export class DashboardComponent implements OnInit, OnDestroy {

	private readonly route = inject(ActivatedRoute);

	private readonly router = inject(Router);

	private readonly animeApiService = inject(AnimeApiService);

	private readonly queryParamsService = inject(QueryParamsService);

	private subs: Subscription[] = [];

	/** Stream of anime page. */
	protected animeListPage$: Observable<Pagination<Anime>> = EMPTY;

	/** Stream of anime page params. */
	protected animeParams$: Observable<QueryParams> = EMPTY;

	/** Anime page params. */
	protected queryParams: QueryParams = this.queryParamsService.defaultQueryParams;

	/** @inheritdoc */
	public ngOnInit(): void {

		this.animeParams$ = this.route.queryParams.pipe(
			switchMap(params => of(this.queryParamsService.fromQueryParams(params))),
		);

		this.subs.push(this.animeParams$.subscribe(params => {
			this.queryParams = params;
		}));

		this.animeListPage$ = this.route.queryParams.pipe(
			switchMap(params => this.animeApiService.getPage(params as QueryParamsDto)),
		);

	}

	/** @inheritdoc */
	public ngOnDestroy(): void {
		this.subs.forEach(sub => {
			sub.unsubscribe();
		});
	}

	private navigate(queryParams: QueryParams, queryParamsHandling: QueryParamsHandling): void {
		this.router.navigate(
			[''],
			{
				queryParams: this.queryParamsService.toQueryParams(queryParams),
				queryParamsHandling,
			},
		);
	}

	/**
	 * Triggers when the list of selected anime types is changed.
	 * Forms a new query parameters object with new type list and navigate with these parameters.
	 * @param event - List of selected anime types.
	 */
	protected onTypeChange(event: AnimeType[]): void {

		const queryParams = { ...this.queryParams };

		queryParams.type = event;
		queryParams.offset = 0;

		this.navigate(queryParams, '');
	}

	/**
	 * Triggers when search term is changed.
	 * Forms a new query parameters object with a new search term and navigate with these parameters.
	 * @param event - List of selected anime types.
	 */
	protected onSearchChange(event: string): void {

		const queryParams = { ...this.queryParams };

		queryParams.search = event;
		queryParams.offset = 0;

		this.navigate(queryParams, '');
	}

	/**
	 * Triggers when pagination is changed.
	 * Forms a new query parameters object with a new pagination data and navigate with these parameters.
	 * @param event - List of selected anime types.
	 */
	protected onPageChange(event: PageEvent): void {

		const queryParams = { ...this.queryParams };

		queryParams.limit = event.pageSize;
		queryParams.offset = event.pageIndex * event.pageSize;

		this.navigate(queryParams, 'merge');
	}

	/**
	 * Triggers when ordering is changed.
	 * Forms a new query parameters object with a new ordering data and navigate with these parameters.
	 * @param event - List of selected anime types.
	 */
	public onOrderingChange(event: Sort): void {

		const queryParams = { ...this.queryParams };

		queryParams.ordering = event;

		this.navigate(queryParams, 'merge');
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
}
