import { AnimeSourceDto } from '../dtos/anime-source.dto';
import { AnimeSource } from '../models/anime-source';

export namespace AnimeSourceMapper {
	const ANIME_SOURCE_MAP_FROM_DTO: Readonly<Record<AnimeSourceDto, AnimeSource>> = {
		[AnimeSourceDto.FourKomaManga]: AnimeSource.FourKomaManga,
		[AnimeSourceDto.Book]: AnimeSource.Book,
		[AnimeSourceDto.CardGame]: AnimeSource.CardGame,
		[AnimeSourceDto.Game]: AnimeSource.Game,
		[AnimeSourceDto.LightNovel]: AnimeSource.LightNovel,
		[AnimeSourceDto.Manga]: AnimeSource.Manga,
		[AnimeSourceDto.MixedMedia]: AnimeSource.MixedMedia,
		[AnimeSourceDto.Music]: AnimeSource.Music,
		[AnimeSourceDto.Novel]: AnimeSource.Novel,
		[AnimeSourceDto.Original]: AnimeSource.Original,
		[AnimeSourceDto.PictureBook]: AnimeSource.PictureBook,
		[AnimeSourceDto.Radio]: AnimeSource.Radio,
		[AnimeSourceDto.VisualNovel]: AnimeSource.VisualNovel,
		[AnimeSourceDto.WebManga]: AnimeSource.WebManga,
		[AnimeSourceDto.WebNovel]: AnimeSource.WebNovel,
		[AnimeSourceDto.Other]: AnimeSource.Other,
		[AnimeSourceDto.Unknown]: AnimeSource.Unknown,
	};

	/**
	 * Map source dto.
	 * @param status  - Source dto.
	 * @returns Source model.
	 */
	export function fromDto(status: AnimeSourceDto): AnimeSource {
		return ANIME_SOURCE_MAP_FROM_DTO[status];
	}

	const ANIME_SOURCE_MAP_TO_DTO: Readonly<Record<AnimeSource, AnimeSourceDto>> = {
		[AnimeSource.FourKomaManga]: AnimeSourceDto.FourKomaManga,
		[AnimeSource.Book]: AnimeSourceDto.Book,
		[AnimeSource.CardGame]: AnimeSourceDto.CardGame,
		[AnimeSource.Game]: AnimeSourceDto.Game,
		[AnimeSource.LightNovel]: AnimeSourceDto.LightNovel,
		[AnimeSource.Manga]: AnimeSourceDto.Manga,
		[AnimeSource.MixedMedia]: AnimeSourceDto.MixedMedia,
		[AnimeSource.Music]: AnimeSourceDto.Music,
		[AnimeSource.Novel]: AnimeSourceDto.Novel,
		[AnimeSource.Original]: AnimeSourceDto.Original,
		[AnimeSource.PictureBook]: AnimeSourceDto.PictureBook,
		[AnimeSource.Radio]: AnimeSourceDto.Radio,
		[AnimeSource.VisualNovel]: AnimeSourceDto.VisualNovel,
		[AnimeSource.WebManga]: AnimeSourceDto.WebManga,
		[AnimeSource.WebNovel]: AnimeSourceDto.WebNovel,
		[AnimeSource.Other]: AnimeSourceDto.Other,
		[AnimeSource.Unknown]: AnimeSourceDto.Unknown,
	};

	/**
	 * Map source dto.
	 * @param status  - Source model.
	 * @returns Source dto.
	 */
	export function toDto(status: AnimeSource): AnimeSourceDto {
		return ANIME_SOURCE_MAP_TO_DTO[status];
	}
}
