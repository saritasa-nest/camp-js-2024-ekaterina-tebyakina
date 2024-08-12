import { Sort } from '@angular/material/sort';
import { AnimeColumnsIndexes } from '@js-camp/core/models/anime-columns-indexes';
import { AnimeSort, SortingDirection } from '@js-camp/core/models/anime-sort';
import { checkIsEnumMember } from '@js-camp/core/utils/check-is-enum.util';

export namespace MaterialSortMapper {

	/**
	 * Map object type of material Sort to object type of AnimeSort.
	 * @param sortSetting - Anime sort settings.
	 * @returns Anime sort settings type of AnimeSort.
	 */
	export function from(sortSetting: Sort): AnimeSort {
		assertIsAnimeColumnsIndexes(sortSetting.active);
		assertIsSortingDirection(sortSetting.direction);

		return {
			sortField: sortSetting.active,
			direction: sortSetting.direction,
		};
	}

	/**
	 * Assert that value is typeof AnimeColumnsIndexes.
	 * @param value - Value for checking.
	 */
	function assertIsAnimeColumnsIndexes(value: unknown): asserts value is AnimeColumnsIndexes {
		if (!checkIsEnumMember(value, AnimeColumnsIndexes)) {
			throw new Error('Not a AnimeColumnsIndexes!');
		}
	}

	/**
	 * Assert that value is typeof SortingDirection.
	 * @param value - Value for checking.
	 */
	function assertIsSortingDirection(value: unknown): asserts value is SortingDirection {
		if (!checkIsEnumMember(value, SortingDirection)) {
			throw new Error('Not a SortingDirection!');
		}
	}
}
