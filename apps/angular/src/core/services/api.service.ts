import { Observable, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// import { http } from '@js-camp/angular/core/utils/axios.util';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { AppConfig } from '../utils/app-config';

/** */
@Injectable({
	providedIn: 'root',
})
export class ApiService {

	public constructor(private httpClient: HttpClient, private appConfig: AppConfig) {}

	/** */
	public getAnime(): Observable<AnimeDto[]> {
		return this.httpClient.get<PaginationDto<AnimeDto>>(`${this.appConfig.baseApiURL}/anime/anime/`, {
			headers: {
				'Api-Key': this.appConfig.apiKey,
			},
		}).pipe(
			tap(console.log),
			map(pageItem => pageItem.results),
			tap(console.log),
			map(results => results.map((anime: AnimeDto) => AnimeMapper.fromDto(anime))),
			tap(console.log),
		);
	}
}
