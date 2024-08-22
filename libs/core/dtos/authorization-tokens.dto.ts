/** Tokens for user authorization. */
export type AuthorizationTokensDto = {

	/** Token for refresh access token. */
	readonly refresh: string;

	/** Access token. */
	readonly access: string;
};
