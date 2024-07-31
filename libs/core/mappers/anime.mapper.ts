import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { AiredMapper } from './aired.mapper';
import { AnimeStatusMapper } from './anime-status.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';

export namespace AnimeMapper {

	/**
	 * Maps dto to model.
	 * @param anime - Anime dto.
	 * @returns Anime model.
	 */
	export function fromDto(anime: AnimeDto): Anime {
		return new Anime({
			id: anime.id,
			created: new Date(anime.created),
			modified: new Date(anime.modified),
			englishTitle: anime.title_eng,
			japaneseTitle: anime.title_jpn,
			image: anime.image,
			aired: AiredMapper.fromDto(anime.aired),
			type: AnimeTypeMapper.fromDto(anime.type),
			status: AnimeStatusMapper.fromDto(anime.status),
			score: anime.score,
			userScore: anime.user_score,
			studios: anime.studios,
			genres: anime.genres,
		});
	}

}
