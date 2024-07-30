import { inject, Injectable } from '@angular/core';

import { AnimeType } from '@js-camp/core/models/anime-type';
import { Sort } from '@angular/material/sort';
import { Params } from '@angular/router';

import { TypeParamService } from './type-param.service';
import { OrderingParamService } from './ordering-param.service';

/** */
export enum ParamsNames {
	Limit = 'limit',
	Offset = 'offset',
	Search = 'search',
	Type = 'type__in',
	Ordering = 'ordering',
}

/** Params. */
export type QueryParams = {

	/** Offset. */
	offset: number;

	/** Limit. */
	limit: number;

	/** Search. */
	search: string;

	/** Type. */
	type: AnimeType[];

	/** Ordering. */
	ordering: Sort;
};

/** Anime API Access Service. */
@Injectable({ providedIn: 'root' })
export class QueryParamsService {

	private orderingParamService = inject(OrderingParamService);

	private typeParamService = inject(TypeParamService);

	/**
	 * Maps dto to model.
	 * @param params Genre dto.
	 */
	public fromQueryParams(params: Params): QueryParams {
		const queryParams: QueryParams = {
			offset: 0,
			limit: 25,
			search: '',
			type: [],
			ordering: { active: '', direction: '' },
		};
		if ('offset' in params) {
			queryParams.offset = params['offset'];
		}
		if ('limit' in params) {
			queryParams.limit = params['limit'];
		}
		if ('search' in params) {
			queryParams.search = params['search'];
		}
		if ('type__in' in params) {
			queryParams.type = this.typeParamService.composeTypeArray(params['type__in']);
		}
		if ('ordering' in params) {
			queryParams.ordering = this.orderingParamService.composeOrderingState(params['ordering']);
		}
		return queryParams;
	}
}
