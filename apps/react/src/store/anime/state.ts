import { Anime } from '@js-camp/core/models/anime';

/** Anime list state. */
export type AnimeListState = {

	/** Anime list. */
	readonly list: Anime[];

	/** Error. */
	readonly error?: string;

	/** Whether the anime are loading or not. */
	readonly isLoading: boolean;
};

/** InitialState for AnimeListState. */
export const initialState: AnimeListState = {
	isLoading: false,
	list: [],
};
