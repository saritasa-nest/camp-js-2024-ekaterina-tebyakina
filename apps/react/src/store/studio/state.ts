import { AnimeStudio } from '@js-camp/core/models/anime-studio';

/** Anime studio state. */
export type StudiosState = {

	/** Studios list. */
	readonly studios: AnimeStudio[];

	/** Error. */
	readonly error?: string;

	/** Whether the studios are loading or not. */
	readonly isLoading: boolean;
};

/** Initial state for StudiosState. */
export const initialState: StudiosState = {
	isLoading: false,
	studios: [],
};
