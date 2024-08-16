import { Anime } from '@js-camp/core/models/anime';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

import { http } from '..';

const url = 'anime/anime/';

export namespace AnimeService {

	/** Fetches a list of anime. */
	export async function fetchList(): Promise<Anime[]> {
		const { data } = await http.get<PaginationDto<AnimeDto>>(url);
		return data.results.map(dto => AnimeMapper.fromDto(dto));
	}
}
