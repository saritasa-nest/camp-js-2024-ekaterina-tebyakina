import { AnimeStatusDto } from '../dtos/anime-status.dto';
import { AnimeStatus } from '../models/anime-status';

export namespace AnimeStatusMapper {
	const ANIME_STATUS_MAP_FROM_DTO: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
		[AnimeStatusDto.Airing]: AnimeStatus.Airing,
		[AnimeStatusDto.Finished]: AnimeStatus.Finished,
		[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
	};

	/**
	 * Map status dto.
	 * @param status  - Status dto.
	 * @returns Status model.
	 */
	export function fromDto(status: AnimeStatusDto): AnimeStatus {
		return ANIME_STATUS_MAP_FROM_DTO[status];
	}

	const ANIME_STATUS_MAP_TO_DTO: Readonly<Record<AnimeStatus, AnimeStatusDto>> = {
		[AnimeStatus.Airing]: AnimeStatusDto.Airing,
		[AnimeStatus.Finished]: AnimeStatusDto.Finished,
		[AnimeStatus.NotYetAired]: AnimeStatusDto.NotYetAired,
	};

	/**
	 * Map status dto.
	 * @param status  - Status model.
	 * @returns Status dto.
	 */
	export function toDto(status: AnimeStatus): AnimeStatusDto {
		return ANIME_STATUS_MAP_TO_DTO[status];
	}
}
