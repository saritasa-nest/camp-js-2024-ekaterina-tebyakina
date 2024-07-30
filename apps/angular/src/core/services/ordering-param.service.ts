import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { SortingColumns } from '@js-camp/core/models/sorting-columns';
import { ColumnsMapper } from '@js-camp/core/mappers/sorting-columns.mapper';
import { SortingColumnsDto } from '@js-camp/core/dtos/sorting-columns.dto';

/** Ordering query param service. */
@Injectable({ providedIn: 'root' })
export class OrderingParamService {

	/**
	 * Compose value for query param from sort settings object.
	 * @param sortState - Sort settings.
	 * @returns Query param value.
	 */
	public composeOrderingString(sortState: Sort): string {

		let orderString = '';

		if (sortState) {
			const sortField = ColumnsMapper.toDto(sortState.active as SortingColumns);

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
	 * Compose sort settings object from query param value.
	 * @param ordering - Query param value.
	 * @returns Sort settings.
	 */
	public composeOrderingState(ordering: SortingColumnsDto | ''): Sort {

		const sortState: Sort = { active: '', direction: '' };

		if (ordering === '') {
			return sortState;
		}

		if (ordering[0] === '-') {
			sortState.active = ColumnsMapper.fromDto(ordering.slice(1) as SortingColumnsDto);
			sortState.direction = 'desc';
			return sortState;
		}

		sortState.active = ColumnsMapper.fromDto(ordering as SortingColumnsDto);
		sortState.direction = 'asc';

		return sortState;
	}
}
