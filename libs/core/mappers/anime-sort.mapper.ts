import { AnimeSortDto } from '../dtos/anime-sort.dto';
import { AnimeSort, SortingDirection } from '../models/anime-sort';
import { AnimeColumnsIndexes } from '../models/anime-columns-indexes';
import { checkIsEnumMember } from '../utils/check-is-enum.util';

import { AnimeColumnsIndexesMapper } from './anime-columns-indexes.mapper';

export namespace AnimeSortMapper {

	const DESCENDING_PREFIX = '-';

	/**
	 * Map ordering param from string to object that can be used in UI.
	 * @param ordering - Ordering settings. String with a field, selected for sort.
	 * It may have a hyphen at the beginning if the sorting is reverse.
	 * Or it can be an empty string if the sorting field is not selected.
	 * @returns Object with active field and sorting direction.
	 */
	export function fromDto(ordering: AnimeSortDto): AnimeSort {

		const sortState: AnimeSort = { sortField: AnimeColumnsIndexes.Status, direction: SortingDirection.None };

		if (ordering === '') {
			return sortState;
		}

		if (ordering[0] === DESCENDING_PREFIX) {

			const sortField = ordering.slice(1);

			if (checkIsEnumMember(sortField, AnimeColumnsIndexes)) {
				return {
					sortField,
					direction: SortingDirection.Descending,
				};
			}
		}

		if (checkIsEnumMember(ordering, AnimeColumnsIndexes)) {
			return {
				sortField: ordering,
				direction: SortingDirection.Ascending,
			};
		}

		return sortState;
	}

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

		return direction === 'asc' ? AnimeColumnsIndexesMapper.toDto(sortField) : `${DESCENDING_PREFIX}${sortField}`;
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
