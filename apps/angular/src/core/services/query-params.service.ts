import { inject, Injectable } from '@angular/core';

import { Params } from '@angular/router';

import { QueryParams } from '@js-camp/core/models/query-params';
import { ParamsNamesDto } from '@js-camp/core/dtos/params-names.dto';
import { QueryParamsDto } from '@js-camp/core/dtos/query-params.dto';

import { OrderingParamService } from './ordering-param.service';
import { TypeParamService } from './type-param.service';

/** Query params service. */
@Injectable({ providedIn: 'root' })
export class QueryParamsService {

	private orderingParamService = inject(OrderingParamService);

	private typeParamService = inject(TypeParamService);

	/** Default query params. */
	public defaultQueryParams: QueryParams = {
		offset: 0,
		limit: 25,
		search: '',
		type: [],
		ordering: { active: '', direction: '' },
	};

	/**
	 * Maps dto to model.
	 * @param params Query params.
	 */
	public fromQueryParams(params: Params): QueryParams {
		const queryParams: QueryParams = { ...this.defaultQueryParams };
		if (ParamsNamesDto.Offset in params) {
			queryParams.offset = params[ParamsNamesDto.Offset];
		}
		if (ParamsNamesDto.Limit in params) {
			queryParams.limit = params[ParamsNamesDto.Limit];
		}
		if (ParamsNamesDto.Search in params) {
			queryParams.search = params[ParamsNamesDto.Search];
		}
		if (ParamsNamesDto.Type in params) {
			queryParams.type = this.typeParamService.composeTypeArray(params[ParamsNamesDto.Type]);
		}
		if (ParamsNamesDto.Ordering in params) {
			queryParams.ordering = this.orderingParamService.composeOrderingState(params[ParamsNamesDto.Ordering]);
		}
		return queryParams;
	}

	/**
	 * Maps model to dto.
	 * @param params Query params.
	 */
	public toQueryParams(params: Params): QueryParamsDto {
		const queryParams: QueryParamsDto = {
			[ParamsNamesDto.Offset]: 0,
			[ParamsNamesDto.Limit]: 25,
			[ParamsNamesDto.Search]: '',
			[ParamsNamesDto.Type]: '',
			[ParamsNamesDto.Ordering]: '',
		};
		if ('offset' in params) {
			queryParams[ParamsNamesDto.Offset] = params['offset'];
		}
		if ('limit' in params) {
			queryParams[ParamsNamesDto.Limit] = params['limit'];
		}
		if ('search' in params) {
			queryParams[ParamsNamesDto.Search] = params['search'];
		}
		if ('type' in params) {
			queryParams[ParamsNamesDto.Type] = this.typeParamService.composeTypeString(params['type']);
		}
		if ('ordering' in params) {
			queryParams[ParamsNamesDto.Ordering] = this.orderingParamService.composeOrderingString(params['ordering']);
		}
		return queryParams;
	}
}
