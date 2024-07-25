import { AiredDto } from './aired.dto';
import { AnimeStatusDto } from './anime-status.dto';
import { AnimeTypeDto } from './anime-type.dto';

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
