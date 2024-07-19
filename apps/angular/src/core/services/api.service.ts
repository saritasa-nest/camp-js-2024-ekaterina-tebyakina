import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { Anime } from '@js-camp/core/models/anime';

/** API Access Service. */
@Injectable({ providedIn: 'root' })
export class ApiService {

	public constructor(private http: HttpClient) {}

	/** Gets anime list. */
	public getAnime(): Observable<Anime[]> {
		return this.http.get<PaginationDto<AnimeDto>>(`anime/anime/`).pipe(
			map(pageItem => pageItem.results),
			map(results => results.map((anime: AnimeDto) => AnimeMapper.fromDto(anime))),
		);
	}
}
