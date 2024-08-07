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
}
