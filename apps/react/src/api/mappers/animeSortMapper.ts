import { AnimeSort } from '@js-camp/react/models/animeSort';
import { checkIsEnumMember } from '@js-camp/core/utils/check-is-enum.util';

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
	 * Map anime sorting setting from model to dto.
	 * @param sortingSettings  - Sorting settings model.
	 * @returns Sorting settings dto.
	 */
	export function toDto(sortingSettings: AnimeSort): AnimeSortDto {
		return ANIME_SORT_MAP_TO_DTO[sortingSettings];
	}

	/**
	 * Map anime sorting setting from string to model.
	 * @param sortingSettings  - Sorting settings string.
	 * @returns Sorting settings model.
	 */
	export function fromString(sortingSettings: string): AnimeSort {
		assertIsAnimeSort(sortingSettings);
		return sortingSettings;
	}

	/**
	 * Assert that value is typeof AnimeSort.
	 * @param value - Value for checking.
	 */
	function assertIsAnimeSort(value: unknown): asserts value is AnimeSort {
		if (!checkIsEnumMember(value, AnimeSort)) {
			throw new Error(`${value} is not a valid AnimeSort!`);
		}
	}
}
