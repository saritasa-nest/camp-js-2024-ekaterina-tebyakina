import { AiredDto, AnimeDto, AnimeStatusDto, AnimeTypeDto } from '../dtos/anime.dto';
import { Aired, Anime, AnimeStatus, AnimeType } from '../models/anime';

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
	 * Map aired dto to model.
	 * @param aired - Aired dto.
	 * @returns Aired model.
	 */
	export function fromAiredDto(aired: AiredDto): Aired {
		return {
			start: aired.start ? new Date(aired.start) : null,
			end: aired.end ? new Date(aired.end) : null,
		};
	}

	/** Type of anime type enum's keys. */
	export type TypeKey = keyof typeof AnimeTypeDto;

	/**
	 * Map type dto.
	 * @param type  - Type dto.
	 * @returns Type model.
	 */
	export function fromTypeDto(type: AnimeTypeDto): AnimeType {
		const keyId = Object.values(AnimeTypeDto).indexOf(type);
		const enumKey = Object.keys(AnimeTypeDto)[keyId] as TypeKey;
		return AnimeType[enumKey];
	}

	/** Type of anime status enum's keys. */
	export type StatusKey = keyof typeof AnimeStatusDto;

	/**
	 * Map status dto.
	 * @param status  - Status dto.
	 * @returns Status model.
	 */
	export function fromStatusDto(status: AnimeStatusDto): AnimeStatus {
		const keyId = Object.values(AnimeStatusDto).indexOf(status);
		const enumKey = Object.keys(AnimeStatusDto)[keyId] as StatusKey;
		return AnimeStatus[enumKey];
	}

}
