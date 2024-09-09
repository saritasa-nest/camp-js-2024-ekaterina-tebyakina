import { AnimeStudio } from '@js-camp/core/models/anime-studio';
import { createEntityAdapter } from '@reduxjs/toolkit';

/** Studio adapter. */
export const studioAdapter = createEntityAdapter({
	selectId: (studio: AnimeStudio) => studio.id,
});

/** Anime studio state. */
export type StudiosState = {

	/** Studios list. */
	readonly studios: AnimeStudio[];

	/** Error. */
	readonly error?: string;

	/** Whether the studios are loading or not. */
	readonly isLoading: boolean;

	/** Next cursor. */
	readonly next: string | null;
};

/** Initial state for StudiosState. */
export const initialState = studioAdapter.getInitialState<StudiosState>({
	isLoading: false,
	studios: [],
	next: null,
});
