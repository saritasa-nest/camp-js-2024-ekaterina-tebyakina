/** Anime DTO. */
export type AnimeDto = Readonly<{
	id: number;
	created: string;
	modified: string;
	title_eng: string;
	title_jpn: string;
	image: string;
	aired: AiredDto;
	type: AnimeTypeDto;
	status: AnimeStatusDto;
	score: number;
	user_score: number;
	studios: readonly number[];
	genres: readonly number[];
}>;

export type AiredDto = Readonly<{
	start: string | null;
	end: string | null;
}>;

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
