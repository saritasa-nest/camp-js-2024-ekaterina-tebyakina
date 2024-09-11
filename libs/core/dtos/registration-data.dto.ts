/** User data for registration. */
export type RegistrationDataDto = {
	readonly avatar?: string;
	readonly email: string;
	readonly first_name: string;
	readonly last_name: string;
	readonly password: string;
};
