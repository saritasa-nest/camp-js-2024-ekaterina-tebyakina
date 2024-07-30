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

/** */
export type QueryParamsDto = {

	/** Offset. */
	[ParamsNames.Limit]: number;

	/** Limit. */
	[ParamsNames.Offset]: number;

	/** Search. */
	[ParamsNames.Search]: string;

	/** Type. */
	[ParamsNames.Type]: string;

	/** Ordering. */
	[ParamsNames.Ordering]: string;
};

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
		if (ParamsNames.Offset in params) {
			queryParams.offset = params[ParamsNames.Offset];
		}
		if (ParamsNames.Limit in params) {
			queryParams.limit = params[ParamsNames.Limit];
		}
		if (ParamsNames.Search in params) {
			queryParams.search = params[ParamsNames.Search];
		}
		if (ParamsNames.Type in params) {
			queryParams.type = this.typeParamService.composeTypeArray(params[ParamsNames.Type]);
		}
		if (ParamsNames.Ordering in params) {
			queryParams.ordering = this.orderingParamService.composeOrderingState(params[ParamsNames.Ordering]);
		}
		return queryParams;
	}

	/**
	 * Maps dto to model.
	 * @param params Genre dto.
	 */
	public toQueryParams(params: Params): QueryParamsDto {
		const queryParams: QueryParamsDto = {
			[ParamsNames.Offset]: 0,
			[ParamsNames.Limit]: 25,
			[ParamsNames.Search]: '',
			[ParamsNames.Type]: '',
			[ParamsNames.Ordering]: '',
		};
		if ('offset' in params) {
			queryParams[ParamsNames.Offset] = params['offset'];
		}
		if ('limit' in params) {
			queryParams[ParamsNames.Limit] = params['limit'];
		}
		if ('search' in params) {
			queryParams[ParamsNames.Search] = params['search'];
		}
		if ('type' in params) {
			queryParams[ParamsNames.Type] = this.typeParamService.composeTypeString(params['type']);
		}
		if ('ordering' in params) {
			queryParams[ParamsNames.Ordering] = this.orderingParamService.composeOrderingString(params['ordering']);
		}
		return queryParams;
	}
}
