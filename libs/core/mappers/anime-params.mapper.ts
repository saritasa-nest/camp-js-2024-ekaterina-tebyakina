import { AnimeParamsDto } from '../dtos/anime-params.dto';
import { AnimeParams } from '../models/anime-params';

import { AnimeSortMapper } from './anime-sort.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';

export namespace AnimeParamsMapper {

	const DEFAULT_OFFSET = 0;
	const DEFAULT_LIMIT = 25;
	const DEFAULT_SEARCH = '';

	/**
	 * Map  anime filter params model to dto.
	 * @param params - Model with anime filter params for UI.
	 * @returns Anime filter params dto.
	 */
	export function toDto(params: Partial<AnimeParams>): AnimeParamsDto {

		return {
			offset: params.pageSize && params.pageIndex ? (params.pageSize * params.pageIndex) : DEFAULT_OFFSET,
			limit: params.pageSize ? params.pageSize : DEFAULT_LIMIT,
			search: params.searchTerm ? params.searchTerm : DEFAULT_SEARCH,
			ordering: params.sortingSettings ? AnimeSortMapper.toDto(params.sortingSettings) : '',

			// Disable eslint, because this property should be in snake case.
			// eslint-disable-next-line @typescript-eslint/naming-convention
			type__in: params.selectedTypes ? params.selectedTypes.map(animeType => AnimeTypeMapper.toDto(animeType)).join(',') : '',
		};
	}
}
