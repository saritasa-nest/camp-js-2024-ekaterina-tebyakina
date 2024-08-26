import { Genre } from '@js-camp/core/models/genre';

/** Genres state. */
export type GenresState = {

	/** Next list. */
	next: string | null;

	/** Previous list. */
	previous: string | null;

	/** Genres list. */
	readonly genres: Genre[];

	/** Query genres filters. */
	filter: {};

	/** Error. */
	readonly error?: string;

	/** Whether the genres are loading or not. */
	readonly isLoading: boolean;
};

/** InitialState for GenresState. */
export const initialState: GenresState = {
	next: null,
	previous: null,
	isLoading: false,
	genres: [],
	filter: {},
};
