import { PaginationListCursorDto } from '@js-camp/core/dtos/pagination.dto';

import { AnimeStudioMapper } from '@js-camp/core/mappers/anime-studio.mapper';
import { AnimeStudioDto } from '@js-camp/core/dtos/anime-studio.dto';

import { PaginationListCursorMapper } from '@js-camp/core/mappers/pagination.mapper';

import { http } from '..';
import { AppUrls } from '../app-url';

export namespace StudioService {

	/** Get all studios. */
	export async function getAllStudios() {
		const { data } = await http.get<PaginationListCursorDto<AnimeStudioDto>>(AppUrls.anime.studio.listCursor);

		return PaginationListCursorMapper.fromDto(data, AnimeStudioMapper.fromDto);
	}
}
