import { AnimeTypeDto } from '../dtos/anime-type.dto';
import { QueryParamsDto } from '../dtos/query-params.dto';
import { QueryParams } from '../models/query-params';

import { AnimeSortMapper } from './anime-sort.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';

export namespace QueryParamsMapper {

	/**
	 * Map query params dto to model.
	 * @param params - Query params.
	 * @returns Model with query params data for UI.
	 */
	export function fromDto(params: QueryParamsDto): QueryParams {
		const queryParams: QueryParams = {
			offset: 0,
			limit: 25,
			search: '',
			type: [],
			ordering: { active: '', direction: '' },
		};
		if (params.offset) {
			queryParams.offset = params.offset;
		}
		if (params.limit) {
			queryParams.limit = params.limit;
		}
		if (params.search) {
			queryParams.search = params.search;
		}
		if (params.type__in) {
			queryParams.type = params.type__in.split(',').map(type => AnimeTypeMapper.fromDto(type as AnimeTypeDto));
		}
		if (params.ordering) {
			queryParams.ordering = AnimeSortMapper.fromDto(params.ordering);
		}
		return queryParams;
	}

	/**
	 * Map model to query params.
	 * @param params - Object with data for query params.
	 * @returns Query params.
	 */
	export function toDto(params: QueryParams): QueryParamsDto {
		const { offset, limit, search } = params;

		const queryParams: QueryParamsDto = {
			offset,
			limit,
			search,
		};

		queryParams.type__in = params.type.map(animeType => AnimeTypeMapper.toDto(animeType)).join(',');
		queryParams.ordering = AnimeSortMapper.toDto(params.ordering);

		return queryParams;
	}
}
