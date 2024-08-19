import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { AnimeStudioMapper } from '@js-camp/core/mappers/anime-studio.mapper';
import { AnimeStudioDto } from '@js-camp/core/dtos/anime-studio.dto';

import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { http } from '..';
import { AppUrls } from '../app-url';

export namespace StudioService {

	/** Get all studios. */
	export async function getAllStudios() {
		const studioPage = await http
			.get<PaginationDto<AnimeStudioDto>>(AppUrls.anime.studio.listCursor)
			.then(res => PaginationMapper.fromDto(res.data, AnimeStudioMapper.fromDto));

		return studioPage;
	}
}
