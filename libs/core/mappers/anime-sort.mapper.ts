import { AnimeSortDto } from '../dtos/anime-sort.dto';
import { AnimeSort, SortingDirection } from '../models/anime-sort';
import { AnimeColumnsIndexes } from '../models/anime-columns-indexes';
import { checkIsEnumMember } from '../utils/check-is-enum.util';

import { AnimeColumnsIndexesMapper } from './anime-columns-indexes.mapper';

export namespace AnimeSortMapper {

	const DESCENDING_PREFIX = '-';

	/**
	 * Map object with active field and sorting direction to ordering param.
	 * @param ordering - Object with settings for sort.
	 * @returns Ordering param.
	 */
	export function toDto(ordering: AnimeSort): AnimeSortDto {

		const { sortField, direction } = ordering;

		if (direction === '') {
			return '';
		}

		const sortFieldDto = AnimeColumnsIndexesMapper.toDto(sortField);

		return direction === 'asc' ? sortFieldDto : `${DESCENDING_PREFIX}${sortFieldDto}`;
	}

	/**
	 * Map object with active field and sorting direction to string.
	 * @param sortSettings - Object with settings for sort.
	 * @returns String with settings for sort. Contains settings separated by commas.
	 */
	export function toString(sortSettings: AnimeSort): string {

		const { sortField, direction } = sortSettings;

		return sortSettings ? `${sortField},${direction}` : '';
	}

	/**
	 * Map string with settings for sort to object that can be used in UI.
	 * @param sortSettingsString - String with settings for sort separated by commas.
	 * @returns Object with active field and sorting direction.
	 */
	export function fromString(sortSettingsString: string): AnimeSort {

		const sortSettings: AnimeSort = { sortField: AnimeColumnsIndexes.Status, direction: SortingDirection.None };

		if (sortSettingsString) {
			const sortSettingsArray = sortSettingsString.split(',');

			if (checkIsEnumMember(sortSettingsArray[0], AnimeColumnsIndexes) && checkIsEnumMember(sortSettingsArray[1], SortingDirection)) {
				return {
					sortField: sortSettingsArray[0],
					direction: sortSettingsArray[1],
				};
			}
		}

		return sortSettings;
	}

}
