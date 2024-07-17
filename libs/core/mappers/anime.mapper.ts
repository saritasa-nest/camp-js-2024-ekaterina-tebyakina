import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

export namespace AnimeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return new Anime({
			id: dto.id,
			created: new Date(dto.created),
			modified: new Date(dto.modified),
			titleEng: dto.title_eng,
			titleJpn: dto.title_jpn,
			image: dto.image,
			aired: {
				start: new Date(dto.aired.start),
				end: new Date(dto.aired.end),
			},
			type: dto.type,
			status: dto.status,
			score: dto.score,
			userScore: dto.user_score,
			studios: dto.studios,
			genres: dto.genres,
		});
	}
}
