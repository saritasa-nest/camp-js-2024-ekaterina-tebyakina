import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { fromSortingColumnsDto, SortingColumnsDto } from '@js-camp/angular/app/features/table/table.component';
import { toSortingColumnsDto } from '@js-camp/core/mappers/sorting-columns.mapper';
import { SortingColumns } from '@js-camp/core/models/sorting-columns';

/** Anime API Access Service. */
@Injectable({ providedIn: 'root' })
export class TableSortService {

	/**
	 * AnimeType.
	 * @param sortState - AnimeType.
	 * @returns AnimeType.
	 */
	public composeOrderingString(sortState: Sort): string {

		let orderString = '';

		if (sortState) {
			const sortField = toSortingColumnsDto(sortState.active as SortingColumns);

			switch (sortState.direction) {
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

	/**
	 * AnimeType.
	 * @param ordering - AnimeType.
	 * @returns AnimeType.
	 */
	public fromOrderingString(ordering: string): Sort {

		const sortState: Sort = { active: '', direction: '' };

		if (ordering === '') {
			return sortState;
		}

		if (ordering[0] === '-') {
			sortState.active = fromSortingColumnsDto(ordering.slice(1) as SortingColumnsDto);
			sortState.direction = 'desc';
			return sortState;
		}

		sortState.active = fromSortingColumnsDto(ordering as SortingColumnsDto);
		sortState.direction = 'asc';

		return sortState;
	}
}
