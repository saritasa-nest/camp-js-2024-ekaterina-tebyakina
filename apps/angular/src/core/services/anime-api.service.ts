import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { AnimeFilterParamsMapper } from '@js-camp/core/mappers/anime-filter-params.mapper';

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
	public getPage(params: AnimeFilterParams): Observable<Pagination<Anime>> {

		const pageParams = new HttpParams({ fromObject: AnimeFilterParamsMapper.toDto(params) });

		return this.http.get<PaginationDto<AnimeDto>>(this.urlConfigService.endpoints.anime, {
			params: pageParams,
		}).pipe(
			map(result => PaginationMapper.fromDto(result, AnimeMapper.fromDto)),
		);
	}
}
