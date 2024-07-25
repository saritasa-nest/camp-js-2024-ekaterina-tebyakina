import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { fromAiredDto } from './aired.mapper';
import { fromStatusDto } from './anime-status.mapper';
import { fromTypeDto } from './anime-type.mapper';

export namespace AnimeMapper {

	/**
	 * Maps dto to model.
	 * @param dto - Anime dto.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return new Anime({
			id: dto.id,
			created: new Date(dto.created),
			modified: new Date(dto.modified),
			englishTitle: dto.title_eng,
			japaneseTitle: dto.title_jpn,
			image: dto.image,
			aired: fromAiredDto(dto.aired),
			type: fromTypeDto(dto.type),
			status: fromStatusDto(dto.status),
			score: dto.score,
			userScore: dto.user_score,
			studios: dto.studios,
			genres: dto.genres,
		});
	}

}
