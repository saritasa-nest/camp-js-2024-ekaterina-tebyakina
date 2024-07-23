import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { Anime } from '@js-camp/core/models/anime';

/** Anime API Access Service. */
@Injectable({ providedIn: 'root' })
export class AnimeApiService {

	private readonly http = inject(HttpClient);

	/** Gets anime list. */
	public getList(): Observable<Anime[]> {
		return this.http.get<PaginationDto<AnimeDto>>('anime/anime/').pipe(
			map(({ results }) => results.map((anime: AnimeDto) => AnimeMapper.fromDto(anime))),
		);
	}
}
