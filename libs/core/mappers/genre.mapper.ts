import { GenreDto } from '../dtos/genre.dto';
import { Genre } from '../models/genre';

export namespace GenreMapper {

	/**
	 * Maps dto to model.
	 * @param genre Genre dto.
	 * @returns Genre model.
	 */
	export function fromDto(genre: GenreDto): Genre {
		return new Genre({
			id: genre.id,
			name: genre.name,
			type: genre.type,
		});
	}
}
