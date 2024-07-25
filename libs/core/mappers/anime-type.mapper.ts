import { AnimeTypeDto } from '../dtos/anime-type.dto';
import { AnimeType } from '../models/anime-type';

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
