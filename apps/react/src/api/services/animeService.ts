import { Anime } from '@js-camp/core/models/anime';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimeFilterParams } from '@js-camp/react/models/animeFilterParams';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { http } from '..';
import { AnimeFilterParamsMapper } from '../mappers/animeFilterParamsMapper';

const ANIME_LIST_URL = 'anime/anime/list-cursor/';

export namespace AnimeService {

	/**
	 * Fetches a list of anime.
	 * @param params - Params for filtering anime.
	 */
	export async function fetchList(params: AnimeFilterParams): Promise<Pagination<Anime>> {
		const { data } = await http.get<PaginationDto<AnimeDto>>(ANIME_LIST_URL, {
			params: AnimeFilterParamsMapper.toDto(params),
		});

		return PaginationMapper.fromDto(data, AnimeMapper.fromDto);
	}

	/**
	 * Fetches a new page of anime list.
	 * @param newPageUrl - Url of new page.
	 */
	export async function fetchNewPage(newPageUrl: string): Promise<Pagination<Anime>> {
		const { data } = await http.get<PaginationDto<AnimeDto>>(newPageUrl);
		return PaginationMapper.fromDto(data, AnimeMapper.fromDto);
	}
}
