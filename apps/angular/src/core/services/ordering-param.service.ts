import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { SortingColumns } from '@js-camp/core/models/sorting-columns';
import { ColumnsMapper } from '@js-camp/core/mappers/sorting-columns.mapper';
import { SortingColumnsDto } from '@js-camp/core/dtos/sorting-columns.dto';

/** Anime API Access Service. */
@Injectable({ providedIn: 'root' })
export class OrderingParamService {

	/**
	 * AnimeType.
	 * @param sortState - AnimeType.
	 * @returns AnimeType.
	 */
	public composeOrderingString(sortState: Sort): string {

		let orderString = '';

		if (sortState) {
			const sortField = ColumnsMapper.toSortingColumnsDto(sortState.active as SortingColumns);

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
	public composeOrderingState(ordering: string): Sort {

		const sortState: Sort = { active: '', direction: '' };

		if (ordering === '') {
			return sortState;
		}

		if (ordering[0] === '-') {
			sortState.active = ColumnsMapper.fromSortingColumnsDto(ordering.slice(1) as SortingColumnsDto);
			sortState.direction = 'desc';
			return sortState;
		}

		sortState.active = ColumnsMapper.fromSortingColumnsDto(ordering as SortingColumnsDto);
		sortState.direction = 'asc';

		return sortState;
	}
}
