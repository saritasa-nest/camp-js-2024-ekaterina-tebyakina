import { AnimeStatusDto } from '../dtos/anime-status.dto';
import { AnimeStatus } from '../models/anime-status';

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
