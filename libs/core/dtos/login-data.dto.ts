/** Data for user authorization. */
export type LoginDataDto = {

	/** Email that the user registered with. */
	readonly email: string;

	/** Password that the user registered with. */
	readonly password: string;
};
