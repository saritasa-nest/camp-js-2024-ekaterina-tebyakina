import { AnimeSort } from './anime-sort';
import { AnimeType } from './anime-type';

/** Params. */
export type QueryParams = {

	/** Offset. */
	offset: number;

	/** Limit. */
	limit: number;

	/** Search. */
	search: string;

	/** Type. */
	type: AnimeType[];

	/** Ordering. */
	ordering: AnimeSort;
};
