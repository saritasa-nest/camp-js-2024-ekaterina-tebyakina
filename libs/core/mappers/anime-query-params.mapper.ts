import { AnimeParams, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_SEARCH_TERM, DEFAULT_SORT_SETTINGS, DEFAULT_TYPE } from '../models/anime-params';
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
	export function fromQueryParams(params: Partial<AnimeQueryParams>): AnimeParams {

		let selectedTypes = DEFAULT_TYPE;
		if (params.selectedTypes) {
			const typesArray = params.selectedTypes.split(',');

			selectedTypes = typesArray.filter((item): item is AnimeType => checkIsEnumMember(item, AnimeType));
		}

		const pageIndex = Number(params.pageIndex);

		const filterParams: AnimeParams = {
			pageIndex: (!Number.isNaN(pageIndex) && pageIndex >= 0) ? pageIndex : DEFAULT_PAGE_INDEX,
			pageSize: (params.pageSize && params.pageSize > 0) ? Number(params.pageSize) : DEFAULT_PAGE_SIZE,
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
	export function toQueryParams(params: Partial<AnimeParams>): Partial<AnimeQueryParams> {

		return {
			...((typeof params.pageIndex === 'number') && { pageIndex: params.pageIndex }),
			...(params.pageSize && { pageSize: params.pageSize }),
			...(params.searchTerm !== undefined && params.searchTerm !== null && { searchTerm: params.searchTerm }),
			...(params.selectedTypes && {
				selectedTypes: params.selectedTypes.join(','),
			}),
			...(params.sortingSettings && { sortingSettings: AnimeSortMapper.toString(params.sortingSettings) }),
		};
	}
}
