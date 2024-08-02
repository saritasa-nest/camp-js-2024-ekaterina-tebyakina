import { Sort } from '@angular/material/sort';
import { AnimeSort } from '@js-camp/core/models/anime-sort';

export namespace MaterialSortMapper {

	/**
	 * Map object type of material Sort to object type of AnimeSort.
	 * @param sortSetting - Anime sort settings.
	 * @returns Anime sort settings type of AnimeSort.
	 */
	export function fromMaterialSort(sortSetting: Sort): AnimeSort {

		return {
			sortField: sortSetting.active,
			direction: sortSetting.direction,
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
