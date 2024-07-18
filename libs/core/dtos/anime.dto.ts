export type AnimeStatusDto = 'AIRING' | 'FINISHED' | 'NOT_YET_AIRED';
export type AnimeTypeDto = 'MOVIE' | 'MUSIC' | 'ONA' | 'OVA' | 'PROMOTIONAL_VIDEOS' | 'SPECIAL' | 'TV' | 'UNKNOWN';

/** Anime DTO. */
export type AnimeDto = {
	readonly id: number;
	readonly created: string;
	readonly modified: string;
	readonly title_eng: string;
	readonly title_jpn: string;
	readonly image: string;
	readonly aired: {
		start: string;
		end: string;
	};
	readonly type: AnimeTypeDto;
	readonly status: AnimeStatusDto;
	readonly score: number;
	readonly user_score: number;
	readonly studios: readonly number[];
	readonly genres: readonly number[];
};
