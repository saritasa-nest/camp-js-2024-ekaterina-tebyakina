import { AiredDto } from './aired.dto';
import { AnimeRatingDto } from './anime-rating.dto';
import { AnimeSourceDto } from './anime-source.dto';
import { AnimeStatusDto } from './anime-status.dto';
import { AnimeTypeDto } from './anime-type.dto';
import { GenreDto } from './genre.dto';
import { SeasonDto } from './season.dto';
import { StudioDto } from './studio.dto';

/** Anime details DTO. */
export type AnimeDetailsDto = {
	readonly id: number;
	readonly created: string;
	readonly modified: string;
	readonly image: string;
	readonly trailer_youtube_id: string;
	readonly title_eng: string;
	readonly title_jpn: string;
	readonly score: number;
	readonly user_score: number;
	readonly type: AnimeTypeDto;
	readonly status: AnimeStatusDto;
	readonly source: AnimeSourceDto;
	readonly airing: boolean;
	readonly aired: AiredDto;
	readonly rating: AnimeRatingDto;
	readonly season: SeasonDto;
	readonly synopsis: string;
	readonly background: string;
	readonly broadcast_day: number;
	readonly broadcast_time: string;
	readonly broadcast_timezone: string;
	readonly studios: readonly number[];
	readonly studios_data: readonly StudioDto[];
	readonly genres: readonly number[];
	readonly genres_data: readonly GenreDto[];
};
