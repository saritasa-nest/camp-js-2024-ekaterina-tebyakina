import { AnimeFilterParams, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_SEARCH_TERM, DEFAULT_SORT_SETTINGS, DEFAULT_TYPE } from '../models/anime-filter-params';
import { AnimeQueryParams } from '../models/anime-query-params';
import { AnimeType } from '../models/anime-type';
import { checkIsEnumMember } from '../utils/check-is-enum.util';

import { AnimeSortMapper } from './anime-sort.mapper';

export namespace AnimeQueryParamsMapper {

	/**
	 * Map query params to anime filter params model.
	 * @param params - Query params.
	 * @returns Model with anime filter params data for UI.
	 */
	export function fromQueryParams(params: Partial<AnimeQueryParams>): AnimeFilterParams {

		let selectedTypes = DEFAULT_TYPE;
		if (params.selectedTypes) {
			const typesArray = params.selectedTypes.split(',');

			// Using ‘as’ to avoid typescript error, but the type is checked by the checkIsEnumMember function.
			selectedTypes = typesArray.filter(item => checkIsEnumMember(item, AnimeType)) as AnimeType[];
		}

		const filterParams: AnimeFilterParams = {
			pageIndex: (params.pageIndex && (typeof params.pageIndex === 'number') && params.pageIndex >= 0) ?
				params.pageIndex : DEFAULT_PAGE_INDEX,

			pageSize: (params.pageSize && (typeof params.pageSize === 'number') && params.pageSize > 0) ?
				params.pageSize : DEFAULT_PAGE_SIZE,

			searchTerm: params.searchTerm ? params.searchTerm : DEFAULT_SEARCH_TERM,
			selectedTypes,
			sortingSettings: params.sortingSettings ? AnimeSortMapper.fromString(params.sortingSettings) : DEFAULT_SORT_SETTINGS,
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
				selectedTypes: params.selectedTypes.join(','),
			}),
			...(params.sortingSettings && { sortingSettings: AnimeSortMapper.toString(params.sortingSettings) }),
		};
	}
}
