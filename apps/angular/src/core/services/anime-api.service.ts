import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { QueryParamsDto } from '@js-camp/core/dtos/query-params.dto';

/** Anime API Access Service. */
@Injectable({ providedIn: 'root' })
export class AnimeApiService {

	private readonly http = inject(HttpClient);

	/**
	 * Get page of anime list.
	 * @param params - Params for request.
	 * @returns Page of anime list.
	 */
	public getPage(params: QueryParamsDto): Observable<Pagination<Anime>> {

		const pageParams = new HttpParams()
			.appendAll(params);

		return this.http.get<PaginationDto<AnimeDto>>('anime/anime/', {
			params: pageParams,
		}).pipe(
			map(res => PaginationMapper.fromDto(res, AnimeMapper.fromDto)),
		);
	}
}
