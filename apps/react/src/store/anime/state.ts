import { Anime } from '@js-camp/core/models/anime';

import { NormalizedObjects } from '../store';

/** Anime list state. */
export type AnimeListState = {

	/** Anime list. */
	readonly animeList: NormalizedObjects<Anime>;

	/** Url to previous page of anime list. */
	readonly previousPage: string | null;

	/** Url to next page of anime list. */
	readonly nextPage: string | null;

	/** Error. */
	readonly error?: string;

	/** Whether the anime are loading or not. */
	readonly isLoading: boolean;
};

/** Initial state for anime list state. */
export const initialState: AnimeListState = {
	isLoading: false,
	animeList: { byId: {}, allIds: [] },
	previousPage: null,
	nextPage: null,
};
