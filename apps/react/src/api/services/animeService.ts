import { Anime } from '@js-camp/core/models/anime';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimeParams } from '@js-camp/react/models/animeParams';

import { http } from '..';
import { AnimeParamsMapper } from '../mappers/animeParamsMapper';

const url = 'anime/anime/';

export namespace AnimeService {

	/**
	 * Fetches a list of anime.
	 * @param params - AnimeParams.
	 */
	export async function fetchList(params: AnimeParams): Promise<Anime[]> {
		console.log(AnimeParamsMapper.toDto(params));
		const { data } = await http.get<PaginationDto<AnimeDto>>(url, {
			params: AnimeParamsMapper.toDto(params),
		});
		return data.results.map(dto => AnimeMapper.fromDto(dto));
	}
}
