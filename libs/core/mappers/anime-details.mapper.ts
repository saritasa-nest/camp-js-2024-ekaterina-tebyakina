import { AnimeDetailsDto } from '../dtos/anime-details.dto';
import { AnimeDetails } from '../models/anime-details';

import { AiredMapper } from './aired.mapper';
import { AnimeRatingMapper } from './anime-rating.mapper';
import { AnimeSourceMapper } from './anime-source.mapper';
import { AnimeStatusMapper } from './anime-status.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';
import { GenreMapper } from './genre.mapper';
import { SeasonMapper } from './season.mapper';
import { StudioMapper } from './studio.mapper';

export namespace AnimeDetailsMapper {

	/**
	 * Maps dto to model.
	 * @param anime - Anime details dto.
	 * @returns Anime details model.
	 */
	export function fromDto(anime: AnimeDetailsDto): AnimeDetails {
		return new AnimeDetails({
			id: anime.id,
			created: new Date(anime.created),
			modified: new Date(anime.modified),
			englishTitle: anime.title_eng,
			japaneseTitle: anime.title_jpn,
			image: anime.image,
			trailerYoutubeId: anime.trailer_youtube_id,
			airing: anime.airing,
			aired: AiredMapper.fromDto(anime.aired),
			type: AnimeTypeMapper.fromDto(anime.type),
			status: AnimeStatusMapper.fromDto(anime.status),
			source: AnimeSourceMapper.fromDto(anime.source),
			score: anime.score,
			userScore: anime.user_score,
			rating: AnimeRatingMapper.fromDto(anime.rating),
			season: SeasonMapper.fromDto(anime.season),
			synopsis: anime.synopsis,
			background: anime.background,
			broadcastDay: anime.broadcast_day,
			broadcastTime: anime.broadcast_time,
			broadcastTimezone: anime.broadcast_timezone,
			studios: anime.studios,
			studiosData: anime.studios_data.map(studio => StudioMapper.fromDto(studio)),
			genres: anime.genres,
			genresData: anime.genres_data.map(genre => GenreMapper.fromDto(genre)),
		});
	}

}
