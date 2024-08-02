import { AnimeSort } from './anime-sort';
import { AnimeType } from './anime-type';

/** Default value for page index. */
export const DEFAULT_PAGE_INDEX = 0;

/** Default value for page size. */
export const DEFAULT_PAGE_SIZE = 25;

/** Default value for search term. */
export const DEFAULT_SEARCH_TERM = '';

/** Default value for anime types list. */
export const DEFAULT_TYPE: AnimeType[] = [];

/** Default value for sort settings. */
export const DEFAULT_SORT_SETTINGS: AnimeSort = { sortField: '', direction: '' };

/** Type of anime filter params. */
export type AnimeFilterParams = {

	/** Index of current page. */
	readonly pageIndex: number;

	/** Page size. */
	readonly pageSize: number;

	/** Term for search anime. */
	readonly searchTerm: string;

	/** Selected anime types. */
	readonly selectedTypes: AnimeType[];

	/** Selected sort settings. */
	readonly sortingSettings: AnimeSort;
};
