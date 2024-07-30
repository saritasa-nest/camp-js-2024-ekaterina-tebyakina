import { AiredDto } from './aired.dto';
import { AnimeStatusDto } from './anime-status.dto';
import { AnimeTypeDto } from './anime-type.dto';

/** Anime DTO. */
export type AnimeDto = {
	readonly id: number;
	readonly created: string;
	readonly modified: string;
	readonly title_eng: string;
	readonly title_jpn: string;
	readonly image: string;
	readonly aired: AiredDto;
	readonly type: AnimeTypeDto;
	readonly status: AnimeStatusDto;
	readonly score: number;
	readonly user_score: number;
	readonly studios: readonly number[];
	readonly genres: readonly number[];
};
