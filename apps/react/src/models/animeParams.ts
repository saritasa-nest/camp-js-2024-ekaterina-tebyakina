import { AnimeType } from '@js-camp/core/models/anime-type';

import { AnimeSort } from './animeSort';

/** Type of anime filter params. */
export type AnimeParams = {

	/** Term for search anime. */
	readonly searchTerm: string;

	/** Selected anime types. */
	readonly selectedTypes: AnimeType[];

	/** Selected sort settings. */
	readonly sortingSettings: AnimeSort;
};
