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

export type AiredDto = {
	start: string | null;
	end: string | null;
};

export enum AnimeStatusDto {
	Airing = 'AIRING',
	Finished = 'FINISHED',
	NotYetAired = 'NOT_YET_AIRED',
}

export enum AnimeTypeDto {
	Movie = 'MOVIE',
	Music = 'MUSIC',
	ONA = 'ONA',
	OVA = 'OVA',
	Promotional = 'PROMOTIONAL_VIDEOS',
	Special = 'SPECIAL',
	TV = 'TV',
	Unknown = 'UNKNOWN',
}
