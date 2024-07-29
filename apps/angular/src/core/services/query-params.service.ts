import { inject, Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { toTypeDto } from '@js-camp/core/mappers/anime-type.mapper';
import { AnimeType } from '@js-camp/core/models/anime-type';

import { TableSortService } from './table-sort.service';

/** Anime API Access Service. */
@Injectable({ providedIn: 'root' })
export class QueryParamsService {

	private readonly tableSortService = inject(TableSortService);

	/**
	 * AnimeType.
	 * @param typesArr - AnimeType.
	 * @returns AnimeType.
	 */
	public composeTypeParam(typesArr: AnimeType[]): string {
		if (typesArr) {
			const typesDtoArr = typesArr.map(type => toTypeDto(type));
			return typesDtoArr.join(',');
		}
		return '';
	}

	/**
	 * AnimeType.
	 * @param sortState - AnimeType.
	 * @returns AnimeType.
	 */
	public composeOrderingParam(sortState: Sort): string {
		return this.tableSortService.composeOrderingString(sortState);
	}
}
