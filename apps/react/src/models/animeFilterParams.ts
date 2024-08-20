import { AnimeType } from '@js-camp/core/models/anime-type';

import { AnimeSort } from './animeSort';

/** Type of anime filter params. */
export type AnimeFilterParams = {

	/** Term for search anime. */
	readonly searchTerm: string;

	/** Selected anime types for filtering anime. */
	readonly selectedTypes: AnimeType[];

	/** Sorting settings for sorting anime. */
	readonly sortingSettings: AnimeSort;
};
