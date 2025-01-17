import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeParams } from '@js-camp/core/models/anime-params';
import { AnimeParamsMapper } from '@js-camp/core/mappers/anime-params.mapper';

import { UrlConfigService } from './url-config.service';

/** Anime API access service. */
@Injectable({ providedIn: 'root' })
export class AnimeApiService {

	private readonly http = inject(HttpClient);

	private readonly urlConfigService = inject(UrlConfigService);

	/**
	 * Get page of anime list.
	 * @param params - Params for request.
	 * @returns Page of anime list.
	 */
	public getPage(params: AnimeParams): Observable<Pagination<Anime>> {

		const pageParams = new HttpParams({ fromObject: AnimeParamsMapper.toDto(params) });

		return this.http.get<PaginationDto<AnimeDto>>(this.urlConfigService.anime.getPage, {
			params: pageParams,
		}).pipe(
			map(result => PaginationMapper.fromDto(result, AnimeMapper.fromDto)),
		);
	}
}
