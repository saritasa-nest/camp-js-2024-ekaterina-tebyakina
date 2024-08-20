import { PaginationListCursorDto } from '@js-camp/core/dtos/pagination.dto';

import { AnimeStudioMapper } from '@js-camp/core/mappers/anime-studio.mapper';
import { AnimeStudioDto } from '@js-camp/core/dtos/anime-studio.dto';

import { PaginationListCursorMapper } from '@js-camp/core/mappers/pagination.mapper';

import { StudioQueryParams, StudioQueryParamsMapper } from '@js-camp/core/mappers/studio-query-params.mapper';

import { StudioFilterParamsMapper } from '@js-camp/core/mappers/studio-filter-params.mapper';

import { http } from '..';
import { AppUrls } from '../app-url';

export namespace StudioService {

	/**
	 * Get all studios.
	 * @param queryParams Query params.
	 */
	export async function getAllStudios() {
		const { data } = await http.get<PaginationListCursorDto<AnimeStudioDto>>(AppUrls.anime.studio.listCursor);

		return PaginationListCursorMapper.fromDto(data, AnimeStudioMapper.fromDto);
	}

	export async function getAllStudios2(queryParams: StudioQueryParams) {
		const filterParams = StudioQueryParamsMapper.fromDto(queryParams);
		const filterParamsDto = StudioFilterParamsMapper.toDto(filterParams);
		const { data } = await http.get<PaginationListCursorDto<AnimeStudioDto>>(AppUrls.anime.studio.listCursor, {
			params: filterParamsDto,
		});

		return PaginationListCursorMapper.fromDto(data, AnimeStudioMapper.fromDto);
	}
}
