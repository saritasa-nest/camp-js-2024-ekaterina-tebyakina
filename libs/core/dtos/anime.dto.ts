export type AnimeStatus = 'AIRING' | 'FINISHED' | 'NOT_YET_AIRED';
export type AnimeType = 'MOVIE' | 'MUSIC' | 'ONA' | 'OVA' | 'PROMOTIONAL_VIDEOS' | 'SPECIAL' | 'TV' | 'UNKNOWN';

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
	readonly type: AnimeType;
	readonly status: AnimeStatus;
	readonly score: number;
	readonly user_score: number;
	readonly studios: readonly number[];
	readonly genres: readonly number[];
};
