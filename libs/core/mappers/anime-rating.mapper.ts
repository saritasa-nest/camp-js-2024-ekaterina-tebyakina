import { AnimeRatingDto } from '../dtos/anime-rating.dto';
import { AnimeRating } from '../models/anime-rating';

export namespace AnimeRatingMapper {
	const ANIME_RATING_MAP_FROM_DTO: Readonly<Record<AnimeRatingDto, AnimeRating>> = {
		[AnimeRatingDto.G]: AnimeRating.G,
		[AnimeRatingDto.PG]: AnimeRating.PG,
		[AnimeRatingDto.PG13]: AnimeRating.PG13,
		[AnimeRatingDto.R17]: AnimeRating.R17,
		[AnimeRatingDto.RPlus]: AnimeRating.RPlus,
		[AnimeRatingDto.RX]: AnimeRating.RX,
		[AnimeRatingDto.Unknown]: AnimeRating.Unknown,
	};

	/**
	 * Map rating dto.
	 * @param rating  - Rating dto.
	 * @returns Rating model.
	 */
	export function fromDto(rating: AnimeRatingDto): AnimeRating {
		return ANIME_RATING_MAP_FROM_DTO[rating];
	}

	const ANIME_RATING_MAP_TO_DTO: Readonly<Record<AnimeRating, AnimeRatingDto>> = {
		[AnimeRating.G]: AnimeRatingDto.G,
		[AnimeRating.PG]: AnimeRatingDto.PG,
		[AnimeRating.PG13]: AnimeRatingDto.PG13,
		[AnimeRating.R17]: AnimeRatingDto.R17,
		[AnimeRating.RPlus]: AnimeRatingDto.RPlus,
		[AnimeRating.RX]: AnimeRatingDto.RX,
		[AnimeRating.Unknown]: AnimeRatingDto.Unknown,
	};

	/**
	 * Map rating dto.
	 * @param rating  - Rating model.
	 * @returns Rating dto.
	 */
	export function toDto(rating: AnimeRating): AnimeRatingDto {
		return ANIME_RATING_MAP_TO_DTO[rating];
	}
}
