import { SeasonDto } from '../dtos/season.dto';
import { Season } from '../models/season';

export namespace SeasonMapper {
	const ANIME_SEASON_MAP_FROM_DTO: Readonly<Record<SeasonDto, Season>> = {
		[SeasonDto.Summer]: Season.Summer,
		[SeasonDto.Winter]: Season.Winter,
		[SeasonDto.Spring]: Season.Spring,
		[SeasonDto.Fall]: Season.Fall,
		[SeasonDto.NonSeasonal]: Season.NonSeasonal,
	};

	/**
	 * Map season dto.
	 * @param season  - Season dto.
	 * @returns Season model.
	 */
	export function fromDto(season: SeasonDto): Season {
		return ANIME_SEASON_MAP_FROM_DTO[season];
	}

	const ANIME_SEASON_MAP_TO_DTO: Readonly<Record<Season, SeasonDto>> = {
		[Season.Summer]: SeasonDto.Summer,
		[Season.Winter]: SeasonDto.Winter,
		[Season.Spring]: SeasonDto.Spring,
		[Season.Fall]: SeasonDto.Fall,
		[Season.NonSeasonal]: SeasonDto.NonSeasonal,
	};

	/**
	 * Map season dto.
	 * @param season  - Season model.
	 * @returns Season dto.
	 */
	export function toDto(season: Season): SeasonDto {
		return ANIME_SEASON_MAP_TO_DTO[season];
	}
}
