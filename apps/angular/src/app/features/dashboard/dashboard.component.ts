import { Component, inject, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { Pagination } from '@js-camp/core/models/pagination';
import { QueryParamsDto } from '@js-camp/core/dtos/query-params.dto';
import { QueryParamsService } from '@js-camp/angular/core/services/query-params.service';
import { AnimeApiService } from '@js-camp/angular/core/services/anime-api.service';
import { ProgressBarComponent } from '@js-camp/angular/shared/components/progress-bar/progress-bar.component';

import { TableComponent } from '../table/table.component';
import { DataRetrievalFormComponent } from '../data-retrieval-form/data-retrieval-form.component';
import { TableSortService } from '@js-camp/angular/core/services/table-sort.service';

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
	// changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		ProgressBarComponent,
		TableComponent,
		DataRetrievalFormComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {

	private readonly route = inject(ActivatedRoute);

	private readonly router = inject(Router);

	private readonly animeApiService = inject(AnimeApiService);

	private readonly queryParamsService = inject(QueryParamsService);

	/** */
	protected params: QueryParamsDto = {
		offset: 0,
		limit: 25,
	};

	/** */
	protected ordering: Sort = { active: '', direction: '' };

	/** */
	protected animeListPage?: Pagination<Anime>;

	/** */
	public animeSubscription?: Subscription;

	private readonly tableSortService = inject(TableSortService);

	/** Subscribes on route parameters when the component is initialized. */
	public ngOnInit(): void {

		this.route.queryParams.pipe(
			switchMap(params => {

				Object.assign(this.params, params);
				if ('ordering' in params) {
					this.ordering = this.tableSortService.fromOrderingString(params['ordering']);
					// console.log(this.ordering)
				}

				return this.animeApiService.getPage(this.params);
			}),
		)
			.subscribe(res => {
				this.animeListPage = res;
			});
	}

	/** Subscribes on route parameters when the component is initialized. */
	public ngOnDestroy(): void {
		this.animeSubscription?.unsubscribe();
	}

	/** */
	protected setTypeSelect(event: AnimeType[]): void {

		const typesString = this.queryParamsService.composeTypeParam(event);

		this.router.navigate(
			[''],
			{
				queryParams: { [ParamsNames.Type]: typesString },
				queryParamsHandling: 'merge',
			},
		);
	}

	/** */
	protected setSearchSubmit(event: string): void {

		const queryParams: QueryParamsDto = {
			offset: 0,
			limit: 25,
		};

		if (ParamsNames.Type in this.params) {
			queryParams[ParamsNames.Type] = this.params[ParamsNames.Type] as string;
		}
		if (ParamsNames.Ordering in this.params) {
			queryParams[ParamsNames.Ordering] = this.params[ParamsNames.Ordering] as string;
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

		const orderString = this.queryParamsService.composeOrderingParam(sortState);

		this.router.navigate(
			[''],
			{
				queryParams: { ordering: orderString },
				queryParamsHandling: 'merge',
			},
		);
	}

}
