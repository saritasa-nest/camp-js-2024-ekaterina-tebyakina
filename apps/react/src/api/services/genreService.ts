import { Genre } from '@js-camp/core/models/genre';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { GenreDto } from '@js-camp/core/dtos/genre.dto';
import { GenreMapper } from '@js-camp/core/mappers/genre.mapper';

import { http } from '..';

const url = 'anime/genres/';

export namespace GenresService {

	/** Fetches a list of genres.
	 * @param offset Offset anime list.
	 */
	export async function fetchGenres(offset: string | null = ''): Promise<Genre[]> {
		const { data } = await http.get<PaginationDto<GenreDto>>(`${url}${offset}`);
		return data.results.map(dto => GenreMapper.fromDto(dto));
	}
}
