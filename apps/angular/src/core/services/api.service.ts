import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { Anime } from '@js-camp/core/models/anime';

import { AppConfig } from '../utils/app-config';

/** */
@Injectable({
	providedIn: 'root',
})
export class ApiService {

	public constructor(private httpClient: HttpClient, private appConfig: AppConfig) {}

	/** */
	public getAnime(): Observable<Anime[]> {
		return this.httpClient.get<PaginationDto<AnimeDto>>(`${this.appConfig.baseApiURL}/anime/anime/`, {
			headers: {
				// Disable lint, because it's a header, it shouldn't be written in camel case
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'Api-Key': this.appConfig.apiKey,
			},
		}).pipe(
			map(pageItem => pageItem.results),
			map(results => results.map((anime: AnimeDto) => AnimeMapper.fromDto(anime))),
		);
	}
}
