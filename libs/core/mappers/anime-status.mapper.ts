import { AnimeStatusDto } from '../dtos/anime-status.dto';
import { AnimeStatus } from '../models/anime-status';

export namespace AnimeStatusMapper {
	const animeStatusDtoMap: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
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
		return animeStatusDtoMap[status];
	}
}
