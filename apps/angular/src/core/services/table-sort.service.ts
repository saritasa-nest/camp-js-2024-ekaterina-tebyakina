import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { SortingColumnsDto } from '@js-camp/core/dtos/sorting-columns.dto';
import { toSortingColumnsDto } from '@js-camp/core/mappers/sorting-columns.mapper';
import { SortingColumns } from '@js-camp/core/models/sorting-columns';

/** Anime API Access Service. */
@Injectable({ providedIn: 'root' })
export class TableSortService {

	/** */
	protected sortOrder: Record<SortingColumnsDto, string> = {
		[SortingColumnsDto.EnglishTitle]: '',
		[SortingColumnsDto.AiredStart]: '',
		[SortingColumnsDto.Status]: '',
	};

	/**
	 * AnimeType.
	 * @param sortState - AnimeType.
	 * @returns AnimeType.
	 */
	public composeOrderingString(sortState: Sort): string {

		console.log(sortState);

		if (sortState) {

			const sortField = toSortingColumnsDto(sortState.active as SortingColumns);
console.log(sortField);
			switch (sortState.direction) {
				case 'asc':
					this.sortOrder[sortField] = sortField;
					break;
				case 'desc':
					this.sortOrder[sortField] = `-${sortField}`;
					break;
				default:
					this.sortOrder[sortField] = '';
			}

			const orderString = Object.values(this.sortOrder).filter(item => item)
				.join(',');

			return orderString;
		}
		return '';
	}
}
