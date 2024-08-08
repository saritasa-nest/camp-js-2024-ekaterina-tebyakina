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
}
