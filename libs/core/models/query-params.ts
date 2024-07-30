import { AnimeType } from './anime-type';

/** */
export type Sort = {

	/** */
	active: string;

	/** */
	direction: '' | 'asc' | 'desc';
};

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
	ordering: Sort;
};
