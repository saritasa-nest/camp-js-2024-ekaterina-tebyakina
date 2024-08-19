import { AnimeParams } from '@js-camp/react/models/animeParams';
import { AnimeTypeMapper } from '@js-camp/core/mappers/anime-type.mapper';

import { AnimeParamsDto } from '../dtos/animeParamsDto';

import { AnimeSortMapper } from './animeSortMapper';

export namespace AnimeParamsMapper {

	const DEFAULT_SEARCH = '';

	/**
	 * Map anime filter params model to dto.
	 * @param params - Model with anime filter params for UI.
	 * @returns Anime filter params dto.
	 */
	export function toDto(params: Partial<AnimeParams>): AnimeParamsDto {

		return {
			search: params.searchTerm ? params.searchTerm : DEFAULT_SEARCH,
			ordering: params.sortingSettings ? AnimeSortMapper.toDto(params.sortingSettings) : '',

			// Disable eslint, because this property should be in snake case.
			// eslint-disable-next-line @typescript-eslint/naming-convention
			type__in: params.selectedTypes ?
				params.selectedTypes.map(animeType => AnimeTypeMapper.toDto(animeType)).join(',') : '',
		};
	}
}
