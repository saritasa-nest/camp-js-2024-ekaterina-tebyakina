import { AnimeSortDto } from '../dtos/anime-sort.dto';
import { AnimeSort } from '../models/anime-sort';
import { AnimeColumnsIndexes } from '../models/anime-columns-indexes';
import { checkIsEnumMember } from '../utils/check-is-enum.util';

export namespace AnimeSortMapper {

	/**
	 * Map ordering param from string to object that can be used in UI.
	 * @param ordering - Ordering settings. String with a field, selected for sort.
	 * It may have a hyphen at the beginning if the sorting is reverse.
	 * Or it can be an empty string if the sorting field is not selected.
	 * @returns Object with active field and sorting direction.
	 */
	export function fromDto(ordering: AnimeSortDto): AnimeSort {

		const sortState: AnimeSort = { sortField: '', direction: '' };

		if (ordering === '') {
			return sortState;
		}

		if (ordering[0] === '-') {

			const sortField = ordering.slice(1);

			if (checkIsEnumMember(sortField, AnimeColumnsIndexes)) {
				return {
					sortField,
					direction: 'desc',
				};
			}
		}

		if (checkIsEnumMember(ordering, AnimeColumnsIndexes)) {
			return {
				sortField: ordering,
				direction: 'asc',
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

		let orderString = '';

		if (ordering) {
			const { sortField } = ordering;

			switch (ordering.direction) {
				case 'asc':
					orderString = sortField;
					break;
				case 'desc':
					orderString = `-${sortField}`;
					break;
				default:
					orderString = '';
			}
		}

		return orderString;
	}

}
