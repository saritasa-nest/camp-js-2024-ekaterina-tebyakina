import { AnimeFilterParams } from '@js-camp/react/models/animeFilterParams';
import { AnimeTypeMapper } from '@js-camp/core/mappers/anime-type.mapper';
import { AnimeType } from '@js-camp/core/models/anime-type';

import { AnimeFilterParamsDto } from '../dtos/animeFilterParamsDto';

import { AnimeSortMapper } from './animeSortMapper';

export namespace AnimeFilterParamsMapper {

	/**
	 * Map anime filter params model to dto.
	 * @param params - Model with anime filter params for UI.
	 * @returns Anime filter params dto.
	 */
	export function toDto(params: AnimeFilterParams): AnimeFilterParamsDto {

		return {
			search: params.searchTerm,
			ordering: AnimeSortMapper.toDto(params.sortingSettings),

			// Disable eslint, because this property should be in snake case.
			// eslint-disable-next-line @typescript-eslint/naming-convention
			type__in: params.selectedTypes.map((animeType: AnimeType) => AnimeTypeMapper.toDto(animeType)).join(','),
		};
	}
}
