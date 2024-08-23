import { User } from '@js-camp/core/models/user';

/** User state. */
export type UserState = {

	/** Current user. */
	readonly user: User | null;

	/** Error. */
	readonly error?: string;

	/** Whether the user is loading or not. */
	readonly isLoading: boolean;
};

/** Initial state for user state. */
export const initialState: UserState = {
	user: null,
	isLoading: false,
};
