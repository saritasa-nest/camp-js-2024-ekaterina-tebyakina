import { AnimeTypeDto } from '../dtos/anime-type.dto';
import { AnimeFilterParams, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_SEARCH_TERM, DEFAULT_SORT_SETTINGS, DEFAULT_TYPE } from '../models/anime-filter-params';
import { AnimeQueryParams } from '../models/anime-query-params';

import { AnimeSortMapper } from './anime-sort.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';

export namespace AnimeQueryParamsMapper {

	/**
	 * Map query params to anime filter params model.
	 * @param params - Query params.
	 * @returns Model with anime filter params data for UI.
	 */
	export function fromQueryParams(params: Partial<AnimeQueryParams>): AnimeFilterParams {
		const filterParams: AnimeFilterParams = {
			pageIndex: params.pageIndex ? params.pageIndex : DEFAULT_PAGE_INDEX,
			pageSize: params.pageSize ? params.pageSize : DEFAULT_PAGE_SIZE,
			searchTerm: params.searchTerm ? params.searchTerm : DEFAULT_SEARCH_TERM,
			selectedTypes: params.selectedTypes ? params.selectedTypes.split(',')
				.map(type => AnimeTypeMapper.fromDto(type as AnimeTypeDto)) : DEFAULT_TYPE,
			sortingSettings: params.sortingSettings ? AnimeSortMapper.fromDto(params.sortingSettings) : DEFAULT_SORT_SETTINGS,
		};

		return filterParams;
	}

	/**
	 * Map anime filter params model to query params.
	 * @param params - Model with anime filter params data for UI.
	 * @returns Query params.
	 */
	export function toQueryParams(params: Partial<AnimeFilterParams>): Partial<AnimeQueryParams> {

		return {
			...(params.pageIndex && { pageIndex: params.pageIndex }),
			...(params.pageSize && { pageSize: params.pageSize }),
			...(params.searchTerm !== undefined && params.searchTerm !== null && { searchTerm: params.searchTerm }),
			...(params.selectedTypes && {
				selectedTypes: params.selectedTypes.map(animeType => AnimeTypeMapper.toDto(animeType)).join(','),
			}),
			...(params.sortingSettings && { sortingSettings: AnimeSortMapper.toDto(params.sortingSettings) }),
		};
	}
}