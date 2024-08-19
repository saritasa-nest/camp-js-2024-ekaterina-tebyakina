import { AnimeSort } from '@js-camp/react/models/animeSort';

import { AnimeSortDto } from '../dtos/animeSortDto';

export namespace AnimeSortMapper {
	const ANIME_SORT_MAP_TO_DTO: Readonly<Record<AnimeSort, AnimeSortDto>> = {
		[AnimeSort.AscendingEnglishTitle]: AnimeSortDto.AscendingEnglishTitle,
		[AnimeSort.DescendingEnglishTitle]: AnimeSortDto.DescendingEnglishTitle,
		[AnimeSort.AscendingStatus]: AnimeSortDto.AscendingStatus,
		[AnimeSort.DescendingStatus]: AnimeSortDto.DescendingStatus,
		[AnimeSort.None]: AnimeSortDto.None,
	};

	/**
	 * Map anime sorting setting.
	 * @param sortingSettings  - Sorting settings model.
	 * @returns Sorting settings dto.
	 */
	export function toDto(sortingSettings: AnimeSort): AnimeSortDto {
		return ANIME_SORT_MAP_TO_DTO[sortingSettings];
	}
}
