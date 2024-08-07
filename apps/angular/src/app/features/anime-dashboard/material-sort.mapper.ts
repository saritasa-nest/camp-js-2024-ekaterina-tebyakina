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
	export function fromMaterialSort(sortSetting: Sort): AnimeSort {

		return {
			sortField: checkIsEnumMember(sortSetting.active, AnimeColumnsIndexes) ?
				sortSetting.active as AnimeColumnsIndexes : AnimeColumnsIndexes.Status,
			direction: checkIsEnumMember(sortSetting.direction, SortingDirection) ?
				sortSetting.direction as SortingDirection : SortingDirection.None,
		};
	}

	/**
	 * Map object type of AnimeSort to object type of material Sort.
	 * @param sortSetting - Anime sort settings.
	 * @returns Anime sort settings type of material Sort.
	 */
	export function toMaterialSort(sortSetting: AnimeSort): Sort {

		return {
			active: sortSetting.sortField,
			direction: sortSetting.direction,
		};
	}

}
