import { ChangeDetectionStrategy, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, of, Subscription, switchMap } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeApiService } from '@js-camp/angular/core/services/anime-api.service';
import { ProgressBarComponent } from '@js-camp/angular/shared/components/progress-bar/progress-bar.component';
import { AnimeType } from '@js-camp/core/models/anime-type';

import { AsyncPipe } from '@angular/common';
import { QueryParams, QueryParamsDto, QueryParamsService } from '@js-camp/angular/core/services/query-params.service';

import { TableComponent } from '../table/table.component';
import { DataRetrievalFormComponent } from '../filter-form/filter-form.component';

/** Column headers to be displayed in table. */
export enum ParamsNames {
	Limit = 'limit',
	Offset = 'offset',
	Search = 'search',
	Type = 'type__in',
	Ordering = 'ordering',
}

/** Dashboard component. Contains table with list of anime. */
@Component({
	selector: 'camp-dashboard',
	standalone: true,
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
	imports: [
		ProgressBarComponent,
		TableComponent,
		DataRetrievalFormComponent,
		AsyncPipe,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {

	private readonly route = inject(ActivatedRoute);

	private readonly router = inject(Router);

	private readonly animeApiService = inject(AnimeApiService);

	private readonly queryParamsService = inject(QueryParamsService);

	private subs: Subscription[] = [];

	/** */
	protected animeListPage$: Observable<Pagination<Anime>> = EMPTY;

	/** */
	protected animeParams$: Observable<QueryParams> = EMPTY;

	/** */
	protected queryParams: QueryParams = {
		offset: 0,
		limit: 25,
		search: '',
		type: [],
		ordering: { active: '', direction: '' },
	};

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

	/** */
	protected setTypeSelect(event: AnimeType[]): void {

		const queryParams = { ...this.queryParams };

		queryParams.type = event;
		queryParams.limit = 25;
		queryParams.offset = 0;

		this.router.navigate(
			[''],
			{
				queryParams: this.queryParamsService.toQueryParams(queryParams),
			},
		);
	}

	/** */
	protected setSearchSubmit(event: string): void {

		const queryParams = { ...this.queryParams };

		queryParams.search = event;
		queryParams.limit = 25;
		queryParams.offset = 0;

		this.router.navigate(
			[''],
			{
				queryParams: this.queryParamsService.toQueryParams(queryParams),
			},
		);
	}

	/**
	 * Page.
	 * @param event - Page.
	 */
	protected setPage(event: PageEvent): void {

		const queryParams = { ...this.queryParams };

		queryParams.limit = event.pageSize;
		queryParams.offset = event.pageIndex * event.pageSize;

		this.router.navigate(
			[''],
			{
				queryParams: this.queryParamsService.toQueryParams(queryParams),
				queryParamsHandling: 'merge',
			},
		);
	}

	/**
	 * 1.
	 * @param sortState - 1.
	 */
	public setOrdering(sortState: Sort): void {

		const queryParams = { ...this.queryParams };

		queryParams.ordering = sortState;

		this.router.navigate(
			[''],
			{
				queryParams: this.queryParamsService.toQueryParams(queryParams),
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
}
