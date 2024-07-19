import { AiredDto, AnimeDto, AnimeStatusDto, AnimeTypeDto } from '../dtos/anime.dto';
import { Aired, Anime, AnimeStatus, AnimeType } from '../models/anime';

// import { changeStringCase, replaceUnderscores } from '../utils/string-modify.util';

export namespace AnimeMapper {

	/** */
	export type StatusKey = keyof typeof AnimeStatusDto;

	/** */
	export type TypeKey = keyof typeof AnimeTypeDto;

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
			aired: fromAiredDto(dto.aired),
			type: fromTypeDto(dto.type),
			status: fromStatusDto(dto.status),
			score: dto.score,
			userScore: dto.user_score,
			studios: dto.studios,
			genres: dto.genres,
		});
	}

	/**
	 * AiredDto.
	 * @param aired - AiredDto.
	 * @returns AiredDto.
	 */
	export function fromAiredDto(aired: AiredDto): Aired {
		return {
			start: new Date(aired.start),
			end: new Date(aired.end),
		};
	}

	/**
	 * ChangeStringCase.
	 * @param type  - String.
	 * @returns - String.
	 */
	export function fromTypeDto(type: AnimeTypeDto): AnimeType {
		const keyId = Object.values(AnimeTypeDto).indexOf(type);
		const enumKey = Object.keys(AnimeTypeDto)[keyId] as TypeKey;
		return AnimeType[enumKey];
	}

	/**
	 * ChangeStringCase.
	 * @param status  - String.
	 * @returns - String.
	 */
	export function fromStatusDto(status: AnimeStatusDto): AnimeStatus {
		const keyId = Object.values(AnimeStatusDto).indexOf(status);
		const enumKey = Object.keys(AnimeStatusDto)[keyId] as StatusKey;
		return AnimeStatus[enumKey];
	}

}
