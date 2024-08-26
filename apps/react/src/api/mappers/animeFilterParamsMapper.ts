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
			type__in: params.selectedTypes.map((animeType: AnimeType) => AnimeTypeMapper.toDto(animeType)).join(','),
		};
	}
}
