import { StudioFilterParams } from '../models/studio-filter-params';

/** Anime query params. */
export type StudioQueryParams = Partial<StudioFilterParams.Combined> & {};

export namespace StudioQueryParamsMapper {

	/**
	 * Map query params to filter params.
	 * @param dto Query params.
	 */
	export function fromDto(dto: StudioQueryParams): StudioFilterParams.Combined {
		return {
			search: dto.search && dto.search.length > 0 ? dto.search : null,
			sortField: dto.sortField ?? null,
			sortDirection: dto.sortDirection ?? null,
			nextCursor: dto.nextCursor ?? null,
		};
	}

	/**
	 * Map filter params to query params.
	 * @param model Filter params.
	 */
	export function toDto(model: Partial<StudioFilterParams.Combined>): Omit<StudioQueryParams, 'nextCursor'> {
		return {
			search: model.search !== undefined ? model.search : undefined,
			sortField: model.sortField ?? undefined,
			sortDirection: model.sortDirection ?? undefined,
		};
	}
}
