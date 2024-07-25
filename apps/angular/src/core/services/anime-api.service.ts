import { Observable, map, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

/** Anime API Access Service. */
@Injectable({ providedIn: 'root' })
export class AnimeApiService {

	private readonly http = inject(HttpClient);

	/** Gets anime list. */
	public getList(): Observable<Anime[]> {
		return this.http.get<PaginationDto<AnimeDto>>('anime/anime/').pipe(
			map(({ results }) => results.map(anime => AnimeMapper.fromDto(anime))),
		);
	}

	/**
 * getPage.
 * @param param0 getPage.
 * @returns getPage.
 */
	public getPage({page = 0, pageSize = 25, ordering = '', search = ''}): Observable<Pagination<Anime>> {
		const pageParams = new HttpParams()
			.set('limit', pageSize)
			.set('offset', page * pageSize)
			.set('ordering', ordering)
			.set('search', search);

		console.log('pageParams', pageParams);

		return this.http.get<PaginationDto<AnimeDto>>('anime/anime/', {
			params: pageParams,
		}).pipe(
			map(res => PaginationMapper.fromDto(res, page, pageSize, AnimeMapper.fromDto)),
			tap(res => console.log(res)),
		);
	}
}
