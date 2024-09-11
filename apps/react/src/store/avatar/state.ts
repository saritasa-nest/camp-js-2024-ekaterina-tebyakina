/** Avatar state. */
export type AvatarState = {

	/** Uploaded avatar URL. */
	readonly url: string | null;

	/** Error. */
	readonly error: string | null;

	/** Whether the avatar is loading or not. */
	readonly isLoading: boolean;
};

/** Initial state for avatar state. */
export const initialState: AvatarState = {
	url: null,
	error: null,
	isLoading: false,
};
