import { Genre } from '@js-camp/core/models/genre';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { GenreDto } from '@js-camp/core/dtos/genre.dto';
import { GenreMapper } from '@js-camp/core/mappers/genre.mapper';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { http } from '..';

const url = 'anime/genres/list-cursor/';

export namespace GenresService {

	/** Fetches a list of genres.
	 * @param nextUrl Next anime list.
	 */
	export async function fetchGenres(nextUrl: string | null = ''): Promise<Pagination<Genre>> {
		const { data } = await http.get<PaginationDto<GenreDto>>(`${url}?${nextUrl}`);
		return PaginationMapper.fromDto(data, GenreMapper.fromDto);
	}
}
