/** Avatar state. */
export type AvatarState = {

	/** Image for avatar. */
	// readonly file: File | null;

	/** Uploaded avatar URL. */
	readonly url: string | null;

	/** Error. */
	readonly error?: string;

	/** Whether the avatar is loading or not. */
	readonly isLoading: boolean;
};

/** Initial state for avatar state. */
export const initialState: AvatarState = {
	// file: null,
	url: null,
	isLoading: false,
};
