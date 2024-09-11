/** User data for registration. */
export type RegistrationData = {

	/** Email. */
	readonly email: string;

	/** First name. */
	readonly firstName: string;

	/** Last name. */
	readonly lastName: string;

	/** Password. */
	readonly password: string;

	/** Retyped password. */
	readonly retypedPassword: string;
};
