import { AnimeTypeDto } from '../dtos/anime-type.dto';
import { AnimeFilterParamsDto } from '../dtos/anime-filter-params.dto';
import {
	AnimeFilterParams,
	DEFAULT_PAGE_INDEX,
	DEFAULT_PAGE_SIZE,
	DEFAULT_SEARCH_TERM,
	DEFAULT_SORT_SETTINGS,
	DEFAULT_TYPE,
} from '../models/anime-filter-params';
import { checkIsEnumMember } from '../utils/check-is-enum.util';

import { AnimeSortMapper } from './anime-sort.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';

export namespace AnimeFilterParamsMapper {

	const DEFAULT_OFFSET = 0;
	const DEFAULT_LIMIT = 25;
	const DEFAULT_SEARCH = '';

	/**
	 * Map anime filter params dto to model.
	 * @param params - Anime filter params dto.
	 * @returns Model with anime filter params for UI.
	 */
	export function fromDto(params: AnimeFilterParamsDto): AnimeFilterParams {

		let pageIndex = DEFAULT_PAGE_INDEX;
		if (params.offset && params.limit &&
			(typeof params.offset === 'number') &&
			(typeof params.limit === 'number') &&
			params.offset >= 0 && params.limit > 0
		) {
			pageIndex = params.offset / params.limit;
		}

		let selectedTypes = DEFAULT_TYPE;
		if (params.type__in) {
			const typesArray = params.type__in.split(',');
			const filteredArray = typesArray.filter(item => checkIsEnumMember(item, AnimeTypeDto));

			// Using ‘as’ to avoid typescript error, but the type is checked by the checkIsEnumMember function previously.
			selectedTypes = filteredArray.map(type => AnimeTypeMapper.fromDto(type as AnimeTypeDto));
		}

		const filterParams: AnimeFilterParams = {
			pageIndex,
			pageSize: (params.limit && (typeof params.limit === 'number') && params.limit > 0) ?
				params.limit : DEFAULT_PAGE_SIZE,
			searchTerm: params.search ? params.search : DEFAULT_SEARCH_TERM,
			selectedTypes,
			sortingSettings: params.ordering ? AnimeSortMapper.fromDto(params.ordering) : DEFAULT_SORT_SETTINGS,
		};

		return filterParams;
	}

	/**
	 * Map  anime filter params model to dto.
	 * @param params - Model with anime filter params for UI.
	 * @returns Anime filter params dto.
	 */
	export function toDto(params: Partial<AnimeFilterParams>): AnimeFilterParamsDto {

		return {
			offset: params.pageSize && params.pageIndex ? params.pageSize * params.pageIndex : DEFAULT_OFFSET,
			limit: params.pageSize ? params.pageSize : DEFAULT_LIMIT,
			search: params.searchTerm ? params.searchTerm : DEFAULT_SEARCH,
			ordering: params.sortingSettings ? AnimeSortMapper.toDto(params.sortingSettings) : '',

			// Disable eslint, because this property should be in snake case.
			// eslint-disable-next-line @typescript-eslint/naming-convention
			type__in: params.selectedTypes ? params.selectedTypes.map(animeType => AnimeTypeMapper.toDto(animeType)).join(',') : '',
		};
	}
}
