import { AnimeColumnsIndexesDto } from '../dtos/anime-columns-indexes.dto';
import { AnimeColumnsIndexes } from '../models/anime-columns-indexes';

export namespace AnimeColumnsIndexesMapper {
	const ANIME_COLUMNS_INDEXES_MAP_FROM_DTO: Readonly<Record<AnimeColumnsIndexesDto, AnimeColumnsIndexes>> = {
		[AnimeColumnsIndexesDto.Image]: AnimeColumnsIndexes.Image,
		[AnimeColumnsIndexesDto.EnglishTitle]: AnimeColumnsIndexes.EnglishTitle,
		[AnimeColumnsIndexesDto.JapaneseTitle]: AnimeColumnsIndexes.JapaneseTitle,
		[AnimeColumnsIndexesDto.AiredStart]: AnimeColumnsIndexes.AiredStart,
		[AnimeColumnsIndexesDto.Type]: AnimeColumnsIndexes.Type,
		[AnimeColumnsIndexesDto.Status]: AnimeColumnsIndexes.Status,
	};

	/**
	 * Map anime columns indexes dto.
	 * @param index  - Anime columns indexes dto.
	 * @returns Anime columns indexes model.
	 */
	export function fromDto(index: AnimeColumnsIndexesDto): AnimeColumnsIndexes {
		return ANIME_COLUMNS_INDEXES_MAP_FROM_DTO[index];
	}

	const ANIME_COLUMNS_INDEXES_MAP_TO_DTO: Readonly<Record<AnimeColumnsIndexes, AnimeColumnsIndexesDto>> = {
		[AnimeColumnsIndexes.Image]: AnimeColumnsIndexesDto.Image,
		[AnimeColumnsIndexes.EnglishTitle]: AnimeColumnsIndexesDto.EnglishTitle,
		[AnimeColumnsIndexes.JapaneseTitle]: AnimeColumnsIndexesDto.JapaneseTitle,
		[AnimeColumnsIndexes.AiredStart]: AnimeColumnsIndexesDto.AiredStart,
		[AnimeColumnsIndexes.Type]: AnimeColumnsIndexesDto.Type,
		[AnimeColumnsIndexes.Status]: AnimeColumnsIndexesDto.Status,
	};

	/**
	 * Map anime columns indexes dto.
	 * @param index  - Anime columns indexes dto.
	 * @returns Anime columns indexes model.
	 */
	export function toDto(index: AnimeColumnsIndexes): AnimeColumnsIndexesDto {
		return ANIME_COLUMNS_INDEXES_MAP_TO_DTO[index];
	}
}
