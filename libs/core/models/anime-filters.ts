import { AnimeType } from './anime-type';

/** Filters for sort anime. */
export type AnimeFilters = {

	/** Search term for search by anime. */
	readonly search: string;

	/** List of selected anime types. */
	readonly types: AnimeType[];
};
