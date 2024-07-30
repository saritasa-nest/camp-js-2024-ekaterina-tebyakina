import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { combineLatest, EMPTY, map, Observable, of, switchMap, tap } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { QueryParamsDto } from '@js-camp/core/dtos/query-params.dto';
import { AnimeApiService } from '@js-camp/angular/core/services/anime-api.service';
import { ProgressBarComponent } from '@js-camp/angular/shared/components/progress-bar/progress-bar.component';
import { AnimeType } from '@js-camp/core/models/anime-type';

import { OrderingParamService } from '@js-camp/angular/core/services/ordering-param.service';

import { AsyncPipe } from '@angular/common';

import { TypeParamService } from '@js-camp/angular/core/services/type-param.service';

import { Subscription } from 'react-redux';

import { TableComponent } from '../table/table.component';
import { DataRetrievalFormComponent } from '../filter-form/filter-form.component';
import { QueryParams, QueryParamsService } from '@js-camp/angular/core/services/query-params.service';

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
export class DashboardComponent implements OnInit {

	private readonly route = inject(ActivatedRoute);

	private readonly router = inject(Router);

	private readonly animeApiService = inject(AnimeApiService);

	private readonly queryParamsService = inject(QueryParamsService);

	private readonly orderingParamService = inject(OrderingParamService);

	private readonly typeParamService = inject(TypeParamService);

	private defaultParams: QueryParamsDto = {
		limit: 25,
		offset: 0,
	};

	/** */
	protected animeListPage$: Observable<Pagination<Anime>> = EMPTY;

	/** */
	protected animeParams$: Observable<QueryParams> = EMPTY;

	/** @inheritdoc */
	public ngOnInit(): void {

		this.animeParams$ = this.route.queryParams.pipe(
			switchMap(params => of(this.queryParamsService.fromQueryParams(params))),
		);

		this.animeListPage$ = this.route.queryParams.pipe(
			switchMap(params => this.animeApiService.getPage(params as QueryParamsDto)),
		);

	}

	/** */
	protected setTypeSelect(event: AnimeType[]): void {

		const queryParams: QueryParamsDto = { ...this.defaultParams };

		queryParams[ParamsNames.Type] = this.typeParamService.composeTypeString(event);

		// if (this.ordering) {
		// 	queryParams[ParamsNames.Ordering] = this.orderingParamService.composeOrderingString(this.ordering);
		// }
		// if (this.search) {
		// 	queryParams[ParamsNames.Search] = this.search;
		// }

		this.router.navigate(
			[''],
			{
				queryParams,
			},
		);
	}

	/** */
	protected setSearchSubmit(event: string): void {

		// console.log(this.animeParams)

		const queryParams: QueryParamsDto = { ...this.defaultParams };

		// if (this.type.length > 0) {
		// 	queryParams[ParamsNames.Type] = this.typeParamService.composeTypeString(this.type);
		// }
		// if (this.ordering) {
		// 	queryParams[ParamsNames.Ordering] = this.orderingParamService.composeOrderingString(this.ordering);
		// }
		queryParams[ParamsNames.Search] = event;

		this.router.navigate(
			[''],
			{
				queryParams,
			},
		);
	}

	/**
	 * Page.
	 * @param event - Page.
	 */
	protected setPage(event: PageEvent): void {

		const limit = event.pageSize;
		const offset = event.pageIndex * event.pageSize;

		this.router.navigate(
			[''],
			{
				queryParams: { [ParamsNames.Offset]: offset, [ParamsNames.Limit]: limit },
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

	/**
	 * 1.
	 * @param sortState - 1.
	 */
	public setOrdering(sortState: Sort): void {

		const orderString = this.orderingParamService.composeOrderingString(sortState);

		this.router.navigate(
			[''],
			{
				queryParams: { ordering: orderString },
				queryParamsHandling: 'merge',
			},
		);
	}

}
