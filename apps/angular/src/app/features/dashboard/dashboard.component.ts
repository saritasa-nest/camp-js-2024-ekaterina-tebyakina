import { Component, inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { Pagination } from '@js-camp/core/models/pagination';
import { QueryParamsDto } from '@js-camp/core/dtos/query-params.dto';
import { AnimeApiService } from '@js-camp/angular/core/services/anime-api.service';
import { ProgressBarComponent } from '@js-camp/angular/shared/components/progress-bar/progress-bar.component';

import { OrderingParamService } from '@js-camp/angular/core/services/ordering-param.service';

import { AsyncPipe } from '@angular/common';

import { TypeParamService } from '@js-camp/angular/core/services/type-param.service';

import { TableComponent } from '../table/table.component';
import { DataRetrievalFormComponent } from '../data-retrieval-form/data-retrieval-form.component';

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
})
export class DashboardComponent implements OnInit {

	private readonly route = inject(ActivatedRoute);

	private readonly router = inject(Router);

	private readonly animeApiService = inject(AnimeApiService);

	private readonly orderingParamService = inject(OrderingParamService);

	private readonly typeParamService = inject(TypeParamService);

	/** */
	protected offset = 0;

	/** */
	protected limit = 25;

	/** */
	protected search = '';

	/** */
	protected type: AnimeType[] = [];

	/** */
	protected ordering: Sort = { active: '', direction: '' };

	/** */
	protected animeListPage$: Observable<Pagination<Anime>> = EMPTY;

	private getValuesFromParams(params: Params): void {
		if ('offset' in params) {
			this.offset = params['offset'];
		}

		if ('limit' in params) {
			this.limit = params['limit'];
		}

		if ('search' in params) {
			this.search = params['search'];
		}

		if ('type' in params) {
			this.type = this.typeParamService.composeTypeArray(params['type']);
		}

		if ('ordering' in params) {
			this.ordering = this.orderingParamService.composeOrderingState(params['ordering']);
		}
	}

	private defaultParams: QueryParamsDto = {
		limit: 25,
		offset: 0,
	};

	/** Subscribes on route parameters when the component is initialized. */
	public ngOnInit(): void {

		this.animeListPage$ = this.route.queryParams.pipe(
			switchMap(params => {
				this.getValuesFromParams(params);
				return this.animeApiService.getPage(params as QueryParamsDto);
			}),
		);
	}

	/** */
	protected setTypeSelect(event: AnimeType[]): void {

		const queryParams: QueryParamsDto = { ...this.defaultParams };

		queryParams[ParamsNames.Type] = this.typeParamService.composeTypeString(event);

		if (this.ordering) {
			queryParams[ParamsNames.Ordering] = this.orderingParamService.composeOrderingString(this.ordering);
		}
		if (this.search) {
			queryParams[ParamsNames.Search] = this.search;
		}

		this.router.navigate(
			[''],
			{
				queryParams,
			},
		);
	}

	/** */
	protected setSearchSubmit(event: string): void {

		const queryParams: QueryParamsDto = { ...this.defaultParams };

		if (this.type.length > 0) {
			queryParams[ParamsNames.Type] = this.typeParamService.composeTypeString(this.type);
		}
		if (this.ordering) {
			queryParams[ParamsNames.Ordering] = this.orderingParamService.composeOrderingString(this.ordering);
		}
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
