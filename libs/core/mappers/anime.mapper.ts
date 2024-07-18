import { AnimeDto, AnimeStatusDto, AnimeTypeDto } from '../dtos/anime.dto';
import { Anime, AnimeStatus, AnimeType } from '../models/anime';
import { changeStringCase, replaceUnderscores } from '../utils/string-modify.util';

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
			type: fromAnimeTypeDto(dto.type),
			status: fromAnimeStatusDto(dto.status),
			score: dto.score,
			userScore: dto.user_score,
			studios: dto.studios,
			genres: dto.genres,
		});
	}

	/**
	 * ChangeStringCase.
	 * @param animeType  - String.
	 * @returns - String.
	 */
	export function fromAnimeTypeDto(animeType: AnimeTypeDto): AnimeType {
		if (animeType === 'TV' || animeType === 'OVA' || animeType === 'ONA') {
			return animeType;
		}
		return changeStringCase(replaceUnderscores(animeType)) as AnimeType;
	}

	/**
	 * ChangeStringCase.
	 * @param animeStatus  - String.
	 * @returns - String.
	 */
	export function fromAnimeStatusDto(animeStatus: AnimeStatusDto): AnimeStatus {
		return changeStringCase(replaceUnderscores(animeStatus)) as AnimeStatus;
	}
}
