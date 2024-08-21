import { Anime } from '@js-camp/core/models/anime';
import { createEntityAdapter } from '@reduxjs/toolkit';

/** Anime adapter. */
export const animeAdapter = createEntityAdapter({
	selectId: (anime: Anime) => anime.id,
});

/** Anime list state. */
export type AnimeListState = {

	/** Url to next page of anime list. */
	readonly nextPage: string | null;

	/** Error. */
	readonly error?: string;

	/** Whether the anime are loading or not. */
	readonly isLoading: boolean;

	/** Whether the new page of anime list are loading or not. */
	readonly isAdditionalLoading: boolean;
};

/** Initial state for anime list state. */
export const initialState = animeAdapter.getInitialState<AnimeListState>(
	{
		isLoading: false,
		isAdditionalLoading: false,
		nextPage: null,
	},
);
