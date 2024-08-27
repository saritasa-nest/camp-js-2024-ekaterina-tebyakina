import { StudioFilterParams } from '../models/studio-filter-params';

import { SortParamsMapper } from './sort-params.mapper';

/** Studio query params. */
export type StudioQueryParams = Partial<
Omit<StudioFilterParams.Combined, | 'sortField' | 'sortDirection'>
> & {

	/** Sort value. */
	sort?: string;
};

export namespace StudioQueryParamsMapper {

	/**
	 * Map query params to filter params.
	 * @param dto Query params.
	 */
	export function mapToFilterParams(dto: StudioQueryParams): StudioFilterParams.Combined {
		return {
			search: dto.search && dto.search.length > 0 ? dto.search : null,
			...SortParamsMapper.mapToSortFilterParams(dto.sort),
			nextCursor: dto.nextCursor ?? null,
		};
	}
}
